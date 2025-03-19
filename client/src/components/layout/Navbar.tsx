import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Navbar() {
  const [, setLocation] = useLocation();
  const isMobile = useIsMobile();

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setLocation("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        {/* Logo Row - Always at the top */}
        <div className="flex justify-center items-center py-4">
          <button 
            onClick={handleLogoClick}
            className="text-3xl md:text-4xl font-bold hover:text-primary transition-colors"
          >
            SynergyAI
          </button>
        </div>
        
        {/* Navigation Row - Below the logo, with improved spacing */}
        <nav className="flex flex-col md:flex-row justify-between items-center pb-4 max-w-3xl mx-auto">
          {/* Main navigation links on the left */}
          <div className="flex justify-center md:justify-start mb-3 md:mb-0">
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-8 md:space-x-12">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-base md:text-lg font-medium">Services</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[300px] md:w-[400px]">
                      <Link href="/services/seo-optimization" className="block p-3 hover:bg-accent rounded-md text-base">
                        SEO Optimization
                      </Link>
                      <Link href="/services#automation" className="block p-3 hover:bg-accent rounded-md text-base">
                        Business Automation
                      </Link>
                      <Link href="/services#web" className="block p-3 hover:bg-accent rounded-md text-base">
                        Web Design & Hosting
                      </Link>
                      <Link href="/services#crm" className="block p-3 hover:bg-accent rounded-md text-base">
                        CRM Solutions
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/pricing" className="text-base md:text-lg font-medium hover:text-primary">Pricing</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/blog" className="text-base md:text-lg font-medium hover:text-primary">Blog</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <a 
                    href="/about" 
                    className="text-base md:text-lg font-medium hover:text-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      setLocation("/about");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    About
                  </a>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Call-to-action button on the right */}
          <div className="md:ml-4">
            <a 
              href="https://cal.com/synai-automations-i329dt/intro-call" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button 
                variant="outline" 
                size="default"
                className="font-semibold text-base transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)] hover:border-primary/50"
              >
                Let's Talk
              </Button>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}