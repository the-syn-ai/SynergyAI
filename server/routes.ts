import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertMessageSchema, insertSubscriberSchema } from "@shared/schema";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Language-specific system prompts
const systemPrompts = {
  en: {
    sentiment: "You are a sentiment analysis expert. Analyze the sentiment of the text and provide a response that indicates if it's positive, negative, or neutral. Keep the response concise and include an appropriate emoji.",
    chat: "You are a helpful AI assistant for a business automation company. Provide concise, professional responses focused on helping clients understand our services and capabilities.",
    vision: "Analyze this image and describe what you see. Focus on key elements and any relevant business context."
  },
  es: {
    sentiment: "Eres un experto en análisis de sentimientos. Analiza el sentimiento del texto y proporciona una respuesta que indique si es positivo, negativo o neutral. Mantén la respuesta concisa e incluye un emoji apropiado.",
    chat: "Eres un asistente de IA útil para una empresa de automatización empresarial. Proporciona respuestas concisas y profesionales centradas en ayudar a los clientes a comprender nuestros servicios y capacidades.",
    vision: "Analiza esta imagen y describe lo que ves. Concéntrate en los elementos clave y cualquier contexto empresarial relevante."
  },
  // Add other languages as needed
};

const getSystemPrompt = (type: 'sentiment' | 'chat' | 'vision', language: string) => {
  const languagePrompts = systemPrompts[language as keyof typeof systemPrompts] || systemPrompts.en;
  return languagePrompts[type];
};

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
      const { text, language = 'en' } = req.body;

      if (!text) {
        return res.status(400).json({ error: "Text is required" });
      }

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: getSystemPrompt('sentiment', language)
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

  app.post("/api/chat", async (req, res) => {
    try {
      const { message, language = 'en' } = req.body;

      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: getSystemPrompt('chat', language)
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 150
      });

      const reply = response.choices[0].message.content;
      res.json({ reply });
    } catch (error) {
      console.error('OpenAI API Error:', error);
      res.status(500).json({ error: "Failed to process chat message" });
    }
  });

  app.post("/api/analyze-image", async (req, res) => {
    try {
      const { image, language = 'en' } = req.body;

      if (!image) {
        return res.status(400).json({ error: "Image URL is required" });
      }

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: getSystemPrompt('vision', language)
              },
              {
                type: "image_url",
                image_url: {
                  url: image
                }
              }
            ],
          },
        ],
        max_tokens: 150
      });

      const analysis = response.choices[0].message.content;
      res.json({ analysis });
    } catch (error) {
      console.error('OpenAI API Error:', error);
      res.status(500).json({ error: "Failed to analyze image" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}