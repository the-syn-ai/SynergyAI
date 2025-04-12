import type { VercelRequest, VercelResponse } from '@vercel/node';
import { DatabaseStorage } from '../../shared/storage';

/**
 * Vercel serverless function for GET /api/posts/:slug
 * Returns a post by slug.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const { slug } = req.query;

  if (!slug || typeof slug !== 'string') {
    res.status(400).json({ error: 'Post slug is required' });
    return;
  }

  const storage = new DatabaseStorage();
  try {
    const post = await storage.getPostBySlug(slug);
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }
    res.status(200).json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
}