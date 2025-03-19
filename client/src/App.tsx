import { Switch, Route } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FeatureSuggestion from "@/components/ai/FeatureSuggestion";
import Home from "@/pages/Home";
import Blog from "@/pages/Blog";
import Services from "@/pages/Services";
import SeoOptimization from "@/pages/services/SeoOptimization";
import Contact from "@/pages/Contact";
import Pricing from "@/pages/Pricing";
import About from "@/pages/About";
import Portfolio from "@/pages/Portfolio";
import Dashboard from "@/pages/admin/Dashboard";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";

function Router() {
  // Log route changes in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('App mounted, router initialized');
    }
  }, []);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/blog" component={Blog} />
      <Route path="/services" component={Services} />
      <Route path="/services/seo-optimization" component={SeoOptimization} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/contact" component={Contact} />
      <Route path="/about" component={About} />
      <Route path="/admin/dashboard" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="relative pt-[130px] md:pt-[140px]"> {/* Adjusted padding to account for taller navbar */}
        <Router />
        {/* AI-powered feature suggestion sidebar */}
        <FeatureSuggestion />
      </main>
      <Footer />
    </div>
  );
}

export default App;