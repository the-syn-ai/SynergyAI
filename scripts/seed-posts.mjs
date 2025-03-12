#!/usr/bin/env node

import { db } from '../server/db.js';
import { posts, postCategories } from '../shared/schema.js';
import { eq } from 'drizzle-orm';
import { nanospinner } from 'nanospinner';

async function main() {
  const spinner = nanospinner.createSpinner('Seeding blog posts...').start();

  try {
    // Get all categories to use their IDs
    const categories = await db.select().from(postCategories);
    
    // Create a map of slugs to category objects for easy lookup
    const categoryMap = categories.reduce((acc, cat) => {
      acc[cat.slug] = cat;
      return acc;
    }, {});

    // Create demo posts for each category with proper SEO metadata
    const blogPosts = [
      // GHL Integration posts
      {
        title: "Getting Started with GoHighLevel Integration for Small Businesses",
        slug: "getting-started-with-ghl-integration",
        excerpt: "Learn how to set up and integrate GoHighLevel CRM with your small business operations for maximum efficiency.",
        content: "## Introduction to GoHighLevel\n\nGoHighLevel is a powerful all-in-one marketing platform designed for agencies and businesses that want to streamline their operations. This article will guide you through the initial setup process...",
        image: "https://images.unsplash.com/photo-1607703703674-df96af81dffa?w=800&auto=format&fit=crop",
        categoryId: categoryMap["ghl-integration"].id,
        metaTitle: "GoHighLevel Integration Guide for Small Business | AI Agency",
        metaDescription: "Step-by-step guide to integrating GoHighLevel CRM with your small business operations. Improve efficiency and automate your marketing.",
        keywords: ["GoHighLevel", "CRM integration", "small business automation", "marketing platform"],
        publishedAt: new Date('2024-12-15').toISOString().toISOString(),
        status: "published"
      },
      // Workflow Automation posts (subcategory of GHL)
      {
        title: "5 Advanced GHL Workflows That Save 10+ Hours Weekly",
        slug: "advanced-ghl-workflows-time-saving",
        excerpt: "Discover five powerful workflow automations in GoHighLevel that can save your business more than 10 hours every week.",
        content: "## The Power of Workflow Automation\n\nWorkflow automation is the key to scaling your business without scaling your team proportionally. In GoHighLevel, workflows can handle everything from lead nurturing to appointment scheduling...",
        image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&auto=format&fit=crop",
        categoryId: categoryMap["workflow-automation"].id,
        metaTitle: "5 Time-Saving GHL Workflow Automations | Save 10+ Hours Weekly",
        metaDescription: "Learn 5 advanced GoHighLevel workflow automations that save businesses 10+ hours weekly. Automate lead nurturing, appointments & more.",
        keywords: ["GHL workflows", "time-saving automation", "business efficiency", "GoHighLevel automation"],
        publishedAt: new Date('2024-12-20').toISOString().toISOString(),
        status: "published"
      },
      // Sales Funnel Creation posts (subcategory of GHL)
      {
        title: "Building High-Converting Sales Funnels in GoHighLevel",
        slug: "high-converting-sales-funnels-ghl",
        excerpt: "Learn how to create sales funnels in GoHighLevel that convert visitors into customers at industry-leading rates.",
        content: "## Sales Funnel Fundamentals\n\nA well-designed sales funnel guides prospects through the buyer's journey with minimal friction. GoHighLevel provides all the tools needed to create sophisticated, high-converting funnels...",
        image: "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?w=800&auto=format&fit=crop",
        categoryId: categoryMap["sales-funnel-creation"].id,
        metaTitle: "How to Build High-Converting Sales Funnels in GoHighLevel",
        metaDescription: "Step-by-step guide to creating effective sales funnels in GoHighLevel that convert visitors to customers at higher rates.",
        keywords: ["sales funnel", "GoHighLevel", "conversion optimization", "funnel building"],
        publishedAt: new Date('2025-01-05').toISOString(),
        status: "published"
      },
      // Web Design posts
      {
        title: "2025 Web Design Trends Every Business Should Implement",
        slug: "2025-web-design-trends-for-business",
        excerpt: "Stay ahead of the competition with these cutting-edge web design trends that are reshaping business websites in 2025.",
        content: "## The Evolution of Web Design\n\nWeb design continues to evolve at a rapid pace, with new technologies and user expectations driving innovation. In 2025, several key trends have emerged that businesses should consider implementing...",
        image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&auto=format&fit=crop",
        categoryId: categoryMap["web-design"].id,
        metaTitle: "Top Web Design Trends for Business Success in 2025",
        metaDescription: "Discover the most impactful web design trends of 2025 that are helping businesses increase engagement and conversion rates.",
        keywords: ["web design trends", "2025 design", "business website", "modern web design"],
        publishedAt: new Date('2025-01-10').toISOString(),
        status: "published"
      },
      // Responsive Design posts (subcategory of Web Design)
      {
        title: "Mobile-First Design: Why It's Critical for Your Website Success",
        slug: "mobile-first-design-importance",
        excerpt: "Understand why a mobile-first approach to web design is essential for businesses looking to maximize their online presence.",
        content: "## The Mobile-First Imperative\n\nWith mobile devices accounting for over 60% of web traffic, designing for mobile first is no longer optional. This approach ensures your website performs optimally on the devices most of your customers use...",
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop",
        categoryId: categoryMap["responsive-design"].id,
        metaTitle: "Mobile-First Design: The Key to Website Success in 2025",
        metaDescription: "Learn why mobile-first design is critical for business success and how to implement it effectively on your website.",
        keywords: ["mobile-first design", "responsive website", "mobile optimization", "website performance"],
        publishedAt: new Date('2025-01-15').toISOString(),
        status: "published"
      },
      // SEO Optimization posts (subcategory of Web Design)
      {
        title: "Technical SEO: The Foundation of Effective Website Optimization",
        slug: "technical-seo-foundation-website-optimization",
        excerpt: "Discover how technical SEO provides the essential foundation for all your website optimization efforts.",
        content: "## Understanding Technical SEO\n\nTechnical SEO focuses on improving the technical aspects of a website to increase its visibility in search engines. Unlike content-based SEO, technical SEO deals with site infrastructure...",
        image: "https://images.unsplash.com/photo-1572177812156-58036aae439c?w=800&auto=format&fit=crop",
        categoryId: categoryMap["seo-optimization"].id,
        metaTitle: "Technical SEO: The Essential Foundation for Website Optimization",
        metaDescription: "Learn how technical SEO creates the foundation for effective website optimization and higher search engine rankings.",
        keywords: ["technical SEO", "website optimization", "search engine ranking", "SEO foundation"],
        publishedAt: new Date('2025-01-20').toISOString(),
        status: "published"
      },
      // CRM Solutions posts
      {
        title: "How to Choose the Right CRM for Your Industry",
        slug: "choosing-right-crm-for-your-industry",
        excerpt: "A comprehensive guide to selecting the best CRM solution based on your specific industry requirements and business goals.",
        content: "## CRM Selection Criteria\n\nChoosing the right CRM is a critical decision that can significantly impact your business operations. Different industries have unique requirements that must be considered...",
        image: "https://images.unsplash.com/photo-1532622785990-d2c36a76f5a6?w=800&auto=format&fit=crop",
        categoryId: categoryMap["crm-solutions"].id,
        metaTitle: "Industry-Specific CRM Selection Guide | Find Your Perfect Match",
        metaDescription: "Comprehensive guide to selecting the ideal CRM solution for your industry's specific needs and business requirements.",
        keywords: ["CRM selection", "industry-specific CRM", "business software", "customer relationship management"],
        publishedAt: new Date('2025-01-25').toISOString(),
        status: "published"
      },
      // Lead Management posts (subcategory of CRM Solutions)
      {
        title: "Advanced Lead Scoring Techniques to Prioritize Sales Efforts",
        slug: "advanced-lead-scoring-techniques",
        excerpt: "Learn how to implement sophisticated lead scoring models that help your sales team focus on the most promising opportunities.",
        content: "## The Value of Lead Scoring\n\nLead scoring is a methodology used to rank prospects against a scale that represents the perceived value each lead brings to the organization. An effective lead scoring system can dramatically improve sales efficiency...",
        image: "https://images.unsplash.com/photo-1571721795195-a2d50c745c8c?w=800&auto=format&fit=crop",
        categoryId: categoryMap["lead-management"].id,
        metaTitle: "Advanced Lead Scoring: Prioritize Sales Opportunities Effectively",
        metaDescription: "Discover advanced lead scoring techniques that help sales teams identify and prioritize the most valuable opportunities.",
        keywords: ["lead scoring", "sales prioritization", "CRM techniques", "sales efficiency"],
        publishedAt: new Date('2025-01-30').toISOString(),
        status: "published"
      },
      // Email Automation posts
      {
        title: "Email Automation Workflows That Convert: From Subscriber to Customer",
        slug: "email-automation-workflows-that-convert",
        excerpt: "Discover proven email automation sequences that effectively move subscribers through your sales funnel to becoming loyal customers.",
        content: "## The Power of Email Automation\n\nEmail automation allows you to send the right message to the right person at exactly the right time, without manual intervention. When properly implemented, these workflows can significantly increase conversion rates...",
        image: "https://images.unsplash.com/photo-1633265486064-086b219458ec?w=800&auto=format&fit=crop",
        categoryId: categoryMap["email-automation"].id,
        metaTitle: "Conversion-Focused Email Automation Workflows | Subscriber to Customer",
        metaDescription: "Learn how to create email automation workflows that systematically convert subscribers into customers and drive revenue.",
        keywords: ["email automation", "conversion workflows", "email marketing", "customer journey"],
        publishedAt: new Date('2025-02-05').toISOString(),
        status: "published"
      },
      // Campaign Creation posts (subcategory of Email Automation)
      {
        title: "Designing Email Campaigns That Achieve 30%+ Open Rates",
        slug: "email-campaigns-high-open-rates",
        excerpt: "Learn the strategies and techniques behind email campaigns that consistently achieve industry-leading open rates above 30%.",
        content: "## The Challenge of Email Deliverability\n\nAchieving high open rates starts with ensuring your emails actually reach the inbox. Modern email deliverability requires attention to technical details like authentication protocols and engagement metrics...",
        image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&auto=format&fit=crop",
        categoryId: categoryMap["campaign-creation"].id,
        metaTitle: "How to Achieve 30%+ Email Open Rates | Campaign Design Secrets",
        metaDescription: "Discover the proven strategies behind email campaigns that consistently achieve open rates above 30% in any industry.",
        keywords: ["email open rates", "campaign design", "email deliverability", "engagement metrics"],
        publishedAt: new Date('2025-02-10').toISOString(),
        status: "published"
      },
      // AI Technology posts
      {
        title: "Implementing AI Solutions in Your Business: A Practical Guide",
        slug: "implementing-ai-solutions-practical-guide",
        excerpt: "A no-nonsense guide to identifying, selecting, and implementing artificial intelligence solutions that deliver real business value.",
        content: "## Demystifying AI Implementation\n\nMany businesses are interested in AI but uncertain about how to start. This guide provides a practical framework for implementing AI solutions that address specific business challenges...",
        image: "https://images.unsplash.com/photo-1677442135136-760302cb0580?w=800&auto=format&fit=crop",
        categoryId: categoryMap["ai-technology"].id,
        metaTitle: "Practical AI Implementation Guide for Businesses | Real ROI",
        metaDescription: "Step-by-step guide to implementing AI solutions in your business that deliver measurable returns on investment.",
        keywords: ["AI implementation", "business AI", "practical artificial intelligence", "AI ROI"],
        publishedAt: new Date('2025-02-15').toISOString(),
        status: "published"
      },
      // AI Call Bots posts (subcategory of AI Technology)
      {
        title: "How AI Call Bots Are Revolutionizing Customer Service",
        slug: "ai-call-bots-revolutionizing-customer-service",
        excerpt: "Explore how advanced AI call bots are transforming customer service operations while improving satisfaction and reducing costs.",
        content: "## The Evolution of AI Call Technology\n\nAI call bots have evolved dramatically from the frustrating automated systems of the past. Today's solutions leverage natural language processing and machine learning to provide experiences that rival human agents...",
        image: "https://images.unsplash.com/photo-1634937916053-0dc7188a1c2d?w=800&auto=format&fit=crop",
        categoryId: categoryMap["ai-call-bots"].id,
        metaTitle: "AI Call Bots: The Future of Customer Service Is Here",
        metaDescription: "Discover how AI-powered call bots are revolutionizing customer service with natural conversations and intelligent problem-solving.",
        keywords: ["AI call bots", "customer service automation", "conversational AI", "call center technology"],
        publishedAt: new Date('2025-02-20').toISOString(),
        status: "published"
      },
      // Review Management posts (subcategory of AI Technology)
      {
        title: "Automated Review Management: Turning Feedback into Growth",
        slug: "automated-review-management-feedback-growth",
        excerpt: "Learn how AI-powered review management systems can help you collect, analyze, and leverage customer feedback to drive business growth.",
        content: "## The Strategic Value of Reviews\n\nCustomer reviews are among the most valuable assets for modern businesses. They influence purchasing decisions, provide actionable feedback, and impact search rankings...",
        image: "https://images.unsplash.com/photo-1560472355-536de3962603?w=800&auto=format&fit=crop",
        categoryId: categoryMap["review-management"].id,
        metaTitle: "AI-Powered Review Management: Transform Feedback into Business Growth",
        metaDescription: "How to use automated review management systems to collect, analyze and leverage customer feedback for strategic business growth.",
        keywords: ["review management", "customer feedback", "AI reviews", "reputation management"],
        publishedAt: new Date('2025-02-25').toISOString(),
        status: "published"
      }
    ];

    // Insert the blog posts with their SEO metadata
    let createdCount = 0;
    
    for (const post of blogPosts) {
      try {
        // Check if post with this slug already exists
        const existingPosts = await db.select().from(posts).where(eq(posts.slug, post.slug));
        
        if (existingPosts.length === 0) {
          // Insert post if it doesn't exist
          await db.insert(posts).values(post);
          createdCount++;
        }
      } catch (error) {
        console.error(`Error creating post "${post.title}":`, error);
      }
    }

    spinner.success({ text: `Successfully seeded ${createdCount} blog posts` });
    console.log(`Created ${createdCount} posts across ${categories.length} categories.`);
    
    process.exit(0);
  } catch (error) {
    spinner.error({ text: 'Failed to seed blog posts' });
    console.error('Error seeding blog posts:', error);
    process.exit(1);
  }
}

main();