import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import CompanyAIChat from "@/components/home/CompanyAIChat";
import Newsletter from "@/components/home/Newsletter";
import FAQ from "@/components/home/FAQ";
import DatabaseConnectionVisualizer from "@/components/home/DatabaseConnectionVisualizer";
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
      
      {/* Database Connection Visualization Section */}
      <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">How Our Database Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Visualize how your website data securely flows through our analysis system
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <DatabaseConnectionVisualizer />
          </motion.div>
        </div>
      </section>
      
      <FAQ />
      <Newsletter />
    </div>
  );
}