// types/seo.ts

export interface SEOAuditRequest {
  url: string;
  keywords?: string[];
  includeScreenshot?: boolean;
}

export interface CrawlingData {
  url: string;
  statusCode: number;
  redirects: Redirect[];
  loadTime: number;
  htmlContent: string;
  screenshot?: string; // base64
  mobileScreenshot?: string; // base64
  tabletScreenshot?: string; // base64
  desktopScreenshot?: string; // base64
}

export interface Redirect {
  from: string;
  to: string;
  statusCode: number;
}

export interface LighthouseResult {
  performanceScore: number;
  accessibilityScore: number;
  bestPracticesScore: number;
  seoScore: number;
  overallScore: number;
  coreWebVitals: {
    lcp: number;
    fid: number;
    cls: number;
  };
  opportunities: LighthouseOpportunity[];
  diagnostics: LighthouseDiagnostic[];
}

export interface LighthouseOpportunity {
  id: string;
  title: string;
  description: string;
  score: number;
  details: any;
}

export interface LighthouseDiagnostic {
  id: string;
  title: string;
  description: string;
  score: number;
  displayValue?: string;
}

export interface OnPageSEO {
  title: {
    content: string;
    length: number;
    score: number;
    recommendations: string[];
  };
  metaDescription: {
    content: string;
    length: number;
    score: number;
    recommendations: string[];
  };
  metaRobots: {
    content: string;
    score: number;
    recommendations: string[];
  };
  headings: {
    h1: HeadingAnalysis;
    h2: HeadingAnalysis;
    h3: HeadingAnalysis;
    h4?: HeadingAnalysis;
    h5?: HeadingAnalysis;
    h6?: HeadingAnalysis;
    structure: number; // score
  };
  images: {
    total: number;
    withoutAlt: number;
    oversized: number;
    score: number;
    issues: ImageIssue[];
  };
  links: {
    internal: number;
    external: number;
    broken: number;
    nofollow: number;
    score: number;
    issues: LinkIssue[];
  };
  keywordDensity: KeywordAnalysis[];
  robotsTxt: {
    exists: boolean;
    accessible: boolean;
    issues: string[];
    score: number;
  };
  sitemap: {
    exists: boolean;
    accessible: boolean;
    urls: number;
    score: number;
  };
  structuredData?: {
    hasStructuredData: boolean;
    types: string[];
    isValid: boolean;
    score: number;
  };
  analytics?: {
    googleAnalytics: boolean;
    googleTagManager: boolean;
    facebookPixel: boolean;
    otherTracking: string[];
  };
}

export interface HeadingAnalysis {
  count: number;
  texts: string[];
  score: number;
  recommendations: string[];
}

export interface ImageIssue {
  src: string;
  issue: string;
  recommendation: string;
}

export interface LinkIssue {
  url: string;
  text: string;
  issue: string;
  type: 'internal' | 'external';
}

export interface KeywordAnalysis {
  keyword: string;
  density: number;
  count: number;
  score: number;
  inTitle?: boolean;
  inMeta?: boolean;
  inHeadings?: boolean;
}

export interface SecurityAnalysis {
  https: boolean;
  headers: {
    xFrameOptions: boolean;
    contentSecurityPolicy: boolean;
    xContentTypeOptions: boolean;
    referrerPolicy: boolean;
    permissions: boolean;
  };
  score: number;
  issues: SecurityIssue[];
}

export interface SecurityIssue {
  type: string;
  description: string;
  recommendation: string;
  severity: 'low' | 'medium' | 'high';
}

export interface TechnicalSEO {
  pageSpeed: {
    desktop: number;
    mobile: number;
    score: number;
  };
  mobileUsability: {
    isMobileFriendly: boolean;
    issues: string[];
    score: number;
  };
  schema: {
    hasStructuredData: boolean;
    types: string[];
    score: number;
  };
  canonicalization: {
    hasCanonical: boolean;
    canonicalUrl: string;
    issues: string[];
    score: number;
  };
}

export interface OffPageSEO {
  backlinks: {
    total: number;
    dofollow: number;
    nofollow: number;
    uniqueDomains: number;
    score: number;
  };
  domainAuthority: {
    score: number;
    trend: 'up' | 'down' | 'stable';
  };
  socialSignals: {
    facebook: number;
    twitter: number;
    linkedin: number;
    total: number;
    score: number;
  };
  brandMentions: {
    total: number;
    sentiment: 'positive' | 'neutral' | 'negative';
    score: number;
  };
  competitorAnalysis: {
    position: number;
    totalCompetitors: number;
    gapAnalysis: string[];
  };
  localSEO?: {
    googleMyBusiness: boolean;
    citations: number;
    reviews: {
      average: number;
      total: number;
    };
    score: number;
  };
}

export interface SEOAuditReport {
  url: string;
  analyzedAt: string;
  crawlingData: CrawlingData;
  lighthouseResult: LighthouseResult;
  onPageSEO: OnPageSEO;
  technicalSEO: TechnicalSEO;
  security: SecurityAnalysis;
  offPageSEO: OffPageSEO;
  overallScore: number;
  recommendations: string[];
  summary: {
    criticalIssues: number;
    warningIssues: number;
    passedChecks: number;
    totalChecks: number;
  };
}