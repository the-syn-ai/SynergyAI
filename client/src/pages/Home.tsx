import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Newsletter from "@/components/home/Newsletter";
import CompanyAIChat from "@/components/home/CompanyAIChat";

export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <section className="py-20 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Discover Your Company's Digital Presence</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-4">
              Enter your company's website URL below and let our AI analyze your content. 
              Get instant insights and answers about your business presence.
            </p>
          </div>
          <CompanyAIChat />
        </div>
      </section>
      <Newsletter />
    </div>
  );
}