import { 
  companyWebsites, 
  websiteAnalysis, 
  userQueries,
  historicalAnalysis,
  competitors,
  competitorAnalysis,
  seoKeywords,
  pageSpeedInsights,
  securityVulnerabilities,
  analysisPreferences,
  scheduledMonitoring,
  contentSuggestions
} from "@shared/schema";

import type { 
  CompanyWebsite, 
  WebsiteAnalysis, 
  UserQuery,
  HistoricalAnalysis,
  Competitor,
  CompetitorAnalysis,
  SeoKeyword,
  PageSpeedInsight,
  SecurityVulnerability,
  AnalysisPreference,
  ScheduledMonitoring,
  ContentSuggestion
} from "@shared/schema";

import type { 
  InsertCompanyWebsite, 
  InsertWebsiteAnalysis, 
  InsertUserQuery,
  InsertHistoricalAnalysis,
  InsertCompetitor,
  InsertCompetitorAnalysis,
  InsertSeoKeyword,
  InsertPageSpeedInsight,
  InsertSecurityVulnerability,
  InsertAnalysisPreference,
  InsertScheduledMonitoring,
  InsertContentSuggestion
} from "@shared/schema";

import { db } from "./db";
import { eq, desc, and, or, asc } from "drizzle-orm";
import { users, type User, type InsertUser } from "@shared/schema";
import { posts, type Post, type InsertPost, messages, type Message, type InsertMessage, subscribers, type Subscriber, type InsertSubscriber } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getPosts(): Promise<Post[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;

  // Company Website Analysis methods
  createCompanyWebsite(website: InsertCompanyWebsite): Promise<CompanyWebsite>;
  getCompanyWebsite(id: number): Promise<CompanyWebsite | undefined>;
  getCompanyWebsiteByUrl(url: string): Promise<CompanyWebsite | undefined>;

  // Analysis methods
  createWebsiteAnalysis(analysis: InsertWebsiteAnalysis): Promise<WebsiteAnalysis>;
  getWebsiteAnalyses(websiteId: number): Promise<WebsiteAnalysis[]>;

  // User Query methods
  createUserQuery(query: InsertUserQuery): Promise<UserQuery>;
  getUserQueries(websiteId: number): Promise<UserQuery[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [result] = await db.select().from(users).where(eq(users.id, id));
    return result;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [result] = await db.select().from(users).where(eq(users.username, username));
    return result;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [result] = await db.insert(users).values(insertUser).returning();
    return result;
  }

  async getPosts(): Promise<Post[]> {
    return db.select().from(posts);
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const [result] = await db.insert(messages).values(message).returning();
    return result;
  }

  async createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber> {
    const [result] = await db.insert(subscribers).values(subscriber).returning();
    return result;
  }

  // Company Website methods
  async createCompanyWebsite(website: InsertCompanyWebsite): Promise<CompanyWebsite> {
    const [result] = await db.insert(companyWebsites).values(website).returning();
    return result;
  }

  async getCompanyWebsite(id: number): Promise<CompanyWebsite | undefined> {
    const [result] = await db.select().from(companyWebsites).where(eq(companyWebsites.id, id));
    return result;
  }

  async getCompanyWebsiteByUrl(url: string): Promise<CompanyWebsite | undefined> {
    const [result] = await db.select().from(companyWebsites).where(eq(companyWebsites.url, url));
    return result;
  }

  // Analysis methods
  async createWebsiteAnalysis(analysis: InsertWebsiteAnalysis): Promise<WebsiteAnalysis> {
    const [result] = await db.insert(websiteAnalysis).values(analysis).returning();
    return result;
  }

  async getWebsiteAnalyses(websiteId: number): Promise<WebsiteAnalysis[]> {
    return db.select().from(websiteAnalysis).where(eq(websiteAnalysis.websiteId, websiteId));
  }

  // User Query methods
  async createUserQuery(query: InsertUserQuery): Promise<UserQuery> {
    const [result] = await db.insert(userQueries).values(query).returning();
    return result;
  }

  async getUserQueries(websiteId: number): Promise<UserQuery[]> {
    return db.select().from(userQueries).where(eq(userQueries.websiteId, websiteId));
  }
}

export const storage = new DatabaseStorage();