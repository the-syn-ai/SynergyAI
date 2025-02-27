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
        <div className="flex justify-center items-center py-3">
          <button 
            onClick={handleLogoClick}
            className="text-2xl font-bold hover:text-primary transition-colors"
          >
            SynergyAI
          </button>
        </div>
        
        {/* Navigation Row - Below the logo */}
        <nav className="flex flex-col md:flex-row justify-between items-center pb-3">
          <div className="w-full md:w-auto flex justify-center mb-2 md:mb-0">
            <NavigationMenu>
              <NavigationMenuList className="flex flex-wrap justify-center">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm md:text-base">Services</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[280px] md:w-[400px]">
                      <Link href="/services#automation">
                        <a className="block p-2 hover:bg-accent rounded-md">
                          Business Automation
                        </a>
                      </Link>
                      <Link href="/services#web">
                        <a className="block p-2 hover:bg-accent rounded-md">
                          Web Design & Hosting
                        </a>
                      </Link>
                      <Link href="/services#crm">
                        <a className="block p-2 hover:bg-accent rounded-md">
                          CRM Solutions
                        </a>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/pricing">
                    <a className="px-2 md:px-4 py-2 hover:text-primary text-sm md:text-base">Pricing</a>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/blog">
                    <a className="px-2 md:px-4 py-2 hover:text-primary text-sm md:text-base">Blog</a>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center mt-2 md:mt-0">
            <a 
              href="https://cal.com/synai-automations-i329dt/intro-call" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button 
                variant="outline" 
                size={isMobile ? "sm" : "default"}
                className="font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)] hover:border-primary/50"
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