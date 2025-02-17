import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    id: "ml",
    title: "Machine Learning",
    description: "Custom AI models trained on your data for precise predictions and insights.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
  },
  {
    id: "vision",
    title: "Computer Vision",
    description: "Advanced image and video analysis for automated visual understanding.",
    image: "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf"
  },
  {
    id: "analytics",
    title: "Predictive Analytics",
    description: "Data-driven forecasting to optimize business decisions.",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
  }
];

export default function Services() {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-12">Our Services</h1>
      
      <div className="space-y-20">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            id={service.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div className={index % 2 === 0 ? "order-1 lg:order-none" : ""}>
              <img
                src={service.image}
                alt={service.title}
                className="rounded-lg object-cover w-full aspect-video"
              />
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-muted-foreground">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
