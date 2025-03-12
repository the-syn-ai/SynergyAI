// Seed script for creating initial blog post categories based on services
// Using ESM syntax for better compatibility
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { postCategories } from '../shared/schema.js';

// Create a new postgres connection and drizzle instance for this script
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL environment variable is required");
  process.exit(1);
}

const client = postgres(connectionString);
const db = drizzle(client);

// Function to create slug from name
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-')   // Replace multiple - with single -
    .replace(/^-+/, '')       // Trim - from start of text
    .replace(/-+$/, '');      // Trim - from end of text
}

async function seedCategories() {
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

  // Add sub-categories for SEO nesting structure
  const subCategories = [
    {
      name: "Workflow Automation",
      description: "Automating business processes with custom workflows.",
      slug: "workflow-automation",
      parentId: 1 // Will be set to GHL Integration's ID
    },
    {
      name: "Sales Funnel Creation",
      description: "Building effective sales funnels that convert.",
      slug: "sales-funnel-creation",
      parentId: 1 // Will be set to GHL Integration's ID
    },
    {
      name: "Responsive Design",
      description: "Creating websites that work on all devices and screen sizes.",
      slug: "responsive-design",
      parentId: 2 // Will be set to Web Design's ID
    },
    {
      name: "SEO Optimization",
      description: "Strategies to improve search engine visibility and rankings.",
      slug: "seo-optimization",
      parentId: 2 // Will be set to Web Design's ID
    },
    {
      name: "Lead Management",
      description: "Tools and techniques for effective lead tracking and management.",
      slug: "lead-management",
      parentId: 3 // Will be set to CRM Solutions's ID
    },
    {
      name: "Campaign Creation",
      description: "Building effective email marketing campaigns.",
      slug: "campaign-creation",
      parentId: 4 // Will be set to Email Automation's ID
    },
    {
      name: "AI Call Bots",
      description: "Using AI for intelligent call handling and customer service.",
      slug: "ai-call-bots",
      parentId: 5 // Will be set to AI Technology's ID
    },
    {
      name: "Review Management",
      description: "AI-powered review collection and response systems.",
      slug: "review-management",
      parentId: 5 // Will be set to AI Technology's ID
    }
  ];

  try {
    console.log("Starting to seed categories...");
    
    // Insert main categories first
    for (const category of serviceCategories) {
      const existing = await db.select().from(postCategories).where({ slug: category.slug });
      
      if (existing.length === 0) {
        console.log(`Creating category: ${category.name}`);
        await db.insert(postCategories).values(category);
      } else {
        console.log(`Category '${category.name}' already exists, skipping.`);
      }
    }
    
    // Get all categories to set proper parent IDs for subcategories
    const allCategories = await db.select().from(postCategories);
    const categoryMap = allCategories.reduce((acc, cat) => {
      acc[cat.name.toLowerCase().replace(/\s+/g, '-')] = cat.id;
      return acc;
    }, {});
    
    // Now insert subcategories with proper parent IDs
    for (const subCategory of subCategories) {
      // Get the actual ID for the parent based on the position in the main categories array
      const parentCategoryName = serviceCategories[subCategory.parentId - 1]?.name;
      if (!parentCategoryName) continue;
      
      const parentId = categoryMap[slugify(parentCategoryName)];
      if (!parentId) {
        console.log(`Parent category for '${subCategory.name}' not found, skipping.`);
        continue;
      }
      
      const subCatWithParent = {
        ...subCategory,
        parentId
      };
      
      const existing = await db.select().from(postCategories).where({ slug: subCategory.slug });
      
      if (existing.length === 0) {
        console.log(`Creating subcategory: ${subCategory.name} (parent: ${parentCategoryName})`);
        await db.insert(postCategories).values(subCatWithParent);
      } else {
        console.log(`Subcategory '${subCategory.name}' already exists, skipping.`);
      }
    }
    
    console.log("Category seeding completed!");
  } catch (error) {
    console.error("Error seeding categories:", error);
  } finally {
    process.exit(0);
  }
}

seedCategories();