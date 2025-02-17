import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="min-h-screen pt-16 flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold leading-tight mb-6">
              Transform Your Business with AI Solutions
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Harness the power of artificial intelligence to drive innovation and growth
            </p>
            <div className="space-x-4">
              <Button size="lg">Request Demo</Button>
              <Button size="lg" variant="outline">Learn More</Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative aspect-video"
          >
            <img
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
              alt="AI Technology"
              className="rounded-lg object-cover w-full h-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
