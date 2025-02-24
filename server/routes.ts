import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertMessageSchema, insertSubscriberSchema, insertCompanyWebsiteSchema, insertWebsiteAnalysisSchema, insertUserQuerySchema } from "@shared/schema";
import OpenAI from "openai";
import fetch from 'node-fetch';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Language-specific system prompts
const systemPrompts = {
  en: {
    sentiment: "You are a sentiment analysis expert. Analyze the sentiment of the text and provide a response that indicates if it's positive, negative, or neutral. Keep the response concise and include an appropriate emoji.",
    chat: "You are a helpful AI assistant. Use the provided context to answer questions about the company. If you don't find relevant information in the context, say so politely. Keep responses professional and accurate.",
    vision: "Analyze this image and describe what you see. Focus on key elements and any relevant business context.",
    website: "You are a website analysis expert. Analyze the provided website content and provide insights about the company's online presence, marketing strategy, and potential improvements."
  },
  es: {
    sentiment: "Eres un experto en análisis de sentimientos. Analiza el sentimiento del texto y proporciona una respuesta que indique si es positivo, negativo o neutral. Mantén la respuesta concisa e incluye un emoji apropiado.",
    chat: "Eres un asistente de IA útil. Utiliza el contexto proporcionado para responder preguntas sobre la empresa. Si no encuentras información relevante en el contexto, dilo educadamente. Mantén las respuestas profesionales y precisas.",
    vision: "Analiza esta imagen y describe lo que ves. Concéntrate en los elementos clave y cualquier contexto empresarial relevante.",
    website: "Eres un experto en análisis de sitios web. Analiza el contenido del sitio web proporcionado y brinda información sobre la presencia en línea de la empresa, la estrategia de marketing y las posibles mejoras."
  }
};

// Type definition for the prompt types
type PromptType = 'sentiment' | 'chat' | 'vision' | 'website';

const getSystemPrompt = (type: PromptType, language: string) => {
  const languagePrompts = systemPrompts[language as keyof typeof systemPrompts] || systemPrompts.en;
  return languagePrompts[type];
};

// Type definition for analysis results
interface AnalysisResult {
  content: string;
  timestamp: string;
}

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

  // New routes for website analysis
  app.post("/api/websites", async (req, res) => {
    const result = insertCompanyWebsiteSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: "Invalid website data" });
    }

    try {
      const existingWebsite = await storage.getCompanyWebsiteByUrl(result.data.url);
      if (existingWebsite) {
        return res.json(existingWebsite);
      }

      const website = await storage.createCompanyWebsite({
        ...result.data,
        status: 'pending'
      });
      res.json(website);
    } catch (error) {
      console.error('Error creating website:', error);
      res.status(500).json({ error: "Failed to create website entry" });
    }
  });

  app.get("/api/websites/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid website ID" });
    }

    try {
      const website = await storage.getCompanyWebsite(id);
      if (!website) {
        return res.status(404).json({ error: "Website not found" });
      }
      res.json(website);
    } catch (error) {
      console.error('Error fetching website:', error);
      res.status(500).json({ error: "Failed to fetch website" });
    }
  });

  app.get("/api/websites/:id/analysis", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid website ID" });
    }

    try {
      const analyses = await storage.getWebsiteAnalyses(id);
      res.json(analyses);
    } catch (error) {
      console.error('Error fetching analyses:', error);
      res.status(500).json({ error: "Failed to fetch website analyses" });
    }
  });

  app.post("/api/websites/:id/analyze", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid website ID" });
    }

    try {
      const website = await storage.getCompanyWebsite(id);
      if (!website) {
        return res.status(404).json({ error: "Website not found" });
      }

      const { type = 'general', language = 'en' } = req.body;

      // Call OpenAI API to analyze the website
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: getSystemPrompt('website', language)
          },
          {
            role: "user",
            content: `Analyze this website: ${website.url}\nFocus on: ${type}`
          }
        ],
        max_tokens: 500
      });

      const analysis = await storage.createWebsiteAnalysis({
        websiteId: id,
        analysisType: type,
        results: {
          content: response.choices[0].message.content || '',
          timestamp: new Date().toISOString()
        } as AnalysisResult,
        confidence: 85
      });

      res.json(analysis);
    } catch (error) {
      console.error('Error analyzing website:', error);
      res.status(500).json({ error: "Failed to analyze website" });
    }
  });

  app.post("/api/websites/:id/query", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid website ID" });
    }

    const { query, language = 'en' } = req.body;
    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    try {
      const website = await storage.getCompanyWebsite(id);
      if (!website) {
        return res.status(404).json({ error: "Website not found" });
      }

      // Fetch existing analyses for context
      const analyses = await storage.getWebsiteAnalyses(id);
      const context = analyses.map(analysis => analysis.results.content).join('\n\n');

      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: getSystemPrompt('chat', language)
          },
          {
            role: "user",
            content: `Website: ${website.url}\n\nContext:\n${context}\n\nQuestion: ${query}`
          }
        ],
        max_tokens: 150
      });

      const userQuery = await storage.createUserQuery({
        websiteId: id,
        query,
        response: response.choices[0].message.content,
        context: { analyses: analyses.map(a => a.id) }
      });

      res.json(userQuery);
    } catch (error) {
      console.error('Error processing query:', error);
      res.status(500).json({ error: "Failed to process query" });
    }
  });

  app.post("/api/analyze-sentiment", async (req, res) => {
    try {
      const { text, language = 'en' } = req.body;

      if (!text) {
        return res.status(400).json({ error: "Text is required" });
      }

      const response = await openai.chat.completions.create({
        model: "gpt-4",
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
      const { message, context = [], language = 'en' } = req.body;

      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      // Format context for the prompt
      const contextText = context.length > 0
        ? "\n\nRelevant company information:\n" + context.map((item: any) => item.content).join("\n")
        : "";

      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: getSystemPrompt('chat', language)
          },
          {
            role: "user",
            content: message + contextText
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
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: getSystemPrompt('vision', language) },
              {
                type: "image_url",
                image_url: {
                  url: image
                }
              }
            ]
          }
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

  // New route to handle n8n webhook forwarding
  app.get("/api/forward-to-n8n", async (req, res) => {
    try {
      const { url } = req.query;
      if (!url || typeof url !== 'string') {
        return res.status(400).json({ error: "URL is required" });
      }

      // Log incoming request details
      console.log('Incoming request headers:', req.headers);
      console.log('Incoming request URL:', url);

      // Format the webhook URL
      const webhookUrl = "https://primary-production-b5ce.up.railway.app/webhook/cbdec436-47ce-4e4f-bcbe-5fa1081c62e4";
      const fullUrl = `${webhookUrl}?url=${encodeURIComponent(url)}`;

      console.log('Forwarding request to:', fullUrl);
      console.log('With headers:', {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      });

      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('N8n webhook error:', errorText);
        return res.status(response.status).json({ error: errorText });
      }

      const data = await response.json();
      console.log('N8n response:', data);
      res.json(data);
    } catch (error) {
      console.error('Error forwarding to n8n:', error);
      res.status(500).json({ error: "Failed to forward request to n8n" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}