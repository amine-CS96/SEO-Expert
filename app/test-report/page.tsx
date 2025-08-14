'use client'

import { SEOReport } from '@/components/seo-report'
import { SEOAuditReport } from '@/types/seo'

// Données de test pour démontrer le menu sticky
const testData: SEOAuditReport = {
  url: "https://example.com",
  analyzedAt: new Date().toISOString(),
  overallScore: 75,
  recommendations: [
    "Optimize title tag length",
    "Improve meta description",
    "Add more internal links",
    "Optimize images with alt text"
  ],
  summary: {
    criticalIssues: 2,
    warningIssues: 5,
    passedChecks: 18,
    totalChecks: 25
  },
  crawlingData: {
    url: "https://example.com",
    statusCode: 200,
    redirects: [],
    loadTime: 1200,
    htmlContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
    mobileScreenshot: undefined
  },
  onPageSEO: {
    title: {
      content: "Example Website - Best Products and Services Online",
      length: 52,
      score: 85,
      recommendations: ["Title length is optimal"]
    },
    metaDescription: {
      content: "Discover the best products and services at Example.com. We offer high-quality solutions for all your needs with excellent customer service and competitive prices.",
      length: 145,
      score: 90,
      recommendations: ["Meta description length is good"]
    },
    metaRobots: {
      content: "index, follow",
      score: 100,
      recommendations: []
    },
    headings: {
      structure: 85,
      h1: {
        count: 1,
        texts: ["Welcome to Example Website"],
        score: 100,
        recommendations: []
      },
      h2: {
        count: 5,
        texts: ["Our Products", "Our Services", "Why Choose Us", "Customer Reviews", "Contact Information"],
        score: 90,
        recommendations: []
      },
      h3: {
        count: 8,
        texts: ["Product Category 1", "Product Category 2", "Service Type 1", "Service Type 2", "Quality Guarantee", "Fast Delivery", "24/7 Support", "Competitive Pricing"],
        score: 85,
        recommendations: []
      },
      h4: {
        count: 3,
        texts: ["Feature 1", "Feature 2", "Feature 3"],
        score: 80,
        recommendations: []
      },
      h5: {
        count: 2,
        texts: ["Detail 1", "Detail 2"],
        score: 75,
        recommendations: []
      },
      h6: {
        count: 1,
        texts: ["Additional Info"],
        score: 70,
        recommendations: []
      }
    },
    keywordDensity: [
      {
        keyword: "products",
        count: 15,
        density: 2.1,
        score: 80,
        inTitle: true,
        inMeta: true,
        inHeadings: true
      },
      {
        keyword: "services",
        count: 12,
        density: 1.8,
        score: 75,
        inTitle: true,
        inMeta: true,
        inHeadings: true
      },
      {
        keyword: "quality",
        count: 8,
        density: 1.2,
        score: 70,
        inTitle: false,
        inMeta: true,
        inHeadings: true
      },
      {
        keyword: "customer",
        count: 10,
        density: 1.5,
        score: 72,
        inTitle: false,
        inMeta: true,
        inHeadings: true
      },
      {
        keyword: "example",
        count: 6,
        density: 0.9,
        score: 65,
        inTitle: true,
        inMeta: true,
        inHeadings: false
      }
    ],
    images: {
      total: 12,
      withoutAlt: 2,
      oversized: 1,
      score: 75,
      issues: [
        {
          src: "/image1.jpg",
          issue: "Missing alt text",
          recommendation: "Add descriptive alt text"
        }
      ]
    },
    links: {
      internal: 25,
      external: 8,
      broken: 1,
      nofollow: 3,
      score: 80,
      issues: [
        {
          url: "/broken-link",
          text: "Broken Link",
          issue: "404 Not Found",
          type: "internal"
        }
      ]
    },
    robotsTxt: {
      exists: true,
      accessible: true,
      issues: [],
      score: 100
    },
    sitemap: {
      exists: true,
      accessible: true,
      urls: 150,
      score: 95
    },
    structuredData: {
      hasStructuredData: true,
      types: ["Organization", "WebSite", "BreadcrumbList"],
      isValid: true,
      score: 85
    },
    analytics: {
      googleAnalytics: true,
      googleTagManager: true,
      facebookPixel: false,
      otherTracking: ["Hotjar", "Mixpanel"]
    }
  },
  technicalSEO: {
    pageSpeed: {
      desktop: 85,
      mobile: 78,
      score: 82
    },
    mobileUsability: {
      isMobileFriendly: true,
      issues: [],
      score: 88
    },
    canonicalization: {
      hasCanonical: true,
      canonicalUrl: "https://example.com/",
      issues: [],
      score: 100
    },
    schema: {
      hasStructuredData: true,
      types: ["Organization", "WebSite"],
      score: 85
    }
  },
  offPageSEO: {
    backlinks: {
      total: 45,
      uniqueDomains: 23,
      dofollow: 38,
      nofollow: 7,
      score: 72
    },
    domainAuthority: {
      score: 65,
      trend: "up"
    },
    socialSignals: {
      facebook: 150,
      twitter: 89,
      linkedin: 34,
      total: 273,
      score: 68
    },
    brandMentions: {
      total: 25,
      sentiment: "positive",
      score: 75
    },
    competitorAnalysis: {
      position: 3,
      totalCompetitors: 10,
      gapAnalysis: ["Improve content quality", "Build more backlinks"]
    }
  },
  security: {
    https: true,
    headers: {
      xFrameOptions: true,
      contentSecurityPolicy: false,
      xContentTypeOptions: true,
      referrerPolicy: true,
      permissions: false
    },
    score: 75,
    issues: [
      {
        type: "CSP",
        description: "Missing Content Security Policy",
        recommendation: "Add CSP header",
        severity: "medium"
      }
    ]
  },
  lighthouseResult: {
    performanceScore: 82,
    accessibilityScore: 91,
    bestPracticesScore: 88,
    seoScore: 94,
    overallScore: 89,
    coreWebVitals: {
      lcp: 2.1,
      fid: 85,
      cls: 0.08
    },
    opportunities: [
      {
        id: "unused-css-rules",
        title: "Remove unused CSS",
        description: "Remove dead rules from stylesheets",
        score: 75,
        details: {}
      }
    ],
    diagnostics: [
      {
        id: "dom-size",
        title: "Avoid an excessive DOM size",
        description: "A large DOM will increase memory usage",
        score: 80,
        displayValue: "1,234 elements"
      }
    ]
  }
}

export default function TestReportPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SEOReport data={testData} />
    </div>
  )
}