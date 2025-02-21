import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const backgroundVariants = {
  initial: {
    backgroundPosition: "0% 50%",
  },
  animate: {
    backgroundPosition: "100% 50%",
    transition: {
      duration: 20,
      repeat: Infinity,
      repeatType: "reverse" as const,
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
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current || !imageRef.current) return;

    // GSAP animations
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });

    timeline
      .from(headingRef.current, {
        scale: 0.9,
        opacity: 0.5,
        duration: 1,
      })
      .from(imageRef.current, {
        x: 100,
        opacity: 0,
        duration: 1,
      }, "-=0.5");

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <motion.section
      ref={sectionRef}
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
              ref={headingRef}
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
              integration and AI-powered tools. Transform your operations 
              today.
            </motion.p>

            <motion.div 
              variants={textVariants}
              className="space-x-4"
            >
              <Link href="/contact">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 transform transition-transform hover:scale-105"
                >
                  Get Started
                </Button>
              </Link>
              <Link href="/services">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="transform transition-transform hover:scale-105"
                >
                  View Services
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            ref={imageRef}
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