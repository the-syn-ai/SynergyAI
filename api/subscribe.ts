import type { VercelRequest, VercelResponse } from '@vercel/node';
import { insertSubscriberSchema } from '../shared/schema';
import { DatabaseStorage } from '../shared/storage';
import { sendSubscriberNotification, sendWelcomeEmail } from '../shared/emailService';

/**
 * Vercel serverless function for POST /api/subscribe
 * Handles newsletter subscriptions.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const result = insertSubscriberSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: 'Invalid subscriber data' });
    return;
  }

  const storage = new DatabaseStorage();
  try {
    // Save subscriber to database
    const subscriber = await storage.createSubscriber(result.data);

    // Send notification
    await sendSubscriberNotification(subscriber);

    // Send welcome email
    await sendWelcomeEmail(subscriber);

    res.status(200).json(subscriber);
  } catch (error) {
    console.error('Error processing subscription:', error);
    res.status(500).json({ error: 'Failed to process your subscription. Please try again.' });
  }
}