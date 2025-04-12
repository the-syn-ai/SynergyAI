import type { VercelRequest, VercelResponse } from '@vercel/node';
import stripeService, { ServiceTier } from '../../shared/stripeService';

/**
 * Vercel serverless function for POST /api/payment/create-checkout
 * Creates a Stripe checkout session.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  try {
    const { tier, email } = req.body ?? {};

    if (!tier) {
      res.status(400).json({ error: 'Service tier is required' });
      return;
    }

    let customerId;
    if (email) {
      const customer = await stripeService.createCustomer(email);
      customerId = customer.id;
    }

    const session = await stripeService.createCheckoutSession(tier as ServiceTier, customerId);
    res.status(200).json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
}