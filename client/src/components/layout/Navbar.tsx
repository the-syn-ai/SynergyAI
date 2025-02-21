import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  const [, setLocation] = useLocation();

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Navigate to home
    setLocation("/");
    // Scroll to top with smooth animation
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <button 
          onClick={handleLogoClick}
          className="text-2xl font-bold hover:text-primary transition-colors"
        >
          SynergyAI
        </button>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Services</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-6 w-[400px]">
                  <NavigationMenuLink href="/services#automation">
                    Business Automation
                  </NavigationMenuLink>
                  <NavigationMenuLink href="/services#web">
                    Web Design & Hosting
                  </NavigationMenuLink>
                  <NavigationMenuLink href="/services#crm">
                    CRM Solutions
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/pricing">
                <a className="px-4 py-2">Pricing</a>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/blog">
                <a className="px-4 py-2">Blog</a>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/contact">
                <a className="px-4 py-2">Contact</a>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Button>Get Started</Button>
      </nav>
    </header>
  );
}