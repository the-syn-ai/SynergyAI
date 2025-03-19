import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "wouter";
import { LetsTalkButton } from "@/components/common/LetsTalkButton";

const plans = [
  {
    name: "STARTER PLAN",
    setup: "1,000",
    price: "197",
    subtitle: "For Small Businesses & Startups",
    description: "Get started with a sleek, mobile-friendly website designed to capture leads and improve your online presence.",
    features: [
      "3-Page Website",
      "SEO Optimization & Basic Keyword Research",
      "Lead Capture Forms & Landing Pages",
      "AI Chatbot (Basic)",
      "Mobile-Friendly Website Design",
      "Mobile App Management",
      "Email Support"
    ]
  },
  {
    name: "GROWTH PLAN",
    setup: "2,000",
    price: "397",
    subtitle: "For Scaling Businesses & Entrepreneurs",
    description: "Scale your business with advanced SEO, automation, and lead management tools to maximize conversions.",
    features: [
      "5-Page Website",
      "Everything in Starter, PLUS:",
      "Advanced SEO & Content Strategy",
      "CRM Integration for Lead Management",
      "AI Chatbot (Advanced) & Automated Email Sequences",
      "Conversion-Focused Website Design",
      "Real-Time Analytics & Reporting",
      "Priority Support"
    ]
  },
  {
    name: "ELITE PLAN",
    setup: "3,000",
    price: "697",
    subtitle: "For High-Performing Brands & Enterprises",
    description: "Unlock full automation, premium customization, and enterprise-level solutions for high-growth businesses.",
    features: [
      "10-Page Website",
      "Everything in Growth, PLUS:",
      "Full AI-Driven Automation & Smart Workflows",
      "E-Commerce & Payment Integration",
      "Custom Branding & UI/UX Enhancements",
      "Multi-Platform Lead Generation",
      "Dedicated Account Manager",
      "24/7 VIP Support"
    ]
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100
    }
  },
  hover: {
    scale: 1.02,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 100
    }
  }
};

export default function Pricing() {
  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Flexible Plans Tailored to Your Business Needs</h1>
        <p className="text-xl text-muted-foreground">
          Choose the plan that best fits your business requirements
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
      >
        {plans.map((plan) => (
          <motion.div
            key={plan.name}
            variants={cardVariants}
            whileHover="hover"
          >
            <Card className="h-full backdrop-blur-sm bg-card/80 border-primary/10 hover:border-primary/20 transition-colors">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold mb-1">{plan.name}</CardTitle>
                <p className="text-sm mb-4 text-muted-foreground">{plan.subtitle}</p>
                <div className="py-3 bg-primary/10 rounded-md mb-4">
                  <div className="text-center">
                    <span className="text-xl font-semibold">${plan.setup} Setup</span>
                    <span className="text-lg mx-1">+</span>
                  </div>
                  <div className="text-center">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">{plan.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Button className="w-full font-medium">SIGN UP NOW</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Let's Talk section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mt-20"
      >
        <h2 className="text-2xl font-semibold mb-4">Need a Custom Solution?</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Let's discuss how we can tailor our services to your specific needs
        </p>
        <LetsTalkButton />
      </motion.div>
    </div>
  );
}