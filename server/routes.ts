import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertMessageSchema, insertSubscriberSchema } from "@shared/schema";
import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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

  app.post("/api/analyze-sentiment", async (req, res) => {
    try {
      const { text } = req.body;

      if (!text) {
        return res.status(400).json({ error: "Text is required" });
      }

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a sentiment analysis expert. Analyze the sentiment of the text and provide a response that indicates if it's positive, negative, or neutral. Keep the response concise and include an appropriate emoji."
          },
          {
            role: "user",
            content: text
          }
        ],
        max_tokens: 100
      });

      const analysis = response.choices[0].message.content;
      res.json({ analysis });
    } catch (error) {
      console.error('OpenAI API Error:', error);
      res.status(500).json({ error: "Failed to analyze sentiment" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}