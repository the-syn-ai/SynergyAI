import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { saveCompanyData, queryCompanyData } from "@/lib/supabase";

export default function Chatbot() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isBot: boolean }>>([
    { text: "Hi! To get started, please enter your company website URL.", isBot: true },
  ]);
  const [input, setInput] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const [isTraining, setIsTraining] = useState(false);
  const [isTrained, setIsTrained] = useState(false);

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyUrl.trim()) return;

    setIsTraining(true);
    setMessages(prev => [...prev, 
      { text: `Training AI on ${companyUrl}...`, isBot: true }
    ]);

    try {
      // Send to n8n webhook
      const response = await fetch(import.meta.env.VITE_N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: companyUrl })
      });

      if (!response.ok) {
        throw new Error('Failed to process website');
      }

      const data = await response.json();

      // Try to save the crawled data to Supabase
      try {
        await saveCompanyData(companyUrl, data);
      } catch (error) {
        console.warn('Failed to save to vector database, continuing with basic chat...');
      }

      setIsTrained(true);
      setMessages(prev => [...prev,
        { text: "Great! I've learned about your company. What would you like to know?", isBot: true }
      ]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process website. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsTraining(false);
    }
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !isTrained) return;

    const userMessage = input;
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setInput("");

    try {
      // Try to query the vector database
      let context = [];
      try {
        context = await queryCompanyData(companyUrl, userMessage);
      } catch (error) {
        console.warn('Failed to query vector database, continuing without context...');
      }

      // Use OpenAI to generate a response
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          message: userMessage,
          context
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const { reply } = await response.json();
      setMessages(prev => [...prev, { text: reply, isBot: true }]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process message. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      {!isOpen && (
        <Button
          className="fixed bottom-4 right-4 rounded-full h-12 w-12 p-0"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {isOpen && (
        <Card className="fixed bottom-4 right-4 w-96 h-[600px] flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between">
            <h3 className="font-semibold">Company AI Assistant</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto">
            <div className="space-y-4">
              {!isTrained && (
                <form onSubmit={handleUrlSubmit} className="flex gap-2 mb-4">
                  <Input
                    value={companyUrl}
                    onChange={(e) => setCompanyUrl(e.target.value)}
                    placeholder="Enter your company website URL..."
                    disabled={isTraining}
                    type="url"
                  />
                  <Button type="submit" disabled={isTraining}>
                    <Globe className="h-4 w-4 mr-2" />
                    Train
                  </Button>
                </form>
              )}

              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.isBot ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`rounded-lg px-4 py-2 max-w-[80%] ${
                        message.isBot
                          ? "bg-muted"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>

          {isTrained && (
            <form
              onSubmit={handleChatSubmit}
              className="p-4 border-t flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about the company..."
                className="flex-1"
              />
              <Button type="submit">Send</Button>
            </form>
          )}
        </Card>
      )}
    </>
  );
}