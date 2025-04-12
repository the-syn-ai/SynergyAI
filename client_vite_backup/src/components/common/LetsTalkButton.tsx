import { Button } from "@/components/ui/button";

export function LetsTalkButton() {
  return (
    <a 
      href="https://cal.com/synai-automations-i329dt/intro-call" 
      target="_blank" 
      rel="noopener noreferrer"
      className="inline-block"
    >
      <Button 
        variant="outline" 
        size="lg"
        className="font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)] hover:border-primary/50"
      >
        Let's Talk
      </Button>
    </a>
  );
}
