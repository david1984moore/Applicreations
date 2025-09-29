import { pgTable, text, serial, integer, boolean, timestamp, varchar, jsonb, index, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)]
);

// Users table - Enhanced for Replit Auth while keeping existing structure
export const users = pgTable("users", {
  id: serial("id").primaryKey(), // Keep existing serial ID
  username: text("username").unique(), // Make optional for Replit Auth
  password: text("password"), // Make optional for Replit Auth
  // Replit Auth fields
  replitId: text("replit_id").unique(), // Store Replit user ID here
  email: text("email").unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  profileImageUrl: text("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = z.infer<typeof selectUserSchema>;
export type UpsertUser = Pick<InsertUser, 'replitId' | 'email' | 'firstName' | 'lastName' | 'profileImageUrl'>;

// Contacts table for storing form submissions
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  organizationName: text("organization_name"),
  projectDescription: text("project_description").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

// Schema for contact form validation
export const contactFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  organizationName: z.string().optional(),
  projectDescription: z.string().min(1, 'Please tell us about your project')
});

export const insertContactSchema = createInsertSchema(contacts);

export type ContactInsert = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;

// Bills table for customer billing
export const bills = pgTable("bills", {
  id: serial("id").primaryKey(),
  accountNumber: text("account_number").notNull().unique(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  description: text("description").notNull(),
  dueDate: timestamp("due_date"),
  status: text("status").notNull().default("unpaid"), // 'paid' | 'unpaid' | 'overdue' | 'processing'
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Payments table for tracking transactions
export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  billId: integer("bill_id").references(() => bills.id).notNull(),
  stripePaymentIntentId: text("stripe_payment_intent_id").unique(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  paymentMethod: text("payment_method").notNull(), // 'card' | 'ach'
  status: text("status").notNull().default("pending"), // 'pending' | 'succeeded' | 'failed'
  customerEmail: text("customer_email"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  processedAt: timestamp("processed_at"),
});

// Define relationships
export const billsRelations = relations(bills, ({ many }) => ({
  payments: many(payments)
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  bill: one(bills, { fields: [payments.billId], references: [bills.id] })
}));

// Validation schemas for bills
export const billsInsertSchema = createInsertSchema(bills, {
  accountNumber: (schema) => schema.min(1, "Account number is required"),
  customerName: (schema) => schema.min(2, "Customer name must be at least 2 characters"),
  customerEmail: (schema) => schema.email("Please enter a valid email address"),
  amount: (schema) => schema.refine(val => parseFloat(val) > 0, "Amount must be greater than 0"),
  description: (schema) => schema.min(1, "Description is required"),
  dueDate: () => z.preprocess(
    (val) => (val === '' || val === null ? undefined : val),
    z.coerce.date()
  ).optional().nullable(),
});

export const billsSelectSchema = createSelectSchema(bills);

export type BillInsert = z.infer<typeof billsInsertSchema>;
export type Bill = z.infer<typeof billsSelectSchema>;

// Validation schemas for payments
export const paymentsInsertSchema = createInsertSchema(payments);
export const paymentsSelectSchema = createSelectSchema(payments);

export type PaymentInsert = z.infer<typeof paymentsInsertSchema>;
export type Payment = z.infer<typeof paymentsSelectSchema>;
