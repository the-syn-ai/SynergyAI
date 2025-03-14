import { useEffect } from 'react';
import { useLoading } from '@/hooks/use-loading';
import { LetsTalkButton } from '@/components/common/LetsTalkButton';
import { 
  PageTransition, 
  ElementTransition, 
  StaggeredContainer, 
  StaggeredItem 
} from '@/components/animations';

export default function About() {
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    startLoading('about');
    // Simulate loading delay
    const timer = setTimeout(() => {
      stopLoading('about');
    }, 500);
    return () => clearTimeout(timer);
  }, [startLoading, stopLoading]);

  return (
    <PageTransition>
      <main className="container mx-auto px-4 py-32">
        <section className="max-w-4xl mx-auto">
          <ElementTransition type="fade">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
              Helping Businesses Thrive with AI-Powered Automation
            </h1>
          </ElementTransition>
          
          <ElementTransition type="fade" delay={0.2}>
            <p className="text-xl text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
              At SynergyAI Automations, we specialize in helping businesses streamline operations, enhance customer engagement, and boost revenue using AI-driven automation. Our mission is to make advanced AI tools and automation accessible to businesses, empowering them to scale efficiently and stay ahead in a competitive market.
            </p>
          </ElementTransition>
          
          <ElementTransition type="slide" direction="up" delay={0.3}>
            <div className="my-16">
              <h2 className="text-3xl font-semibold mb-6">Who We Are</h2>
              <p className="text-lg">
                We are a business automation agency that helps companies simplify processes, optimize workflows, and improve client interactions through cutting-edge AI technology. Our team of automation experts, AI strategists, and business growth specialists is dedicated to implementing practical AI solutions that drive real results.
              </p>
            </div>
          </ElementTransition>
          
          <ElementTransition type="slide" direction="up" delay={0.4}>
            <div className="my-16">
              <h2 className="text-3xl font-semibold mb-6">What We Do</h2>
              <p className="text-lg mb-6">
                We provide a full suite of business automation services designed to help companies grow and operate more efficiently, including:
              </p>
              
              <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <StaggeredItem>
                  <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-medium mb-3">AI-Powered CRM & Marketing Automation</h3>
                    <p>Automate customer interactions, follow-ups, and lead nurturing for better conversion rates.</p>
                  </div>
                </StaggeredItem>
                
                <StaggeredItem>
                  <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-medium mb-3">Workflow & Process Automation</h3>
                    <p>Eliminate manual tasks and streamline daily operations.</p>
                  </div>
                </StaggeredItem>
                
                <StaggeredItem>
                  <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-medium mb-3">AI-Driven Customer Support</h3>
                    <p>Implement chatbots and AI assistants for 24/7 customer engagement.</p>
                  </div>
                </StaggeredItem>
                
                <StaggeredItem>
                  <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-medium mb-3">Sales Pipeline Optimization</h3>
                    <p>Automate sales tracking, appointment scheduling, and follow-ups.</p>
                  </div>
                </StaggeredItem>
                
                <StaggeredItem>
                  <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-medium mb-3">Lead Generation & Nurturing</h3>
                    <p>Use AI-driven campaigns to attract and convert high-quality leads.</p>
                  </div>
                </StaggeredItem>
                
                <StaggeredItem>
                  <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-medium mb-3">Reputation & Review Management</h3>
                    <p>Automate review requests, manage customer feedback, and enhance brand trust.</p>
                  </div>
                </StaggeredItem>
                
                <StaggeredItem className="md:col-span-2">
                  <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-medium mb-3">Custom AI Integrations</h3>
                    <p>Seamlessly connect AI automation tools with your existing business systems.</p>
                  </div>
                </StaggeredItem>
              </StaggeredContainer>
            </div>
          </ElementTransition>
          
          <ElementTransition type="slide" direction="up" delay={0.5}>
            <div className="my-16">
              <h2 className="text-3xl font-semibold mb-6">Our Approach</h2>
              <p className="text-lg mb-6">
                We focus on real-world business applications of AI, ensuring that automation is easy to use, highly effective, and tailored to your unique needs. Our process involves:
              </p>
              
              <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <StaggeredItem>
                  <div className="p-6 border rounded-lg hover:border-primary/50 transition-colors">
                    <h3 className="text-xl font-medium mb-3">1. Assessing Business Needs</h3>
                    <p>We analyze your operations to identify automation opportunities.</p>
                  </div>
                </StaggeredItem>
                
                <StaggeredItem>
                  <div className="p-6 border rounded-lg hover:border-primary/50 transition-colors">
                    <h3 className="text-xl font-medium mb-3">2. Developing a Custom Strategy</h3>
                    <p>We design an AI-driven roadmap for optimizing processes and engagement.</p>
                  </div>
                </StaggeredItem>
                
                <StaggeredItem>
                  <div className="p-6 border rounded-lg hover:border-primary/50 transition-colors">
                    <h3 className="text-xl font-medium mb-3">3. Implementing & Integrating Solutions</h3>
                    <p>We deploy automation tools that enhance productivity and customer experience.</p>
                  </div>
                </StaggeredItem>
                
                <StaggeredItem>
                  <div className="p-6 border rounded-lg hover:border-primary/50 transition-colors">
                    <h3 className="text-xl font-medium mb-3">4. Ongoing Optimization & Support</h3>
                    <p>We continuously refine automation strategies to maximize ROI.</p>
                  </div>
                </StaggeredItem>
              </StaggeredContainer>
            </div>
          </ElementTransition>
          
          <ElementTransition type="scale" delay={0.6}>
            <div className="my-16 p-8 bg-muted/30 rounded-lg border">
              <h2 className="text-3xl font-semibold mb-6">Why Work with Us?</h2>
              <ul className="space-y-4 text-lg">
                <li className="flex items-start">
                  <span className="text-primary text-xl mr-2">✅</span>
                  <span><strong>AI & Automation Experts</strong> – Proven strategies that drive business growth.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary text-xl mr-2">✅</span>
                  <span><strong>Customized Solutions</strong> – We tailor AI tools to fit your business goals.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary text-xl mr-2">✅</span>
                  <span><strong>Seamless Implementation</strong> – Easy-to-integrate automation that works with your existing systems.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary text-xl mr-2">✅</span>
                  <span><strong>Revenue-Focused Approach</strong> – AI solutions designed to increase sales, retention, and efficiency.</span>
                </li>
              </ul>
            </div>
          </ElementTransition>
          
          <ElementTransition type="fade" delay={0.7}>
            <div className="mt-16 text-center">
              <h2 className="text-3xl font-semibold mb-6">Scale Your Business with AI</h2>
              <p className="max-w-2xl mx-auto mb-8 text-lg">
                AI automation is the key to growing faster, working smarter, and serving customers better. Whether you need smarter marketing, streamlined operations, or enhanced customer interactions, SynergyAI Automations is here to help.
              </p>
              
              <div className="flex justify-center">
                <LetsTalkButton />
              </div>
            </div>
          </ElementTransition>
        </section>
      </main>
    </PageTransition>
  );
}