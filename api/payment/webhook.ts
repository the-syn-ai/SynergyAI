import type { VercelRequest, VercelResponse } from '@vercel/node';
import stripeService from '../../shared/stripeService';

/**
 * Vercel serverless function for POST /api/payment/webhook
 * Handles Stripe webhook events.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const signature = req.headers['stripe-signature'] as string;
  if (!signature) {
    res.status(400).json({ error: 'Stripe signature header is missing' });
    return;
  }

  try {
    // Note: In Vercel, you may need to use a custom body parser to get the raw body for signature validation.
    const event = stripeService.validateWebhookSignature(req.body, signature);

    switch (event.type) {
      case 'checkout.session.completed':
        console.log('Checkout session completed:', event.data.object);
        break;
      case 'payment_intent.succeeded':
        console.log('Payment intent succeeded:', event.data.object);
        break;
      case 'payment_intent.payment_failed':
        console.log('Payment failed:', event.data.object);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).json({ error: 'Webhook signature verification failed' });
  }
}