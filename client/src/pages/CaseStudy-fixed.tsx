import React from 'react';
import { Link, useRoute } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight, Award, BarChart3, ExternalLink, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollReveal, FadeInText } from '@/components/micro-interactions';
import ShareResults from '@/components/common/ShareResults';
import PageTransition from '@/components/animations/PageTransition';

// Sample portfolio items (same as in Portfolio.tsx)
const portfolioItems = [
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
    },
    challenge: `
      ACME Corporation was facing significant challenges with their outdated communication systems:
      
      • Customer inquiries were taking 24+ hours to receive responses
      • Manual data entry was causing errors and wasting valuable time
      • Sales teams had no visibility into customer interactions
      • Marketing campaigns were disconnected from customer behaviors
      • Leads were falling through the cracks due to lack of follow-up
    `,
    solution: `
      We implemented a comprehensive digital transformation strategy:
      
      1. Deployed an AI-powered messaging system with 24/7 availability
      2. Integrated their new CRM system with all customer touchpoints
      3. Created smart marketing automation workflows based on customer behaviors
      4. Built a custom dashboard for real-time performance monitoring
      5. Trained their team on the new systems and best practices
    `,
    processDetails: [
      {
        phase: 'Discovery & Analysis',
        description: 'We conducted a thorough analysis of their existing systems, identifying key bottlenecks and opportunities for automation.',
        duration: '2 weeks'
      },
      {
        phase: 'Strategy Development',
        description: 'Based on our findings, we created a comprehensive digital transformation roadmap with clear milestones and KPIs.',
        duration: '1 week'
      },
      {
        phase: 'Implementation',
        description: 'Our team deployed the new systems in phases, ensuring minimal disruption to daily operations.',
        duration: '6 weeks'
      },
      {
        phase: 'Training & Optimization',
        description: 'We provided comprehensive training sessions and made continuous improvements based on user feedback.',
        duration: '3 weeks'
      },
      {
        phase: 'Ongoing Support',
        description: 'We continue to provide technical support and strategic guidance to maximize the value of their investment.',
        duration: 'Ongoing'
      }
    ],
    keyTechnologies: [
      'AI-powered chatbot with natural language processing',
      'Custom API integrations between systems',
      'Advanced automation workflows',
      'Real-time analytics dashboard',
      'Mobile-responsive interface for on-the-go management'
    ],
    longTermImpact: `
      One year after implementation, ACME Corporation has experienced transformative results:
      
      • Revenue increased by 32% year-over-year
      • Customer satisfaction scores improved from 72% to 94%
      • Sales cycle reduced from 45 days to 18 days
      • Marketing ROI increased by 215%
      • Employee satisfaction increased due to elimination of repetitive tasks
    `
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
    },
    challenge: `
      Sunshine Services was struggling with:
      
      • High call volumes overwhelming their small team
      • Negative online reviews due to slow response times
      • Inconsistent customer experiences across different channels
      • Difficulty scaling their service capabilities with business growth
      • Limited visibility into customer satisfaction metrics
    `,
    solution: `
      We developed a comprehensive customer experience solution:
      
      1. Implemented an AI call bot to handle routine inquiries and appointment scheduling
      2. Created an automated review management system to monitor and respond to online reviews
      3. Built a centralized CRM to unify customer data across all touchpoints
      4. Established real-time reporting on key customer satisfaction metrics
      5. Designed escalation protocols for complex customer scenarios
    `,
    processDetails: [
      {
        phase: 'Customer Journey Mapping',
        description: 'We mapped the existing customer journey to identify pain points and opportunities for improvement.',
        duration: '1 week'
      },
      {
        phase: 'Solution Design',
        description: 'Our team designed a customized solution based on Sunshine Services specific needs and constraints.',
        duration: '2 weeks'
      },
      {
        phase: 'Implementation',
        description: 'We implemented the new systems with a phased approach to ensure smooth adoption.',
        duration: '4 weeks'
      },
      {
        phase: 'Training & Refinement',
        description: 'Comprehensive training was provided, and AI systems were refined based on real-world usage patterns.',
        duration: '3 weeks'
      },
      {
        phase: 'Continuous Improvement',
        description: 'We established a continuous improvement framework to evolve the system over time.',
        duration: 'Ongoing'
      }
    ],
    keyTechnologies: [
      'Voice-enabled AI assistant with natural language understanding',
      'Sentiment analysis for review monitoring',
      'Omnichannel communication platform',
      'Customer journey analytics',
      'Automated follow-up system'
    ],
    longTermImpact: `
      Six months after implementation, Sunshine Services has achieved:
      
      • 45% reduction in operational costs
      • Ability to handle 3x more customer inquiries without adding staff
      • Improvement in Google Business rating from 3.2 to 4.8 stars
      • 78% of customer inquiries resolved without human intervention
      • Expansion into two new service territories due to increased capacity
    `
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
    },
    challenge: `
      Horizon Health faced critical challenges in their patient communication system:
      
      • High rate of appointment no-shows (28%)
      • Inefficient manual appointment scheduling processes
      • Poor patient follow-up due to administrative overload
      • Compliance concerns with patient communication
      • Limited patient engagement between appointments
    `,
    solution: `
      We developed a comprehensive healthcare communication solution:
      
      1. Designed a HIPAA-compliant patient portal and website
      2. Created an intelligent appointment scheduling system with automated reminders
      3. Implemented secure email automation for pre and post-appointment communications
      4. Integrated the system with their existing EHR through Go High Level
      5. Developed analytics dashboards to track patient engagement metrics
    `,
    processDetails: [
      {
        phase: 'Compliance Assessment',
        description: 'We conducted a thorough compliance assessment to ensure all solutions would meet healthcare regulations.',
        duration: '1 week'
      },
      {
        phase: 'System Design',
        description: 'Our team designed a secure, compliant system architecture tailored to healthcare workflows.',
        duration: '2 weeks'
      },
      {
        phase: 'Development & Integration',
        description: 'We built the platform with security as a priority and integrated it with existing systems.',
        duration: '5 weeks'
      },
      {
        phase: 'Staff Training',
        description: 'Comprehensive training was provided to ensure the entire team could utilize the new system effectively.',
        duration: '2 weeks'
      },
      {
        phase: 'Patient Rollout',
        description: 'We implemented a phased rollout to patients with continuous monitoring and adjustments.',
        duration: '3 weeks'
      }
    ],
    keyTechnologies: [
      'HIPAA-compliant messaging system',
      'Secure patient portal',
      'Automated appointment scheduling and reminders',
      'Encrypted email communication',
      'EHR integration through Go High Level'
    ],
    longTermImpact: `
      Since implementation, Horizon Health has experienced:
      
      • Reduction in appointment no-shows from 28% to just 6.5%
      • Administrative staff time savings of 34 hours per week
      • Improved patient satisfaction scores (from 79% to 95%)
      • Increased patient retention rate of 92%
      • Ability to serve 22% more patients with the same staff
    `
  }
];

export default function CaseStudy() {
  // Extract case study ID from URL
  const [match, params] = useRoute('/portfolio/:id');
  const id = match ? params.id : null;
  
  // Find the corresponding case study
  const caseStudy = portfolioItems.find(item => item.id === id);
  
  // If no matching case study is found
  if (!caseStudy) {
    return (
      <PageTransition>
        <div className="container mx-auto py-12 px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Case Study Not Found</h1>
            <p className="mb-6">Sorry, we couldn't find the case study you're looking for.</p>
            <Link href="/portfolio">
              <Button>Return to Portfolio</Button>
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }
  
  return (
    <PageTransition>
      <div className="container mx-auto py-12 px-4 max-w-5xl">
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <nav className="flex items-center text-sm text-muted-foreground">
            <Link href="/">
              <span className="hover:text-primary cursor-pointer">Home</span>
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="/portfolio">
              <span className="hover:text-primary cursor-pointer">Portfolio</span>
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-foreground">{caseStudy.client}</span>
          </nav>
        </div>
        
        {/* Header Section */}
        <div className="mb-12">
          <Link href="/portfolio">
            <div className="inline-flex items-center text-muted-foreground hover:text-primary mb-4 cursor-pointer">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span>Back to Portfolio</span>
            </div>
          </Link>
          
          <FadeInText as="h1" className="text-4xl md:text-5xl font-bold mb-2">
            {caseStudy.title}
          </FadeInText>
          
          <FadeInText as="p" className="text-xl md:text-2xl text-muted-foreground mb-6" delay={0.1}>
            {caseStudy.client}
          </FadeInText>
          
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge className="text-sm">{caseStudy.industry}</Badge>
            {caseStudy.services.map(service => (
              <Badge key={service} variant="outline" className="text-sm">{service}</Badge>
            ))}
          </div>
        </div>
        
        {/* Hero Image Section */}
        <ScrollReveal>
          <div className="w-full h-64 md:h-80 bg-primary/10 rounded-lg mb-12 flex items-center justify-center overflow-hidden">
            <div className="w-full h-full bg-gradient-to-r from-primary/20 to-primary/5 flex items-center justify-center">
              <span className="text-3xl font-bold text-primary">{caseStudy.client}</span>
            </div>
          </div>
        </ScrollReveal>
        
        {/* Overview & Results */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <ScrollReveal className="md:col-span-2">
            <div>
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-muted-foreground mb-4">{caseStudy.description}</p>
              
              {caseStudy.testimonial && (
                <div className="bg-muted p-6 rounded-lg mt-6">
                  <p className="italic mb-4">{caseStudy.testimonial.quote}</p>
                  <div>
                    <p className="font-semibold">{caseStudy.testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{caseStudy.testimonial.position}</p>
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <div>
              <h2 className="text-2xl font-bold mb-4">Key Results</h2>
              <div className="grid grid-cols-1 gap-4">
                {caseStudy.results.map(result => (
                  <Card key={result.label}>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-primary mb-1">{result.value}</div>
                      <div className="text-sm">{result.label}</div>
                      {result.change && (
                        <div className="text-xs text-muted-foreground">{result.change}</div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-6">
                <ShareResults 
                  title={`${caseStudy.title} - ${caseStudy.client} Case Study`}
                  summary={caseStudy.description}
                  scores={Object.fromEntries(
                    caseStudy.results.map(result => [result.label, parseInt(result.value) || 0])
                  )}
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
        
        {/* Detailed Case Study Information */}
        <ScrollReveal>
          <Tabs defaultValue="challenge" className="w-full mb-12">
            <TabsList className="w-full grid grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="challenge">Challenge</TabsTrigger>
              <TabsTrigger value="solution">Solution</TabsTrigger>
              <TabsTrigger value="process">Process</TabsTrigger>
              <TabsTrigger value="impact">Impact</TabsTrigger>
            </TabsList>
            
            <TabsContent value="challenge" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center">
                  <Award className="mr-2 h-5 w-5 text-primary" />
                  The Challenge
                </h3>
                <div className="whitespace-pre-line text-muted-foreground">
                  {caseStudy.challenge}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="solution" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center">
                  <Award className="mr-2 h-5 w-5 text-primary" />
                  Our Solution
                </h3>
                <div className="whitespace-pre-line text-muted-foreground mb-6">
                  {caseStudy.solution}
                </div>
                
                <h4 className="text-lg font-semibold">Key Technologies Used</h4>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  {caseStudy.keyTechnologies.map((tech, index) => (
                    <li key={index}>{tech}</li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="process" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center">
                  <Award className="mr-2 h-5 w-5 text-primary" />
                  Our Process
                </h3>
                
                <div className="space-y-6 mt-4">
                  {caseStudy.processDetails.map((phase, index) => (
                    <div key={index} className="relative pl-8 pb-6 border-l border-muted last:border-0 last:pb-0">
                      <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-primary"></div>
                      <h4 className="text-lg font-semibold">{phase.phase}</h4>
                      <p className="text-muted-foreground">{phase.description}</p>
                      <p className="text-sm text-muted-foreground mt-1">Duration: {phase.duration}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="impact" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5 text-primary" />
                  Long-Term Impact
                </h3>
                <div className="whitespace-pre-line text-muted-foreground">
                  {caseStudy.longTermImpact}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </ScrollReveal>
        
        {/* Call to Action */}
        <ScrollReveal direction="up">
          <div className="bg-muted rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Business?</h2>
            <p className="mb-6 text-muted-foreground max-w-2xl mx-auto">
              Let's discuss how our AI-powered solutions can deliver similar results for your organization.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button size="lg">Schedule a Consultation</Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" size="lg">
                  Explore Our Services
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
        
        {/* Related Case Studies */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Case Studies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioItems
              .filter(item => item.id !== caseStudy.id)
              .slice(0, 3)
              .map((item, index) => (
                <ScrollReveal key={item.id} delay={index * 0.1}>
                  <Card className="h-full hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="font-bold mb-1">{item.title}</div>
                      <div className="text-sm text-muted-foreground mb-3">{item.client}</div>
                      <div className="flex gap-2 mb-4">
                        {item.services.slice(0, 2).map(service => (
                          <Badge key={service} variant="outline" className="text-xs">{service}</Badge>
                        ))}
                        {item.services.length > 2 && <Badge variant="outline" className="text-xs">+{item.services.length - 2}</Badge>}
                      </div>
                      <Link href={`/portfolio/${item.id}`}>
                        <Button variant="link" className="p-0">
                          View Case Study
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}