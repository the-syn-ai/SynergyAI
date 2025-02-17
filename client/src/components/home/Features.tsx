import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Box, Mail, Phone, MessageSquare, Star } from "lucide-react";

const features = [
  {
    icon: Box,
    title: "GHL Integration",
    description: "Complete GoHighLevel setup and integration for your business automation needs."
  },
  {
    icon: Globe,
    title: "Web Design & Hosting",
    description: "Professional web design and reliable hosting solutions for your online presence."
  },
  {
    icon: Mail,
    title: "Email Automation",
    description: "Automated email marketing campaigns and customer engagement sequences."
  },
  {
    icon: Phone,
    title: "AI Call Bot",
    description: "Intelligent call handling and automated appointment scheduling."
  },
  {
    icon: MessageSquare,
    title: "CRM Solutions",
    description: "Custom CRM build and automation to streamline your customer relationships."
  },
  {
    icon: Star,
    title: "AI Review Management",
    description: "Automated review collection and response system powered by AI."
  }
];

export default function Features() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive AI-powered solutions for modern businesses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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