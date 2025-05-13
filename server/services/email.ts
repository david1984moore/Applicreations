// This file exists only as a placeholder
// Email functionality has been removed as requested

// Empty interfaces to maintain type compatibility if needed elsewhere
interface EmailMessage {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
}

/**
 * Stub function that returns false - email functionality has been removed
 */
export async function sendEmail(message: EmailMessage): Promise<boolean> {
  console.log('Email functionality has been removed');
  return false;
}

/**
 * Stub function that returns false - email functionality has been removed
 */
export async function sendContactFormNotification(
  contactData: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    organizationName?: string;
    projectDescription: string;
  },
  toEmail: string,
  fromEmail: string
): Promise<boolean> {
  console.log('Email notification functionality has been removed');
  return false;
}