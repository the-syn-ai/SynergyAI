import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Box, Mail, Phone, MessageSquare, Star } from "lucide-react";

const features = [
  {
    icon: Box,
    title: "GHL Integration",
    description: "Seamlessly integrate GoHighLevel to revolutionize your business operations. Our setup includes custom workflow automation, conversion-optimized funnels, and intelligent appointment scheduling systems.",
    details: "Perfect for businesses looking to automate their marketing and sales processes."
  },
  {
    icon: Globe,
    title: "Web Design & Hosting",
    description: "Create stunning, high-performance websites that convert. Our web solutions include SEO-optimized designs, secure hosting, and continuous performance monitoring.",
    details: "Ideal for businesses needing a strong online presence."
  },
  {
    icon: Mail,
    title: "Email Automation",
    description: "Deploy sophisticated email campaigns that nurture leads and drive conversions. Features include behavior-triggered sequences, smart segmentation, and performance analytics.",
    details: "Essential for businesses wanting to scale their email marketing."
  },
  {
    icon: Phone,
    title: "AI Call Bot",
    description: "Transform your call handling with our intelligent AI system. Features include natural language processing, smart routing, and seamless CRM integration.",
    details: "Perfect for businesses looking to automate customer communication."
  },
  {
    icon: MessageSquare,
    title: "CRM Solutions",
    description: "Build powerful customer relationships with our custom CRM solutions. Includes lead scoring, pipeline automation, and detailed analytics dashboards.",
    details: "Ideal for businesses wanting to optimize their customer relationships."
  },
  {
    icon: Star,
    title: "AI Review Management",
    description: "Automate your review collection and response process with AI. Includes sentiment analysis, smart response generation, and reputation monitoring.",
    details: "Essential for businesses focused on maintaining their online reputation."
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

export default function Features() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive AI-powered solutions designed to transform your business operations and drive growth through automation
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="h-full"
            >
              <Card className="h-full backdrop-blur-sm bg-card/80 border-primary/10 hover:border-primary/20 transition-colors">
                <CardHeader>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <feature.icon className="h-12 w-12 mb-4 text-primary" />
                  </motion.div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <p className="text-sm text-primary/80">{feature.details}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}