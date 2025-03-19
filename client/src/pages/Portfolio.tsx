import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollReveal, FadeInText, HoverCard } from '@/components/micro-interactions';
import PageTransition from '@/components/animations/PageTransition';

// Define portfolio items type
interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  description: string;
  industry: string;
  services: string[];
  image: string;
  results: {
    label: string;
    value: string;
    change?: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
}

// Sample portfolio data
const portfolioItems: PortfolioItem[] = [
  {
    id: 'acme-corporation',
    title: 'Digital Transformation',
    client: 'ACME Corporation',
    description: 'Complete digital transformation with AI-powered messaging, CRM integration, and smart marketing automation.',
    industry: 'Manufacturing',
    services: ['CRM Integration', 'AI Messaging', 'Email Automation'],
    image: '/images/portfolio-1.jpg',
    results: [
      { label: 'Lead Generation', value: '205%', change: 'increase' },
      { label: 'Customer Retention', value: '78%', change: 'improvement' },
      { label: 'Operational Efficiency', value: '45%', change: 'increase' }
    ],
    testimonial: {
      quote: 'The AI automation tools transformed our customer service approach, reducing response times by 85% while improving customer satisfaction scores.',
      author: 'John Smith',
      position: 'CMO, ACME Corporation'
    }
  },
  {
    id: 'sunshine-services',
    title: 'Customer Experience Overhaul',
    client: 'Sunshine Services',
    description: 'Implemented AI call bot and review management system that revolutionized their customer service approach.',
    industry: 'Professional Services',
    services: ['AI Call Bot', 'Review Management', 'CRM Integration'],
    image: '/images/portfolio-2.jpg',
    results: [
      { label: 'Customer Satisfaction', value: '92%', change: 'increase' },
      { label: 'Response Time', value: '3.5 min', change: 'decrease from 2 hours' },
      { label: 'Positive Reviews', value: '350%', change: 'increase' }
    ],
    testimonial: {
      quote: 'Our clients now receive instant responses 24/7. The AI systems have learned our voice and values, creating a seamless experience.',
      author: 'Sarah Johnson',
      position: 'Customer Experience Director, Sunshine Services'
    }
  },
  {
    id: 'horizon-health',
    title: 'Healthcare Communication System',
    client: 'Horizon Health',
    description: 'Built a HIPAA-compliant communication platform with intelligent appointment scheduling and follow-up automation.',
    industry: 'Healthcare',
    services: ['Web Design', 'Email Automation', 'GHL Integration'],
    image: '/images/portfolio-3.jpg',
    results: [
      { label: 'Appointment No-Shows', value: '76%', change: 'reduction' },
      { label: 'Patient Engagement', value: '89%', change: 'increase' },
      { label: 'Administrative Time', value: '34%', change: 'reduction' }
    ],
    testimonial: {
      quote: 'The automated follow-up system has dramatically improved our patient engagement while reducing staff workload.',
      author: 'Dr. Michael Chen',
      position: 'Medical Director, Horizon Health'
    }
  }
];

export default function Portfolio() {
  return (
    <PageTransition>
      <div className="container mx-auto py-12 px-4 sm:px-6">
        <div className="text-center mb-16">
          <FadeInText as="h1" className="text-4xl md:text-5xl font-bold mb-4" staggerChildren={true}>
            Our Client Success Stories
          </FadeInText>
          <FadeInText as="p" className="text-lg text-muted-foreground max-w-2xl mx-auto" delay={0.2}>
            See how we've helped businesses transform their operations and grow through intelligent automation and AI-powered solutions.
          </FadeInText>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <ScrollReveal key={item.id} delay={index * 0.1} amount={0.1}>
              <PortfolioCard item={item} />
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-16 text-center">
          <ScrollReveal direction="up">
            <div className="bg-muted rounded-lg p-8 max-w-3xl mx-auto">
              <FadeInText as="h2" className="text-2xl font-bold mb-4">
                Ready to Write Your Success Story?
              </FadeInText>
              <FadeInText as="p" className="mb-6 text-muted-foreground">
                Let's discuss how our AI-powered solutions can transform your business operations and drive growth.
              </FadeInText>
              <Link href="/contact">
                <Button size="lg">Schedule a Consultation</Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </PageTransition>
  );
}

function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <HoverCard hoverEffect="lift" className="h-full">
      <Card className="h-full flex flex-col border-none shadow-md overflow-hidden">
        <div className="h-48 bg-muted flex items-center justify-center overflow-hidden">
          <div className="w-full h-full bg-gradient-to-r from-primary/20 to-primary/5 flex items-center justify-center text-primary-foreground">
            <span className="text-xl font-bold">{item.client}</span>
          </div>
        </div>
        
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription className="mt-2">{item.client}</CardDescription>
            </div>
            <Badge>{item.industry}</Badge>
          </div>
        </CardHeader>
        
        <CardContent className="flex-grow">
          <p className="mb-4 text-sm text-muted-foreground">{item.description}</p>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Services Provided</h4>
              <div className="flex flex-wrap gap-2">
                {item.services.map(service => (
                  <Badge key={service} variant="outline" className="text-xs">{service}</Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Key Results</h4>
              <div className="grid grid-cols-2 gap-2">
                {item.results.map(result => (
                  <div key={result.label} className="bg-muted/50 rounded p-2 text-center">
                    <div className="text-sm font-bold">{result.value}</div>
                    <div className="text-xs text-muted-foreground">{result.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {item.testimonial && (
              <div className="italic text-sm text-muted-foreground border-l-2 border-primary/20 pl-3 py-1">
                "{item.testimonial.quote.length > 100 ? item.testimonial.quote.substring(0, 100) + '...' : item.testimonial.quote}"
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="pt-0">
          <Link href={`/portfolio/${item.id}`}>
            <Button variant="outline" className="w-full">View Case Study</Button>
          </Link>
        </CardFooter>
      </Card>
    </HoverCard>
  );
}