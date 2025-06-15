import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Box, Mail, Phone, MessageSquare, Star } from "lucide-react";
import { FeaturesSectionSkeleton } from "@/components/ui/loading-skeleton";
import { HoverCard, FadeInText, BouncingIcon, AnimatedUnderline } from "@/components/micro-interactions";

const features = [
  {
    icon: Box,
    title: "Business Process Automation",
    description: "Seamlessly automate your business operations with our cutting-edge solutions. Our setup includes custom workflow automation, conversion-optimized funnels, and intelligent appointment scheduling systems.",
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

export default function Features() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading state with local state
  useEffect(() => {
    // Clear loading state after a timeout
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Show skeleton while loading
  if (isLoading) {
    return <FeaturesSectionSkeleton />;
  }

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/50">
      <div className="container mx-auto px-4">
        <FadeInText 
          className="text-center mb-12"
          direction="up"
          duration="normal"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-blue-500 to-purple-600 bg-clip-text text-transparent gradient-text-safe">
            <AnimatedUnderline 
              underlineColor="bg-primary/60" 
              underlineHeight={3} 
              underlineRadius={4}
              duration="slow"
              className="px-2"
            >
              Why Choose SynergyAI
            </AnimatedUnderline>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Comprehensive AI-powered solutions designed to transform your business operations and drive sustainable growth through intelligent automation
          </p>
        </FadeInText>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <HoverCard 
                hoverEffect="combined" 
                intensity="medium"
                duration="normal"
                className="h-full"
              >
                <Card className="h-full backdrop-blur-sm bg-card/80 border-primary/10">
                  <CardHeader>
                    <BouncingIcon
                      bounceHeight="medium"
                      bounceSpeed="normal"
                      continuous={false}
                      className="inline-block mb-4"
                    >
                      <feature.icon className="h-12 w-12 text-primary" />
                    </BouncingIcon>
                    <CardTitle className="text-xl mb-2">
                      <AnimatedUnderline 
                        underlineColor="bg-primary/40" 
                        underlineHeight={2} 
                        onlyOnHover={true}
                      >
                        {feature.title}
                      </AnimatedUnderline>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    <p className="text-sm text-primary/80">{feature.details}</p>
                  </CardContent>
                </Card>
              </HoverCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}