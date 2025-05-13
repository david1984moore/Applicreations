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
      
      // Store contact form data in the database, but don't try to send email
      console.log('Contact form submission stored in database. Email sending is disabled.');
      
      // NOTE: We're disabling email sending for now since it's causing authentication issues.
      // The contact form data is still being stored in the database.
      // You can check new submissions by querying the database directly.
      
      // For reference, here's how you would typically set up email sending:
      /*
      const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        port: 465,
        secure: true,
        auth: {
          user: 'solutions@applicreations.com',
          pass: 'your-password-here',
        }
      });
      */
      
      // Email content is defined here but not used currently
      /* 
      For future reference, this is how you would set up email content:
      
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
        html: `HTML version of the email here...`
      };
      
      // And this is how you would send the email:
      await transporter.sendMail(mailOptions);
      */
      
      // For now, we'll just log the form submission to the console
      console.log('New contact form submission:', {
        name: `${validatedData.firstName} ${validatedData.lastName}`,
        email: validatedData.email,
        phone: validatedData.phone || 'Not provided',
        organization: validatedData.organizationName || 'Not provided',
        projectDescription: validatedData.projectDescription.substring(0, 50) + '...'
      });
      
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
