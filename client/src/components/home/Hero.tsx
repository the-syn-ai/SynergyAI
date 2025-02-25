import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <motion.section
      ref={sectionRef}
      className="min-h-[85vh] flex items-center relative overflow-hidden bg-gradient-to-br from-background via-background/95 to-muted/30"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
            className="z-10"
          >
            <motion.h1 
              variants={textVariants}
              className="text-4xl md:text-5xl font-bold leading-tight mb-6"
            >
              Power Your Business with{" "}
              <span className="text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">SynergyAI</span> Solutions
            </motion.h1>

            <motion.p 
              variants={textVariants}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl"
            >
              Experience the future of business automation with our comprehensive 
              integration and AI-powered tools. Transform your operations 
              today.
            </motion.p>

            <motion.div 
              variants={textVariants}
            >
              <Link href="/services">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="transform transition-transform hover:scale-105 border-primary/30 hover:border-primary/60 text-primary"
                >
                  View Services <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.8,
              delay: 0.3
            }}
            className="relative hidden lg:block"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-primary/5 rounded-2xl blur-xl opacity-60" />
            <div className="relative bg-black/20 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="AI-Powered Business Solutions"
                className="rounded-lg object-cover w-full h-full shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-lg" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Abstract background elements */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 1.5, delay: 0.2 }}
      />
      <motion.div 
        className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-gradient-to-l from-primary/5 to-primary/10 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1.5, delay: 0.4 }}
      />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/20 to-background" />
      </motion.div>
    </motion.section>
  );
}