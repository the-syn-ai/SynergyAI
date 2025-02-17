import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "wouter";

const plans = [
  {
    name: "Standard",
    price: "197",
    description: "Perfect for small businesses getting started with automation",
    features: [
      "2 Way Text & Email Conversation",
      "GMB Messaging",
      "Web Chat",
      "Reputation Management",
      "Facebook Messenger",
      "GMB Call Tracking",
      "Missed Call Text Back",
      "Text To Pay"
    ]
  },
  {
    name: "Professional",
    price: "297",
    description: "Advanced features for growing businesses",
    features: [
      "Everything in Standard, plus:",
      "Calendar",
      "CRM",
      "Opportunities",
      "Email Marketing"
    ]
  },
  {
    name: "Premium",
    price: "497",
    description: "Complete solution for established businesses",
    features: [
      "Everything in Professional, plus:",
      "Funnels",
      "Memberships",
      "Websites",
      "Workflows",
      "Forms",
      "Surveys",
      "Trigger Links",
      "SMS & Email Templates",
      "All Reporting",
      "Triggers",
      "Campaigns",
      "Social Planner",
      "Invoice",
      "Blogs",
      "Affiliate Manager"
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
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-muted-foreground">
          Choose the plan that best fits your business needs
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {plans.map((plan) => (
          <motion.div
            key={plan.name}
            variants={cardVariants}
            whileHover="hover"
          >
            <Card className="h-full backdrop-blur-sm bg-card/80 border-primary/10 hover:border-primary/20 transition-colors">
              <CardHeader>
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-muted-foreground">{plan.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact">
                  <Button className="w-full mt-6">Get Started</Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
