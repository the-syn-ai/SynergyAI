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
        
        {/* Navigation Row - Below the logo */}
        <nav className="flex flex-col md:flex-row justify-center items-center pb-4">
          <div className="w-full flex justify-center mb-3 md:mb-0">
            <NavigationMenu>
              <NavigationMenuList className="flex flex-wrap justify-center gap-2 md:gap-4">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-base md:text-lg font-medium">Services</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[300px] md:w-[400px]">
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
                  <Link href="/pricing" className="px-3 md:px-5 py-2 hover:text-primary text-base md:text-lg font-medium">Pricing</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/blog" className="px-3 md:px-5 py-2 hover:text-primary text-base md:text-lg font-medium">Blog</Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex justify-center items-center w-full mt-3 md:mt-0">
            <a 
              href="https://cal.com/synai-automations-i329dt/intro-call" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full max-w-[200px] flex justify-center"
            >
              <Button 
                variant="outline" 
                size="default"
                className="w-full font-semibold text-base transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)] hover:border-primary/50"
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