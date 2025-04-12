import type { VercelRequest, VercelResponse } from '@vercel/node';
import stripeService from '../../../shared/stripeService';

/**
 * Vercel serverless function for GET /api/payment/session/:sessionId
 * Retrieves a Stripe checkout session.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const { sessionId } = req.query;

  if (!sessionId || typeof sessionId !== 'string') {
    res.status(400).json({ error: 'Session ID is required' });
    return;
  }

  try {
    const session = await stripeService.getCheckoutSession(sessionId);
    res.status(200).json(session);
  } catch (error) {
    console.error('Error retrieving session:', error);
    res.status(500).json({ error: 'Failed to retrieve session' });
  }
}