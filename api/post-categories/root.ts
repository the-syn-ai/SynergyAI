import type { VercelRequest, VercelResponse } from '@vercel/node';
import { DatabaseStorage } from '../../shared/storage';

/**
 * Vercel serverless function for GET /api/post-categories/root
 * Returns root post categories.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const storage = new DatabaseStorage();
  try {
    const rootCategories = await storage.getRootPostCategories();
    res.status(200).json(rootCategories);
  } catch (error) {
    console.error('Error fetching root post categories:', error);
    res.status(500).json({ error: 'Failed to fetch root post categories' });
  }
}