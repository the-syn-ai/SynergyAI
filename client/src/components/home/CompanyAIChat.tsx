import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CompanyAIChat() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Array<{ text: string; isBot: boolean }>>([
    { text: "Enter your company website URL to get started!", isBot: true },
  ]);
  const [input, setInput] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTrained, setIsTrained] = useState(false);

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyUrl.trim()) return;

    setIsSubmitting(true);

    try {
      // Format URL
      const formattedUrl = companyUrl.startsWith('http') ? companyUrl : `https://${companyUrl}`;
      const encodedUrl = encodeURIComponent(formattedUrl);

      const response = await fetch(`/api/forward-to-n8n?url=${encodedUrl}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to submit website');
      }

      const data = await response.json();

      toast({
        title: "Success",
        description: "Website submitted successfully!",
      });

      setCompanyUrl(""); // Clear the input
      setIsTrained(true);
      setMessages(prev => [...prev,
        { text: "Great! I've analyzed your website. What would you like to know about your company?", isBot: true }
      ]);

    } catch (error) {
      console.error('Error submitting website:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit website. Please try again.",
        variant: "destructive"
      });
    } finally {
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
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          message: userMessage
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const { reply } = await response.json();
      setMessages(prev => [...prev, { text: reply, isBot: true }]);
    } catch (error) {
      console.error('Error processing message:', error);
      toast({
        title: "Error",
        description: "Failed to process message. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardContent className="p-6">
        {!isTrained ? (
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
                placeholder="Enter your company website URL..."
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
              <Globe className="h-5 w-5 mr-2" />
              {isSubmitting ? "Submitting..." : "Analyze Website"}
            </Button>
          </motion.form>
        ) : (
          <div className="space-y-6">
            <div className="h-[400px] overflow-y-auto p-4 bg-muted rounded-lg space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: message.isBot ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`rounded-lg px-6 py-3 max-w-[80%] ${
                      message.isBot
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted-foreground/10"
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
            </div>

            <form
              onSubmit={handleChatSubmit}
              className="flex gap-4"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about your company..."
                className="flex-1 text-lg p-6"
              />
              <Button 
                type="submit"
                size="lg"
                className="h-14"
              >
                Send
              </Button>
            </form>
          </div>
        )}
      </CardContent>
    </Card>
  );
}