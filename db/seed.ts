import { db } from "./index";
import * as schema from "@shared/schema";

async function seed() {
  try {
    console.log("Starting database seeding...");

    // Add sample bills for testing
    const sampleBills = [
      {
        accountNumber: "ACCT-001",
        customerName: "John Smith",
        amount: "150.00",
        description: "Monthly web hosting service",
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Due in 7 days
        status: "unpaid"
      },
      {
        accountNumber: "ACCT-002", 
        customerName: "Sarah Johnson",
        amount: "75.50",
        description: "Website maintenance fee",
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // Due in 14 days
        status: "unpaid"
      },
      {
        accountNumber: "ACCT-003",
        customerName: "Mike Wilson",
        amount: "300.00",
        description: "Custom app development - Phase 1",
        dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // Overdue by 2 days
        status: "overdue"
      },
      {
        accountNumber: "DEMO-001",
        customerName: "Test Customer",
        amount: "25.00",
        description: "Demo bill for testing payments",
        status: "unpaid"
      }
    ];

    // Insert sample bills (only if they don't already exist)
    for (const bill of sampleBills) {
      const existingBill = await db.query.bills.findFirst({
        where: (bills, { eq }) => eq(bills.accountNumber, bill.accountNumber)
      });

      if (!existingBill) {
        await db.insert(schema.bills).values(bill);
        console.log(`Added sample bill: ${bill.accountNumber} - ${bill.customerName}`);
      } else {
        console.log(`Bill ${bill.accountNumber} already exists, skipping...`);
      }
    }

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seed();
