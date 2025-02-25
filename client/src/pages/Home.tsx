import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Newsletter from "@/components/home/Newsletter";
import FAQ from "@/components/home/FAQ";

export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <FAQ />
      <Newsletter />
    </div>
  );
}