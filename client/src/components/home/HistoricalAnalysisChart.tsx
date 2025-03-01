import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CalendarIcon, TrendingUpIcon, TrendingDownIcon, BarChart2Icon, AlertTriangleIcon, ArrowUpIcon, ArrowDownIcon, EyeIcon, LockIcon, SearchIcon, LayoutIcon } from 'lucide-react';
import { format } from 'date-fns';

// Types for historical data
interface ChangeFromPrevious {
  performanceScoreDelta: number;
  seoScoreDelta: number;
  accessibilityScoreDelta: number;
  securityScoreDelta: number;
  overallScoreDelta: number;
  snapshotDate: string;
}

interface HistoricalAnalysis {
  id: number;
  websiteId: number;
  snapshotDate: string;
  performanceScore: number | null;
  seoScore: number | null;
  accessibilityScore: number | null;
  securityScore: number | null;
  overallScore: number | null;
  changeFromPrevious: ChangeFromPrevious | null;
  insights: string | null;
  createdAt: string;
}

interface HistoricalAnalysisChartProps {
  websiteId: number;
  websiteUrl: string;
}

export default function HistoricalAnalysisChart({ websiteId, websiteUrl }: HistoricalAnalysisChartProps) {
  // UI state
  const [selectedMetric, setSelectedMetric] = useState<string>('overall');
  const [timeframe, setTimeframe] = useState<string>('all');
  const [creatingSnapshot, setCreatingSnapshot] = useState(false);
  const { toast } = useToast();

  // Fetch historical data
  const { data: analysisData = [], isLoading } = useQuery({
    queryKey: [`/api/websites/${websiteId}/historical`],
    queryFn: async () => {
      if (!websiteId) return [];
      try {
        const response = await fetch(`/api/websites/${websiteId}/historical`);
        if (!response.ok) throw new Error('Failed to fetch historical data');
        return await response.json() as HistoricalAnalysis[];
      } catch (error) {
        console.error('Error fetching historical data:', error);
        toast({
          title: "Error",
          description: "Failed to load historical analysis data",
          variant: "destructive",
        });
        return [];
      }
    },
    enabled: !!websiteId,
  });

  // Filter data based on timeframe
  const filteredData = (() => {
    if (!analysisData.length) return [];
    
    // Sort data by date
    const sortedData = [...analysisData].sort((a, b) => 
      new Date(a.snapshotDate).getTime() - new Date(b.snapshotDate).getTime()
    );
    
    const now = new Date();
    
    switch (timeframe) {
      case 'week':
        const weekAgo = new Date(now.setDate(now.getDate() - 7));
        return sortedData.filter(d => new Date(d.snapshotDate) >= weekAgo);
      case 'month':
        const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
        return sortedData.filter(d => new Date(d.snapshotDate) >= monthAgo);
      case 'quarter':
        const quarterAgo = new Date(now.setMonth(now.getMonth() - 3));
        return sortedData.filter(d => new Date(d.snapshotDate) >= quarterAgo);
      case 'year':
        const yearAgo = new Date(now.setFullYear(now.getFullYear() - 1));
        return sortedData.filter(d => new Date(d.snapshotDate) >= yearAgo);
      default:
        return sortedData;
    }
  })();

  // Format data for charts
  const chartData = filteredData.map(snapshot => ({
    name: format(new Date(snapshot.snapshotDate), 'MMM d'),
    performance: snapshot.performanceScore,
    seo: snapshot.seoScore,
    accessibility: snapshot.accessibilityScore,
    security: snapshot.securityScore,
    overall: snapshot.overallScore,
    date: snapshot.snapshotDate,
  }));

  // Get the latest analysis data
  const latestSnapshot = analysisData.length > 0 
    ? [...analysisData].sort((a, b) => 
        new Date(b.snapshotDate).getTime() - new Date(a.snapshotDate).getTime()
      )[0] 
    : null;

  // Generate a random analysis if none exists (for demo purposes)
  const createDemoAnalysis = async () => {
    setCreatingSnapshot(true);
    try {
      const demoData = {
        performanceScore: Math.floor(Math.random() * 30) + 70,
        seoScore: Math.floor(Math.random() * 25) + 75,
        accessibilityScore: Math.floor(Math.random() * 20) + 75,
        securityScore: Math.floor(Math.random() * 15) + 80,
        overallScore: Math.floor(Math.random() * 10) + 80,
        snapshotDate: new Date().toISOString(),
      };
      
      const response = await fetch(`/api/websites/${websiteId}/historical`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(demoData),
      });
      
      if (response.ok) {
        // Invalidate the query to refetch the data
        queryClient.invalidateQueries({ queryKey: [`/api/websites/${websiteId}/historical`] });
        toast({
          title: "Success",
          description: "New historical analysis snapshot created",
        });
      } else {
        throw new Error('Failed to create snapshot');
      }
    } catch (error) {
      console.error('Error creating demo analysis:', error);
      toast({
        title: "Error",
        description: "Failed to create historical analysis snapshot",
        variant: "destructive",
      });
    } finally {
      setCreatingSnapshot(false);
    }
  };

  function ScoreChangeIndicator({ value }: { value: number | undefined }) {
    if (value === undefined) return null;
    
    return (
      <Badge variant={value > 0 ? "default" : value < 0 ? "destructive" : "secondary"} className="ml-2">
        {value > 0 ? (
          <ArrowUpIcon className="h-3 w-3 mr-1" />
        ) : value < 0 ? (
          <ArrowDownIcon className="h-3 w-3 mr-1" />
        ) : null}
        {value > 0 ? `+${value}` : value}
      </Badge>
    );
  }

  // Determine the color based on score
  const getScoreColor = (score: number | null) => {
    if (score === null) return "#888";
    if (score >= 90) return "#10b981"; // Green
    if (score >= 70) return "#3b82f6"; // Blue
    if (score >= 50) return "#f59e0b"; // Amber
    return "#ef4444"; // Red
  };

  // Get the icon for each metric type
  const getMetricIcon = (metricType: string) => {
    switch (metricType) {
      case 'performance':
        return <BarChart2Icon className="h-4 w-4 mr-2" />;
      case 'seo':
        return <SearchIcon className="h-4 w-4 mr-2" />;
      case 'accessibility':
        return <EyeIcon className="h-4 w-4 mr-2" />;
      case 'security':
        return <LockIcon className="h-4 w-4 mr-2" />;
      default:
        return <LayoutIcon className="h-4 w-4 mr-2" />;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-5 w-5" />
            Historical Analysis Tracking
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={createDemoAnalysis}
            disabled={creatingSnapshot}
          >
            {creatingSnapshot ? "Creating..." : "Create New Snapshot"}
          </Button>
        </CardTitle>
        <CardDescription>
          Track website performance over time for {websiteUrl}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin h-10 w-10 border-4 border-primary/20 border-t-primary rounded-full"></div>
          </div>
        ) : analysisData.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No historical data available yet</p>
            <Button onClick={createDemoAnalysis} disabled={creatingSnapshot}>
              {creatingSnapshot ? "Creating..." : "Generate First Snapshot"}
            </Button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select metric" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="overall">Overall Score</SelectItem>
                  <SelectItem value="performance">Performance</SelectItem>
                  <SelectItem value="seo">SEO</SelectItem>
                  <SelectItem value="accessibility">Accessibility</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="week">Past Week</SelectItem>
                  <SelectItem value="month">Past Month</SelectItem>
                  <SelectItem value="quarter">Past Quarter</SelectItem>
                  <SelectItem value="year">Past Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={chartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    {selectedMetric === 'overall' ? (
                      <Line 
                        type="monotone" 
                        dataKey="overall" 
                        name="Overall" 
                        stroke="#8884d8" 
                        activeDot={{ r: 8 }} 
                        strokeWidth={2}
                      />
                    ) : selectedMetric === 'performance' ? (
                      <Line 
                        type="monotone" 
                        dataKey="performance" 
                        name="Performance" 
                        stroke="#82ca9d" 
                        activeDot={{ r: 8 }} 
                        strokeWidth={2}
                      />
                    ) : selectedMetric === 'seo' ? (
                      <Line 
                        type="monotone" 
                        dataKey="seo" 
                        name="SEO" 
                        stroke="#8884d8" 
                        activeDot={{ r: 8 }} 
                        strokeWidth={2}
                      />
                    ) : selectedMetric === 'accessibility' ? (
                      <Line 
                        type="monotone" 
                        dataKey="accessibility" 
                        name="Accessibility" 
                        stroke="#ffc658" 
                        activeDot={{ r: 8 }} 
                        strokeWidth={2}
                      />
                    ) : (
                      <Line 
                        type="monotone" 
                        dataKey="security" 
                        name="Security" 
                        stroke="#ff8042" 
                        activeDot={{ r: 8 }} 
                        strokeWidth={2}
                      />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>
            </div>

            {latestSnapshot && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="mb-2 font-medium flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    Latest Snapshot ({format(new Date(latestSnapshot.snapshotDate), 'PPP')})
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center justify-between p-3 bg-background rounded-md border">
                      {getMetricIcon('performance')}
                      <span>Performance</span>
                      <div className="ml-auto flex items-center">
                        <span className="font-semibold" style={{ color: getScoreColor(latestSnapshot.performanceScore) }}>
                          {latestSnapshot.performanceScore}
                        </span>
                        {latestSnapshot.changeFromPrevious && (
                          <ScoreChangeIndicator value={latestSnapshot.changeFromPrevious.performanceScoreDelta} />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-background rounded-md border">
                      {getMetricIcon('seo')}
                      <span>SEO</span>
                      <div className="ml-auto flex items-center">
                        <span className="font-semibold" style={{ color: getScoreColor(latestSnapshot.seoScore) }}>
                          {latestSnapshot.seoScore}
                        </span>
                        {latestSnapshot.changeFromPrevious && (
                          <ScoreChangeIndicator value={latestSnapshot.changeFromPrevious.seoScoreDelta} />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-background rounded-md border">
                      {getMetricIcon('accessibility')}
                      <span>Accessibility</span>
                      <div className="ml-auto flex items-center">
                        <span className="font-semibold" style={{ color: getScoreColor(latestSnapshot.accessibilityScore) }}>
                          {latestSnapshot.accessibilityScore}
                        </span>
                        {latestSnapshot.changeFromPrevious && (
                          <ScoreChangeIndicator value={latestSnapshot.changeFromPrevious.accessibilityScoreDelta} />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-background rounded-md border">
                      {getMetricIcon('security')}
                      <span>Security</span>
                      <div className="ml-auto flex items-center">
                        <span className="font-semibold" style={{ color: getScoreColor(latestSnapshot.securityScore) }}>
                          {latestSnapshot.securityScore}
                        </span>
                        {latestSnapshot.changeFromPrevious && (
                          <ScoreChangeIndicator value={latestSnapshot.changeFromPrevious.securityScoreDelta} />
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-background rounded-md border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <LayoutIcon className="h-4 w-4 mr-2" />
                        <span>Overall Score</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xl font-bold" style={{ color: getScoreColor(latestSnapshot.overallScore) }}>
                          {latestSnapshot.overallScore}
                        </span>
                        {latestSnapshot.changeFromPrevious && (
                          <ScoreChangeIndicator value={latestSnapshot.changeFromPrevious.overallScoreDelta} />
                        )}
                      </div>
                    </div>
                    
                    <Separator className="my-3" />
                    
                    {latestSnapshot.insights && (
                      <div className="mt-2">
                        <h4 className="text-sm font-medium mb-1">AI Insights:</h4>
                        <p className="text-sm text-muted-foreground">{latestSnapshot.insights}</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}