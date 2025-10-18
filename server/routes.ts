import type { Express, RequestHandler } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { contactFormSchema, billsInsertSchema } from "@shared/schema";
import { z } from "zod";
import nodemailer from 'nodemailer';
import { createSecureServer } from "./https";
import { setupAuth, isAuthenticated } from "./replitAuth";
import Stripe from "stripe";
import { sendBillNotificationEmail } from "./email";

import { requireAuth } from './auth';

// Simple admin authentication middleware
const isAdminAuthenticated: RequestHandler = (req, res, next) => {
  if ((req.session as any).isAdminAuthenticated === true) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized - Please login" });
};

// Initialize Stripe with secret key
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-08-27.basil",
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware setup
  await setupAuth(app);
  
  // Admin login endpoint
  app.post('/api/admin/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      
      const adminUsername = process.env.ADMIN_USERNAME;
      const adminPassword = process.env.ADMIN_PASSWORD;
      
      if (!adminUsername || !adminPassword) {
        console.error('Admin credentials not configured');
        return res.status(500).json({ message: 'Server configuration error' });
      }
      
      if (username === adminUsername && password === adminPassword) {
        // Set session flag for admin authentication
        (req.session as any).isAdminAuthenticated = true;
        return res.status(200).json({ success: true, message: 'Login successful' });
      } else {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ message: 'Login failed' });
    }
  });
  
  // Admin logout endpoint
  app.post('/api/admin/logout', (req, res) => {
    (req.session as any).isAdminAuthenticated = false;
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  });
  
  // Check admin auth status
  app.get('/api/admin/auth/status', (req, res) => {
    const isAuthenticated = (req.session as any).isAdminAuthenticated === true;
    if (isAuthenticated) {
      return res.status(200).json({ authenticated: true });
    } else {
      return res.status(401).json({ authenticated: false });
    }
  });
  
  // Health check endpoint for Replit deployment (separate from root)
  app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Applicreations API is running' });
  });

  // API route for contact form submissions
  app.post('/api/contact', async (req, res) => {
    try {
      // Validate form data
      const validatedData = contactFormSchema.parse(req.body);
      
      // Store contact form submission in database
      const newContact = await storage.insertContactForm(validatedData);
      
      // Log form submission
      console.log('New contact form submission:', {
        name: `${validatedData.firstName} ${validatedData.lastName}`,
        email: validatedData.email,
        phone: validatedData.phone,
        organization: validatedData.organizationName,
        projectDescription: validatedData.projectDescription.substring(0, 50) + '...'
      });
      
      // Setup Nodemailer with Hostinger SMTP details
      console.log('Setting up Hostinger SMTP...');
      try {
        // Create reusable transporter object using Hostinger SMTP server
        let transporter = nodemailer.createTransport({
          host: 'smtp.hostinger.com',
          port: 465, 
          secure: true, // true for port 465, false for other ports
          auth: {
            user: process.env.EMAIL_USER || 'solutions@applicreations.com',
            pass: process.env.EMAIL_PASS,
          },
          debug: true, // Show debug output
          logger: true, // Log information into the console
        });
        
        console.log('SMTP Configuration:', {
          host: 'smtp.hostinger.com',
          port: 465,
          secure: true,
          user: process.env.EMAIL_USER ? process.env.EMAIL_USER.substring(0, 5) + '...' : 'not set',
          pass: process.env.EMAIL_PASS ? '********' : 'not set'
        });
        
        // Prepare email content
        let mailOptions = {
          from: `"Applicreations" <${process.env.EMAIL_USER || 'solutions@applicreations.com'}>`,
          to: 'solutions@applicreations.com',
          replyTo: validatedData.email,
          subject: `New Contact Form Submission from ${validatedData.firstName} ${validatedData.lastName}`,
          text: `
Name: ${validatedData.firstName} ${validatedData.lastName}
Email: ${validatedData.email}
Phone: ${validatedData.phone || 'Not provided'}
Organization: ${validatedData.organizationName || 'Not provided'}

Project Description:
${validatedData.projectDescription}
          `,
          html: `
<div style="font-family: Arial, sans-serif; color: #333;">
  <h2 style="color: #4a6cf7;">New Contact Form Submission</h2>
  <p><strong>Name:</strong> ${validatedData.firstName} ${validatedData.lastName}</p>
  <p><strong>Email:</strong> ${validatedData.email}</p>
  <p><strong>Phone:</strong> ${validatedData.phone || 'Not provided'}</p>
  <p><strong>Organization:</strong> ${validatedData.organizationName || 'Not provided'}</p>
  
  <h3 style="color: #4a6cf7; margin-top: 20px;">Project Description:</h3>
  <p style="white-space: pre-line;">${validatedData.projectDescription}</p>
</div>
          `
        };
        
        console.log('Attempting to send email...');
        // Send mail with defined transport object
        const info = await transporter.sendMail(mailOptions);
        
        console.log('Email sent successfully!', {
          messageId: info.messageId,
          response: info.response
        });
      } catch (error: any) {
        console.error('Error sending email:', error);
        
        if (error.code === 'EAUTH') {
          console.error('Authentication error. Check EMAIL_USER and EMAIL_PASS environment variables.');
        } else if (error.code === 'ESOCKET') {
          console.error('Socket error. Check your network connection and firewall settings.');
        } else if (error.code === 'ECONNECTION') {
          console.error('Connection error. Make sure SMTP server is reachable.');
        }
        
        // We still return success if the database insert worked
        console.log('Contact form submission stored in database. Email sending failed.');
      }
      
      // Return success response
      return res.status(201).json({ 
        success: true, 
        message: 'Contact form submitted successfully',
        id: newContact.id
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false,
          message: 'Form validation failed',
          errors: error.errors 
        });
      }
      
      console.error('Error processing contact form:', error);
      return res.status(500).json({ 
        success: false,
        message: 'An error occurred while processing your request. Please try again later.'
      });
    }
  });

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const replitId = req.user.claims.sub;
      const user = await storage.getUser(replitId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Bill management routes (Admin-only)
  app.get('/api/admin/bills', isAdminAuthenticated, async (req, res) => {
    try {
      const bills = await storage.getAllBills();
      res.json(bills);
    } catch (error) {
      console.error("Error fetching bills:", error);
      res.status(500).json({ message: "Failed to fetch bills" });
    }
  });

  app.post('/api/admin/bills', isAdminAuthenticated, async (req, res) => {
    try {
      const validatedData = billsInsertSchema.parse(req.body);
      const newBill = await storage.insertBill(validatedData);
      
      // Send email notification to customer
      console.log(`Sending bill notification email for account ${newBill.accountNumber}...`);
      try {
        await sendBillNotificationEmail(newBill);
        console.log('Bill notification email sent successfully');
      } catch (emailError) {
        console.error('Failed to send bill notification email:', emailError);
        // Don't fail the request if email fails - bill was created successfully
      }
      
      res.status(201).json(newBill);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: 'Validation failed',
          errors: error.errors 
        });
      }
      console.error("Error creating bill:", error);
      res.status(500).json({ message: "Failed to create bill" });
    }
  });

  // Update bill (Admin only)
  app.put('/api/admin/bills/:id', isAdminAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const billId = parseInt(id);
      
      if (isNaN(billId)) {
        return res.status(400).json({ message: "Invalid bill ID" });
      }

      // Check if bill exists
      const existingBill = await storage.getBillById(billId);
      if (!existingBill) {
        return res.status(404).json({ message: "Bill not found" });
      }

      const validatedData = billsInsertSchema.partial().parse(req.body);
      const updatedBill = await storage.updateBill(billId, validatedData);
      
      if (!updatedBill) {
        return res.status(404).json({ message: "Bill not found" });
      }
      
      res.json(updatedBill);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: 'Validation failed',
          errors: error.errors 
        });
      }
      console.error("Error updating bill:", error);
      res.status(500).json({ message: "Failed to update bill" });
    }
  });

  // Delete bill (Admin only)
  app.delete('/api/admin/bills/:id', isAdminAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const billId = parseInt(id);
      
      if (isNaN(billId)) {
        return res.status(400).json({ message: "Invalid bill ID" });
      }

      // Check if bill exists
      const existingBill = await storage.getBillById(billId);
      if (!existingBill) {
        return res.status(404).json({ message: "Bill not found" });
      }

      // Check if bill has been paid (optional safety check)
      if (existingBill.status === 'paid') {
        return res.status(400).json({ 
          message: "Cannot delete a paid bill. This would affect financial records." 
        });
      }

      const deletedBill = await storage.deleteBill(billId);
      
      if (!deletedBill) {
        return res.status(404).json({ message: "Bill not found" });
      }
      
      res.json({ message: "Bill deleted successfully", bill: deletedBill });
    } catch (error) {
      console.error("Error deleting bill:", error);
      res.status(500).json({ message: "Failed to delete bill" });
    }
  });

  // Customer bill lookup (Public)
  app.get('/api/bills/lookup/:accountNumber', async (req, res) => {
    try {
      const { accountNumber } = req.params;
      const bill = await storage.getBillByAccountNumber(accountNumber);
      
      if (!bill) {
        return res.status(404).json({ message: "Account not found" });
      }

      // Only return essential info for customer
      res.json({
        id: bill.id,
        accountNumber: bill.accountNumber,
        customerName: bill.customerName,
        amount: bill.amount,
        description: bill.description,
        dueDate: bill.dueDate,
        status: bill.status
      });
    } catch (error) {
      console.error("Error looking up bill:", error);
      res.status(500).json({ message: "Failed to lookup bill" });
    }
  });

  // Create Stripe payment intent
  app.post('/api/create-payment-intent', async (req, res) => {
    try {
      const { billId } = req.body;
      
      if (!billId) {
        return res.status(400).json({ message: "billId is required" });
      }

      // SECURITY: Fetch bill from database to verify it exists and get the actual amount
      const bill = await storage.getBillById(billId);
      
      if (!bill) {
        return res.status(404).json({ message: "Bill not found" });
      }

      // Verify bill is unpaid
      if (bill.status === 'paid') {
        return res.status(400).json({ message: "Bill has already been paid" });
      }

      // Convert amount to cents (Stripe requires cents)
      // SECURITY: Use amount from database, not from client
      const amountInCents = Math.round(parseFloat(bill.amount) * 100);

      // Create payment intent with both card and ACH enabled
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: 'usd',
        payment_method_types: ['card', 'us_bank_account'],
        metadata: {
          billId: billId.toString(),
          accountNumber: bill.accountNumber
        }
      });

      res.json({ 
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id
      });
    } catch (error: any) {
      console.error("Error creating payment intent:", error);
      res.status(500).json({ message: "Error creating payment intent: " + error.message });
    }
  });

  // Payment processing endpoint (Public)
  app.post('/api/payments/process', async (req, res) => {
    try {
      const { billId, stripePaymentIntentId } = req.body;
      
      // Validate required fields
      if (!billId || !stripePaymentIntentId) {
        return res.status(400).json({ message: "Missing required payment fields" });
      }

      // SECURITY: Fetch bill from database
      const bill = await storage.getBillById(billId);
      if (!bill) {
        return res.status(404).json({ message: "Bill not found" });
      }

      // Check if bill is already paid (idempotency)
      if (bill.status === 'paid') {
        return res.json({ message: "Bill already paid", status: 'paid' });
      }

      // SECURITY: Verify payment with Stripe and get actual payment details
      const paymentIntent = await stripe.paymentIntents.retrieve(stripePaymentIntentId);
      
      // SECURITY: Verify payment intent is for this bill
      if (paymentIntent.metadata.billId !== billId.toString()) {
        return res.status(400).json({ message: "Payment intent does not match bill" });
      }

      // SECURITY: Verify payment intent amount matches bill amount
      const expectedAmountInCents = Math.round(parseFloat(bill.amount) * 100);
      if (paymentIntent.amount !== expectedAmountInCents) {
        return res.status(400).json({ message: "Payment amount does not match bill amount" });
      }

      // SECURITY: Verify currency
      if (paymentIntent.currency !== 'usd') {
        return res.status(400).json({ message: "Invalid payment currency" });
      }

      // Handle both succeeded and processing statuses
      if (paymentIntent.status !== 'succeeded' && paymentIntent.status !== 'processing') {
        return res.status(400).json({ message: `Payment not completed. Status: ${paymentIntent.status}` });
      }

      // SECURITY: Derive amount and payment method from Stripe, not from client
      const amount = (paymentIntent.amount / 100).toFixed(2);
      const paymentMethod = paymentIntent.payment_method_types[0] || 'card';

      // Check for duplicate payment (idempotency)
      const existingPayments = await storage.getPaymentsByBillId(billId);
      const duplicatePayment = existingPayments.find(p => p.stripePaymentIntentId === stripePaymentIntentId);
      if (duplicatePayment) {
        return res.json({ message: "Payment already recorded", status: duplicatePayment.status });
      }

      // Record the payment
      const payment = await storage.insertPayment({
        billId,
        stripePaymentIntentId,
        amount,
        paymentMethod,
        customerEmail: '',
        status: paymentIntent.status
      });

      // Update bill status based on payment status
      if (paymentIntent.status === 'succeeded') {
        await storage.updateBillStatus(billId, 'paid');
      } else if (paymentIntent.status === 'processing') {
        // For ACH, mark bill as processing (not paid yet)
        await storage.updateBillStatus(billId, 'processing');
      }

      res.json({
        success: true,
        paymentId: payment.id,
        message: "Payment processed successfully"
      });
    } catch (error) {
      console.error("Error processing payment:", error);
      res.status(500).json({ message: "Failed to process payment" });
    }
  });

  // Create a secure server (HTTPS if certificates are available, otherwise HTTP)
  const server = createSecureServer(app, {
    enabled: process.env.USE_HTTPS === 'true',
    certPath: process.env.SSL_CERT_PATH,
    keyPath: process.env.SSL_KEY_PATH
  });
  
  return server;
}
