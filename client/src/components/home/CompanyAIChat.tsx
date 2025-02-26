import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Globe, Search, Zap, CheckCircle, LoaderCircle, SendIcon, AlertTriangle, BarChart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLoading } from "@/hooks/use-loading";

// Different analysis types
type AnalysisCategory = 'performance' | 'seo' | 'accessibility' | 'security';

// Analysis scores for visualization
type AnalysisScores = {
  [key in AnalysisCategory]: number;
};

export default function CompanyAIChat() {
  const { toast } = useToast();
  const { isLoading, setIsLoading } = useLoading();
  const [isLocalLoading, setIsLocalLoading] = useState(true);
  const [messages, setMessages] = useState<Array<{ text: string; isBot: boolean }>>([
    { text: "Enter your company website URL to get started!", isBot: true },
  ]);
  const [input, setInput] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTrained, setIsTrained] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("analyze");
  const [analysisScores, setAnalysisScores] = useState<AnalysisScores>({
    performance: 0,
    seo: 0,
    accessibility: 0,
    security: 0
  });
  
  // Simulate loading on component mount
  useEffect(() => {
    setIsLoading(prev => ({ ...prev, websiteAnalysis: true }));
    
    const timer = setTimeout(() => {
      setIsLoading(prev => ({ ...prev, websiteAnalysis: false }));
      setIsLocalLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyUrl.trim()) {
      toast({
        title: "Missing URL",
        description: "Please enter a website URL to analyze",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Format URL
      const formattedUrl = companyUrl.startsWith('http') ? companyUrl : `https://${companyUrl}`;
      
      // Simulate API call with a timeout
      setTimeout(() => {
        // Generate random scores between 60-95 for demo
        const randomScores: AnalysisScores = {
          performance: Math.floor(Math.random() * 35) + 60,
          seo: Math.floor(Math.random() * 35) + 60,
          accessibility: Math.floor(Math.random() * 35) + 60,
          security: Math.floor(Math.random() * 35) + 60
        };
        
        setAnalysisScores(randomScores);
        
        const overall = Math.floor(
          (randomScores.performance + randomScores.seo + 
           randomScores.accessibility + randomScores.security) / 4
        );
        
        toast({
          title: "Analysis Complete",
          description: `Website analysis completed with an overall score of ${overall}/100`,
        });

        setIsTrained(true);
        setMessages(prev => [...prev,
          { text: `I've analyzed ${formattedUrl} and found some interesting insights:\n\n• Performance: ${randomScores.performance}/100\n• SEO: ${randomScores.seo}/100\n• Accessibility: ${randomScores.accessibility}/100\n• Security: ${randomScores.security}/100\n\nWhat specific area would you like to know more about?`, isBot: true }
        ]);
        
        setActiveTab("chat");
        setIsSubmitting(false);
      }, 3000);

    } catch (error) {
      console.error('Error analyzing website:', error);
      toast({
        title: "Analysis Failed",
        description: "We couldn't analyze that website. Please check the URL and try again.",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !isTrained) return;

    const userMessage = input;
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setInput("");

    try {
      // Simulate API response with timeout
      setTimeout(() => {
        let response = "";
        
        if (userMessage.toLowerCase().includes("performance")) {
          response = `Based on our analysis, the website's performance score is ${analysisScores.performance}/100. ${
            analysisScores.performance < 70 
            ? "This indicates significant performance issues that need addressing. The main problems are slow loading images and unoptimized JavaScript files." 
            : analysisScores.performance < 85 
              ? "This is a decent score, but there's room for improvement. Consider optimizing images and implementing browser caching." 
              : "This is an excellent score! Your website loads quickly and efficiently."
          }`;
        } else if (userMessage.toLowerCase().includes("seo")) {
          response = `Your website's SEO score is ${analysisScores.seo}/100. ${
            analysisScores.seo < 70 
            ? "This indicates significant SEO issues. Key problems include missing meta descriptions, poor heading structure, and insufficient keyword usage." 
            : analysisScores.seo < 85 
              ? "This is a solid foundation, but improvements could be made in meta tags, content structure, and mobile responsiveness." 
              : "This is an excellent SEO score! Your website follows search engine best practices well."
          }`;
        } else if (userMessage.toLowerCase().includes("accessibility")) {
          response = `The accessibility score for your website is ${analysisScores.accessibility}/100. ${
            analysisScores.accessibility < 70 
            ? "This indicates significant accessibility issues. Key problems include poor contrast ratios, missing alt text, and improper heading structure." 
            : analysisScores.accessibility < 85 
              ? "This score shows room for improvement. Consider adding more descriptive alt text and ensuring proper keyboard navigation." 
              : "This is an excellent accessibility score! Your website is well-designed for users with disabilities."
          }`;
        } else if (userMessage.toLowerCase().includes("security")) {
          response = `Your website's security score is ${analysisScores.security}/100. ${
            analysisScores.security < 70 
            ? "This indicates significant security vulnerabilities. We found issues with outdated libraries, missing security headers, and insecure connections." 
            : analysisScores.security < 85 
              ? "This is a decent score, but there's room for improvement. Consider implementing Content Security Policy and ensuring all connections use HTTPS." 
              : "This is an excellent security score! Your website implements modern security practices well."
          }`;
        } else {
          response = "Based on our analysis, your website has strengths and areas for improvement. Would you like specific details about performance, SEO, accessibility, or security?";
        }
        
        setMessages(prev => [...prev, { text: response, isBot: true }]);
      }, 1000);
    } catch (error) {
      console.error('Error processing message:', error);
      toast({
        title: "Error",
        description: "Failed to process your message. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  // Loading state
  if (isLoading.websiteAnalysis || isLocalLoading) {
    return (
      <Card className="w-full max-w-4xl mx-auto border border-primary/20 shadow-lg backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Website AI Analysis</CardTitle>
          <CardDescription className="text-center">Loading analysis tool...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center py-12">
          <LoaderCircle className="h-12 w-12 animate-spin text-primary/60" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto border border-primary/20 shadow-lg backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Website AI Analysis</CardTitle>
        <CardDescription className="text-center">
          Get comprehensive insights about any website with our AI-powered analyzer
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 w-full">
            <TabsTrigger value="analyze" className="flex-1">
              <Globe className="mr-2 h-4 w-4" />
              Analyze Website
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex-1" disabled={!isTrained}>
              <Search className="mr-2 h-4 w-4" />
              AI Insights
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="analyze" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="flex flex-col items-center p-4 rounded-lg bg-muted/50 border border-primary/10">
                <Zap className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-medium">Performance</h3>
                <p className="text-xs text-center text-muted-foreground">Load times & optimization</p>
              </div>
              <div className="flex flex-col items-center p-4 rounded-lg bg-muted/50 border border-primary/10">
                <Search className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-medium">SEO</h3>
                <p className="text-xs text-center text-muted-foreground">Search ranking factors</p>
              </div>
              <div className="flex flex-col items-center p-4 rounded-lg bg-muted/50 border border-primary/10">
                <CheckCircle className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-medium">Accessibility</h3>
                <p className="text-xs text-center text-muted-foreground">Standards compliance</p>
              </div>
              <div className="flex flex-col items-center p-4 rounded-lg bg-muted/50 border border-primary/10">
                <AlertTriangle className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-medium">Security</h3>
                <p className="text-xs text-center text-muted-foreground">Vulnerability detection</p>
              </div>
            </div>
          
            <motion.form 
              onSubmit={handleUrlSubmit}
              className="flex gap-4 items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex-1">
                <Input
                  value={companyUrl}
                  onChange={(e) => setCompanyUrl(e.target.value)}
                  placeholder="Enter website URL (e.g., example.com)"
                  disabled={isSubmitting}
                  type="text"
                  className="text-lg p-6"
                />
              </div>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                size="lg"
                className="h-14"
              >
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="h-5 w-5 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <BarChart className="h-5 w-5 mr-2" />
                    Analyze Website
                  </>
                )}
              </Button>
            </motion.form>
            
            {isSubmitting && (
              <div className="mt-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Badge variant="outline" className="mr-2 animate-pulse">Scanning</Badge>
                    <p className="text-sm">Analyzing website content and performance...</p>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <motion.div 
                      className="bg-primary h-2.5 rounded-full" 
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3, ease: "easeInOut" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="chat" className="space-y-6">
            {isTrained && (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {(Object.keys(analysisScores) as AnalysisCategory[]).map((category) => (
                    <div key={category} className="flex flex-col items-center p-4 rounded-lg bg-muted/50 border border-primary/10">
                      <div className="relative">
                        <svg className="w-16 h-16">
                          <circle 
                            className="text-muted stroke-current" 
                            strokeWidth="5" 
                            stroke="currentColor" 
                            fill="transparent" 
                            r="30" 
                            cx="32" 
                            cy="32"
                          />
                          <circle 
                            className="text-primary stroke-current" 
                            strokeWidth="5" 
                            strokeDasharray={`${2 * Math.PI * 30 * (analysisScores[category]/100)}, ${2 * Math.PI * 30}`}
                            strokeLinecap="round" 
                            stroke="currentColor" 
                            fill="transparent" 
                            r="30" 
                            cx="32" 
                            cy="32"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg font-bold">{analysisScores[category]}</span>
                        </div>
                      </div>
                      <h3 className="font-medium mt-1 capitalize">{category}</h3>
                    </div>
                  ))}
                </div>
                
                <div className="h-[400px] overflow-y-auto p-4 bg-muted/20 rounded-lg space-y-4 border border-primary/10">
                  <AnimatePresence>
                    {messages.map((message, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: message.isBot ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                      >
                        <div
                          className={`rounded-lg px-6 py-3 max-w-[80%] whitespace-pre-line ${
                            message.isBot
                              ? "bg-primary/10 border border-primary/20 text-foreground"
                              : "bg-secondary/10 border border-secondary/20"
                          }`}
                        >
                          {message.text}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <form
                  onSubmit={handleChatSubmit}
                  className="flex gap-4"
                >
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about performance, SEO, accessibility, or security..."
                    className="flex-1 text-lg p-6"
                  />
                  <Button 
                    type="submit"
                    size="lg"
                    className="h-14"
                    disabled={!input.trim()}
                  >
                    <SendIcon className="h-5 w-5 mr-2" />
                    Send
                  </Button>
                </form>
              </>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="text-center text-sm text-muted-foreground">
        Powered by advanced AI algorithms for comprehensive website analysis
      </CardFooter>
    </Card>
  );
}