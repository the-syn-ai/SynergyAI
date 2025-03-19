import { useState, useEffect } from 'react';
import { LetsTalkButton } from '@/components/common/LetsTalkButton';
import { 
  PageTransition, 
  ElementTransition, 
  StaggeredContainer, 
  StaggeredItem 
} from '@/components/animations';
import { Card, CardContent } from '@/components/ui/card';
import { 
  BarChart3, 
  Search, 
  TrendingUp, 
  FileSearch, 
  ListTodo, 
  LineChart, 
  Lightbulb, 
  Repeat
} from 'lucide-react';

export default function SeoOptimization() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PageTransition>
      <main className="container mx-auto px-4 py-32">
        <section className="max-w-4xl mx-auto">
          <ElementTransition type="fade">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
              SEO Optimization & Keyword Research
            </h1>
          </ElementTransition>
          
          <ElementTransition type="fade" delay={0.2}>
            <p className="text-xl text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
              Improve your online visibility and drive more organic traffic with our comprehensive SEO optimization services and strategic keyword research.
            </p>
          </ElementTransition>
          
          <ElementTransition type="slide" direction="up" delay={0.3}>
            <div className="my-16 bg-muted/30 p-8 rounded-lg border">
              <h2 className="text-3xl font-semibold mb-6">How Our SEO Services Help Your Business</h2>
              <p className="text-lg mb-8">
                Search Engine Optimization is a critical component for online success. Our approach combines technical expertise with content strategy to improve your site's ranking and visibility.
              </p>
              
              <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <StaggeredItem>
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="mb-4 flex justify-center">
                        <Search className="h-12 w-12 text-primary" />
                      </div>
                      <h3 className="text-xl font-medium mb-3 text-center">Keyword Research & Analysis</h3>
                      <p>We identify high-value, relevant keywords that your target audience is searching for, balancing search volume, competition, and conversion potential.</p>
                    </CardContent>
                  </Card>
                </StaggeredItem>
                
                <StaggeredItem>
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="mb-4 flex justify-center">
                        <FileSearch className="h-12 w-12 text-primary" />
                      </div>
                      <h3 className="text-xl font-medium mb-3 text-center">On-Page SEO Optimization</h3>
                      <p>We optimize your website's content, meta tags, headers, and internal linking structure to align with search engine ranking factors.</p>
                    </CardContent>
                  </Card>
                </StaggeredItem>
                
                <StaggeredItem>
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="mb-4 flex justify-center">
                        <BarChart3 className="h-12 w-12 text-primary" />
                      </div>
                      <h3 className="text-xl font-medium mb-3 text-center">Competitor Analysis</h3>
                      <p>We analyze your competitors' strategies to identify opportunities and develop approaches that help you stand out in your industry.</p>
                    </CardContent>
                  </Card>
                </StaggeredItem>
                
                <StaggeredItem>
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="mb-4 flex justify-center">
                        <LineChart className="h-12 w-12 text-primary" />
                      </div>
                      <h3 className="text-xl font-medium mb-3 text-center">Performance Tracking</h3>
                      <p>We monitor your site's performance with analytics tools, providing regular reports on rankings, traffic, and conversions to refine our strategy.</p>
                    </CardContent>
                  </Card>
                </StaggeredItem>
              </StaggeredContainer>
            </div>
          </ElementTransition>
          
          <ElementTransition type="slide" direction="up" delay={0.4}>
            <div className="my-16">
              <h2 className="text-3xl font-semibold mb-6">Our SEO Process</h2>
              <p className="text-lg mb-8">
                We follow a proven, methodical approach to SEO that delivers sustainable results:
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <ListTodo className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">1. Comprehensive Audit</h3>
                    <p>We analyze your current website performance, content quality, technical structure, and backlink profile to identify improvement areas.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">2. Keyword Strategy Development</h3>
                    <p>We develop a customized keyword strategy based on your business goals, industry, and target audience.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Lightbulb className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">3. On-Page Optimization</h3>
                    <p>We optimize content, meta tags, headers, image alt text, and internal linking to improve relevance and readability.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">4. Ongoing Monitoring & Refinement</h3>
                    <p>We continuously track your site's performance, making data-driven adjustments to improve results over time.</p>
                  </div>
                </div>
              </div>
            </div>
          </ElementTransition>
          
          <ElementTransition type="scale" delay={0.5}>
            <div className="my-16 bg-primary/5 p-8 rounded-lg border">
              <h2 className="text-3xl font-semibold mb-6 text-center">SEO Benefits for Your Business</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-medium mb-2">Increased Organic Traffic</h3>
                  <p className="text-muted-foreground">Higher rankings in search results lead to more website visitors without paid advertising.</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Repeat className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-medium mb-2">Sustainable Results</h3>
                  <p className="text-muted-foreground">Unlike paid ads, SEO provides long-term benefits that continue to drive traffic over time.</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-medium mb-2">Higher Conversion Rates</h3>
                  <p className="text-muted-foreground">SEO-driven traffic often converts better because it's more targeted and relevant to your business.</p>
                </div>
              </div>
            </div>
          </ElementTransition>
          
          <ElementTransition type="fade" delay={0.6}>
            <div className="mt-16 text-center">
              <h2 className="text-3xl font-semibold mb-6">Ready to Improve Your Search Rankings?</h2>
              <p className="max-w-2xl mx-auto mb-8 text-lg">
                Our SEO experts are ready to help you climb the search engine rankings and drive more qualified traffic to your website.
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