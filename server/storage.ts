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
  contentSuggestions,
  postCategories
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
  ContentSuggestion,
  PostCategory
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
  InsertContentSuggestion,
  InsertPostCategory
} from "@shared/schema";

import { db } from "./db";
import { eq, desc, and, or, asc, isNull } from "drizzle-orm";
import { users, type User, type InsertUser } from "@shared/schema";
import { posts, type Post, type InsertPost, messages, type Message, type InsertMessage, subscribers, type Subscriber, type InsertSubscriber } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Blog and content methods
  getPosts(): Promise<Post[]>;
  getPostsByCategory(categoryId: number): Promise<Post[]>;
  getPostBySlug(slug: string): Promise<Post | undefined>;
  createPost(post: InsertPost): Promise<Post>;
  getPostCategories(): Promise<PostCategory[]>;
  getRootPostCategories(): Promise<PostCategory[]>;
  getPostCategoryBySlug(slug: string): Promise<PostCategory | undefined>;
  getPostCategory(id: number): Promise<PostCategory | undefined>;
  createPostCategory(category: InsertPostCategory): Promise<PostCategory>;
  
  // Contact and newsletter methods
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

  // Historical Analysis methods
  createHistoricalAnalysis(analysis: InsertHistoricalAnalysis): Promise<HistoricalAnalysis>;
  getHistoricalAnalyses(websiteId: number): Promise<HistoricalAnalysis[]>;
  getLatestHistoricalAnalysis(websiteId: number): Promise<HistoricalAnalysis | undefined>;
  
  // Competitor Analysis methods
  createCompetitor(competitor: InsertCompetitor): Promise<Competitor>;
  getCompetitors(primaryWebsiteId: number): Promise<Competitor[]>;
  getCompetitorByUrl(primaryWebsiteId: number, competitorUrl: string): Promise<Competitor | undefined>;
  createCompetitorAnalysis(analysis: InsertCompetitorAnalysis): Promise<CompetitorAnalysis>;
  getCompetitorAnalyses(competitorId: number): Promise<CompetitorAnalysis[]>;
  
  // SEO Keywords methods
  createSeoKeyword(keyword: InsertSeoKeyword): Promise<SeoKeyword>;
  getSeoKeywords(websiteId: number): Promise<SeoKeyword[]>;
  
  // Page Speed Insights methods
  createPageSpeedInsight(insight: InsertPageSpeedInsight): Promise<PageSpeedInsight>;
  getPageSpeedInsights(websiteId: number): Promise<PageSpeedInsight[]>;
  getPageSpeedInsightByUrl(websiteId: number, pageUrl: string): Promise<PageSpeedInsight | undefined>;
  
  // Security Vulnerability methods
  createSecurityVulnerability(vulnerability: InsertSecurityVulnerability): Promise<SecurityVulnerability>;
  getSecurityVulnerabilities(websiteId: number): Promise<SecurityVulnerability[]>;
  
  // Analysis Preferences methods
  createAnalysisPreference(preference: InsertAnalysisPreference): Promise<AnalysisPreference>;
  getAnalysisPreference(websiteId: number): Promise<AnalysisPreference | undefined>;
  
  // Scheduled Monitoring methods
  createScheduledMonitoring(monitoring: InsertScheduledMonitoring): Promise<ScheduledMonitoring>;
  getScheduledMonitoring(websiteId: number): Promise<ScheduledMonitoring | undefined>;
  updateScheduledMonitoring(id: number, lastRun: Date): Promise<ScheduledMonitoring>;
  
  // Content Suggestions methods
  createContentSuggestion(suggestion: InsertContentSuggestion): Promise<ContentSuggestion>;
  getContentSuggestions(websiteId: number): Promise<ContentSuggestion[]>;
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

  // Post and Blog methods
  async getPosts(): Promise<Post[]> {
    return db.select().from(posts).orderBy(desc(posts.publishedAt));
  }
  
  async getPostsByCategory(categoryId: number): Promise<Post[]> {
    return db.select()
      .from(posts)
      .where(eq(posts.categoryId, categoryId))
      .orderBy(desc(posts.publishedAt));
  }
  
  async getPostBySlug(slug: string): Promise<Post | undefined> {
    const [result] = await db.select()
      .from(posts)
      .where(eq(posts.slug, slug));
    return result;
  }
  
  async createPost(post: InsertPost): Promise<Post> {
    const [result] = await db.insert(posts).values(post).returning();
    return result;
  }
  
  async getPostCategories(): Promise<PostCategory[]> {
    return db.select().from(postCategories).orderBy(asc(postCategories.name));
  }
  
  async getRootPostCategories(): Promise<PostCategory[]> {
    return db.select()
      .from(postCategories)
      .where(isNull(postCategories.parentId))
      .orderBy(asc(postCategories.name));
  }
  
  async getPostCategoryBySlug(slug: string): Promise<PostCategory | undefined> {
    const [result] = await db.select()
      .from(postCategories)
      .where(eq(postCategories.slug, slug));
    return result;
  }
  
  async getPostCategory(id: number): Promise<PostCategory | undefined> {
    const [result] = await db.select()
      .from(postCategories)
      .where(eq(postCategories.id, id));
    return result;
  }
  
  async createPostCategory(category: InsertPostCategory): Promise<PostCategory> {
    const [result] = await db.insert(postCategories).values(category).returning();
    return result;
  }

  // Contact and Newsletter methods
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

  // Historical Analysis methods
  async createHistoricalAnalysis(analysis: InsertHistoricalAnalysis): Promise<HistoricalAnalysis> {
    const [result] = await db.insert(historicalAnalysis).values(analysis).returning();
    return result;
  }

  async getHistoricalAnalyses(websiteId: number): Promise<HistoricalAnalysis[]> {
    return db.select()
      .from(historicalAnalysis)
      .where(eq(historicalAnalysis.websiteId, websiteId))
      .orderBy(desc(historicalAnalysis.snapshotDate));
  }

  async getLatestHistoricalAnalysis(websiteId: number): Promise<HistoricalAnalysis | undefined> {
    const [result] = await db.select()
      .from(historicalAnalysis)
      .where(eq(historicalAnalysis.websiteId, websiteId))
      .orderBy(desc(historicalAnalysis.snapshotDate))
      .limit(1);
    return result;
  }

  // Competitor Analysis methods
  async createCompetitor(competitor: InsertCompetitor): Promise<Competitor> {
    const [result] = await db.insert(competitors).values(competitor).returning();
    return result;
  }

  async getCompetitors(primaryWebsiteId: number): Promise<Competitor[]> {
    return db.select()
      .from(competitors)
      .where(eq(competitors.primaryWebsiteId, primaryWebsiteId));
  }

  async getCompetitorByUrl(primaryWebsiteId: number, competitorUrl: string): Promise<Competitor | undefined> {
    const [result] = await db.select()
      .from(competitors)
      .where(
        and(
          eq(competitors.primaryWebsiteId, primaryWebsiteId),
          eq(competitors.competitorUrl, competitorUrl)
        )
      );
    return result;
  }

  async createCompetitorAnalysis(analysis: InsertCompetitorAnalysis): Promise<CompetitorAnalysis> {
    const [result] = await db.insert(competitorAnalysis).values(analysis).returning();
    return result;
  }

  async getCompetitorAnalyses(competitorId: number): Promise<CompetitorAnalysis[]> {
    return db.select()
      .from(competitorAnalysis)
      .where(eq(competitorAnalysis.competitorId, competitorId))
      .orderBy(desc(competitorAnalysis.createdAt));
  }

  // SEO Keywords methods
  async createSeoKeyword(keyword: InsertSeoKeyword): Promise<SeoKeyword> {
    const [result] = await db.insert(seoKeywords).values(keyword).returning();
    return result;
  }

  async getSeoKeywords(websiteId: number): Promise<SeoKeyword[]> {
    return db.select()
      .from(seoKeywords)
      .where(eq(seoKeywords.websiteId, websiteId))
      .orderBy(desc(seoKeywords.relevanceScore));
  }

  // Page Speed Insights methods
  async createPageSpeedInsight(insight: InsertPageSpeedInsight): Promise<PageSpeedInsight> {
    const [result] = await db.insert(pageSpeedInsights).values(insight).returning();
    return result;
  }

  async getPageSpeedInsights(websiteId: number): Promise<PageSpeedInsight[]> {
    return db.select()
      .from(pageSpeedInsights)
      .where(eq(pageSpeedInsights.websiteId, websiteId))
      .orderBy(desc(pageSpeedInsights.createdAt));
  }

  async getPageSpeedInsightByUrl(websiteId: number, pageUrl: string): Promise<PageSpeedInsight | undefined> {
    const [result] = await db.select()
      .from(pageSpeedInsights)
      .where(
        and(
          eq(pageSpeedInsights.websiteId, websiteId),
          eq(pageSpeedInsights.pageUrl, pageUrl)
        )
      )
      .orderBy(desc(pageSpeedInsights.createdAt))
      .limit(1);
    return result;
  }

  // Security Vulnerability methods
  async createSecurityVulnerability(vulnerability: InsertSecurityVulnerability): Promise<SecurityVulnerability> {
    const [result] = await db.insert(securityVulnerabilities).values(vulnerability).returning();
    return result;
  }

  async getSecurityVulnerabilities(websiteId: number): Promise<SecurityVulnerability[]> {
    return db.select()
      .from(securityVulnerabilities)
      .where(eq(securityVulnerabilities.websiteId, websiteId))
      .orderBy(desc(securityVulnerabilities.severity));
  }

  // Analysis Preferences methods
  async createAnalysisPreference(preference: InsertAnalysisPreference): Promise<AnalysisPreference> {
    const [result] = await db.insert(analysisPreferences).values(preference).returning();
    return result;
  }

  async getAnalysisPreference(websiteId: number): Promise<AnalysisPreference | undefined> {
    const [result] = await db.select()
      .from(analysisPreferences)
      .where(eq(analysisPreferences.websiteId, websiteId))
      .orderBy(desc(analysisPreferences.createdAt))
      .limit(1);
    return result;
  }

  // Scheduled Monitoring methods
  async createScheduledMonitoring(monitoring: InsertScheduledMonitoring): Promise<ScheduledMonitoring> {
    const [result] = await db.insert(scheduledMonitoring).values(monitoring).returning();
    return result;
  }

  async getScheduledMonitoring(websiteId: number): Promise<ScheduledMonitoring | undefined> {
    const [result] = await db.select()
      .from(scheduledMonitoring)
      .where(eq(scheduledMonitoring.websiteId, websiteId))
      .limit(1);
    return result;
  }

  async updateScheduledMonitoring(id: number, lastRun: Date): Promise<ScheduledMonitoring> {
    const nextRun = new Date(lastRun);
    const [monitoring] = await db.select().from(scheduledMonitoring).where(eq(scheduledMonitoring.id, id));
    
    // Calculate next run based on frequency
    switch (monitoring.frequency) {
      case 'daily':
        nextRun.setDate(nextRun.getDate() + 1);
        break;
      case 'weekly':
        nextRun.setDate(nextRun.getDate() + 7);
        break;
      case 'monthly':
        nextRun.setMonth(nextRun.getMonth() + 1);
        break;
      default:
        nextRun.setDate(nextRun.getDate() + 1);
    }

    const [result] = await db
      .update(scheduledMonitoring)
      .set({
        lastRun: lastRun,
        nextRun: nextRun
      })
      .where(eq(scheduledMonitoring.id, id))
      .returning();

    return result;
  }

  // Content Suggestions methods
  async createContentSuggestion(suggestion: InsertContentSuggestion): Promise<ContentSuggestion> {
    const [result] = await db.insert(contentSuggestions).values(suggestion).returning();
    return result;
  }

  async getContentSuggestions(websiteId: number): Promise<ContentSuggestion[]> {
    return db.select()
      .from(contentSuggestions)
      .where(eq(contentSuggestions.websiteId, websiteId))
      .orderBy(desc(contentSuggestions.seoImpact));
  }
}

export const storage = new DatabaseStorage();