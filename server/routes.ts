import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertMessageSchema, insertSubscriberSchema } from "@shared/schema";

export async function registerRoutes(app: Express) {
  app.get("/api/posts", async (_req, res) => {
    const posts = await storage.getPosts();
    res.json(posts);
  });

  app.post("/api/contact", async (req, res) => {
    const result = insertMessageSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: "Invalid message data" });
    }
    
    const message = await storage.createMessage(result.data);
    res.json(message);
  });

  app.post("/api/subscribe", async (req, res) => {
    const result = insertSubscriberSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: "Invalid subscriber data" });
    }

    const subscriber = await storage.createSubscriber(result.data);
    res.json(subscriber);
  });

  const httpServer = createServer(app);
  return httpServer;
}
