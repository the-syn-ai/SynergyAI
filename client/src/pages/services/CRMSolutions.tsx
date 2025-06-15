import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { CheckCircle, ArrowLeft, Users, BarChart3, Target, Workflow, Calendar, MessageSquare } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Contact Management",
    description: "Centralize all customer information with advanced segmentation and relationship tracking."
  },
  {
    icon: BarChart3,
    title: "Sales Pipeline",
    description: "Visual pipeline management with automated deal progression and forecasting."
  },
  {
    icon: Target,
    title: "Lead Scoring",
    description: "Intelligent lead qualification based on behavior, demographics, and engagement."
  },
  {
    icon: Workflow,
    title: "Process Automation",
    description: "Automate repetitive tasks and workflows to increase team productivity."
  },
  {
    icon: Calendar,
    title: "Activity Tracking",
    description: "Monitor all customer interactions, calls, emails, and meetings in one place."
  },
  {
    icon: MessageSquare,
    title: "Communication Hub",
    description: "Integrated email, SMS, and chat capabilities for seamless customer communication."
  }
];

const benefits = [
  "Custom CRM platform development and setup",
  "Contact database migration and organization", 
  "Sales pipeline design and optimization",
  "Lead scoring and qualification automation",
  "Email marketing integration and automation",
  "Task and activity management systems",
  "Advanced reporting and analytics dashboards",
  "Third-party integrations (email, calendar, phone)",
  "Mobile app access and synchronization",
  "Team collaboration and permission management",
  "Customer support ticket management",
  "Revenue forecasting and goal tracking",
  "Data backup and security implementation",
  "Staff training and ongoing support"
];

export default function CRMSolutions() {
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
            CRM Solutions
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Build stronger customer relationships with our custom CRM solutions designed to streamline your sales process, improve customer satisfaction, and drive revenue growth.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div>
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="CRM Solutions"
              className="rounded-lg object-cover w-full aspect-video shadow-xl"
            />
          </div>
          
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Powerful CRM Features</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our CRM solutions are tailored to your business needs, helping you manage customer relationships more effectively while automating routine tasks and providing actionable insights.
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
          <h2 className="text-4xl font-bold text-center mb-12">Complete CRM Implementation</h2>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <Card className="text-center p-6 border-2 hover:border-primary/30 transition-all">
            <CardHeader>
              <CardTitle className="text-2xl">Essential</CardTitle>
              <div className="text-3xl font-bold text-primary">$3,999</div>
              <p className="text-muted-foreground">For small teams</p>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>• Up to 1,000 contacts</p>
              <p>• Basic pipeline management</p>
              <p>• Email integration</p>
              <p>• Mobile app access</p>
              <p>• Standard reporting</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 border-2 border-primary/50 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm">
              Most Popular
            </div>
            <CardHeader>
              <CardTitle className="text-2xl">Professional</CardTitle>
              <div className="text-3xl font-bold text-primary">$7,999</div>
              <p className="text-muted-foreground">For growing businesses</p>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>• Up to 10,000 contacts</p>
              <p>• Advanced automation</p>
              <p>• Custom fields & workflows</p>
              <p>• Advanced analytics</p>
              <p>• API integrations</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 border-2 hover:border-primary/30 transition-all">
            <CardHeader>
              <CardTitle className="text-2xl">Enterprise</CardTitle>
              <div className="text-3xl font-bold text-primary">Custom</div>
              <p className="text-muted-foreground">For large organizations</p>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>• Unlimited contacts</p>
              <p>• Custom development</p>
              <p>• White-label options</p>
              <p>• Dedicated support</p>
              <p>• Advanced security</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center bg-gradient-to-br from-primary/5 to-blue-500/5 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-6">Ready to Optimize Your Customer Relationships?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transform your sales process with a custom CRM solution designed specifically for your business needs and workflows.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90">
                Get Started Today
              </Button>
            </Link>
            <Button size="lg" variant="outline" onClick={handleContactClick}>
              Schedule Demo
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}