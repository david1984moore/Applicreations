import { db } from "@db";
import { contacts } from "@shared/schema";
import type { Contact, ContactInsert } from "@shared/schema";

// Storage interface for database operations
export const storage = {
  // Insert a new contact form submission
  async insertContactForm(contactData: ContactInsert): Promise<Contact> {
    const [newContact] = await db.insert(contacts).values(contactData).returning();
    return newContact;
  },
  
  // Get all contact form submissions
  async getAllContactForms(): Promise<Contact[]> {
    return await db.query.contacts.findMany({
      orderBy: (contacts, { desc }) => [desc(contacts.createdAt)]
    });
  },
  
  // Get a specific contact form submission by ID
  async getContactFormById(id: number): Promise<Contact | undefined> {
    return await db.query.contacts.findFirst({
      where: (contacts, { eq }) => eq(contacts.id, id)
    });
  }
};
