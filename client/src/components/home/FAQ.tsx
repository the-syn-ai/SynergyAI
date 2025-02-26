import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLoading } from "@/hooks/use-loading";
import { FAQSectionSkeleton } from "@/components/ui/loading-skeleton";

// FAQ data
const faqItems = [
  {
    question: "What AI technologies do you use for your solutions?",
    answer: "We use a combination of OpenAI's GPT models, custom-trained algorithms, and specialized AI frameworks tailored to specific business needs. Our solutions leverage natural language processing, computer vision, and predictive analytics depending on the application."
  },
  {
    question: "How do you ensure the security of my business data?",
    answer: "We implement enterprise-grade security measures including data encryption, secure API access, regular security audits, and compliance with industry standards. All data is handled according to strict privacy policies, and we can sign custom NDAs for sensitive projects."
  },
  {
    question: "How long does it typically take to implement your AI solutions?",
    answer: "Implementation timelines vary based on the complexity of your requirements, but most projects follow this timeline: initial setup (1-2 weeks), integration and customization (2-4 weeks), testing and refinement (1-2 weeks). We provide clear project timelines during the consultation phase."
  },
  {
    question: "Do you offer ongoing support after implementation?",
    answer: "Yes, we provide comprehensive support packages that include technical assistance, performance monitoring, system updates, and optimization recommendations. Our team is available to address any issues and implement enhancements as your business needs evolve."
  },
  {
    question: "Can your AI solutions integrate with my existing business tools?",
    answer: "Absolutely. Our solutions are designed with integration capabilities for popular CRM systems, marketing platforms, communication tools, and custom business applications. We conduct a thorough assessment of your current tech stack during the consultation phase to ensure seamless integration."
  },
  {
    question: "What kind of ROI can I expect from implementing your AI solutions?",
    answer: "Clients typically see ROI in multiple areas: reduced operational costs (20-40%), increased conversion rates (15-30%), improved customer satisfaction metrics, and significant time savings on repetitive tasks. We provide detailed analytics and reporting to track the specific impact on your business objectives."
  }
];

export default function FAQ() {
  const { isLoading, setIsLoading } = useLoading();
  const [isLocalLoading, setIsLocalLoading] = useState(true);
  
  // Manually set loading state
  useEffect(() => {
    // Immediately set loading state
    setIsLoading(prev => ({ ...prev, faqSection: true }));
    
    // Clear loading state after a timeout
    const timer = setTimeout(() => {
      setIsLoading(prev => ({ ...prev, faqSection: false }));
      setIsLocalLoading(false);
    }, 900); // Slightly longer than Features to ensure staggered loading
    
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  // Show skeleton while loading
  if (isLoading.faqSection || isLocalLoading) {
    return <FAQSectionSkeleton />;
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Common questions about our AI-powered solutions and services
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-lg font-medium">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}