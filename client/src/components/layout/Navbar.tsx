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
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Navbar() {
  const [, setLocation] = useLocation();
  const isMobile = useIsMobile();

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setLocation("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm">
      <div className="container mx-auto px-4">
        {/* Logo Row - Always at the top */}
        <div className="flex justify-between items-center py-4">
          <div className="flex-1"></div>
          <button 
            onClick={handleLogoClick}
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-blue-500 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200"
          >
            SynergyAI
          </button>
          <div className="flex-1 flex justify-end">
            <ThemeToggle />
          </div>
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
                      <Link href="/services/ghl-integration" className="block p-3 hover:bg-accent rounded-md text-base">
                        GHL Integration
                      </Link>
                      <Link href="/services/web-design" className="block p-3 hover:bg-accent rounded-md text-base">
                        Web Design & Hosting
                      </Link>
                      <Link href="/services/crm-solutions" className="block p-3 hover:bg-accent rounded-md text-base">
                        CRM Solutions
                      </Link>
                      <Link href="/services/seo-optimization" className="block p-3 hover:bg-accent rounded-md text-base">
                        SEO Optimization
                      </Link>
                      <Link href="/services" className="block p-3 hover:bg-accent rounded-md text-base font-semibold">
                        View All Services
                      </Link>
                    </div>
                  </NavigationMenuContent>
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