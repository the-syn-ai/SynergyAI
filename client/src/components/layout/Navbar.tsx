import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  const [, setLocation] = useLocation();

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setLocation("/");
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
              <Link href="/calendar">
                <a className="px-4 py-2 hover:text-primary">Calendar</a>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/pricing">
                <a className="px-4 py-2 hover:text-primary">Pricing</a>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/blog">
                <a className="px-4 py-2 hover:text-primary">Blog</a>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/contact">
                <a className="px-4 py-2 hover:text-primary">Contact</a>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
          <Link href="https://cal.com/synai-automations-i329dt/intro-call" target="_blank">
            <Button variant="outline" className="font-semibold">
              Let's Talk
            </Button>
          </Link>
          <Link href="/contact">
            <Button>Get Started</Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}