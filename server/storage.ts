import { db } from "../db/index.js";
import { contacts, bills, payments } from "../shared/schema.js";
import type { Contact, ContactInsert, Bill, BillInsert, Payment, PaymentInsert } from "../shared/schema.js";
import { eq } from "drizzle-orm";

// Storage interface for database operations
export const storage = {
  // Contact form operations
  async insertContactForm(contactData: ContactInsert): Promise<Contact> {
    const [newContact] = await db.insert(contacts).values(contactData).returning();
    return newContact;
  },
  
  async getAllContactForms(): Promise<Contact[]> {
    return await db.query.contacts.findMany({
      orderBy: (contacts, { desc }) => [desc(contacts.createdAt)]
    });
  },
  
  async getContactFormById(id: number): Promise<Contact | undefined> {
    return await db.query.contacts.findFirst({
      where: (contacts, { eq }) => eq(contacts.id, id)
    });
  },

  // Bills operations
  async insertBill(billData: BillInsert): Promise<Bill> {
    const [newBill] = await db.insert(bills).values(billData).returning();
    return newBill;
  },

  async getAllBills(): Promise<Bill[]> {
    return await db.query.bills.findMany({
      orderBy: (bills, { desc }) => [desc(bills.createdAt)]
    });
  },

  async getBillByAccountNumber(accountNumber: string): Promise<Bill | undefined> {
    return await db.query.bills.findFirst({
      where: (bills, { eq }) => eq(bills.accountNumber, accountNumber)
    });
  },

  async getBillById(id: number): Promise<Bill | undefined> {
    return await db.query.bills.findFirst({
      where: (bills, { eq }) => eq(bills.id, id)
    });
  },

  async updateBillStatus(id: number, status: string): Promise<Bill | undefined> {
    const [updatedBill] = await db
      .update(bills)
      .set({ status, updatedAt: new Date() })
      .where(eq(bills.id, id))
      .returning();
    return updatedBill;
  },

  async updateBill(id: number, billData: Partial<BillInsert>): Promise<Bill | undefined> {
    const [updatedBill] = await db
      .update(bills)
      .set({ ...billData, updatedAt: new Date() })
      .where(eq(bills.id, id))
      .returning();
    return updatedBill;
  },

  async deleteBill(id: number): Promise<Bill | undefined> {
    const [deletedBill] = await db
      .delete(bills)
      .where(eq(bills.id, id))
      .returning();
    return deletedBill;
  },

  // Payments operations
  async insertPayment(paymentData: PaymentInsert): Promise<Payment> {
    const [newPayment] = await db.insert(payments).values(paymentData).returning();
    return newPayment;
  },

  async getPaymentsByBillId(billId: number): Promise<Payment[]> {
    return await db.query.payments.findMany({
      where: (payments, { eq }) => eq(payments.billId, billId),
      orderBy: (payments, { desc }) => [desc(payments.createdAt)]
    });
  },

  async updatePaymentStatus(id: number, status: string, processedAt?: Date): Promise<Payment | undefined> {
    const [updatedPayment] = await db
      .update(payments)
      .set({ 
        status, 
        processedAt: processedAt || new Date() 
      })
      .where(eq(payments.id, id))
      .returning();
    return updatedPayment;
  }
};
