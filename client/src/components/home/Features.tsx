import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Eye, LineChart } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Machine Learning",
    description: "Custom AI models trained on your data for precise predictions and insights."
  },
  {
    icon: Eye,
    title: "Computer Vision",
    description: "Advanced image and video analysis for automated visual understanding."
  },
  {
    icon: LineChart,
    title: "Predictive Analytics",
    description: "Data-driven forecasting to optimize business decisions."
  }
];

export default function Features() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground">
            Cutting-edge AI solutions for modern businesses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <feature.icon className="h-12 w-12 mb-4 text-primary" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
