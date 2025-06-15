import { Link, useLocation } from "wouter";

export default function Footer() {
  const [, setLocation] = useLocation();
  return (
    <footer className="bg-gradient-to-b from-background to-muted/20 border-t border-border/50 mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary via-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
              SynergyAI Automations
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6 max-w-md">
              Empowering businesses worldwide with cutting-edge AI automation solutions. 
              Transform your operations, scale your growth, and stay ahead of the competition.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground">500+ Active Clients</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link href="/services#ghl">GHL Integration</Link></li>
              <li><Link href="/services#web">Web Design & Hosting</Link></li>
              <li><Link href="/services#crm">CRM Solutions</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/about" 
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    setLocation("/about");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  About
                </a>
              </li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} SynergyAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}