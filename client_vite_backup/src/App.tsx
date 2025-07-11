import { Switch, Route } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FeatureSuggestion from "@/components/ai/FeatureSuggestion";
import Home from "@/pages/Home";
import Blog from "@/pages/Blog";
import Services from "@/pages/Services";
import SeoOptimization from "@/pages/services/SeoOptimization";
import GHLIntegration from "@/pages/services/GHLIntegration";
import WebDesign from "@/pages/services/WebDesign";
import CRMSolutions from "@/pages/services/CRMSolutions";
import Contact from "@/pages/Contact";
import Pricing from "@/pages/Pricing";
import About from "@/pages/About";
import Signup from "@/pages/Signup";
import Privacy from "@/pages/legal/Privacy";
import Terms from "@/pages/legal/Terms";

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
      <Route path="/services/ghl-integration" component={GHLIntegration} />
      <Route path="/services/web-design" component={WebDesign} />
      <Route path="/services/crm-solutions" component={CRMSolutions} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/contact" component={Contact} />
      <Route path="/about" component={About} />
      <Route path="/signup" component={Signup} />
      <Route path="/signup/success" component={Signup} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
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

      </main>
      <Footer />
    </div>
  );
}

export default App;