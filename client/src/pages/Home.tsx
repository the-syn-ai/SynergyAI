import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Newsletter from "@/components/home/Newsletter";
import Chatbot from "@/components/home/Chatbot";
import AiDemo from "@/components/home/AiDemo";

export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <AiDemo />
      <Newsletter />
      <Chatbot />
    </div>
  );
}