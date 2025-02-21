import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, MessageSquare, ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AiDemo() {
  const { toast } = useToast();
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDemo = async () => {
    if (!input.trim()) return;

    setIsProcessing(true);
    try {
      const res = await fetch('/api/analyze-sentiment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: input })
      });

      if (!res.ok) {
        throw new Error('Failed to analyze text');
      }

      const data = await res.json();
      setResponse(data.analysis);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze text. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Experience AI in Action</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Try our AI capabilities firsthand with these interactive demos
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Tabs defaultValue="sentiment">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="sentiment" className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                Sentiment Analysis
              </TabsTrigger>
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                AI Chat
              </TabsTrigger>
              <TabsTrigger value="vision" className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Vision AI
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sentiment">
              <Card>
                <CardHeader>
                  <CardTitle>Sentiment Analysis Demo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter some text to analyze..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleDemo()}
                      />
                      <Button 
                        onClick={handleDemo}
                        disabled={isProcessing || !input.trim()}
                      >
                        {isProcessing ? "Analyzing..." : "Analyze"}
                      </Button>
                    </div>

                    <AnimatePresence mode="wait">
                      {response && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="p-4 bg-muted rounded-lg"
                        >
                          {response}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="chat">
              <Card>
                <CardHeader>
                  <CardTitle>Coming Soon: Advanced AI Chat</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Our advanced AI chat system is being fine-tuned. Check back soon!
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="vision">
              <Card>
                <CardHeader>
                  <CardTitle>Coming Soon: Vision AI Demo</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Experience our cutting-edge computer vision capabilities soon!
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}