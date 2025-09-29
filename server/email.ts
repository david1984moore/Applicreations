import nodemailer from 'nodemailer';
import type { Bill } from '@shared/schema';
import fs from 'fs';
import path from 'path';

// Create reusable transporter
function createTransporter() {
  return nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER || 'solutions@applicreations.com',
      pass: process.env.EMAIL_PASS,
    },
  });
}

// Generate branded email HTML for bill notification
function generateBillNotificationHTML(bill: Bill, paymentUrl: string, hasLogo: boolean = false): string {
  const amount = typeof bill.amount === 'string' ? parseFloat(bill.amount) : bill.amount;
  const formattedAmount = amount.toFixed(2);
  const dueDate = bill.dueDate ? new Date(bill.dueDate).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }) : 'Upon receipt';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bill from Applicreations</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header with Logo -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background-color: #8B5CF6; background: linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%); border-radius: 12px 12px 0 0;">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  ${hasLogo ? '<td align="center" valign="middle" style="padding-right: 12px;"><img src="cid:logo" alt="Applicreations Logo" width="60" style="display: block; border: none;" /></td>' : ''}
                  <td align="center" valign="middle">
                    <span style="font-size: 28px; font-weight: bold; color: #ffffff; display: block;">Applicreations</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="padding: 40px;">
              <h1 style="margin: 0 0 20px; font-size: 24px; font-weight: 600; color: #1a1a1a;">You Have a New Bill</h1>
              <p style="margin: 0 0 30px; font-size: 16px; line-height: 1.6; color: #4a5568;">
                Hello ${bill.customerName},
              </p>
              <p style="margin: 0 0 30px; font-size: 16px; line-height: 1.6; color: #4a5568;">
                You've received a new bill from Applicreations. You can pay it securely online using your credit card, debit card, or bank account.
              </p>
              
              <!-- Bill Details Card -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f8f9fa; border-radius: 8px; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 24px;">
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 8px 0; font-size: 14px; color: #6b7280;">Account Number:</td>
                        <td style="padding: 8px 0; font-size: 14px; color: #1a1a1a; font-weight: 600; text-align: right;">${bill.accountNumber}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-size: 14px; color: #6b7280;">Amount Due:</td>
                        <td style="padding: 8px 0; font-size: 24px; color: #8B5CF6; font-weight: 700; text-align: right;">$${formattedAmount}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-size: 14px; color: #6b7280;">Due Date:</td>
                        <td style="padding: 8px 0; font-size: 14px; color: #1a1a1a; font-weight: 600; text-align: right;">${dueDate}</td>
                      </tr>
                      <tr>
                        <td colspan="2" style="padding: 16px 0 8px; font-size: 14px; color: #6b7280; border-top: 1px solid #e5e7eb;">Description:</td>
                      </tr>
                      <tr>
                        <td colspan="2" style="padding: 0; font-size: 14px; color: #1a1a1a; line-height: 1.6;">${bill.description}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- CTA Button -->
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td align="center" style="padding: 10px 0 30px;">
                    <a href="${paymentUrl}" style="display: inline-block; padding: 16px 40px; background-color: #8B5CF6; background: linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%); color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 8px; box-shadow: 0 4px 6px rgba(139, 92, 246, 0.3);">
                      Pay Bill Now
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 0 0 10px; font-size: 14px; line-height: 1.6; color: #6b7280;">
                You can also pay by visiting:
              </p>
              <p style="margin: 0 0 30px; font-size: 14px; line-height: 1.6; color: #8B5CF6; word-break: break-all;">
                <a href="${paymentUrl}" style="color: #8B5CF6; text-decoration: none;">${paymentUrl}</a>
              </p>
              
              <!-- Payment Methods Info -->
              <div style="background-color: #f0f9ff; border-left: 4px solid #3b82f6; padding: 16px; border-radius: 4px; margin-bottom: 30px;">
                <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #1a1a1a;">
                  <strong>💳 Accepted Payment Methods:</strong><br/>
                  Credit Card, Debit Card, or ACH Bank Transfer
                </p>
              </div>
              
              <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #6b7280;">
                If you have any questions about this bill, please contact us at <a href="mailto:solutions@applicreations.com" style="color: #8B5CF6; text-decoration: none;">solutions@applicreations.com</a>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #f8f9fa; border-radius: 0 0 12px 12px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px; font-size: 14px; color: #1a1a1a; font-weight: 600;">Applicreations</p>
              <p style="margin: 0 0 5px; font-size: 13px; color: #6b7280;">Web & App Development Solutions</p>
              <p style="margin: 0 0 15px; font-size: 13px; color: #6b7280;">Wilmington, Delaware</p>
              <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                This is an automated billing notification. Please do not reply to this email.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

// Generate plain text version for email clients that don't support HTML
function generateBillNotificationText(bill: Bill, paymentUrl: string): string {
  const amount = typeof bill.amount === 'string' ? parseFloat(bill.amount) : bill.amount;
  const formattedAmount = amount.toFixed(2);
  const dueDate = bill.dueDate ? new Date(bill.dueDate).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }) : 'Upon receipt';

  return `
APPLICREATIONS - BILL NOTIFICATION

Hello ${bill.customerName},

You've received a new bill from Applicreations. You can pay it securely online using your credit card, debit card, or bank account.

BILL DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Account Number: ${bill.accountNumber}
Amount Due: $${formattedAmount}
Due Date: ${dueDate}

Description:
${bill.description}

PAY YOUR BILL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Visit the following link to pay securely:
${paymentUrl}

ACCEPTED PAYMENT METHODS
💳 Credit Card, Debit Card, or ACH Bank Transfer

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Questions? Contact us at solutions@applicreations.com

Applicreations
Web & App Development Solutions
Wilmington, Delaware

This is an automated billing notification.
  `.trim();
}

// Send bill notification email
export async function sendBillNotificationEmail(bill: Bill): Promise<boolean> {
  try {
    // Generate payment URL based on environment
    const baseUrl = process.env.REPLIT_DOMAINS 
      ? `https://${process.env.REPLIT_DOMAINS.split(',')[0]}`
      : 'http://localhost:5000';
    const paymentUrl = `${baseUrl}/pay?account=${encodeURIComponent(bill.accountNumber)}`;

    const transporter = createTransporter();
    
    // Prepare logo attachment
    const logoPath = path.join(process.cwd(), 'server/public/images/applicreations-logo.png');
    const attachments = [];
    let hasLogo = false;
    
    try {
      if (fs.existsSync(logoPath)) {
        attachments.push({
          filename: 'applicreations-logo.png',
          path: logoPath,
          cid: 'logo'
        });
        hasLogo = true;
      }
    } catch (logoError) {
      console.warn('Could not attach logo to email:', logoError);
    }
    
    const mailOptions = {
      from: `"Applicreations" <${process.env.EMAIL_USER || 'solutions@applicreations.com'}>`,
      to: bill.customerEmail,
      subject: `Bill from Applicreations - Account ${bill.accountNumber}`,
      text: generateBillNotificationText(bill, paymentUrl),
      html: generateBillNotificationHTML(bill, paymentUrl, hasLogo),
      attachments: attachments
    };

    console.log(`Sending bill notification email to ${bill.customerEmail}...`);
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Bill notification email sent successfully!', {
      messageId: info.messageId,
      to: bill.customerEmail,
      accountNumber: bill.accountNumber
    });
    
    return true;
  } catch (error) {
    console.error('Error sending bill notification email:', error);
    return false;
  }
}
