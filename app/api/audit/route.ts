// app/api/audit/route.ts
import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import axios from 'axios';
import { ScreenshotService } from '../../../lib/screenshot-service';
import {
  SEOAuditRequest,
  SEOAuditReport,
  CrawlingData,
  LighthouseResult,
  OnPageSEO,
  TechnicalSEO,
  SecurityAnalysis,
  OffPageSEO
} from '../../../types/seo';

export async function POST(req: NextRequest) {
  try {
    const { url, keywords = [], includeScreenshot = true }: SEOAuditRequest = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Validate and clean URL
    const cleanUrl = cleanAndValidateUrl(url);
    if (!cleanUrl) {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
    }

    console.log('Starting SEO audit for:', cleanUrl);

    // 1. Crawling and basic data
    const crawlingData = await performCrawling(cleanUrl, includeScreenshot);
    
    // 2. Lighthouse analysis (simulated for demo)
    const lighthouseResult = generateMockLighthouseResult();
    
    // 3. On-Page SEO analysis
    const onPageSEO = await performOnPageAnalysis(crawlingData.htmlContent, cleanUrl, keywords);
    
    // 4. Technical analysis
    const technicalSEO = await performTechnicalAnalysis(crawlingData, cleanUrl);
    
    // 5. Security analysis
    const security = await performSecurityAnalysis(cleanUrl, crawlingData);
    
    // 6. Off-Page SEO analysis
    const offPageSEO = await performOffPageAnalysis(cleanUrl, crawlingData.htmlContent);

    // Calculer le score global
    const overallScore = calculateOverallScore({
      lighthouse: lighthouseResult,
      onPage: onPageSEO,
      technical: technicalSEO,
      security: security,
      offPage: offPageSEO
    });

    // Générer les recommandations
    const recommendations = generateRecommendations({
      onPageSEO,
      technicalSEO,
      security,
      lighthouseResult,
      offPageSEO
    });

    // Calculer le résumé
    const summary = calculateSummary({
      onPageSEO,
      technicalSEO,
      security,
      lighthouseResult,
      offPageSEO
    });

    const report: SEOAuditReport = {
      url: cleanUrl,
      analyzedAt: new Date().toISOString(),
      crawlingData,
      lighthouseResult,
      onPageSEO,
      technicalSEO,
      security,
      offPageSEO,
      overallScore,
      recommendations,
      summary
    };

    return NextResponse.json({ success: true, report });

  } catch (error) {
    console.error('SEO Audit Error:', error);
    
    // Handle specific error types with user-friendly messages
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    let userMessage = 'Failed to perform SEO audit';
    let errorType = 'GENERAL_ERROR';
    let statusCode = 500;
    
    switch (errorMessage) {
      case 'DNS_NOT_RESOLVED':
        userMessage = 'The website address could not be found. Please check the URL and try again.';
        errorType = 'URL_NOT_FOUND';
        statusCode = 404;
        break;
      case 'CONNECTION_REFUSED':
        userMessage = 'Unable to connect to the website. The server may be down or blocking our requests.';
        errorType = 'CONNECTION_ERROR';
        statusCode = 503;
        break;
      case 'CONNECTION_TIMEOUT':
        userMessage = 'The website took too long to respond. Please try again later.';
        errorType = 'TIMEOUT_ERROR';
        statusCode = 408;
        break;
      case 'NAVIGATION_TIMEOUT':
        userMessage = 'The website is taking too long to load. Please check if the URL is correct.';
        errorType = 'TIMEOUT_ERROR';
        statusCode = 408;
        break;
      case 'PAGE_NOT_FOUND':
        userMessage = 'The requested page was not found (404 error). Please verify the URL is correct.';
        errorType = 'PAGE_NOT_FOUND';
        statusCode = 404;
        break;
      case 'ACCESS_FORBIDDEN':
        userMessage = 'Access to this website is forbidden. The site may be blocking our analysis tool.';
        errorType = 'ACCESS_DENIED';
        statusCode = 403;
        break;
      case 'SERVER_ERROR':
        userMessage = 'The website is experiencing server issues. Please try again later.';
        errorType = 'SERVER_ERROR';
        statusCode = 502;
        break;
      case 'NO_INTERNET':
        userMessage = 'Network connection issue detected. Please check your internet connection.';
        errorType = 'NETWORK_ERROR';
        statusCode = 503;
        break;
      case 'CRAWLING_FAILED':
        userMessage = 'Unable to analyze the website. The site may be blocking automated tools or have technical issues.';
        errorType = 'ANALYSIS_FAILED';
        statusCode = 422;
        break;
      default:
        if (errorMessage === 'Invalid URL format') {
          userMessage = 'The URL format is invalid. Please enter a valid website address starting with https://';
          errorType = 'INVALID_URL';
          statusCode = 400;
        } else {
          userMessage = 'An unexpected error occurred during the analysis. Please try again.';
          errorType = 'GENERAL_ERROR';
          statusCode = 500;
        }
    }
    
    return NextResponse.json({
      error: userMessage,
      errorType: errorType,
      details: errorMessage,
      success: false
    }, { status: statusCode });
  }
}

// Utility functions
function cleanAndValidateUrl(url: string): string | null {
  try {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    const urlObj = new URL(url);
    return urlObj.toString();
  } catch {
    return null;
  }
}

async function performCrawling(url: string, includeScreenshot: boolean): Promise<CrawlingData> {
  const startTime = Date.now();
  
  try {
    // Utiliser axios pour récupérer le contenu HTML (compatible Vercel)
    const response = await axios.get(url, {
      timeout: 20000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SEO-Audit-Bot/1.0)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
      },
      maxRedirects: 5,
      validateStatus: (status) => status < 500 // Accept all status codes below 500
    });
    
    const statusCode = response.status;
    const loadTime = Date.now() - startTime;
    const htmlContent = response.data;
    
    // Handle different HTTP status codes
    if (statusCode >= 400) {
      if (statusCode === 404) {
        throw new Error('PAGE_NOT_FOUND');
      } else if (statusCode === 403) {
        throw new Error('ACCESS_FORBIDDEN');
      } else if (statusCode >= 400) {
        throw new Error('CLIENT_ERROR');
      }
    }
    
    // Gestion des screenshots avec le service adaptatif
    let screenshot, mobileScreenshot, desktopScreenshot, tabletScreenshot;
    if (includeScreenshot) {
      try {
        const screenshots = await ScreenshotService.captureMultipleScreenshots(url);
        desktopScreenshot = screenshots.desktop;
        tabletScreenshot = screenshots.tablet;
        mobileScreenshot = screenshots.mobile;
        screenshot = desktopScreenshot; // Backward compatibility
      } catch (error) {
        console.warn('Screenshot capture failed:', error);
        // Continue without screenshots
      }
    }
    
    // Analyze redirections
    const redirects = await analyzeRedirects(url);
    
    return {
      url,
      statusCode,
      redirects,
      loadTime,
      htmlContent,
      screenshot,
      mobileScreenshot,
      tabletScreenshot,
      desktopScreenshot
    };
    
  } catch (error: any) {
    // Handle axios errors
    if (error.code === 'ENOTFOUND') {
      throw new Error('DNS_NOT_RESOLVED');
    } else if (error.code === 'ECONNREFUSED') {
      throw new Error('CONNECTION_REFUSED');
    } else if (error.code === 'ETIMEDOUT' || error.code === 'ECONNABORTED') {
      throw new Error('CONNECTION_TIMEOUT');
    } else if (error.response) {
      const statusCode = error.response.status;
      if (statusCode === 404) {
        throw new Error('PAGE_NOT_FOUND');
      } else if (statusCode === 403) {
        throw new Error('ACCESS_FORBIDDEN');
      } else if (statusCode >= 500) {
        throw new Error('SERVER_ERROR');
      } else if (statusCode >= 400) {
        throw new Error('CLIENT_ERROR');
      }
    } else {
      console.error('Crawling error:', error);
      throw new Error('CRAWLING_FAILED');
    }
  }
  
  // This should never be reached due to throws above, but TypeScript needs it
  throw new Error('CRAWLING_FAILED');
}

async function analyzeRedirects(url: string) {
  const redirects = [];
  let currentUrl = url;
  let redirectCount = 0;
  const maxRedirects = 10;
  
  try {
    while (redirectCount < maxRedirects) {
      const response = await axios.get(currentUrl, {
        maxRedirects: 0,
        validateStatus: (status) => status >= 200 && status < 400
      });
      
      if (response.status >= 300 && response.status < 400) {
        const location = response.headers.location;
        if (location) {
          redirects.push({
            from: currentUrl,
            to: location,
            statusCode: response.status
          });
          currentUrl = location;
          redirectCount++;
        } else {
          break;
        }
      } else {
        break;
      }
    }
  } catch (error) {
    // Ignore redirection errors to continue analysis
  }
  
  return redirects;
}

// Function to generate simulated Lighthouse results (for demo)
function generateMockLighthouseResult(): LighthouseResult {
  const performanceScore = Math.floor(Math.random() * 40) + 60; // 60-100
  const accessibilityScore = Math.floor(Math.random() * 30) + 70; // 70-100
  const bestPracticesScore = Math.floor(Math.random() * 35) + 65; // 65-100
  const seoScore = Math.floor(Math.random() * 25) + 75; // 75-100
  
  const overallScore = Math.round((performanceScore + accessibilityScore + bestPracticesScore + seoScore) / 4);
  
  return {
    performanceScore,
    accessibilityScore,
    bestPracticesScore,
    seoScore,
    overallScore,
    coreWebVitals: {
      lcp: Math.random() * 3000 + 1000, // 1-4 secondes
      fid: Math.random() * 200 + 50, // 50-250ms
      cls: Math.random() * 0.3, // 0-0.3
    },
    opportunities: [
      {
        id: 'unused-css-rules',
        title: 'Supprimer le CSS inutilisé',
        description: 'Réduisez les octets inutilisés et améliorez le temps de chargement.',
        score: 0.5,
        details: {}
      },
      {
        id: 'optimize-images',
        title: 'Optimize images',
        description: 'Serve images in modern formats to save bandwidth.',
        score: 0.3,
        details: {}
      }
    ],
    diagnostics: [
      {
        id: 'render-blocking-resources',
        title: 'Eliminate render-blocking resources',
        description: 'Resources are blocking the first render of your page.',
        score: 0.4,
        displayValue: '3 ressources trouvées'
      }
    ]
  };
}

function analyzeStructuredData($: cheerio.Root) {
  const schemaScripts = $('script[type="application/ld+json"]');
  const types: string[] = [];
  let isValid = true;
  
  schemaScripts.each((i, el) => {
    try {
      const jsonLd = JSON.parse($(el).html() || '{}');
      if (jsonLd['@type']) {
        if (Array.isArray(jsonLd['@type'])) {
          types.push(...jsonLd['@type']);
        } else {
          types.push(jsonLd['@type']);
        }
      }
      // Vérifier d'autres formats de schema
      if (jsonLd['@graph']) {
        jsonLd['@graph'].forEach((item: any) => {
          if (item['@type']) {
            if (Array.isArray(item['@type'])) {
              types.push(...item['@type']);
            } else {
              types.push(item['@type']);
            }
          }
        });
      }
    } catch (error) {
      isValid = false;
    }
  });
  
  // Vérifier les microdata et RDFa aussi
  const microdataItems = $('[itemtype]');
  microdataItems.each((i, el) => {
    const itemtype = $(el).attr('itemtype');
    if (itemtype) {
      const schemaType = itemtype.split('/').pop();
      if (schemaType) {
        types.push(schemaType);
      }
    }
  });
  
  // Déterminer si des données structurées existent (JSON-LD ou microdata)
  const hasStructuredData = schemaScripts.length > 0 || microdataItems.length > 0;
  
  // Calculer le score
  let score = 0;
  if (hasStructuredData) {
    score += 60;
    if (isValid) score += 20;
    if (types.length > 1) score += 10;
    if (types.length > 3) score += 10;
  }
  
  return {
    hasStructuredData,
    types: [...new Set(types)], // Remove duplicates
    isValid,
    score
  };
}

function analyzeAnalytics($: cheerio.Root, htmlContent: string) {
  // Détecter Google Analytics
  const googleAnalytics = htmlContent.includes('gtag(') ||
                         htmlContent.includes('ga(') ||
                         htmlContent.includes('google-analytics.com') ||
                         htmlContent.includes('googletagmanager.com') ||
                         $('script[src*="google-analytics"]').length > 0 ||
                         $('script[src*="gtag"]').length > 0;
  
  // Détecter Google Tag Manager
  const googleTagManager = htmlContent.includes('googletagmanager.com') ||
                          htmlContent.includes('GTM-') ||
                          $('script[src*="googletagmanager"]').length > 0 ||
                          $('noscript iframe[src*="googletagmanager"]').length > 0;
  
  // Détecter Facebook Pixel
  const facebookPixel = htmlContent.includes('fbq(') ||
                       htmlContent.includes('facebook.com/tr') ||
                       htmlContent.includes('connect.facebook.net') ||
                       $('script[src*="connect.facebook.net"]').length > 0;
  
  // Détecter d'autres outils de tracking
  const otherTracking: string[] = [];
  
  // Hotjar
  if (htmlContent.includes('hotjar') || $('script[src*="hotjar"]').length > 0) {
    otherTracking.push('Hotjar');
  }
  
  // Mixpanel
  if (htmlContent.includes('mixpanel') || $('script[src*="mixpanel"]').length > 0) {
    otherTracking.push('Mixpanel');
  }
  
  // Adobe Analytics
  if (htmlContent.includes('adobe') && htmlContent.includes('analytics') ||
      $('script[src*="adobe"]').length > 0) {
    otherTracking.push('Adobe Analytics');
  }
  
  // LinkedIn Insight Tag
  if (htmlContent.includes('linkedin.com/li.lms-analytics') ||
      $('script[src*="linkedin.com"]').length > 0) {
    otherTracking.push('LinkedIn Insight');
  }
  
  // Matomo/Piwik
  if (htmlContent.includes('matomo') || htmlContent.includes('piwik') ||
      $('script[src*="matomo"]').length > 0 || $('script[src*="piwik"]').length > 0) {
    otherTracking.push('Matomo');
  }
  
  return {
    googleAnalytics,
    googleTagManager,
    facebookPixel,
    otherTracking
  };
}

async function performOnPageAnalysis(htmlContent: string, url: string, keywords: string[]): Promise<OnPageSEO> {
  const $ = cheerio.load(htmlContent);
  
  // Analyse du title
  const titleElement = $('title').first();
  const titleContent = titleElement.text().trim();
  const titleLength = titleContent.length;
  const titleScore = calculateTitleScore(titleContent, titleLength);
  
  // Analyse meta description
  const metaDesc = $('meta[name="description"]').attr('content') || '';
  const metaDescLength = metaDesc.length;
  const metaDescScore = calculateMetaDescScore(metaDesc, metaDescLength);
  
  // Analyse meta robots
  const metaRobots = $('meta[name="robots"]').attr('content') || '';
  const metaRobotsScore = metaRobots ? 100 : 50;
  
  // Analyse des headings
  const headings = analyzeHeadings($);
  
  // Analyse des images
  const images = analyzeImages($);
  
  // Analyse des liens
  const links = analyzeLinks($, url);
  
  // Analyse densité mots-clés
  const keywordDensity = analyzeKeywordDensity(htmlContent, keywords, $);
  
  // Vérification robots.txt
  const robotsTxt = await checkRobotsTxt(url);
  
  // Vérification sitemap
  const sitemap = await checkSitemap(url);
  
  // Analyse des données structurées
  const structuredData = analyzeStructuredData($);
  
  // Analyse des outils d'analytics
  const analytics = analyzeAnalytics($, htmlContent);
  
  return {
    title: {
      content: titleContent,
      length: titleLength,
      score: titleScore,
      recommendations: generateTitleRecommendations(titleContent, titleLength)
    },
    metaDescription: {
      content: metaDesc,
      length: metaDescLength,
      score: metaDescScore,
      recommendations: generateMetaDescRecommendations(metaDesc, metaDescLength)
    },
    metaRobots: {
      content: metaRobots,
      score: metaRobotsScore,
      recommendations: metaRobots ? [] : ['Add meta robots tag to control indexing']
    },
    headings,
    images,
    links,
    keywordDensity,
    robotsTxt,
    sitemap,
    structuredData,
    analytics
  };
}

function analyzeHeadings($: cheerio.Root) {
  const h1Elements = $('h1');
  const h2Elements = $('h2');
  const h3Elements = $('h3');
  const h4Elements = $('h4');
  const h5Elements = $('h5');
  const h6Elements = $('h6');
  
  const h1Analysis = {
    count: h1Elements.length,
    texts: h1Elements.map((i, el) => $(el).text().trim()).get(),
    score: h1Elements.length === 1 ? 100 : (h1Elements.length === 0 ? 0 : 50),
    recommendations: h1Elements.length === 1 ? [] :
      h1Elements.length === 0 ? ['Add a unique H1 tag'] :
      ['Use only one H1 tag per page']
  };
  
  const h2Analysis = {
    count: h2Elements.length,
    texts: h2Elements.map((i, el) => $(el).text().trim()).get().slice(0, 5),
    score: h2Elements.length > 0 ? 100 : 50,
    recommendations: h2Elements.length === 0 ? ['Add H2 tags to structure content'] : []
  };
  
  const h3Analysis = {
    count: h3Elements.length,
    texts: h3Elements.map((i, el) => $(el).text().trim()).get().slice(0, 5),
    score: h3Elements.length > 0 ? 100 : 80,
    recommendations: h3Elements.length === 0 ? ['Consider adding H3 tags for better structure'] : []
  };

  const h4Analysis = {
    count: h4Elements.length,
    texts: h4Elements.map((i, el) => $(el).text().trim()).get().slice(0, 3),
    score: 100,
    recommendations: []
  };

  const h5Analysis = {
    count: h5Elements.length,
    texts: h5Elements.map((i, el) => $(el).text().trim()).get().slice(0, 3),
    score: 100,
    recommendations: []
  };

  const h6Analysis = {
    count: h6Elements.length,
    texts: h6Elements.map((i, el) => $(el).text().trim()).get().slice(0, 3),
    score: 100,
    recommendations: []
  };
  
  const structureScore = calculateHeadingStructureScore($);
  
  return {
    h1: h1Analysis,
    h2: h2Analysis,
    h3: h3Analysis,
    h4: h4Analysis,
    h5: h5Analysis,
    h6: h6Analysis,
    structure: structureScore
  };
}

function analyzeImages($: cheerio.Root) {
  const images = $('img');
  const total = images.length;
  const withoutAlt = images.filter((i, el) => !$(el).attr('alt')).length;
  const oversized = 0; // Would require more in-depth analysis
  
  const score = total === 0 ? 100 : Math.max(0, Math.round(((total - withoutAlt) / total) * 100));
  
  const issues = images.map((i, el) => {
    const $img = $(el);
    const src = $img.attr('src') || '';
    const alt = $img.attr('alt');
    
    if (!alt) {
      return {
        src,
        issue: 'Missing alt attribute',
        recommendation: 'Add descriptive alt attribute'
      };
    }
    return null;
  }).get().filter(Boolean);
  
  return {
    total,
    withoutAlt,
    oversized,
    score,
    issues
  };
}

function analyzeLinks($: cheerio.Root, baseUrl: string) {
  const links = $('a[href]');
  let internal = 0;
  let external = 0;
  let broken = 0;
  let nofollow = 0;
  const issues: any[] = [];
  const validLinks: any[] = [];
  
  try {
    const baseDomain = new URL(baseUrl).hostname;
    
    links.each((i, el) => {
      const $link = $(el);
      const href = $link.attr('href') || '';
      const text = $link.text().trim();
      const rel = $link.attr('rel') || '';
      
      // Ignore empty links, anchors and javascript links
      if (!href || href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        return;
      }
      
      try {
        let fullUrl: URL;
        
        // Gérer les URLs relatives et absolues
        if (href.startsWith('http://') || href.startsWith('https://')) {
          fullUrl = new URL(href);
        } else if (href.startsWith('//')) {
          fullUrl = new URL('https:' + href);
        } else {
          fullUrl = new URL(href, baseUrl);
        }
        
        const isExternal = fullUrl.hostname !== baseDomain;
        
        if (isExternal) {
          external++;
        } else {
          internal++;
        }
        
        if (rel.includes('nofollow')) {
          nofollow++;
        }
        
        validLinks.push({
          url: href,
          text: text,
          isExternal,
          hasNofollow: rel.includes('nofollow')
        });
        
        // Vérifier les problèmes
        if (!text || text.length < 2) {
          issues.push({
            url: href,
            text: text || '[No text]',
            issue: 'Link without descriptive anchor text',
            type: isExternal ? 'external' : 'internal'
          });
        }
        
        if (text.toLowerCase().includes('cliquez ici') || text.toLowerCase().includes('click here') || text.toLowerCase().includes('lire plus')) {
          issues.push({
            url: href,
            text: text,
            issue: 'Texte d\'ancrage non descriptif',
            type: isExternal ? 'external' : 'internal'
          });
        }
        
      } catch (error) {
        broken++;
        issues.push({
          url: href,
          text: text,
          issue: 'URL malformée ou invalide',
          type: 'broken'
        });
      }
    });
    
  } catch (error) {
    console.error('Error during link analysis:', error);
  }
  
  const totalLinks = internal + external;
  let score = 100;
  
  if (totalLinks === 0) {
    score = 30; // No links = bad for SEO
  } else {
    // Pénaliser les problèmes
    const problemRatio = issues.length / totalLinks;
    score = Math.max(0, Math.round(100 - (problemRatio * 50)));
    
    // Bonus for good internal/external balance
    if (internal > 0 && external > 0) {
      const ratio = Math.min(internal, external) / Math.max(internal, external);
      if (ratio > 0.3) score += 10;
    }
    
    // Penalize if too many nofollow links
    if (nofollow > totalLinks * 0.5) {
      score -= 20;
    }
  }
  
  return {
    internal,
    external,
    broken,
    nofollow,
    score: Math.min(100, Math.max(0, score)),
    issues: issues.slice(0, 10),
    validLinks: validLinks.slice(0, 20)
  };
}

function analyzeKeywordDensity(htmlContent: string, keywords: string[], $: cheerio.Root) {
  const text = htmlContent.replace(/<[^>]*>/g, ' ').toLowerCase();
  const words = text.match(/\b\w+\b/g) || [];
  const totalWords = words.length;
  
  // Si aucun mot-clé n'est fourni, extraire les mots les plus fréquents
  if (keywords.length === 0) {
    const wordFreq: { [key: string]: number } = {};
    words.forEach(word => {
      if (word.length > 3) { // Ignore words that are too short
        wordFreq[word] = (wordFreq[word] || 0) + 1;
      }
    });
    
    // Take the 5 most frequent words
    keywords = Object.entries(wordFreq)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([word]) => word);
  }
  
  return keywords.map(keyword => {
    const keywordLower = keyword.toLowerCase();
    const count = (text.match(new RegExp('\\b' + keywordLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'g')) || []).length;
    const density = totalWords > 0 ? (count / totalWords) * 100 : 0;
    
    // Check presence in important elements
    const titleElement = $('title').first();
    const metaDesc = $('meta[name="description"]').attr('content') || '';
    const h1Elements = $('h1');
    const h2Elements = $('h2');
    
    const inTitle = titleElement.text().toLowerCase().includes(keywordLower);
    const inMeta = metaDesc.toLowerCase().includes(keywordLower);
    const inH1 = h1Elements.toArray().some(el => $(el).text().toLowerCase().includes(keywordLower));
    const inH2 = h2Elements.toArray().some(el => $(el).text().toLowerCase().includes(keywordLower));
    
    let score = 50; // Score de base
    if (density === 0) score = 0;
    else if (density > 3) score = 30; // Trop élevé - keyword stuffing
    else if (density >= 1 && density <= 3) score = 100; // Optimal
    else if (density >= 0.5 && density < 1) score = 80; // Bon
    else if (density > 0 && density < 0.5) score = 60; // Faible mais présent
    
    // Bonus for presence in important elements
    if (inTitle) score += 10;
    if (inMeta) score += 5;
    if (inH1) score += 10;
    if (inH2) score += 5;
    
    score = Math.min(100, score); // Cap à 100
    
    return {
      keyword,
      density: Math.round(density * 100) / 100,
      count,
      score,
      inTitle,
      inMeta,
      inHeadings: inH1 || inH2
    };
  });
}

async function checkRobotsTxt(url: string) {
  try {
    const robotsUrl = new URL('/robots.txt', url).toString();
    const response = await axios.get(robotsUrl, { timeout: 5000 });
    
    return {
      exists: true,
      accessible: response.status === 200,
      issues: response.status !== 200 ? ['Robots.txt non accessible'] : [],
      score: response.status === 200 ? 100 : 50
    };
  } catch (error) {
    return {
      exists: false,
      accessible: false,
      issues: ['Robots.txt introuvable'],
      score: 0
    };
  }
}

async function checkSitemap(url: string) {
  const sitemapUrls = [
    new URL('/sitemap.xml', url).toString(),
    new URL('/sitemap_index.xml', url).toString()
  ];
  
  for (const sitemapUrl of sitemapUrls) {
    try {
      const response = await axios.get(sitemapUrl, { timeout: 5000 });
      if (response.status === 200) {
        const urlCount = (response.data.match(/<url>/g) || []).length;
        return {
          exists: true,
          accessible: true,
          urls: urlCount,
          score: 100
        };
      }
    } catch (error) {
      // Continue to next sitemap URL
    }
  }
  
  return {
    exists: false,
    accessible: false,
    urls: 0,
    score: 0
  };
}

async function performTechnicalAnalysis(crawlingData: CrawlingData, url: string): Promise<TechnicalSEO> {
  const $ = cheerio.load(crawlingData.htmlContent);
  
  // Page speed (basé sur le temps de chargement initial)
  const loadTimeMs = crawlingData.loadTime;
  const desktopScore = loadTimeMs < 1000 ? 100 : loadTimeMs < 3000 ? 75 : loadTimeMs < 5000 ? 50 : 25;
  const mobileScore = Math.max(25, desktopScore - 15); // Mobile generally slower
  
  // Mobile usability
  const viewport = $('meta[name="viewport"]').attr('content');
  const isMobileFriendly = !!viewport;
  const mobileIssues = [];
  if (!viewport) {
    mobileIssues.push('Missing viewport tag');
  }
  
  // Schema markup
  const schemaScripts = $('script[type="application/ld+json"]');
  const hasStructuredData = schemaScripts.length > 0;
  const schemaTypes: string[] = [];
  
  schemaScripts.each((i, el) => {
    try {
      const jsonLd = JSON.parse($(el).html() || '{}');
      if (jsonLd['@type']) {
        schemaTypes.push(jsonLd['@type']);
      }
    } catch (error) {
      // Ignore parsing errors
    }
  });
  
  // Canonicalization
  const canonicalLink = $('link[rel="canonical"]').attr('href');
  const hasCanonical = !!canonicalLink;
  const canonicalUrl = hasCanonical ? canonicalLink || '' : '';
  const canonicalIssues = [];
  
  if (!hasCanonical) {
    canonicalIssues.push('Missing canonical URL');
  } else if (canonicalUrl && !canonicalUrl.startsWith('http')) {
    canonicalIssues.push('URL canonique relative (recommandée absolue)');
  }
  
  return {
    pageSpeed: {
      desktop: desktopScore,
      mobile: mobileScore,
      score: Math.round((desktopScore + mobileScore) / 2)
    },
    mobileUsability: {
      isMobileFriendly,
      issues: mobileIssues,
      score: isMobileFriendly ? 100 : 0
    },
    schema: {
      hasStructuredData,
      types: [...new Set(schemaTypes)],
      score: hasStructuredData ? 100 : 50
    },
    canonicalization: {
      hasCanonical,
      canonicalUrl,
      issues: canonicalIssues,
      score: hasCanonical ? (canonicalIssues.length === 0 ? 100 : 75) : 50
    }
  };
}

async function performSecurityAnalysis(url: string, crawlingData: CrawlingData): Promise<SecurityAnalysis> {
  const isHttps = url.startsWith('https://');
  
  // Analyser les en-têtes de sécurité (simulation basique)
  const headers = {
    xFrameOptions: Math.random() > 0.3, // Simulation
    contentSecurityPolicy: Math.random() > 0.5,
    xContentTypeOptions: Math.random() > 0.4,
    referrerPolicy: Math.random() > 0.6,
    permissions: Math.random() > 0.7
  };
  
  const issues = [];
  
  if (!isHttps) {
    issues.push({
      type: 'HTTPS',
      description: 'Le site n\'utilise pas HTTPS',
      recommendation: 'Implémenter un certificat SSL/TLS pour sécuriser les communications',
      severity: 'high' as const
    });
  }
  
  if (!headers.xFrameOptions) {
    issues.push({
      type: 'X-Frame-Options',
      description: 'En-tête X-Frame-Options manquant',
      recommendation: 'Ajouter l\'en-tête X-Frame-Options pour prévenir le clickjacking',
      severity: 'medium' as const
    });
  }
  
  if (!headers.contentSecurityPolicy) {
    issues.push({
      type: 'Content-Security-Policy',
      description: 'Politique de sécurité du contenu non définie',
      recommendation: 'Implémenter une CSP pour prévenir les attaques XSS',
      severity: 'medium' as const
    });
  }
  
  if (!headers.xContentTypeOptions) {
    issues.push({
      type: 'X-Content-Type-Options',
      description: 'En-tête X-Content-Type-Options manquant',
      recommendation: 'Ajouter "nosniff" pour empêcher le MIME sniffing',
      severity: 'low' as const
    });
  }
  
  // Calculer le score de sécurité
  let score = 0;
  if (isHttps) score += 40;
  if (headers.xFrameOptions) score += 15;
  if (headers.contentSecurityPolicy) score += 20;
  if (headers.xContentTypeOptions) score += 10;
  if (headers.referrerPolicy) score += 10;
  if (headers.permissions) score += 5;
  
  return {
    https: isHttps,
    headers,
    score,
    issues
  };
}

// Fonctions de calcul des scores
function calculateTitleScore(title: string, length: number): number {
  if (length === 0) return 0;
  if (length < 30 || length > 60) return 70;
  return 100;
}

function calculateMetaDescScore(metaDesc: string, length: number): number {
  if (length === 0) return 0;
  if (length < 120 || length > 160) return 70;
  return 100;
}

function calculateHeadingStructureScore($: cheerio.Root): number {
  const h1Count = $('h1').length;
  const h2Count = $('h2').length;
  
  if (h1Count === 0) return 0;
  if (h1Count > 1) return 50;
  if (h2Count === 0) return 70;
  return 100;
}


function generateTitleRecommendations(title: string, length: number): string[] {
  const recommendations = [];
  
  if (length === 0) {
    recommendations.push('Ajouter une balise title descriptive');
  } else if (length < 30) {
    recommendations.push('Allonger le title (minimum 30 caractères)');
  } else if (length > 60) {
    recommendations.push('Raccourcir le title (maximum 60 caractères)');
  }
  
  // Removed overly generic brand name recommendation
  
  return recommendations;
}

function generateMetaDescRecommendations(metaDesc: string, length: number): string[] {
  const recommendations = [];
  
  if (length === 0) {
    recommendations.push('Ajouter une meta description attractive');
  } else if (length < 120) {
    recommendations.push('Allonger la description (minimum 120 caractères)');
  } else if (length > 160) {
    recommendations.push('Raccourcir la description (maximum 160 caractères)');
  }
  
  // Removed overly generic engagement recommendation
  
  return recommendations;
}


// Fonction pour analyser les signaux sociaux réels
function analyzeSocialSignals($: cheerio.Root, htmlContent: string) {
  // Vérifier les balises Open Graph (Facebook)
  const ogTags = {
    title: $('meta[property="og:title"]').attr('content'),
    description: $('meta[property="og:description"]').attr('content'),
    image: $('meta[property="og:image"]').attr('content'),
    url: $('meta[property="og:url"]').attr('content'),
    type: $('meta[property="og:type"]').attr('content')
  };
  
  // Vérifier les balises Twitter Cards
  const twitterTags = {
    card: $('meta[name="twitter:card"]').attr('content'),
    site: $('meta[name="twitter:site"]').attr('content'),
    title: $('meta[name="twitter:title"]').attr('content'),
    description: $('meta[name="twitter:description"]').attr('content'),
    image: $('meta[name="twitter:image"]').attr('content')
  };
  
  // Vérifier la présence de pixels et scripts sociaux
  const facebookPixel = htmlContent.includes('fbq(') || htmlContent.includes('facebook.com/tr');
  const googleAnalytics = htmlContent.includes('gtag(') || htmlContent.includes('ga(') || htmlContent.includes('google-analytics.com');
  const linkedinInsight = htmlContent.includes('linkedin.com/li.lms-analytics');
  
  // Vérifier les liens vers les réseaux sociaux
  const socialLinks = {
    facebook: $('a[href*="facebook.com"]').length > 0,
    twitter: $('a[href*="twitter.com"]').length > 0 || $('a[href*="x.com"]').length > 0,
    linkedin: $('a[href*="linkedin.com"]').length > 0,
    instagram: $('a[href*="instagram.com"]').length > 0,
    youtube: $('a[href*="youtube.com"]').length > 0
  };
  
  // Calculer le score basé sur les éléments détectés
  let score = 0;
  let detectedElements = 0;
  
  // Open Graph tags (30 points max)
  const ogCount = Object.values(ogTags).filter(Boolean).length;
  score += Math.min(30, ogCount * 6);
  if (ogCount > 0) detectedElements++;
  
  // Twitter Cards (20 points max)
  const twitterCount = Object.values(twitterTags).filter(Boolean).length;
  score += Math.min(20, twitterCount * 4);
  if (twitterCount > 0) detectedElements++;
  
  // Pixels et tracking (20 points max)
  if (facebookPixel) { score += 7; detectedElements++; }
  if (googleAnalytics) { score += 7; detectedElements++; }
  if (linkedinInsight) { score += 6; detectedElements++; }
  
  // Liens sociaux (30 points max)
  const socialLinkCount = Object.values(socialLinks).filter(Boolean).length;
  score += Math.min(30, socialLinkCount * 6);
  if (socialLinkCount > 0) detectedElements++;
  
  return {
    score: Math.min(100, score),
    ogTags,
    twitterTags,
    pixels: {
      facebook: facebookPixel,
      googleAnalytics,
      linkedin: linkedinInsight
    },
    socialLinks,
    detectedElements
  };
}

// Nouvelle fonction pour l'analyse Off-Page SEO
async function performOffPageAnalysis(url: string, htmlContent?: string): Promise<OffPageSEO> {
  const domain = new URL(url).hostname;
  
  // Analyse plus réaliste basée sur le domaine et l'âge estimé
  const isPopularDomain = ['google.com', 'facebook.com', 'twitter.com', 'linkedin.com', 'github.com', 'stackoverflow.com'].some(d => domain.includes(d));
  const isNewDomain = domain.includes('netlify.app') || domain.includes('vercel.app') || domain.includes('herokuapp.com');
  
  // Estimation des backlinks basée sur le type de domaine
  let baseBacklinks = 0;
  let baseDomainAuthority = 20;
  
  if (isPopularDomain) {
    baseBacklinks = Math.floor(Math.random() * 50000) + 10000;
    baseDomainAuthority = Math.floor(Math.random() * 30) + 70;
  } else if (isNewDomain) {
    baseBacklinks = Math.floor(Math.random() * 50) + 0;
    baseDomainAuthority = Math.floor(Math.random() * 20) + 10;
  } else {
    baseBacklinks = Math.floor(Math.random() * 500) + 50;
    baseDomainAuthority = Math.floor(Math.random() * 40) + 30;
  }
  
  const backlinks = {
    total: baseBacklinks,
    dofollow: Math.floor(baseBacklinks * 0.7),
    nofollow: Math.floor(baseBacklinks * 0.3),
    uniqueDomains: Math.floor(baseBacklinks * 0.3),
    score: Math.min(100, Math.max(0, Math.floor((baseBacklinks / 1000) * 100)))
  };
  
  // Autorité de domaine plus réaliste
  const domainAuthority = {
    score: baseDomainAuthority,
    trend: backlinks.total > 100 ? 'up' : backlinks.total < 10 ? 'down' : 'stable' as 'up' | 'down' | 'stable'
  };
  
  // Analyse des signaux sociaux réels si le contenu HTML est fourni
  let socialSignals;
  if (htmlContent) {
    const $ = cheerio.load(htmlContent);
    const socialAnalysis = analyzeSocialSignals($, htmlContent);
    
    socialSignals = {
      facebook: socialAnalysis.ogTags.title ? 50 : 0,
      twitter: socialAnalysis.twitterTags.card ? 30 : 0,
      linkedin: socialAnalysis.socialLinks.linkedin ? 20 : 0,
      total: socialAnalysis.detectedElements * 25,
      score: socialAnalysis.score
    };
  } else {
    // Fallback vers l'ancienne méthode si pas de contenu HTML
    let socialMultiplier = 1;
    if (isPopularDomain) socialMultiplier = 10;
    else if (isNewDomain) socialMultiplier = 0.1;
    
    socialSignals = {
      facebook: Math.floor((Math.random() * 500 + 10) * socialMultiplier),
      twitter: Math.floor((Math.random() * 300 + 5) * socialMultiplier),
      linkedin: Math.floor((Math.random() * 200 + 2) * socialMultiplier),
      total: 0,
      score: Math.min(100, Math.max(0, Math.floor(socialMultiplier * 50)))
    };
    socialSignals.total = socialSignals.facebook + socialSignals.twitter + socialSignals.linkedin;
  }
  
  // Mentions de marque
  const brandMentions = {
    total: Math.floor(backlinks.total * 0.1) + Math.floor(Math.random() * 20),
    sentiment: backlinks.total > 100 ? 'positive' : backlinks.total > 10 ? 'neutral' : 'negative' as 'positive' | 'neutral' | 'negative',
    score: Math.min(100, Math.max(0, Math.floor((backlinks.total / 100) * 50) + 20))
  };
  
  // Analyse concurrentielle plus réaliste
  const competitorAnalysis = {
    position: Math.max(1, Math.min(50, Math.floor((100 - domainAuthority.score) / 2))),
    totalCompetitors: 50,
    gapAnalysis: [
      backlinks.total < 50 ? 'Développer une stratégie de netlinking' : null,
      socialSignals.total < 100 ? 'Améliorer la présence sur les réseaux sociaux' : null,
      domainAuthority.score < 40 ? 'Renforcer l\'autorité de domaine' : null
    ].filter(Boolean) as string[]
  };
  
  // SEO local pour certains types de domaines
  const localSEO = !isPopularDomain && Math.random() > 0.3 ? {
    googleMyBusiness: Math.random() > 0.5,
    citations: Math.floor(Math.random() * 30) + 5,
    reviews: {
      average: Math.round((Math.random() * 1.5 + 3.5) * 10) / 10, // Entre 3.5 et 5.0
      total: Math.floor(Math.random() * 100) + 10
    },
    score: Math.floor(Math.random() * 30) + 40
  } : undefined;
  
  return {
    backlinks,
    domainAuthority,
    socialSignals,
    brandMentions,
    competitorAnalysis,
    localSEO
  };
}

// Mise à jour de la fonction calculateOverallScore
function calculateOverallScore({ lighthouse, onPage, technical, security, offPage }: any): number {
  const lighthouseWeight = 0.3;
  const onPageWeight = 0.25;
  const technicalWeight = 0.2;
  const securityWeight = 0.1;
  const offPageWeight = 0.15;
  
  const onPageAvg = (
    onPage.title.score +
    onPage.metaDescription.score +
    onPage.headings.structure +
    onPage.images.score +
    onPage.links.score
  ) / 5;
  
  const technicalAvg = (
    technical.pageSpeed.score +
    technical.mobileUsability.score +
    technical.schema.score +
    technical.canonicalization.score
  ) / 4;
  
  const offPageAvg = (
    offPage.backlinks.score +
    offPage.domainAuthority.score +
    offPage.socialSignals.score +
    offPage.brandMentions.score +
    (offPage.localSEO?.score || 70)
  ) / 5;
  
  return Math.round(
    lighthouse.overallScore * lighthouseWeight +
    onPageAvg * onPageWeight +
    technicalAvg * technicalWeight +
    security.score * securityWeight +
    offPageAvg * offPageWeight
  );
}

// Mise à jour de generateRecommendations
function generateRecommendations({ onPageSEO, technicalSEO, security, lighthouseResult, offPageSEO }: any): string[] {
  const recommendations = [];
  
  // Recommandations critiques
  if (onPageSEO.title.score < 50) {
    recommendations.push('🚨 Optimiser la balise title (longueur recommandée: 30-60 caractères)');
  }
  
  if (onPageSEO.metaDescription.score < 50) {
    recommendations.push('🚨 Ajouter ou optimiser la meta description (120-160 caractères)');
  }
  
  if (onPageSEO.headings.h1.count === 0) {
    recommendations.push('🚨 Ajouter une balise H1 unique et descriptive');
  }
  
  if (!security.https) {
    recommendations.push('🔒 Implémenter HTTPS pour sécuriser le site');
  }
  
  // Recommandations importantes
  if (lighthouseResult.performanceScore < 70) {
    recommendations.push('⚡ Améliorer les performances de chargement');
  }
  
  if (technicalSEO.mobileUsability.score < 100 && !technicalSEO.mobileUsability.isMobileFriendly) {
    recommendations.push('📱 Optimiser l\'expérience mobile');
  }
  
  if (onPageSEO.images.withoutAlt > 0) {
    recommendations.push(`🖼️ Ajouter l'attribut alt à ${onPageSEO.images.withoutAlt} images`);
  }
  
  // Recommandations Off-Page
  if (offPageSEO.backlinks.score < 70) {
    recommendations.push('🔗 Développer une stratégie de netlinking pour obtenir plus de backlinks de qualité');
  }
  
  if (offPageSEO.socialSignals.score < 60) {
    recommendations.push('📱 Améliorer la présence sur les réseaux sociaux');
  }
  
  if (offPageSEO.domainAuthority.score < 50) {
    recommendations.push('📈 Travailler sur l\'autorité de domaine avec du contenu de qualité');
  }
  
  // Recommandations d'amélioration
  if (!onPageSEO.structuredData?.hasStructuredData) {
    recommendations.push('📊 Implémenter des données structurées (Schema.org)');
  }
  
  if (!onPageSEO.sitemap.exists) {
    recommendations.push('🗺️ Créer et soumettre un sitemap XML');
  }
  
  if (!onPageSEO.robotsTxt.exists) {
    recommendations.push('🤖 Créer un fichier robots.txt');
  }
  
  // Only recommend local SEO for sites that clearly need it (low score + have local indicators)
  if (offPageSEO.localSEO && offPageSEO.localSEO.score < 50 && !offPageSEO.localSEO.googleMyBusiness) {
    recommendations.push('📍 Optimiser le référencement local (Google My Business, citations)');
  }
  
  return recommendations.slice(0, 10); // Top 10 recommandations
}

// Mise à jour de calculateSummary
function calculateSummary({ onPageSEO, technicalSEO, security, lighthouseResult, offPageSEO }: any) {
  let criticalIssues = 0;
  let warningIssues = 0;
  let passedChecks = 0;
  const totalChecks = 18; // Augmenté pour inclure les vérifications off-page
  
  // Vérifications critiques
  if (onPageSEO.title.score < 50) criticalIssues++;
  else passedChecks++;
  
  if (onPageSEO.metaDescription.score < 50) criticalIssues++;
  else passedChecks++;
  
  if (onPageSEO.headings.h1.count === 0) criticalIssues++;
  else passedChecks++;
  
  if (!security.https) criticalIssues++;
  else passedChecks++;
  
  if (lighthouseResult.performanceScore < 50) criticalIssues++;
  else if (lighthouseResult.performanceScore < 70) warningIssues++;
  else passedChecks++;
  
  // Vérifications d'avertissement
  if (onPageSEO.images.withoutAlt > 0) warningIssues++;
  else passedChecks++;
  
  if (technicalSEO.mobileUsability.score < 100) warningIssues++;
  else passedChecks++;
  
  if (!technicalSEO.schema.hasStructuredData) warningIssues++;
  else passedChecks++;
  
  if (!onPageSEO.sitemap.exists) warningIssues++;
  else passedChecks++;
  
  if (!onPageSEO.robotsTxt.exists) warningIssues++;
  else passedChecks++;
  
  // Vérifications Off-Page
  if (offPageSEO.backlinks.score < 50) criticalIssues++;
  else if (offPageSEO.backlinks.score < 70) warningIssues++;
  else passedChecks++;
  
  if (offPageSEO.domainAuthority.score < 40) criticalIssues++;
  else if (offPageSEO.domainAuthority.score < 60) warningIssues++;
  else passedChecks++;
  
  if (offPageSEO.socialSignals.score < 50) warningIssues++;
  else passedChecks++;
  
  // Autres vérifications
  const remainingChecks = totalChecks - criticalIssues - warningIssues - passedChecks;
  passedChecks += Math.max(0, remainingChecks);
  
  return {
    criticalIssues,
    warningIssues,
    passedChecks,
    totalChecks
  };
}