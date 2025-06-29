import { useState } from "react";
import {
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  Share2,
  Copy,
  Check,
  Mail
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

type SocialPlatform = "facebook" | "twitter" | "linkedin" | "email";

interface ShareResultsProps {
  title: string;
  summary: string;
  url?: string;
  scores?: Record<string, number>;
}

export default function ShareResults({ title, summary, url = window.location.href, scores }: ShareResultsProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  // Format the message to be shared
  const formatShareMessage = (platform: SocialPlatform): string => {
    let baseMessage = `${title}: ${summary}`;
    
    // Add scores if available
    if (scores) {
      baseMessage += "\n\nResults:";
      Object.entries(scores).forEach(([key, value]) => {
        baseMessage += `\n• ${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}/100`;
      });
    }

    // Add hashtags for Twitter
    if (platform === "twitter") {
      baseMessage += "\n\n#WebsiteAnalysis #AI #WebPerformance";
    }

    return baseMessage;
  };

  // Open share dialog for each platform
  const shareToSocial = (platform: SocialPlatform) => {
    const message = encodeURIComponent(formatShareMessage(platform));
    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${message}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${message}&url=${encodeURIComponent(url)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case "email":
        shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${message}%0A%0A${encodeURIComponent(url)}`;
        break;
    }

    window.open(shareUrl, "_blank", "width=600,height=400");
    
    toast({
      title: "Sharing",
      description: `Opening ${platform} to share your results`,
    });
  };

  // Copy the share URL to clipboard
  const copyToClipboard = async () => {
    try {
      const textToCopy = `${title}\n\n${summary}\n\n${
        scores
          ? Object.entries(scores)
              .map(([key, value]) => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}/100`)
              .join("\n")
          : ""
      }\n\n${url}`;
      
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      
      toast({
        title: "Copied!",
        description: "Results copied to clipboard",
      });
      
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-center mt-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share Results
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[240px] p-3" align="center">
          <div className="grid grid-cols-4 gap-2 mb-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-9 w-9 bg-[#1877F2] hover:bg-[#1877F2]/90 text-white hover:text-white border-none"
                    onClick={() => shareToSocial("facebook")}
                  >
                    <FacebookIcon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Facebook</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-9 w-9 bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white hover:text-white border-none"
                    onClick={() => shareToSocial("twitter")}
                  >
                    <TwitterIcon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Twitter</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-9 w-9 bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white hover:text-white border-none"
                    onClick={() => shareToSocial("linkedin")}
                  >
                    <LinkedinIcon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>LinkedIn</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-9 w-9 bg-gray-500 hover:bg-gray-600 text-white hover:text-white border-none"
                    onClick={() => shareToSocial("email")}
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Email</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <Button 
            variant="secondary" 
            className="w-full mt-2 gap-2 text-sm"
            onClick={copyToClipboard}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied!" : "Copy to clipboard"}
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}