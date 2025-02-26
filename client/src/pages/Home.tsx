import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import CompanyAIChat from "@/components/home/CompanyAIChat";
import Newsletter from "@/components/home/Newsletter";
import FAQ from "@/components/home/FAQ";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
      
      {/* AI Website Analysis Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Website Analysis AI</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get instant insights about your company website with our AI-powered analysis tool
            </p>
          </motion.div>
          
          <CompanyAIChat />
        </div>
      </section>
      
      <FAQ />
      <Newsletter />
    </div>
  );
}