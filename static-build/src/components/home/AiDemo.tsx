import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, MessageSquare, ImageIcon, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Language configurations
const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "zh", name: "中文" },
];

const translations = {
  en: {
    title: "Experience AI in Action",
    subtitle: "Try our AI capabilities firsthand with these interactive demos",
    sentimentTab: "Sentiment Analysis",
    chatTab: "AI Chat",
    visionTab: "Vision AI",
    sentimentTitle: "Sentiment Analysis Demo",
    sentimentPlaceholder: "Enter some text to analyze...",
    chatPlaceholder: "Type your message...",
    imagePlaceholder: "Enter an image URL...",
    analyzeButton: "Analyze",
    analyzing: "Analyzing...",
    sendButton: "Send",
  },
  es: {
    title: "Experimenta la IA en Acción",
    subtitle: "Prueba nuestras capacidades de IA de primera mano con estas demostraciones interactivas",
    sentimentTab: "Análisis de Sentimientos",
    chatTab: "Chat con IA",
    visionTab: "Visión IA",
    sentimentTitle: "Demo de Análisis de Sentimientos",
    sentimentPlaceholder: "Ingresa un texto para analizar...",
    chatPlaceholder: "Escribe tu mensaje...",
    imagePlaceholder: "Ingresa una URL de imagen...",
    analyzeButton: "Analizar",
    analyzing: "Analizando...",
    sendButton: "Enviar",
  },
  // Add other languages as needed
};

export default function AiDemo() {
  const { toast } = useToast();
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{ text: string; isBot: boolean }>>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [imageAnalysis, setImageAnalysis] = useState("");
  const [language, setLanguage] = useState("en");

  const t = translations[language as keyof typeof translations] || translations.en;

  const handleDemo = async () => {
    if (!input.trim()) return;

    setIsProcessing(true);
    try {
      const res = await fetch('/api/analyze-sentiment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: input, language })
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

  const handleChat = async () => {
    if (!chatInput.trim()) return;

    setChatHistory(prev => [...prev, { text: chatInput, isBot: false }]);
    setChatInput("");
    setIsProcessing(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: chatInput, language })
      });

      if (!res.ok) {
        throw new Error('Failed to process chat');
      }

      const data = await res.json();
      setChatHistory(prev => [...prev, { text: data.reply, isBot: true }]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process chat. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImageAnalysis = async () => {
    if (!imageUrl.trim()) return;

    setIsProcessing(true);
    try {
      const res = await fetch('/api/analyze-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image: imageUrl, language })
      });

      if (!res.ok) {
        throw new Error('Failed to analyze image');
      }

      const data = await res.json();
      setImageAnalysis(data.analysis);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze image. Please try again.",
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
          <div className="flex justify-center items-center gap-4 mb-4">
            <h2 className="text-3xl font-bold">{t.title}</h2>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[180px]">
                <Globe className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Tabs defaultValue="sentiment">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="sentiment" className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                {t.sentimentTab}
              </TabsTrigger>
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                {t.chatTab}
              </TabsTrigger>
              <TabsTrigger value="vision" className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                {t.visionTab}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sentiment">
              <Card>
                <CardHeader>
                  <CardTitle>{t.sentimentTitle}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder={t.sentimentPlaceholder}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleDemo()}
                      />
                      <Button 
                        onClick={handleDemo}
                        disabled={isProcessing || !input.trim()}
                      >
                        {isProcessing ? t.analyzing : t.analyzeButton}
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
                  <CardTitle>{t.chatTab}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="h-[300px] overflow-y-auto p-4 bg-muted rounded-lg space-y-4">
                      {chatHistory.map((message, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: message.isBot ? -20 : 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                        >
                          <div
                            className={`rounded-lg px-4 py-2 max-w-[80%] ${
                              message.isBot
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted-foreground/10'
                            }`}
                          >
                            {message.text}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Input
                        placeholder={t.chatPlaceholder}
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleChat()}
                      />
                      <Button
                        onClick={handleChat}
                        disabled={isProcessing || !chatInput.trim()}
                      >
                        {t.sendButton}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="vision">
              <Card>
                <CardHeader>
                  <CardTitle>{t.visionTab}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder={t.imagePlaceholder}
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleImageAnalysis()}
                      />
                      <Button
                        onClick={handleImageAnalysis}
                        disabled={isProcessing || !imageUrl.trim()}
                      >
                        {isProcessing ? t.analyzing : t.analyzeButton}
                      </Button>
                    </div>

                    {imageUrl && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="aspect-video rounded-lg overflow-hidden bg-muted"
                      >
                        <img
                          src={imageUrl}
                          alt="Analysis subject"
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    )}

                    <AnimatePresence mode="wait">
                      {imageAnalysis && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="p-4 bg-muted rounded-lg"
                        >
                          {imageAnalysis}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}