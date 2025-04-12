import type { VercelRequest, VercelResponse } from '@vercel/node';
import { insertMessageSchema } from '../shared/schema';
import { DatabaseStorage } from '../shared/storage';
import { sendContactNotification } from '../shared/emailService';

/**
 * Vercel serverless function for POST /api/contact
 * Handles contact form submissions.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const result = insertMessageSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: 'Invalid message data' });
    return;
  }

  const storage = new DatabaseStorage();
  try {
    // Save the message to the database
    const message = await storage.createMessage(result.data);

    // Send email notification
    await sendContactNotification(message);

    res.status(200).json(message);
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ error: 'Failed to process your message. Please try again.' });
  }
}