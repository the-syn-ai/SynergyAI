import { pgTable, text, serial, timestamp, varchar, integer, jsonb, boolean, date, numeric, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Add users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 100 }).notNull().unique(),
  password: text("password").notNull(),
  email: varchar("email", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

// Create post categories table
export const postCategories = pgTable("post_categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  description: text("description"),
  parentId: integer("parent_id"), // Self-reference will be used later with a query
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: varchar("slug", { length: 150 }).notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  image: text("image").notNull(),
  categoryId: integer("category_id").references(() => postCategories.id),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  keywords: text("keywords").array(),
  publishedAt: timestamp("published_at"),
  status: varchar("status", { length: 20 }).notNull().default("draft"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 100 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

// New tables for company analysis
export const companyWebsites = pgTable("company_websites", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  name: varchar("name", { length: 200 }),
  lastAnalyzed: timestamp("last_analyzed"),
  status: varchar("status", { length: 50 }).notNull(),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const websiteAnalysis = pgTable("website_analysis", {
  id: serial("id").primaryKey(),
  websiteId: integer("website_id").references(() => companyWebsites.id),
  analysisType: varchar("analysis_type", { length: 50 }).notNull(),
  results: jsonb("results").notNull(),
  confidence: integer("confidence"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const userQueries = pgTable("user_queries", {
  id: serial("id").primaryKey(),
  websiteId: integer("website_id").references(() => companyWebsites.id),
  query: text("query").notNull(),
  response: text("response"),
  context: jsonb("context"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const aiDemos = pgTable("ai_demos", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description").notNull(),
  type: varchar("type", { length: 50 }).notNull(),
  configuration: jsonb("configuration").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const demoSessions = pgTable("demo_sessions", {
  id: serial("id").primaryKey(),
  demoId: integer("demo_id").references(() => aiDemos.id),
  sessionData: jsonb("session_data").notNull(),
  performance: jsonb("performance").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const userFeedback = pgTable("user_feedback", {
  id: serial("id").primaryKey(),
  demoId: integer("demo_id").references(() => aiDemos.id),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  tags: text("tags").array(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const securityLogs = pgTable("security_logs", {
  id: serial("id").primaryKey(),
  eventType: varchar("event_type", { length: 50 }).notNull(),
  severity: varchar("severity", { length: 20 }).notNull(),
  details: jsonb("details").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const featureTours = pgTable("feature_tours", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  steps: jsonb("steps").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

// Historical Analysis Tracking
export const historicalAnalysis = pgTable("historical_analysis", {
  id: serial("id").primaryKey(),
  websiteId: integer("website_id").references(() => companyWebsites.id),
  snapshotDate: timestamp("snapshot_date").defaultNow().notNull(),
  performanceScore: integer("performance_score"),
  seoScore: integer("seo_score"),
  accessibilityScore: integer("accessibility_score"),
  securityScore: integer("security_score"),
  overallScore: integer("overall_score"),
  changeFromPrevious: jsonb("change_from_previous"),
  insights: text("insights"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

// Competitor Analysis
export const competitors = pgTable("competitors", {
  id: serial("id").primaryKey(),
  primaryWebsiteId: integer("primary_website_id").references(() => companyWebsites.id),
  competitorUrl: text("competitor_url").notNull(),
  competitorName: varchar("competitor_name", { length: 200 }),
  status: varchar("status", { length: 50 }).notNull(),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const competitorAnalysis = pgTable("competitor_analysis", {
  id: serial("id").primaryKey(),
  competitorId: integer("competitor_id").references(() => competitors.id),
  analysisType: varchar("analysis_type", { length: 50 }).notNull(),
  results: jsonb("results").notNull(),
  comparisonResults: jsonb("comparison_results"),
  strengths: text("strengths").array(),
  weaknesses: text("weaknesses").array(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

// SEO Keywords
export const seoKeywords = pgTable("seo_keywords", {
  id: serial("id").primaryKey(),
  websiteId: integer("website_id").references(() => companyWebsites.id),
  keyword: varchar("keyword", { length: 100 }).notNull(),
  relevanceScore: integer("relevance_score"),
  volume: integer("volume"),
  difficulty: integer("difficulty"),
  currentRanking: integer("current_ranking"),
  suggestedContent: text("suggested_content"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

// Page Speed Insights
export const pageSpeedInsights = pgTable("page_speed_insights", {
  id: serial("id").primaryKey(),
  websiteId: integer("website_id").references(() => companyWebsites.id),
  pageUrl: text("page_url").notNull(),
  mobileScore: integer("mobile_score"),
  desktopScore: integer("desktop_score"),
  metrics: jsonb("metrics").notNull(),
  opportunities: jsonb("opportunities"),
  diagnostics: jsonb("diagnostics"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

// Security Vulnerability Scanner
export const securityVulnerabilities = pgTable("security_vulnerabilities", {
  id: serial("id").primaryKey(),
  websiteId: integer("website_id").references(() => companyWebsites.id),
  vulnerabilityType: varchar("vulnerability_type", { length: 100 }).notNull(),
  severity: varchar("severity", { length: 20 }).notNull(),
  description: text("description").notNull(),
  location: text("location"),
  remediation: text("remediation"),
  verificationStatus: varchar("verification_status", { length: 50 }).default("unverified").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

// Custom Analysis Focus
export const analysisPreferences = pgTable("analysis_preferences", {
  id: serial("id").primaryKey(),
  websiteId: integer("website_id").references(() => companyWebsites.id),
  focusAreas: jsonb("focus_areas").notNull(),
  priorityLevel: jsonb("priority_level").notNull(),
  customRules: jsonb("custom_rules"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

// Scheduled Monitoring
export const scheduledMonitoring = pgTable("scheduled_monitoring", {
  id: serial("id").primaryKey(),
  websiteId: integer("website_id").references(() => companyWebsites.id),
  frequency: varchar("frequency", { length: 50 }).notNull(),
  lastRun: timestamp("last_run"),
  nextRun: timestamp("next_run"),
  alertThresholds: jsonb("alert_thresholds"),
  notificationEmail: varchar("notification_email", { length: 100 }),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

// AI Content Suggestions
export const contentSuggestions = pgTable("content_suggestions", {
  id: serial("id").primaryKey(),
  websiteId: integer("website_id").references(() => companyWebsites.id),
  targetPage: text("target_page"),
  contentType: varchar("content_type", { length: 50 }).notNull(),
  suggestion: text("suggestion").notNull(),
  rationale: text("rationale"),
  seoImpact: integer("seo_impact"),
  implementationDifficulty: varchar("implementation_difficulty", { length: 20 }),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const insertPostCategorySchema = createInsertSchema(postCategories).omit({ id: true, createdAt: true });
export const insertPostSchema = createInsertSchema(posts).omit({ id: true, createdAt: true });
export const insertMessageSchema = createInsertSchema(messages).omit({ id: true, createdAt: true });
export const insertSubscriberSchema = createInsertSchema(subscribers).omit({ id: true, createdAt: true });
export const insertAIDemoSchema = createInsertSchema(aiDemos).omit({ id: true, createdAt: true });
export const insertDemoSessionSchema = createInsertSchema(demoSessions).omit({ id: true, createdAt: true });
export const insertUserFeedbackSchema = createInsertSchema(userFeedback).omit({ id: true, createdAt: true });
export const insertSecurityLogSchema = createInsertSchema(securityLogs).omit({ id: true, createdAt: true });
export const insertFeatureTourSchema = createInsertSchema(featureTours).omit({ id: true, createdAt: true });

// Add new schema exports
export const insertCompanyWebsiteSchema = createInsertSchema(companyWebsites).omit({ id: true, createdAt: true, lastAnalyzed: true });
export const insertWebsiteAnalysisSchema = createInsertSchema(websiteAnalysis).omit({ id: true, createdAt: true });
export const insertUserQuerySchema = createInsertSchema(userQueries).omit({ id: true, createdAt: true });
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });

// New feature insert schemas
export const insertHistoricalAnalysisSchema = createInsertSchema(historicalAnalysis).omit({ id: true, createdAt: true });
export const insertCompetitorSchema = createInsertSchema(competitors).omit({ id: true, createdAt: true });
export const insertCompetitorAnalysisSchema = createInsertSchema(competitorAnalysis).omit({ id: true, createdAt: true });
export const insertSeoKeywordSchema = createInsertSchema(seoKeywords).omit({ id: true, createdAt: true });
export const insertPageSpeedInsightSchema = createInsertSchema(pageSpeedInsights).omit({ id: true, createdAt: true });
export const insertSecurityVulnerabilitySchema = createInsertSchema(securityVulnerabilities).omit({ id: true, createdAt: true });
export const insertAnalysisPreferenceSchema = createInsertSchema(analysisPreferences).omit({ id: true, createdAt: true });
export const insertScheduledMonitoringSchema = createInsertSchema(scheduledMonitoring).omit({ id: true, createdAt: true, lastRun: true, nextRun: true });
export const insertContentSuggestionSchema = createInsertSchema(contentSuggestions).omit({ id: true, createdAt: true });

// Export types
export type PostCategory = typeof postCategories.$inferSelect;
export type Post = typeof posts.$inferSelect;
export type Message = typeof messages.$inferSelect;
export type Subscriber = typeof subscribers.$inferSelect;
export type AIDemo = typeof aiDemos.$inferSelect;
export type DemoSession = typeof demoSessions.$inferSelect;
export type UserFeedback = typeof userFeedback.$inferSelect;
export type SecurityLog = typeof securityLogs.$inferSelect;
export type FeatureTour = typeof featureTours.$inferSelect;
export type CompanyWebsite = typeof companyWebsites.$inferSelect;
export type WebsiteAnalysis = typeof websiteAnalysis.$inferSelect;
export type UserQuery = typeof userQueries.$inferSelect;
export type User = typeof users.$inferSelect;

// New feature types
export type HistoricalAnalysis = typeof historicalAnalysis.$inferSelect;
export type Competitor = typeof competitors.$inferSelect;
export type CompetitorAnalysis = typeof competitorAnalysis.$inferSelect;
export type SeoKeyword = typeof seoKeywords.$inferSelect;
export type PageSpeedInsight = typeof pageSpeedInsights.$inferSelect;
export type SecurityVulnerability = typeof securityVulnerabilities.$inferSelect;
export type AnalysisPreference = typeof analysisPreferences.$inferSelect;
export type ScheduledMonitoring = typeof scheduledMonitoring.$inferSelect;
export type ContentSuggestion = typeof contentSuggestions.$inferSelect;

export type InsertPostCategory = z.infer<typeof insertPostCategorySchema>;
export type InsertPost = z.infer<typeof insertPostSchema>;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;
export type InsertAIDemo = z.infer<typeof insertAIDemoSchema>;
export type InsertDemoSession = z.infer<typeof insertDemoSessionSchema>;
export type InsertUserFeedback = z.infer<typeof insertUserFeedbackSchema>;
export type InsertSecurityLog = z.infer<typeof insertSecurityLogSchema>;
export type InsertFeatureTour = z.infer<typeof insertFeatureTourSchema>;
export type InsertCompanyWebsite = z.infer<typeof insertCompanyWebsiteSchema>;
export type InsertWebsiteAnalysis = z.infer<typeof insertWebsiteAnalysisSchema>;
export type InsertUserQuery = z.infer<typeof insertUserQuerySchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;

// New feature insert types
export type InsertHistoricalAnalysis = z.infer<typeof insertHistoricalAnalysisSchema>;
export type InsertCompetitor = z.infer<typeof insertCompetitorSchema>;
export type InsertCompetitorAnalysis = z.infer<typeof insertCompetitorAnalysisSchema>;
export type InsertSeoKeyword = z.infer<typeof insertSeoKeywordSchema>;
export type InsertPageSpeedInsight = z.infer<typeof insertPageSpeedInsightSchema>;
export type InsertSecurityVulnerability = z.infer<typeof insertSecurityVulnerabilitySchema>;
export type InsertAnalysisPreference = z.infer<typeof insertAnalysisPreferenceSchema>;
export type InsertScheduledMonitoring = z.infer<typeof insertScheduledMonitoringSchema>;
export type InsertContentSuggestion = z.infer<typeof insertContentSuggestionSchema>;