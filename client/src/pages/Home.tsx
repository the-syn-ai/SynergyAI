import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import CompanyAIChat from "@/components/home/CompanyAIChat";
import Newsletter from "@/components/home/Newsletter";
import FAQ from "@/components/home/FAQ";
import DatabaseConnectionVisualizer from "@/components/home/DatabaseConnectionVisualizer";
import { PageTransition, ElementTransition } from "@/components/animations";
import { useEffect } from "react";
import { useLoading } from "@/hooks/use-loading";

export default function Home() {
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    // Set initial loading state
    startLoading('home');
    
    // Simulate loading delay
    const timer = setTimeout(() => {
      stopLoading('home');
    }, 500);
    
    // Cleanup function
    return () => clearTimeout(timer);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        
        {/* Database Connection Visualization Section */}
        <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
          <div className="container mx-auto px-4">
            <ElementTransition type="fade" delay={0.2}>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">How Our Database Works</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Visualize how your website data securely flows through our analysis system
                </p>
              </div>
            </ElementTransition>
            
            <ElementTransition type="slide" direction="up" delay={0.4}>
              <DatabaseConnectionVisualizer />
            </ElementTransition>
          </div>
        </section>
        
        <FAQ />
        <Newsletter />
      </div>
    </PageTransition>
  );
}