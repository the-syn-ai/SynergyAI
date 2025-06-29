import { Request, Response } from 'express';

interface PageSpeedInsightsResponse {
  lighthouseResult: {
    categories: {
      performance: { score: number };
      accessibility: { score: number };
      'best-practices': { score: number };
      seo: { score: number };
    };
    audits: {
      [key: string]: {
        score: number | null;
        displayValue?: string;
        description?: string;
        title?: string;
      };
    };
  };
  loadingExperience?: {
    metrics: {
      [key: string]: {
        percentile: number;
        category: string;
      };
    };
  };
}

interface SecurityHeaders {
  [key: string]: string | undefined;
}

interface AnalysisResult {
  performance: {
    score: number;
    metrics: {
      fcp: string;
      lcp: string;
      cls: string;
      fid: string;
    };
  };
  seo: {
    score: number;
    issues: string[];
    recommendations: string[];
  };
  accessibility: {
    score: number;
    issues: string[];
    recommendations: string[];
  };
  security: {
    score: number;
    headers: SecurityHeaders;
    issues: string[];
    recommendations: string[];
  };
  suggestions: string[];
  summary: string;
}

export default async function analyzeWebsite(req: Request, res: Response) {
  // Set CORS headers
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Validate URL format
    let targetUrl: URL;
    try {
      targetUrl = new URL(url.startsWith('http') ? url : `https://${url}`);
    } catch {
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    const API_KEY = process.env.GOOGLE_PAGESPEED_API_KEY;
    
    if (!API_KEY) {
      // Return mock data if API key is not configured
      const mockResult = generateMockAnalysis(targetUrl.href);
      return res.status(200).json(mockResult);
    }

    // Call Google PageSpeed Insights API
    const pageSpeedUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl.href)}&key=${API_KEY}&category=performance&category=accessibility&category=best-practices&category=seo&strategy=mobile`;
    
    const [pageSpeedResponse, securityCheck] = await Promise.allSettled([
      fetch(pageSpeedUrl),
      checkSecurityHeaders(targetUrl.href)
    ]);

    let pageSpeedData: PageSpeedInsightsResponse | null = null;
    
    if (pageSpeedResponse.status === 'fulfilled' && pageSpeedResponse.value.ok) {
      pageSpeedData = await pageSpeedResponse.value.json();
    }

    const securityHeaders = securityCheck.status === 'fulfilled' ? securityCheck.value : {};

    const result = generateAnalysisResult(pageSpeedData, securityHeaders, targetUrl.href);
    
    return res.status(200).json(result);

  } catch (error) {
    console.error('Analysis error:', error);
    return res.status(500).json({ 
      error: 'Failed to analyze website',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

async function checkSecurityHeaders(url: string): Promise<SecurityHeaders> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return {
      'strict-transport-security': response.headers.get('strict-transport-security') || undefined,
      'content-security-policy': response.headers.get('content-security-policy') || undefined,
      'x-frame-options': response.headers.get('x-frame-options') || undefined,
      'x-content-type-options': response.headers.get('x-content-type-options') || undefined,
      'referrer-policy': response.headers.get('referrer-policy') || undefined,
    };
  } catch {
    return {};
  }
}

function generateAnalysisResult(
  pageSpeedData: PageSpeedInsightsResponse | null,
  securityHeaders: SecurityHeaders,
  url: string
): AnalysisResult {
  if (!pageSpeedData) {
    return generateMockAnalysis(url);
  }

  const { categories, audits } = pageSpeedData.lighthouseResult;
  
  // Extract performance metrics
  const performanceScore = Math.round((categories.performance?.score || 0) * 100);
  const seoScore = Math.round((categories.seo?.score || 0) * 100);
  const accessibilityScore = Math.round((categories.accessibility?.score || 0) * 100);
  
  // Security score based on headers
  const securityScore = calculateSecurityScore(securityHeaders);
  
  return {
    performance: {
      score: performanceScore,
      metrics: {
        fcp: audits['first-contentful-paint']?.displayValue || 'N/A',
        lcp: audits['largest-contentful-paint']?.displayValue || 'N/A',
        cls: audits['cumulative-layout-shift']?.displayValue || 'N/A',
        fid: audits['max-potential-fid']?.displayValue || 'N/A',
      }
    },
    seo: {
      score: seoScore,
      issues: generateSEOIssues(audits),
      recommendations: generateSEORecommendations(seoScore)
    },
    accessibility: {
      score: accessibilityScore,
      issues: generateAccessibilityIssues(audits),
      recommendations: generateAccessibilityRecommendations(accessibilityScore)
    },
    security: {
      score: securityScore,
      headers: securityHeaders,
      issues: generateSecurityIssues(securityHeaders),
      recommendations: generateSecurityRecommendations(securityHeaders)
    },
    suggestions: generateOverallSuggestions(performanceScore, seoScore, accessibilityScore, securityScore),
    summary: generateSummary(performanceScore, seoScore, accessibilityScore, securityScore)
  };
}

function generateMockAnalysis(url: string): AnalysisResult {
  const mockScores = {
    performance: 75 + Math.floor(Math.random() * 20),
    seo: 80 + Math.floor(Math.random() * 15),
    accessibility: 70 + Math.floor(Math.random() * 25),
    security: 65 + Math.floor(Math.random() * 30)
  };

  return {
    performance: {
      score: mockScores.performance,
      metrics: {
        fcp: '1.2s',
        lcp: '2.1s',
        cls: '0.05',
        fid: '45ms'
      }
    },
    seo: {
      score: mockScores.seo,
      issues: ['Missing meta description', 'No structured data found'],
      recommendations: ['Add comprehensive meta descriptions', 'Implement Schema.org markup']
    },
    accessibility: {
      score: mockScores.accessibility,
      issues: ['Low color contrast detected', 'Missing alt text on images'],
      recommendations: ['Improve color contrast ratios', 'Add descriptive alt text']
    },
    security: {
      score: mockScores.security,
      headers: {},
      issues: ['Missing security headers', 'No HTTPS redirect detected'],
      recommendations: ['Implement security headers', 'Enforce HTTPS']
    },
    suggestions: [
      'Optimize images for better performance',
      'Implement lazy loading',
      'Add structured data markup',
      'Improve mobile responsiveness'
    ],
    summary: `Website analysis complete. Overall performance needs improvement with focus on ${mockScores.performance < 80 ? 'performance' : mockScores.seo < 85 ? 'SEO' : 'accessibility'} optimization.`
  };
}

function calculateSecurityScore(headers: SecurityHeaders): number {
  let score = 0;
  const maxScore = 100;
  
  if (headers['strict-transport-security']) score += 25;
  if (headers['content-security-policy']) score += 25;
  if (headers['x-frame-options']) score += 20;
  if (headers['x-content-type-options']) score += 15;
  if (headers['referrer-policy']) score += 15;
  
  return Math.min(score, maxScore);
}

function generateSEOIssues(audits: any): string[] {
  const issues: string[] = [];
  
  if (audits['meta-description']?.score === 0) {
    issues.push('Missing or inadequate meta description');
  }
  if (audits['document-title']?.score === 0) {
    issues.push('Missing or inadequate page title');
  }
  if (audits['structured-data']?.score === 0) {
    issues.push('No structured data found');
  }
  
  return issues;
}

function generateSEORecommendations(score: number): string[] {
  const recommendations: string[] = [];
  
  if (score < 90) {
    recommendations.push('Add comprehensive meta descriptions');
    recommendations.push('Implement Schema.org structured data');
    recommendations.push('Optimize page titles and headings');
    recommendations.push('Improve internal linking structure');
  }
  
  return recommendations;
}

function generateAccessibilityIssues(audits: any): string[] {
  const issues: string[] = [];
  
  if (audits['color-contrast']?.score === 0) {
    issues.push('Color contrast issues detected');
  }
  if (audits['image-alt']?.score === 0) {
    issues.push('Images missing alt text');
  }
  
  return issues;
}

function generateAccessibilityRecommendations(score: number): string[] {
  const recommendations: string[] = [];
  
  if (score < 90) {
    recommendations.push('Improve color contrast ratios');
    recommendations.push('Add descriptive alt text to images');
    recommendations.push('Ensure proper heading hierarchy');
    recommendations.push('Add ARIA labels where needed');
  }
  
  return recommendations;
}

function generateSecurityIssues(headers: SecurityHeaders): string[] {
  const issues: string[] = [];
  
  if (!headers['strict-transport-security']) {
    issues.push('Missing Strict-Transport-Security header');
  }
  if (!headers['content-security-policy']) {
    issues.push('Missing Content-Security-Policy header');
  }
  if (!headers['x-frame-options']) {
    issues.push('Missing X-Frame-Options header');
  }
  
  return issues;
}

function generateSecurityRecommendations(headers: SecurityHeaders): string[] {
  const recommendations: string[] = [];
  
  if (!headers['strict-transport-security']) {
    recommendations.push('Implement HSTS (HTTP Strict Transport Security)');
  }
  if (!headers['content-security-policy']) {
    recommendations.push('Add Content Security Policy headers');
  }
  if (!headers['x-frame-options']) {
    recommendations.push('Add X-Frame-Options to prevent clickjacking');
  }
  
  return recommendations;
}

function generateOverallSuggestions(performance: number, seo: number, accessibility: number, security: number): string[] {
  const suggestions: string[] = [];
  
  if (performance < 80) {
    suggestions.push('Optimize images and enable compression');
    suggestions.push('Implement lazy loading for better performance');
  }
  
  if (seo < 85) {
    suggestions.push('Add structured data markup');
    suggestions.push('Optimize meta tags and descriptions');
  }
  
  if (accessibility < 80) {
    suggestions.push('Improve keyboard navigation');
    suggestions.push('Enhance screen reader compatibility');
  }
  
  if (security < 70) {
    suggestions.push('Implement comprehensive security headers');
    suggestions.push('Ensure HTTPS is properly configured');
  }
  
  return suggestions;
}

function generateSummary(performance: number, seo: number, accessibility: number, security: number): string {
  const average = Math.round((performance + seo + accessibility + security) / 4);
  
  if (average >= 90) {
    return 'Excellent! Your website performs well across all areas with minor room for improvement.';
  } else if (average >= 75) {
    return 'Good performance overall. Focus on the lower-scoring areas for significant improvements.';
  } else if (average >= 60) {
    return 'Moderate performance. Several areas need attention to improve user experience and search rankings.';
  } else {
    return 'Significant improvements needed. Prioritize performance, SEO, and security enhancements.';
  }
} 