import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Database,
  Server,
  Shield,
  Zap,
  Cloud,
  CheckCircle2,
  Timer,
  Laptop,
  ArrowRight,
  RefreshCw
} from 'lucide-react';

interface ConnectionStatus {
  connected: boolean;
  latency: number;
  secure: boolean;
  queries: number;
  lastUpdated: string;
}

const DatabaseConnectionVisualizer = () => {
  const [status, setStatus] = useState<ConnectionStatus>({
    connected: true,
    latency: 0,
    secure: true,
    queries: 0,
    lastUpdated: new Date().toISOString()
  });
  
  const [animating, setAnimating] = useState(false);
  const [dataPackets, setDataPackets] = useState<number[]>([]);
  
  // Simulate database connection status updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(prev => ({
        ...prev,
        latency: Math.floor(Math.random() * 15) + 5, // 5-20ms latency
        queries: prev.queries + Math.floor(Math.random() * 3) + 1,
        lastUpdated: new Date().toISOString()
      }));
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Data packet animation management
  useEffect(() => {
    if (animating) {
      // Generate new data packets every 600ms
      const packetGenerator = setInterval(() => {
        setDataPackets(prev => {
          // Add a new packet with random ID
          const newPackets = [...prev, Date.now()];
          // Keep only the last 10 packets to prevent too many animations
          return newPackets.slice(-10);
        });
      }, 600);
      
      return () => clearInterval(packetGenerator);
    }
  }, [animating]);
  
  // Remove packets that have completed their animation
  const removePacket = (id: number) => {
    setDataPackets(prev => prev.filter(packetId => packetId !== id));
  };
  
  const toggleAnimation = () => {
    setAnimating(!animating);
    if (!animating) {
      // Start with one packet
      setDataPackets([Date.now()]);
    } else {
      // Clear all packets when stopping
      setDataPackets([]);
    }
  };
  
  return (
    <Card className="w-full border border-primary/20 shadow-lg overflow-hidden">
      <CardHeader className="bg-muted/30">
        <CardTitle className="flex items-center text-xl">
          <Database className="mr-2 h-5 w-5 text-primary" />
          Database Connection Visualizer
        </CardTitle>
        <CardDescription>
          Visualize PostgreSQL database connections and data flow
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6">
        {/* Connection Information */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="flex items-center justify-between p-3 rounded-md border">
            <div className="flex items-center">
              <Server className="h-5 w-5 mr-2 text-primary/80" />
              <span className="font-medium">Status</span>
            </div>
            <Badge variant={status.connected ? "default" : "destructive"}>
              {status.connected ? "Connected" : "Disconnected"}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between p-3 rounded-md border">
            <div className="flex items-center">
              <Zap className="h-5 w-5 mr-2 text-primary/80" />
              <span className="font-medium">Latency</span>
            </div>
            <Badge 
              variant={status.latency < 10 ? "default" : status.latency < 15 ? "outline" : "destructive"}
            >
              {status.latency}ms
            </Badge>
          </div>
          
          <div className="flex items-center justify-between p-3 rounded-md border">
            <div className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-primary/80" />
              <span className="font-medium">Security</span>
            </div>
            <Badge variant={status.secure ? "default" : "destructive"}>
              {status.secure ? "Encrypted" : "Insecure"}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between p-3 rounded-md border">
            <div className="flex items-center">
              <Timer className="h-5 w-5 mr-2 text-primary/80" />
              <span className="font-medium">Queries</span>
            </div>
            <Badge variant="outline">
              {status.queries}
            </Badge>
          </div>
        </div>
        
        {/* Animation Controls */}
        <div className="flex justify-center mb-8">
          <Button
            onClick={toggleAnimation}
            variant={animating ? "destructive" : "default"}
            className="relative overflow-hidden"
          >
            {animating ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Stop Simulation
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                Start Simulation
              </>
            )}
          </Button>
        </div>
        
        {/* Data Flow Visualization */}
        <div className="relative h-64 border border-primary/20 rounded-lg bg-muted/20 overflow-hidden">
          {/* Client Side */}
          <div className="absolute top-6 left-6 p-4 bg-background rounded-lg border border-primary/40 z-10 shadow-md flex items-center">
            <Laptop className="h-8 w-8 text-primary" />
            <div className="ml-2">
              <p className="font-medium">Client</p>
              <p className="text-xs text-muted-foreground">React Application</p>
            </div>
          </div>
          
          {/* Database Side */}
          <div className="absolute top-6 right-6 p-4 bg-background rounded-lg border border-primary/40 z-10 shadow-md flex items-center">
            <Database className="h-8 w-8 text-primary" />
            <div className="ml-2">
              <p className="font-medium">PostgreSQL</p>
              <p className="text-xs text-muted-foreground">Database</p>
            </div>
          </div>
          
          {/* Server/API */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-background rounded-lg border border-primary/40 z-10 shadow-md flex items-center">
            <Server className="h-8 w-8 text-primary" />
            <div className="ml-2">
              <p className="font-medium">Node.js API</p>
              <p className="text-xs text-muted-foreground">Express Server</p>
            </div>
          </div>
          
          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full z-0">
            {/* Client to Server */}
            <path 
              d="M 90,50 L 240,130" 
              stroke="hsl(var(--primary) / 0.3)" 
              strokeWidth="2" 
              fill="none" 
              strokeDasharray="5,5"
            />
            
            {/* Server to Database */}
            <path 
              d="M 270,130 L 400,50" 
              stroke="hsl(var(--primary) / 0.3)" 
              strokeWidth="2" 
              fill="none" 
              strokeDasharray="5,5"
            />
          </svg>
          
          {/* Animated Data Packets */}
          <AnimatePresence>
            {dataPackets.map(id => (
              <motion.div
                key={id}
                className="absolute z-20 w-3 h-3 rounded-full bg-primary shadow-glow"
                initial={{ x: 90, y: 50, opacity: 0, scale: 0 }}
                animate={{
                  x: [90, 240, 240, 240, 400, 400],
                  y: [50, 130, 130, 130, 50, 50],
                  scale: [0, 1, 1.5, 1, 1, 0],
                  opacity: [0, 1, 1, 1, 1, 0],
                  transition: {
                    times: [0, 0.2, 0.4, 0.5, 0.7, 1],
                    duration: 2.1,
                    ease: "easeInOut"
                  }
                }}
                exit={{ opacity: 0 }}
                onAnimationComplete={() => removePacket(id)}
              />
            ))}
          </AnimatePresence>
          
          {/* Response Packets (flowing in opposite direction) */}
          <AnimatePresence>
            {dataPackets.map(id => (
              <motion.div
                key={`response-${id}`}
                className="absolute z-20 w-3 h-3 rounded-full bg-green-500 shadow-glow"
                initial={{ x: 400, y: 50, opacity: 0, scale: 0 }}
                animate={{
                  x: [400, 400, 270, 270, 270, 90, 90],
                  y: [50, 50, 130, 130, 130, 50, 50],
                  scale: [0, 1, 1, 1.5, 1, 1, 0],
                  opacity: [0, 1, 1, 1, 1, 1, 0],
                  transition: {
                    times: [0, 0.1, 0.3, 0.4, 0.5, 0.7, 1],
                    duration: 2.1,
                    delay: 2.0, // Start after the request animation
                    ease: "easeInOut"
                  }
                }}
                exit={{ opacity: 0 }}
              />
            ))}
          </AnimatePresence>
        </div>
        
        {/* Status Indicators */}
        <div className="mt-6 flex justify-between items-center text-sm text-muted-foreground">
          <div>
            <span className="mr-1">Last updated:</span>
            <time>{new Date(status.lastUpdated).toLocaleTimeString()}</time>
          </div>
          <div className="flex items-center">
            <div className="flex items-center mr-4">
              <div className="w-2 h-2 rounded-full bg-primary mr-2" />
              <span>Requests</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
              <span>Responses</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DatabaseConnectionVisualizer;