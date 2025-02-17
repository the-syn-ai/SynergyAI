import { pgTable, text, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

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

export const insertPostSchema = createInsertSchema(posts).omit({ id: true, createdAt: true });
export const insertMessageSchema = createInsertSchema(messages).omit({ id: true, createdAt: true });
export const insertSubscriberSchema = createInsertSchema(subscribers).omit({ id: true, createdAt: true });

export type Post = typeof posts.$inferSelect;
export type Message = typeof messages.$inferSelect;
export type Subscriber = typeof subscribers.$inferSelect;
export type InsertPost = z.infer<typeof insertPostSchema>;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;
