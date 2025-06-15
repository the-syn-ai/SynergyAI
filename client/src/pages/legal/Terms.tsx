import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Terms() {
  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link href="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-primary via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="text-xl text-muted-foreground mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing and using SynergyAI Automations services, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Description of Services</h2>
              <p className="mb-4">
                SynergyAI Automations provides AI-powered business automation solutions, including but not limited to:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>GoHighLevel integration and setup</li>
                <li>Web design and hosting services</li>
                <li>CRM solutions and implementation</li>
                <li>Email automation and marketing</li>
                <li>AI chatbot and call management systems</li>
                <li>Lead generation and management tools</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">User Obligations</h2>
              <p className="mb-4">
                As a user of our services, you agree to:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Use our services in compliance with applicable laws</li>
                <li>Not engage in any prohibited activities</li>
                <li>Respect intellectual property rights</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Payment Terms</h2>
              <p className="mb-4">
                Payment terms for our services:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Payment is due upon service delivery or as specified in your agreement</li>
                <li>All fees are non-refundable unless otherwise stated</li>
                <li>Late payments may incur additional charges</li>
                <li>Prices are subject to change with notice</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
              <p className="mb-4">
                All content, features, and functionality of our services are owned by SynergyAI Automations and are protected by copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
              <p className="mb-4">
                SynergyAI Automations shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Service Availability</h2>
              <p className="mb-4">
                While we strive for 99.9% uptime, we do not guarantee uninterrupted service availability. Maintenance and updates may require temporary service interruptions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Termination</h2>
              <p className="mb-4">
                Either party may terminate services with appropriate notice. Upon termination, your access to our services will cease, and any outstanding obligations remain in effect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
              <p className="mb-4">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Continued use of our services constitutes acceptance of modified terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <p className="mb-4">
                For questions regarding these terms, contact us at:
              </p>
              <div className="bg-muted/20 p-4 rounded-lg">
                <p className="mb-2"><strong>SynergyAI Automations</strong></p>
                <p className="mb-2">Email: contact@synergyai-automations.com</p>
                <p>Website: synergyai-automations.com</p>
              </div>
            </section>
          </div>
        </div>
      </motion.div>
    </div>
  );
}