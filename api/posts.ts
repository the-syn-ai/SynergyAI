import type { VercelRequest, VercelResponse } from '@vercel/node';
import { DatabaseStorage } from '../shared/storage';

/**
 * Vercel serverless function for GET /api/posts
 * Returns all posts, optionally filtered by categoryId.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const storage = new DatabaseStorage();
  try {
    const categoryId = req.query.categoryId ? Number(req.query.categoryId) : undefined;
    let posts;
    if (categoryId) {
      posts = await storage.getPostsByCategory(categoryId);
    } else {
      posts = await storage.getPosts();
    }
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
}