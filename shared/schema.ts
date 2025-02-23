import { pgTable, text, serial, timestamp, varchar, integer, jsonb, boolean } from "drizzle-orm/pg-core";
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

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  image: text("image").notNull(),
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

// Export types
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