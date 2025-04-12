import type { VercelRequest, VercelResponse } from '@vercel/node';
import { DatabaseStorage } from '../shared/storage';

/**
 * Vercel serverless function for GET /api/post-categories
 * Returns all post categories.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const storage = new DatabaseStorage();
  try {
    const categories = await storage.getPostCategories();
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching post categories:', error);
    res.status(500).json({ error: 'Failed to fetch post categories' });
  }
}