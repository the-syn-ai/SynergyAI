import type { VercelRequest, VercelResponse } from '@vercel/node';
import { DatabaseStorage } from '../../shared/storage';

/**
 * Vercel serverless function for GET /api/post-categories/:slug
 * Returns a post category by slug.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const { slug } = req.query;

  if (!slug || typeof slug !== 'string') {
    res.status(400).json({ error: 'Category slug is required' });
    return;
  }

  const storage = new DatabaseStorage();
  try {
    const category = await storage.getPostCategoryBySlug(slug);
    if (!category) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }
    res.status(200).json(category);
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ error: 'Failed to fetch category' });
  }
}