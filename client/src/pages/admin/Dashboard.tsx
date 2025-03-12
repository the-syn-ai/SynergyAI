import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  Shield, 
  Lightbulb,
  PlayCircle,
  LineChart,
  MessageSquare,
  Calendar,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const navigation = [
  { name: "Analytics", href: "/admin/dashboard", icon: BarChart3 },
  { name: "Calendar", href: "/admin/calendar", icon: Calendar },
  { name: "Security", href: "/admin/security", icon: Shield },
  { name: "Feature Tour", href: "/admin/tour", icon: Lightbulb },
  { name: "AI Demos", href: "/admin/demos", icon: PlayCircle },
  { name: "Performance", href: "/admin/performance", icon: LineChart },
  { name: "Feedback", href: "/admin/feedback", icon: MessageSquare },
];

export default function Dashboard() {
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-background">
      {/* Mobile sidebar toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <motion.div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-card border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
        initial={false}
      >
        <ScrollArea className="h-full py-6">
          <nav className="space-y-2 px-4">
            {navigation.map((item) => {
              const isActive = location === item.href;
              return (
                <Link key={item.name} href={item.href}>
                  <a
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </a>
                </Link>
              );
            })}
          </nav>
        </ScrollArea>
      </motion.div>

      {/* Main content */}
      <div className="lg:pl-64">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
          {/* Dashboard content will be added here */}
        </div>
      </div>
    </div>
  );
}