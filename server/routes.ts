import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { contactFormSchema, billsInsertSchema } from "@shared/schema";
import { z } from "zod";
import nodemailer from 'nodemailer';
import { createSecureServer } from "./https";
import { setupAuth, isAuthenticated } from "./replitAuth";
import Stripe from "stripe";

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
  app.get('/api/admin/bills', isAuthenticated, async (req, res) => {
    try {
      const bills = await storage.getAllBills();
      res.json(bills);
    } catch (error) {
      console.error("Error fetching bills:", error);
      res.status(500).json({ message: "Failed to fetch bills" });
    }
  });

  app.post('/api/admin/bills', isAuthenticated, async (req, res) => {
    try {
      const validatedData = billsInsertSchema.parse(req.body);
      const newBill = await storage.insertBill(validatedData);
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
  app.put('/api/admin/bills/:id', isAuthenticated, async (req, res) => {
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
  app.delete('/api/admin/bills/:id', isAuthenticated, async (req, res) => {
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
      const { amount, billId, paymentMethod = 'card' } = req.body;
      
      if (!amount || !billId) {
        return res.status(400).json({ message: "Amount and billId are required" });
      }

      // Convert amount to cents (Stripe requires cents)
      const amountInCents = Math.round(parseFloat(amount) * 100);

      // Create payment intent with Stripe
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: 'usd',
        payment_method_types: paymentMethod === 'ach' ? ['us_bank_account'] : ['card'],
        metadata: {
          billId: billId.toString()
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
      const { billId, stripePaymentIntentId, amount, paymentMethod, customerEmail } = req.body;
      
      // Validate required fields
      if (!billId || !stripePaymentIntentId || !amount || !paymentMethod) {
        return res.status(400).json({ message: "Missing required payment fields" });
      }

      // Verify payment with Stripe
      const paymentIntent = await stripe.paymentIntents.retrieve(stripePaymentIntentId);
      
      if (paymentIntent.status !== 'succeeded') {
        return res.status(400).json({ message: "Payment not completed" });
      }

      // Record the successful payment
      const payment = await storage.insertPayment({
        billId,
        stripePaymentIntentId,
        amount,
        paymentMethod,
        customerEmail,
        status: 'succeeded'
      });

      // Mark bill as paid
      await storage.updateBillStatus(billId, 'paid');

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
