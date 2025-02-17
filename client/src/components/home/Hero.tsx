import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const backgroundVariants = {
  initial: {
    backgroundPosition: "0% 50%",
  },
  animate: {
    backgroundPosition: "100% 50%",
    transition: {
      duration: 20,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "linear",
    },
  },
};

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
  return (
    <motion.section
      className="min-h-screen pt-16 flex items-center relative overflow-hidden"
      initial="initial"
      animate="animate"
      variants={backgroundVariants}
      style={{
        background: "linear-gradient(120deg, var(--background) 0%, var(--muted) 50%, var(--background) 100%)",
        backgroundSize: "200% 200%",
      }}
    >
      <div className="container mx-auto px-4">
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
          >
            <motion.h1 
              variants={textVariants}
              className="text-5xl font-bold leading-tight mb-6"
            >
              Power Your Business with{" "}
              <span className="text-primary">SynergyAI</span> Solutions
            </motion.h1>

            <motion.p 
              variants={textVariants}
              className="text-xl text-muted-foreground mb-8"
            >
              Experience the future of business automation with our comprehensive 
              GoHighLevel integration and AI-powered tools. Transform your operations 
              today.
            </motion.p>

            <motion.div 
              variants={textVariants}
              className="space-x-4"
            >
              <Link href="/contact">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Get Started
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline">
                  View Services
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ 
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 20
            }}
            className="relative aspect-video"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-lg" />
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
              alt="Business Automation"
              className="rounded-lg object-cover w-full h-full shadow-xl"
            />
          </motion.div>
        </div>
      </div>

      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background" />
      </motion.div>
    </motion.section>
  );
}