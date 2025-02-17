import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-background border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">AI Agency</h3>
            <p className="text-muted-foreground">
              Transforming businesses through artificial intelligence
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link href="/services#ml">Machine Learning</Link></li>
              <li><Link href="/services#vision">Computer Vision</Link></li>
              <li><Link href="/services#analytics">Predictive Analytics</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about">About</Link></li>
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
          © {new Date().getFullYear()} AI Agency. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
