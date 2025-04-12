import type { VercelRequest, VercelResponse } from '@vercel/node';
import stripeService from '../../shared/stripeService';

/**
 * Vercel serverless function for GET /api/payment/plans
 * Returns available service tiers.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }
  res.status(200).json(stripeService.serviceTiers);
}