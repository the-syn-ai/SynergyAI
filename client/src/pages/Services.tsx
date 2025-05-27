import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LetsTalkButton } from "@/components/common/LetsTalkButton";
import { Link } from "wouter";

const services = [
  {
    id: "ghl",
    title: "GHL Integration & Setup",
    description: `Complete GoHighLevel platform integration and setup, including:
    • Custom workflow automation
    • Sales funnel creation
    • Appointment scheduling
    • Lead capture forms
    • Marketing automation`,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
  },
  {
    id: "web",
    title: "Web Design & Hosting",
    description: `Professional web design and hosting solutions:
    • Custom website development
    • Search engine optimization
    • Cross-browser compatibility
    • Secure hosting
    • Performance optimization`,
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8"
  },
  {
    id: "crm",
    title: "CRM Solutions",
    description: `Custom CRM development and automation:
    • Contact management
    • Lead tracking
    • Sales pipeline automation
    • Customer segmentation
    • Performance analytics`,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978"
  },
  {
    id: "email",
    title: "Email Automation",
    description: `Comprehensive email marketing automation:
    • Campaign creation
    • Audience segmentation
    • A/B testing
    • Performance tracking
    • Template design`,
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f"
  },
  {
    id: "messaging",
    title: "AI Messaging",
    description: `Intelligent messaging and chat solutions:
    • 24/7 automated customer support
    • Smart chatbots
    • Lead qualification
    • FAQ automation
    • Seamless handoff to human operators`,
    image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624"
  },
  {
    id: "calls",
    title: "AI Call Bot",
    description: `Intelligent call handling system:
    • Automated appointment scheduling
    • Call routing
    • Voice recognition
    • Call transcription
    • Integration with CRM`,
    image: "https://images.unsplash.com/photo-1549050144-88ec4d9d1859"
  },
  {
    id: "reviews",
    title: "AI Review Management",
    description: `Automated review management system:
    • Review collection
    • AI-powered responses
    • Sentiment analysis
    • Performance tracking
    • Review integration`,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
  },
  {
    id: "leads",
    title: "Lead Generation",
    description: `Comprehensive lead generation solutions for companies:
    • Multi-channel lead capture
    • AI-powered lead qualification
    • Automated follow-up sequences
    • Lead scoring and prioritization
    • Integration with existing CRM systems
    • Performance analytics and reporting`,
    image: "https://images.unsplash.com/photo-1553484771-371a605b060b"
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
                  <p className="text-lg text-muted-foreground whitespace-pre-line mb-6">
                    {service.description}
                  </p>
                  {service.id === "web" && (
                    <Link href="/services/seo-optimization">
                      <Button variant="outline" className="mt-2">Learn More About SEO</Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Let's Talk section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mt-20"
      >
        <h2 className="text-2xl font-semibold mb-4">Ready to Transform Your Business?</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Schedule a free consultation to discuss how we can help automate your business
        </p>
        <LetsTalkButton />
      </motion.div>
    </div>
  );
}