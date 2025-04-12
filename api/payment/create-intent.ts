import type { VercelRequest, VercelResponse } from '@vercel/node';
import stripeService from '../../shared/stripeService';

/**
 * Vercel serverless function for POST /api/payment/create-intent
 * Creates a Stripe payment intent.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  try {
    const { amount, email } = req.body ?? {};

    if (!amount || typeof amount !== 'number') {
      res.status(400).json({ error: 'Valid amount is required' });
      return;
    }

    let customerId;
    if (email) {
      const customer = await stripeService.createCustomer(email);
      customerId = customer.id;
    }

    const paymentIntent = await stripeService.createPaymentIntent(amount, 'usd', customerId);
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      intentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
}