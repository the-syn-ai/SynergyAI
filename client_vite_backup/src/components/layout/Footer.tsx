import { Link, useLocation } from "wouter";

export default function Footer() {
  const [, setLocation] = useLocation();
  return (
    <footer className="bg-background border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">SynergyAI</h3>
            <p className="text-muted-foreground">
              Transforming businesses through artificial intelligence
            </p>
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