import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import CompanyAIChat from "@/components/home/CompanyAIChat";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";
import FAQ from "@/components/home/FAQ";
import { PageTransition, ElementTransition } from "@/components/animations";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    // Cleanup function
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <PageTransition>
      <div>
        <Hero />
        <Features />
        
        {/* AI Website Analysis Section */}
        <section className="py-20 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4">
            <ElementTransition type="fade" delay={0.2}>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Website Analysis AI</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Get instant insights about your company website with our AI-powered analysis tool
                </p>
              </div>
            </ElementTransition>
            
            <ElementTransition type="slide" direction="up" delay={0.4}>
              <CompanyAIChat />
            </ElementTransition>
          </div>
        </section>
        
        <FAQ />
        <Newsletter />
      </div>
    </PageTransition>
  );
}