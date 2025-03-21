import nodemailer from "nodemailer";
import { Message, Subscriber } from "@shared/schema";

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // This could be different based on your email provider
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER || "",
    pass: process.env.EMAIL_PASSWORD || "",
  },
});

// Basic email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

/**
 * Send an email using Nodemailer
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  const { to, subject, html, from = "SynergyAI Automations <noreply@synergyai-automations.com>" } = options;

  if (!isValidEmail(to)) {
    console.error(`Invalid recipient email address: ${to}`);
    return false;
  }

  try {
    await transporter.sendMail({
      from,
      to,
      subject,
      html,
    });
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}

/**
 * Send a notification email when a new contact message is received
 */
export async function sendContactNotification(message: Message): Promise<boolean> {
  const adminEmail = "contact@synergyai-automations.com";
  
  const htmlContent = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${message.name}</p>
    <p><strong>Email:</strong> ${message.email}</p>
    <p><strong>Message:</strong></p>
    <div style="border-left: 2px solid #ccc; padding-left: 10px; margin: 10px 0;">
      ${message.message.replace(/\n/g, '<br>')}
    </div>
    <p style="margin-top: 20px; font-size: 12px; color: #777;">
      This email was sent from the contact form on your website.
    </p>
  `;

  return sendEmail({
    to: adminEmail,
    subject: `New Contact Form Submission: ${message.name}`,
    html: htmlContent,
  });
}

/**
 * Send a notification email when a new subscriber signs up
 */
export async function sendSubscriberNotification(subscriber: Subscriber): Promise<boolean> {
  const adminEmail = "contact@synergyai-automations.com";
  
  const htmlContent = `
    <h2>New Newsletter Subscriber</h2>
    <p><strong>Email:</strong> ${subscriber.email}</p>
    <p style="margin-top: 20px; font-size: 12px; color: #777;">
      This email was sent automatically when a new user subscribed to your newsletter.
    </p>
  `;

  return sendEmail({
    to: adminEmail,
    subject: `New Newsletter Subscription`,
    html: htmlContent,
  });
}

/**
 * Send a welcome email to new subscribers
 */
export async function sendWelcomeEmail(subscriber: Subscriber): Promise<boolean> {
  const htmlContent = `
    <h2>Welcome to SynergyAI Automations Newsletter!</h2>
    <p>Thank you for subscribing to our newsletter. You'll now receive the latest updates on:</p>
    <ul>
      <li>AI Technology Trends</li>
      <li>Marketing Automation Tips</li>
      <li>Business Growth Strategies</li>
      <li>Exclusive Offers and Events</li>
    </ul>
    <p>If you ever want to unsubscribe, simply click the unsubscribe link in any of our emails.</p>
    <p>Best Regards,</p>
    <p>The SynergyAI Automations Team</p>
  `;

  return sendEmail({
    to: subscriber.email,
    subject: `Welcome to SynergyAI Automations Newsletter`,
    html: htmlContent,
  });
}