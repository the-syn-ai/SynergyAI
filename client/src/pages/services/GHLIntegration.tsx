import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { CheckCircle, ArrowLeft, Zap, Target, Users, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Automated Workflows",
    description: "Set up complex automation sequences that trigger based on customer behavior and preferences."
  },
  {
    icon: Target,
    title: "Lead Scoring",
    description: "Automatically score and qualify leads based on their engagement and profile data."
  },
  {
    icon: Users,
    title: "Contact Management",
    description: "Centralize all customer data with advanced segmentation and tagging capabilities."
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description: "Track campaign performance and ROI with comprehensive reporting dashboards."
  }
];

const benefits = [
  "Complete GoHighLevel platform setup and configuration",
  "Custom funnel creation tailored to your business model", 
  "Automated appointment scheduling with calendar integration",
  "Lead capture forms with smart routing capabilities",
  "Email and SMS automation sequences",
  "Pipeline management and deal tracking",
  "Custom reporting and analytics dashboards",
  "Integration with existing tools and platforms",
  "Staff training and ongoing support",
  "Performance optimization and monitoring"
];

export default function GHLIntegration() {
  const [, setLocation] = useLocation();

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setLocation("/contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link href="/services">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Button>
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-blue-500 to-purple-600 bg-clip-text text-transparent gradient-text-safe">
            GoHighLevel Integration & Setup
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Transform your business operations with a complete GoHighLevel setup designed to automate your sales and marketing processes from lead capture to conversion.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div>
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="GoHighLevel Integration"
              className="rounded-lg object-cover w-full aspect-video shadow-xl"
            />
          </div>
          
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Why Choose Our GHL Integration?</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              GoHighLevel is a powerful all-in-one platform, but proper setup is crucial for success. Our expert team ensures your GHL implementation is optimized for your specific business needs, maximizing ROI from day one.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <Card key={index} className="border-2 hover:border-primary/30 transition-all">
                  <CardContent className="p-4">
                    <feature.icon className="w-8 h-8 text-primary mb-2" />
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">What's Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center space-x-3"
              >
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span className="text-lg">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center bg-gradient-to-br from-primary/5 to-blue-500/5 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get a complete GoHighLevel setup tailored to your business needs with our expert implementation and ongoing support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90">
                Get Started Today
              </Button>
            </Link>
            <Button size="lg" variant="outline" onClick={handleContactClick}>
              Schedule Consultation
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}