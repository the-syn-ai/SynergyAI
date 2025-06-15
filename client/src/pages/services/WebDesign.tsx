import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle, ArrowLeft, Globe, Smartphone, Search, Shield, Zap, Code } from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Custom Web Development",
    description: "Bespoke websites built with modern technologies and best practices for optimal performance."
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Responsive designs that look and function perfectly on all devices and screen sizes."
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description: "Built-in SEO best practices to help your website rank higher in search results."
  },
  {
    icon: Shield,
    title: "Secure Hosting",
    description: "Enterprise-grade hosting with SSL certificates, backups, and 99.9% uptime guarantee."
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Lightning-fast loading speeds with optimized code and content delivery networks."
  },
  {
    icon: Code,
    title: "Clean Code",
    description: "Well-structured, maintainable code following industry standards and best practices."
  }
];

const services = [
  "Custom website design and development",
  "E-commerce platform integration", 
  "Content management system (CMS) setup",
  "Mobile-responsive design implementation",
  "Search engine optimization (SEO)",
  "Website performance optimization",
  "SSL certificate installation and security",
  "Domain registration and DNS management",
  "Website maintenance and updates",
  "Analytics and tracking implementation",
  "Social media integration",
  "Contact forms and lead capture",
  "Blog and content management",
  "Payment gateway integration"
];

export default function WebDesign() {
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
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-blue-500 to-purple-600 bg-clip-text text-transparent leading-tight py-2">
            Web Design & Hosting
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Professional web design and reliable hosting solutions that drive results. From concept to launch, we create websites that convert visitors into customers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div>
            <img
              src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Web Design & Development"
              className="rounded-lg object-cover w-full aspect-video shadow-xl"
            />
          </div>
          
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Modern Web Solutions</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Your website is often the first impression customers have of your business. We create stunning, high-performance websites that not only look great but also drive conversions and grow your business.
            </p>
            <div className="grid grid-cols-1 gap-4">
              {features.map((feature, index) => (
                <Card key={index} className="border-2 hover:border-primary/30 transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <feature.icon className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold mb-1">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">Complete Web Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center space-x-3"
              >
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span className="text-lg">{service}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <Card className="text-center p-6 border-2 hover:border-primary/30 transition-all">
            <CardHeader>
              <CardTitle className="text-2xl">Starter</CardTitle>
              <div className="text-3xl font-bold text-primary">$2,999</div>
              <p className="text-muted-foreground">Perfect for small businesses</p>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>• 5-page website</p>
              <p>• Mobile responsive design</p>
              <p>• Basic SEO optimization</p>
              <p>• Contact form integration</p>
              <p>• 1 year hosting included</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 border-2 border-primary/50 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm">
              Most Popular
            </div>
            <CardHeader>
              <CardTitle className="text-2xl">Professional</CardTitle>
              <div className="text-3xl font-bold text-primary">$4,999</div>
              <p className="text-muted-foreground">For growing businesses</p>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>• 10-page website</p>
              <p>• Advanced SEO optimization</p>
              <p>• E-commerce integration</p>
              <p>• Analytics setup</p>
              <p>• 2 years hosting included</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 border-2 hover:border-primary/30 transition-all">
            <CardHeader>
              <CardTitle className="text-2xl">Enterprise</CardTitle>
              <div className="text-3xl font-bold text-primary">Custom</div>
              <p className="text-muted-foreground">For large organizations</p>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>• Unlimited pages</p>
              <p>• Custom functionality</p>
              <p>• API integrations</p>
              <p>• Premium support</p>
              <p>• Dedicated hosting</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center bg-gradient-to-br from-primary/5 to-blue-500/5 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-6">Ready to Launch Your Website?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get a professional website that drives results with our comprehensive web design and hosting solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90">
                Get Started Today
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline">
                Request Quote
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}