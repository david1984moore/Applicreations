import type { Express } from "express";
import { createServer } from "http";
import { db } from "@db";
import {
  bills,
  contacts,
  billsInsertSchema,
  insertContactSchema,
} from "@shared/schema";
import { eq } from "drizzle-orm";
import Stripe from "stripe";
import nodemailer from "nodemailer";
import { requireAuth } from "./auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_PORT === "465",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export function registerRoutes(app: Express) {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const result = await db
        .insert(contacts)
        .values(validatedData)
        .returning();

      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: process.env.BUSINESS_EMAIL || process.env.SMTP_USER,
        subject: `New Contact Form Submission from ${validatedData.firstName} ${validatedData.lastName}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${validatedData.firstName} ${validatedData.lastName}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Phone:</strong> ${validatedData.phone || "Not provided"}</p>
          <p><strong>Organization:</strong> ${validatedData.organizationName || "Not provided"}</p>
          <p><strong>Project Description:</strong></p>
          <p>${validatedData.projectDescription}</p>
        `,
      });

      res.json(result[0]);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Admin login endpoint
  app.post("/api/login", async (req, res) => {
    try {
      const { username, password } = req.body;

      if (
        username === process.env.ADMIN_USERNAME &&
        password === process.env.ADMIN_PASSWORD
      ) {
        // @ts-ignore - session may not be typed
        req.session.isAuthenticated = true;
        res.json({ success: true, message: "Login successful" });
      } else {
        res
          .status(401)
          .json({ success: false, message: "Invalid username or password" });
      }
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  });

  // Admin logout endpoint
  app.post("/api/logout", async (req, res) => {
    // @ts-ignore
    req.session.destroy();
    res.json({ success: true, message: "Logged out successfully" });
  });

  // Get all bills (admin only)
  app.get("/api/bills", requireAuth, async (req, res) => {
    try {
      const allBills = await db.select().from(bills).orderBy(bills.createdAt);
      res.json(allBills);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Create a new bill (admin only)
  app.post("/api/bills", requireAuth, async (req, res) => {
    try {
      const validatedData = billsInsertSchema.parse(req.body);
      const result = await db.insert(bills).values(validatedData).returning();
      res.json(result[0]);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Delete a bill (admin only)
  app.delete("/api/bills/:id", requireAuth, async (req, res) => {
    try {
      await db.delete(bills).where(eq(bills.id, parseInt(req.params.id)));
      res.json({ message: "Bill deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get a specific bill by ID (public - no auth required)
  app.get("/api/bills/:id", async (req, res) => {
    try {
      const bill = await db
        .select()
        .from(bills)
        .where(eq(bills.id, parseInt(req.params.id)));

      if (bill.length === 0) {
        return res.status(404).json({ message: "Bill not found" });
      }

      res.json(bill[0]);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Create Stripe payment intent
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { amount, paymentMethodType } = req.body;

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: "usd",
        payment_method_types:
          paymentMethodType === "us_bank_account"
            ? ["us_bank_account"]
            : ["card"],
      });

      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Stripe webhook handler
  app.post("/api/webhooks/stripe", async (req, res) => {
    const sig = req.headers["stripe-signature"] as string;
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!,
      );
    } catch (err: any) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log("Payment succeeded:", paymentIntent.id);
    }

    res.json({ received: true });
  });

  const httpServer = createServer(app);
  return httpServer;
}
