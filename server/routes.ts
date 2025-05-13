import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactFormSchema } from "@shared/schema";
import { z } from "zod";
import nodemailer from 'nodemailer';

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for contact form submissions
  app.post('/api/contact', async (req, res) => {
    try {
      // Validate form data
      const validatedData = contactFormSchema.parse(req.body);
      
      // Store contact form submission in database
      const newContact = await storage.insertContactForm(validatedData);
      
      // Setup Nodemailer with Hostinger SMTP (using TLS)
      console.log('Attempting to send email with user:', process.env.EMAIL_USER);
      
      const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        port: 587,
        secure: false, // Use TLS
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false
        },
        debug: true, // Show debug information
        logger: true // Log information about the mail transaction
      });
      
      // Prepare email content
      const mailOptions = {
        from: 'solutions@applicreations.com',
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
      
      // Send email
      try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        // We still return success if the database insert worked
        // Just log the email error but don't fail the request
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

  const httpServer = createServer(app);
  return httpServer;
}
