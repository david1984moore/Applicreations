import { MailService } from '@sendgrid/mail';

// Initialize SendGrid with API key
if (!process.env.SENDGRID_API_KEY) {
  console.warn('SENDGRID_API_KEY is not set. Email functionality will be disabled.');
}

// Create mail service instance
const mailService = new MailService();
if (process.env.SENDGRID_API_KEY) {
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
}

interface EmailMessage {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
}

/**
 * Sends an email using SendGrid
 * @param message The email message to send
 * @returns True if the email was sent successfully, false otherwise
 */
export async function sendEmail(message: EmailMessage): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    console.warn('Cannot send email: SENDGRID_API_KEY is not set');
    return false;
  }

  try {
    await mailService.send(message);
    console.log(`Email sent successfully to ${message.to}`);
    return true;
  } catch (error: any) {
    console.error('Error sending email:', error);
    if (error.response) {
      console.error(error.response.body);
    }
    return false;
  }
}

/**
 * Sends a contact form notification email
 * @param contactData The contact form data
 * @param toEmail The email address to send the notification to
 * @param fromEmail The from email address (must be verified in SendGrid)
 * @returns True if the email was sent successfully, false otherwise
 */
export async function sendContactFormNotification(
  contactData: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    businessName?: string;
    projectDescription: string;
  },
  toEmail: string,
  fromEmail: string
): Promise<boolean> {
  const subject = `New Contact Form Submission from ${contactData.firstName} ${contactData.lastName}`;
  
  const text = `
    New contact form submission:
    
    Name: ${contactData.firstName} ${contactData.lastName}
    Email: ${contactData.email}
    ${contactData.phone ? `Phone: ${contactData.phone}` : ''}
    ${contactData.businessName ? `Business: ${contactData.businessName}` : ''}
    
    Project Description:
    ${contactData.projectDescription}
  `;
  
  const html = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${contactData.firstName} ${contactData.lastName}</p>
    <p><strong>Email:</strong> ${contactData.email}</p>
    ${contactData.phone ? `<p><strong>Phone:</strong> ${contactData.phone}</p>` : ''}
    ${contactData.businessName ? `<p><strong>Business:</strong> ${contactData.businessName}</p>` : ''}
    <p><strong>Project Description:</strong></p>
    <p>${contactData.projectDescription.replace(/\n/g, '<br>')}</p>
  `;
  
  return sendEmail({
    to: toEmail,
    from: fromEmail,
    subject,
    text,
    html
  });
}