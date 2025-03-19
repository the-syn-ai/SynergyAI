import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ElementTransition } from '@/components/animations';
import { X, Lightbulb, ChevronRight, ChevronLeft, Star, Sparkles } from 'lucide-react';
import { useLocation } from 'wouter';

// Types for feature suggestions
type FeatureSuggestion = {
  id: string;
  title: string;
  description: string;
  actionText: string;
  actionPath?: string;
  priority: 'high' | 'medium' | 'low';
  type: 'feature' | 'enhancement' | 'optimization';
  isNew?: boolean;
};

// Mock AI-powered suggestions based on current page
const getPageSuggestions = (path: string): FeatureSuggestion[] => {
  const commonSuggestions: FeatureSuggestion[] = [
    {
      id: 'ai-chatbot',
      title: 'AI Chatbot',
      description: 'Implement an AI chatbot to help visitors get immediate answers to their questions.',
      actionText: 'Learn more',
      priority: 'high',
      type: 'feature',
      isNew: true
    },
    {
      id: 'seo-enhancement',
      title: 'SEO Enhancement',
      description: 'Optimize your website with AI-driven SEO recommendations for better search rankings.',
      actionText: 'Explore SEO',
      actionPath: '/services#seo',
      priority: 'medium',
      type: 'optimization'
    }
  ];

  // Page-specific suggestions
  switch (path) {
    case '/':
      return [
        {
          id: 'website-analyzer',
          title: 'Website Analyzer',
          description: 'Try our AI-powered website analyzer to get insights about your site performance and SEO.',
          actionText: 'Analyze now',
          priority: 'high',
          type: 'feature',
          isNew: true
        },
        ...commonSuggestions
      ];
    case '/about':
      return [
        {
          id: 'case-studies',
          title: 'Case Studies',
          description: 'See how our AI solutions have helped businesses similar to yours achieve growth.',
          actionText: 'View case studies',
          actionPath: '/blog',
          priority: 'medium',
          type: 'enhancement'
        },
        ...commonSuggestions
      ];
    case '/services':
      return [
        {
          id: 'custom-integration',
          title: 'Custom Integration',
          description: 'Get a personalized AI solution tailored to your specific business needs.',
          actionText: 'Request custom solution',
          actionPath: '/contact',
          priority: 'high',
          type: 'feature'
        },
        ...commonSuggestions
      ];
    case '/blog':
      return [
        {
          id: 'content-recommendations',
          title: 'Content Recommendations',
          description: 'Our AI can analyze your interests and suggest relevant content for you.',
          actionText: 'Personalize feed',
          priority: 'medium',
          type: 'enhancement'
        },
        ...commonSuggestions
      ];
    default:
      return commonSuggestions;
  }
};

// Priority colors
const priorityColors = {
  high: 'bg-primary/10 border-primary/30 hover:border-primary/50',
  medium: 'bg-orange-500/10 border-orange-500/30 hover:border-orange-500/50',
  low: 'bg-blue-500/10 border-blue-500/30 hover:border-blue-500/50'
};

// Type colors
const typeIcons = {
  feature: <Sparkles className="w-4 h-4 text-primary" />,
  enhancement: <Star className="w-4 h-4 text-amber-500" />,
  optimization: <Lightbulb className="w-4 h-4 text-blue-500" />
};

export default function FeatureSuggestion() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const [suggestions, setSuggestions] = useState<FeatureSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();

  // Update suggestions when location changes
  useEffect(() => {
    if (isOpen) {
      // Start loading indicator
      setIsLoading(true);
      setSuggestions([]);
      
      // Delay suggestion update to simulate AI processing
      const timer = setTimeout(() => {
        setSuggestions(getPageSuggestions(location));
        setIsLoading(false);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [location, isOpen]);

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Handle suggestion action
  const handleAction = (suggestion: FeatureSuggestion) => {
    if (suggestion.actionPath) {
      setLocation(suggestion.actionPath);
    } else {
      // Handle other actions (could be expanded in the future)
      console.log(`Action triggered for: ${suggestion.title}`);
    }
  };

  return (
    <>
      {/* Sidebar toggle button */}
      <motion.button
        className={`fixed top-1/2 -translate-y-1/2 z-40 rounded-l-lg p-2 ${isOpen ? 'right-[280px]' : 'right-0'} bg-primary text-primary-foreground shadow-md`}
        onClick={toggleSidebar}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? 'Close AI suggestions' : 'Open AI suggestions'}
      >
        {isOpen ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </motion.button>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 w-[280px] h-full bg-background/90 backdrop-blur-sm z-30 shadow-lg border-l flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">AI Suggestions</h3>
              </div>
              <Button variant="ghost" size="icon" onClick={toggleSidebar} aria-label="Close">
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-4 space-y-4">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                  <Lightbulb className="w-10 h-10 mb-2 opacity-50" />
                  <p>AI is thinking...</p>
                </div>
              ) : (
                <StaggeredSuggestions 
                  suggestions={suggestions} 
                  onAction={handleAction} 
                />
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t text-xs text-muted-foreground">
              <p>Powered by SynergyAI</p>
              <p className="mt-1">Suggestions personalized for you</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Staggered animation for suggestions
const StaggeredSuggestions = ({ 
  suggestions, 
  onAction 
}: { 
  suggestions: FeatureSuggestion[],
  onAction: (suggestion: FeatureSuggestion) => void
}) => {
  return (
    <div className="space-y-4">
      {suggestions.map((suggestion, index) => (
        <ElementTransition 
          key={suggestion.id} 
          delay={index * 0.1} 
          type="slide" 
          direction="right"
        >
          <div className={`relative rounded-lg border p-4 ${priorityColors[suggestion.priority]}`}>
            {suggestion.isNew && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                New
              </span>
            )}
            <div className="flex items-center gap-2 mb-2">
              {typeIcons[suggestion.type]}
              <h4 className="font-medium">{suggestion.title}</h4>
            </div>
            <p className="text-sm mb-3 text-muted-foreground">{suggestion.description}</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-between" 
              onClick={() => onAction(suggestion)}
            >
              {suggestion.actionText}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </ElementTransition>
      ))}
    </div>
  );
};