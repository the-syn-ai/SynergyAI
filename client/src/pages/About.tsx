import { useEffect } from 'react';
import { useLoading } from '@/hooks/use-loading';
import { LetsTalkButton } from '@/components/common/LetsTalkButton';

export default function About() {
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    startLoading('home');
    // Simulate loading delay
    const timer = setTimeout(() => {
      stopLoading('home');
    }, 500);
    return () => clearTimeout(timer);
  }, [startLoading, stopLoading]);

  return (
    <main className="container mx-auto px-4 py-32">
      <section className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">About SynergyAI</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-muted-foreground mb-8 text-center">
            Transforming businesses through innovative AI solutions and strategic automation
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-16">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p>
                At SynergyAI, we're dedicated to helping businesses harness the power of artificial intelligence 
                to streamline operations, enhance customer experiences, and drive growth. Our mission is to make 
                advanced AI technology accessible and practical for businesses of all sizes.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
              <p>
                We envision a future where businesses can seamlessly integrate AI into their operations, 
                making data-driven decisions with confidence and precision. Our goal is to be the catalyst 
                that transforms how businesses operate in the digital age.
              </p>
            </div>
          </div>
          
          <div className="my-16">
            <h2 className="text-3xl font-semibold mb-6">Our Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-medium mb-3">Innovation</h3>
                <p>We constantly push the boundaries of what's possible with AI, developing cutting-edge solutions that give our clients a competitive edge.</p>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-medium mb-3">Integrity</h3>
                <p>We operate with transparency and ethical standards, ensuring that our AI technologies are used responsibly and for the benefit of all stakeholders.</p>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-medium mb-3">Excellence</h3>
                <p>We are committed to delivering exceptional results through meticulous attention to detail and a relentless pursuit of quality in everything we do.</p>
              </div>
            </div>
          </div>
          
          <div className="my-16">
            <h2 className="text-3xl font-semibold mb-6">Our Team</h2>
            <p>
              SynergyAI brings together a diverse team of AI specialists, software engineers, data scientists, 
              and business strategists. Our interdisciplinary approach allows us to tackle complex challenges 
              from multiple angles, resulting in comprehensive solutions that address all aspects of your business needs.
            </p>
            
            <p className="mt-4">
              Our team members have backgrounds from leading tech companies and research institutions, 
              bringing a wealth of experience and innovative thinking to every project we undertake.
            </p>
          </div>
          
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-semibold mb-6">Ready to Transform Your Business?</h2>
            <p className="max-w-2xl mx-auto mb-8">
              Let's discuss how SynergyAI can help you leverage artificial intelligence to overcome challenges 
              and seize new opportunities in your industry.
            </p>
            
            <div className="flex justify-center">
              <LetsTalkButton />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}