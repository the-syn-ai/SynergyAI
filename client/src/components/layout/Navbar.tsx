import { Link } from "wouter";
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
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <a className="text-2xl font-bold">AI Agency</a>
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Services</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-6 w-[400px]">
                  <NavigationMenuLink href="/services#ml">
                    Machine Learning
                  </NavigationMenuLink>
                  <NavigationMenuLink href="/services#vision">
                    Computer Vision
                  </NavigationMenuLink>
                  <NavigationMenuLink href="/services#analytics">
                    Predictive Analytics
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
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
