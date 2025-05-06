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
      
      // Set up a transporter for email notifications
      // In a production environment, you'd want to use a real SMTP server
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.example.com',
        port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER || 'user@example.com',
          pass: process.env.SMTP_PASS || 'password',
        },
      });
      
      // Only try to send email if SMTP is configured properly
      if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
        // Compose message
        const message = {
          from: process.env.SMTP_FROM || 'noreply@applicreations.com',
          to: 'solutions@applicreations.com',
          subject: 'New Contact Form Submission',
          text: `
            New contact form submission:
            
            Name: ${validatedData.firstName} ${validatedData.lastName}
            Email: ${validatedData.email}
            ${validatedData.phone ? `Phone: ${validatedData.phone}` : ''}
            ${validatedData.businessName ? `Business: ${validatedData.businessName}` : ''}
            
            Project Description:
            ${validatedData.projectDescription}
          `,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${validatedData.firstName} ${validatedData.lastName}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            ${validatedData.phone ? `<p><strong>Phone:</strong> ${validatedData.phone}</p>` : ''}
            ${validatedData.businessName ? `<p><strong>Business:</strong> ${validatedData.businessName}</p>` : ''}
            <p><strong>Project Description:</strong></p>
            <p>${validatedData.projectDescription.replace(/\n/g, '<br>')}</p>
          `
        };
        
        // Try to send the email
        try {
          await transporter.sendMail(message);
        } catch (emailError) {
          console.error('Error sending email notification:', emailError);
          // Don't fail the request if email fails
        }
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
