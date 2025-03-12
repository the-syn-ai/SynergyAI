import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { 
  insertMessageSchema, 
  insertSubscriberSchema, 
  insertCompanyWebsiteSchema, 
  insertWebsiteAnalysisSchema, 
  insertUserQuerySchema,
  insertHistoricalAnalysisSchema,
  insertCompetitorSchema,
  insertCompetitorAnalysisSchema,
  insertSeoKeywordSchema,
  insertPageSpeedInsightSchema,
  insertSecurityVulnerabilitySchema,
  insertAnalysisPreferenceSchema,
  insertScheduledMonitoringSchema,
  insertContentSuggestionSchema
} from "@shared/schema";
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
  // Blog and Post Category endpoints
  app.get("/api/posts", async (req, res) => {
    const categoryId = req.query.categoryId ? Number(req.query.categoryId) : undefined;
    
    let posts;
    if (categoryId) {
      posts = await storage.getPostsByCategory(categoryId);
    } else {
      posts = await storage.getPosts();
    }
    
    res.json(posts);
  });
  
  app.get("/api/posts/:slug", async (req, res) => {
    const post = await storage.getPostBySlug(req.params.slug);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  });
  
  app.get("/api/post-categories", async (_req, res) => {
    const categories = await storage.getPostCategories();
    res.json(categories);
  });
  
  app.get("/api/post-categories/root", async (_req, res) => {
    const rootCategories = await storage.getRootPostCategories();
    res.json(rootCategories);
  });
  
  app.get("/api/post-categories/:slug", async (req, res) => {
    const category = await storage.getPostCategoryBySlug(req.params.slug);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(category);
  });
  
  // Admin endpoint to seed initial post categories
  app.post("/api/seed/categories", async (_req, res) => {
    try {
      // Categories based on main services offered by the company
      const serviceCategories = [
        {
          name: "GHL Integration",
          description: "Insights and guides on GoHighLevel platform integration and setup.",
          slug: "ghl-integration",
          parentId: null
        },
        {
          name: "Web Design",
          description: "Professional web design tips, trends, and best practices.",
          slug: "web-design",
          parentId: null
        },
        {
          name: "CRM Solutions",
          description: "Custom CRM development, automation, and integration guides.",
          slug: "crm-solutions",
          parentId: null
        },
        {
          name: "Email Automation",
          description: "Email marketing automation strategies and implementation guides.",
          slug: "email-automation",
          parentId: null
        },
        {
          name: "AI Technology",
          description: "Insights on AI call bots, review management, and other AI solutions.",
          slug: "ai-technology",
          parentId: null
        }
      ];
      
      const createdCategories = [];
      
      // Insert main categories first
      for (const category of serviceCategories) {
        try {
          const existing = await storage.getPostCategoryBySlug(category.slug);
          
          if (!existing) {
            const newCategory = await storage.createPostCategory(category);
            createdCategories.push(newCategory);
          }
        } catch (error) {
          console.error(`Error processing category ${category.name}:`, error);
        }
      }
      
      // Get all categories to use their IDs for subcategories
      const allCategories = await storage.getPostCategories();
      
      // Create a map of slugs to IDs for easy lookup
      const categoryMap = allCategories.reduce((acc, cat) => {
        acc[cat.slug] = cat.id;
        return acc;
      }, {} as Record<string, number>);
      
      // Subcategories with their parent slugs
      const subCategories = [
        {
          name: "Workflow Automation",
          description: "Automating business processes with custom workflows.",
          slug: "workflow-automation",
          parentSlug: "ghl-integration"
        },
        {
          name: "Sales Funnel Creation",
          description: "Building effective sales funnels that convert.",
          slug: "sales-funnel-creation",
          parentSlug: "ghl-integration"
        },
        {
          name: "Responsive Design",
          description: "Creating websites that work on all devices and screen sizes.",
          slug: "responsive-design",
          parentSlug: "web-design"
        },
        {
          name: "SEO Optimization",
          description: "Strategies to improve search engine visibility and rankings.",
          slug: "seo-optimization",
          parentSlug: "web-design"
        },
        {
          name: "Lead Management",
          description: "Tools and techniques for effective lead tracking and management.",
          slug: "lead-management",
          parentSlug: "crm-solutions"
        },
        {
          name: "Campaign Creation",
          description: "Building effective email marketing campaigns.",
          slug: "campaign-creation",
          parentSlug: "email-automation"
        },
        {
          name: "AI Call Bots",
          description: "Using AI for intelligent call handling and customer service.",
          slug: "ai-call-bots",
          parentSlug: "ai-technology"
        },
        {
          name: "Review Management",
          description: "AI-powered review collection and response systems.",
          slug: "review-management",
          parentSlug: "ai-technology"
        }
      ];
      
      // Insert subcategories
      for (const subCategory of subCategories) {
        try {
          const existing = await storage.getPostCategoryBySlug(subCategory.slug);
          
          if (!existing) {
            const parentId = categoryMap[subCategory.parentSlug];
            if (parentId) {
              const newSubCategory = await storage.createPostCategory({
                name: subCategory.name,
                description: subCategory.description,
                slug: subCategory.slug,
                parentId
              });
              createdCategories.push(newSubCategory);
            }
          }
        } catch (error) {
          console.error(`Error processing subcategory ${subCategory.name}:`, error);
        }
      }
      
      res.json({ 
        message: "Categories seeded successfully", 
        created: createdCategories.length,
        categories: createdCategories
      });
    } catch (error) {
      console.error("Error seeding categories:", error);
      res.status(500).json({ error: "Failed to seed categories" });
    }
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
      const context = analyses.map(analysis => {
        const results = analysis.results as AnalysisResult;
        return results.content;
      }).join('\n\n');

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

  // Historical Analysis Endpoints
  app.get("/api/websites/:id/historical", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid website ID" });
    }

    try {
      const website = await storage.getCompanyWebsite(id);
      if (!website) {
        return res.status(404).json({ error: "Website not found" });
      }

      const analyses = await storage.getHistoricalAnalyses(id);
      res.json(analyses);
    } catch (error) {
      console.error('Error fetching historical analyses:', error);
      res.status(500).json({ error: "Failed to fetch historical analyses" });
    }
  });

  app.get("/api/websites/:id/historical/latest", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid website ID" });
    }

    try {
      const website = await storage.getCompanyWebsite(id);
      if (!website) {
        return res.status(404).json({ error: "Website not found" });
      }

      const analysis = await storage.getLatestHistoricalAnalysis(id);
      if (!analysis) {
        return res.status(404).json({ error: "No historical analysis found" });
      }

      res.json(analysis);
    } catch (error) {
      console.error('Error fetching latest historical analysis:', error);
      res.status(500).json({ error: "Failed to fetch latest historical analysis" });
    }
  });

  app.post("/api/websites/:id/historical", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid website ID" });
    }

    const result = insertHistoricalAnalysisSchema.safeParse({
      ...req.body,
      websiteId: id
    });

    if (!result.success) {
      return res.status(400).json({ error: "Invalid historical analysis data" });
    }

    try {
      const website = await storage.getCompanyWebsite(id);
      if (!website) {
        return res.status(404).json({ error: "Website not found" });
      }

      // Get existing analyses to calculate the change from previous
      const latestAnalysis = await storage.getLatestHistoricalAnalysis(id);
      let changeFromPrevious = null;

      if (latestAnalysis) {
        const current = {
          performanceScore: result.data.performanceScore,
          seoScore: result.data.seoScore,
          accessibilityScore: result.data.accessibilityScore,
          securityScore: result.data.securityScore,
          overallScore: result.data.overallScore
        };

        const previous = {
          performanceScore: latestAnalysis.performanceScore,
          seoScore: latestAnalysis.seoScore,
          accessibilityScore: latestAnalysis.accessibilityScore,
          securityScore: latestAnalysis.securityScore,
          overallScore: latestAnalysis.overallScore
        };

        // Calculate changes and create a delta object
        changeFromPrevious = {
          performanceScoreDelta: (current.performanceScore || 0) - (previous.performanceScore || 0),
          seoScoreDelta: (current.seoScore || 0) - (previous.seoScore || 0),
          accessibilityScoreDelta: (current.accessibilityScore || 0) - (previous.accessibilityScore || 0),
          securityScoreDelta: (current.securityScore || 0) - (previous.securityScore || 0),
          overallScoreDelta: (current.overallScore || 0) - (previous.overallScore || 0),
          snapshotDate: latestAnalysis.snapshotDate
        };
      }

      // Use AI to generate insights based on the changes
      let insights = "";
      if (changeFromPrevious) {
        try {
          const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
              {
                role: "system",
                content: "You are a website analytics expert. Provide concise insights based on changes in website performance metrics. Focus on explaining improvements or declines and suggesting actionable next steps."
              },
              {
                role: "user",
                content: `Generate insights for website ${website.url} based on these score changes:
                Performance: ${changeFromPrevious.performanceScoreDelta > 0 ? '+' : ''}${changeFromPrevious.performanceScoreDelta}
                SEO: ${changeFromPrevious.seoScoreDelta > 0 ? '+' : ''}${changeFromPrevious.seoScoreDelta}
                Accessibility: ${changeFromPrevious.accessibilityScoreDelta > 0 ? '+' : ''}${changeFromPrevious.accessibilityScoreDelta}
                Security: ${changeFromPrevious.securityScoreDelta > 0 ? '+' : ''}${changeFromPrevious.securityScoreDelta}
                Overall: ${changeFromPrevious.overallScoreDelta > 0 ? '+' : ''}${changeFromPrevious.overallScoreDelta}`
              }
            ],
            max_tokens: 200
          });
          
          insights = response.choices[0].message.content || "";
        } catch (error) {
          console.error('Error generating insights:', error);
          insights = "Unable to generate insights for these changes.";
        }
      } else {
        insights = "This is the first snapshot for this website. Future snapshots will show changes over time.";
      }

      const analysis = await storage.createHistoricalAnalysis({
        ...result.data,
        changeFromPrevious,
        insights,
        websiteId: id
      });

      res.json(analysis);
    } catch (error) {
      console.error('Error creating historical analysis:', error);
      res.status(500).json({ error: "Failed to create historical analysis" });
    }
  });

  // Competitor Analysis Endpoints
  app.get("/api/websites/:id/competitors", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid website ID" });
    }

    try {
      const website = await storage.getCompanyWebsite(id);
      if (!website) {
        return res.status(404).json({ error: "Website not found" });
      }

      const competitors = await storage.getCompetitors(id);
      res.json(competitors);
    } catch (error) {
      console.error('Error fetching competitors:', error);
      res.status(500).json({ error: "Failed to fetch competitors" });
    }
  });

  // New route to handle n8n webhook forwarding
  app.get("/api/forward-to-n8n", async (req, res) => {
    try {
      const { url } = req.query;
      if (!url || typeof url !== 'string') {
        return res.status(400).json({ error: "URL is required" });
      }

      const webhookUrl = "https://primary-production-b5ce.up.railway.app/webhook/cbdec436-47ce-4e4f-bcbe-5fa1081c62e4";
      const fullUrl = `${webhookUrl}?url=${encodeURIComponent(url)}`;

      console.log('=== Outgoing Request Details ===');
      console.log('URL:', fullUrl);

      // Using the exact headers that worked in curl
      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
          'User-Agent': 'curl/8.11.1',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Host': 'primary-production-b5ce.up.railway.app'
        }
      });

      // Log response details
      console.log('=== Response Details ===');
      console.log('Status:', response.status);
      console.log('Headers:', Object.fromEntries(response.headers.entries()));

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