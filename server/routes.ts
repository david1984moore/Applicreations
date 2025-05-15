import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { contactFormSchema } from "@shared/schema";
import { z } from "zod";
import nodemailer from 'nodemailer';
import { createSecureServer } from "./https";

export async function registerRoutes(app: Express): Promise<Server> {
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

  // Create a secure server (HTTPS if certificates are available, otherwise HTTP)
  const server = createSecureServer(app, {
    enabled: process.env.USE_HTTPS === 'true',
    certPath: process.env.SSL_CERT_PATH,
    keyPath: process.env.SSL_KEY_PATH
  });
  
  return server;
}
