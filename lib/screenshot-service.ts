// lib/screenshot-service.ts - Service pour les captures d'écran compatible Vercel

export interface ScreenshotOptions {
  url: string;
  width?: number;
  height?: number;
  fullPage?: boolean;
  device?: 'desktop' | 'tablet' | 'mobile';
}

export interface ScreenshotResult {
  success: boolean;
  screenshot?: string;
  error?: string;
}

/**
 * Service de capture d'écran pour Vercel
 * Utilise des APIs externes ou désactive les screenshots selon l'environnement
 */
export class ScreenshotService {
  private static isVercelEnvironment(): boolean {
    return process.env.VERCEL === '1' || process.env.NODE_ENV === 'production';
  }

  /**
   * Capture une screenshot d'une URL
   */
  static async captureScreenshot(options: ScreenshotOptions): Promise<ScreenshotResult> {
    if (this.isVercelEnvironment()) {
      // En production sur Vercel, utiliser un service externe ou désactiver
      return await this.captureWithExternalService(options);
    } else {
      // En développement local, utiliser Puppeteer si disponible
      return await this.captureWithPuppeteer(options);
    }
  }

  /**
   * Capture avec un service externe (pour Vercel)
   */
  private static async captureWithExternalService(options: ScreenshotOptions): Promise<ScreenshotResult> {
    try {
      // Option 1: Utiliser htmlcsstoimage.com (nécessite une clé API)
      if (process.env.HTMLCSSTOIMAGE_API_KEY) {
        return await this.captureWithHtmlCssToImage(options);
      }
      
      // Option 2: Utiliser screenshot.guru ou autre service
      if (process.env.SCREENSHOT_API_KEY) {
        return await this.captureWithScreenshotAPI(options);
      }
      
      // Option 3: Désactiver les screenshots
      console.log('Screenshots disabled in production environment');
      return {
        success: false,
        error: 'Screenshots disabled in production'
      };
      
    } catch (error) {
      console.error('External screenshot service error:', error);
      return {
        success: false,
        error: 'Screenshot service unavailable'
      };
    }
  }

  /**
   * Capture avec Puppeteer (développement local)
   */
  private static async captureWithPuppeteer(options: ScreenshotOptions): Promise<ScreenshotResult> {
    try {
      // Importer Puppeteer dynamiquement pour éviter les erreurs en production
      const puppeteer = await import('puppeteer');
      
      const browser = await puppeteer.default.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      
      const page = await browser.newPage();
      
      // Configuration selon le device
      const viewportConfig = this.getViewportConfig(options.device || 'desktop');
      await page.setViewport(viewportConfig);
      
      await page.goto(options.url, {
        waitUntil: 'networkidle2',
        timeout: 20000
      });
      
      const screenshot = await page.screenshot({
        fullPage: options.fullPage || false,
        encoding: 'base64'
      }) as string;
      
      await browser.close();
      
      return {
        success: true,
        screenshot
      };
      
    } catch (error) {
      console.error('Puppeteer screenshot error:', error);
      return {
        success: false,
        error: 'Puppeteer screenshot failed'
      };
    }
  }

  /**
   * Capture avec htmlcsstoimage.com
   */
  private static async captureWithHtmlCssToImage(options: ScreenshotOptions): Promise<ScreenshotResult> {
    try {
      const response = await fetch('https://hcti.io/v1/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${Buffer.from(`${process.env.HTMLCSSTOIMAGE_USER_ID}:${process.env.HTMLCSSTOIMAGE_API_KEY}`).toString('base64')}`
        },
        body: JSON.stringify({
          url: options.url,
          viewport_width: options.width || 1920,
          viewport_height: options.height || 1080,
          device_scale_factor: 1
        })
      });
      
      const data = await response.json();
      
      if (data.url) {
        // Télécharger l'image et la convertir en base64
        const imageResponse = await fetch(data.url);
        const imageBuffer = await imageResponse.arrayBuffer();
        const base64 = Buffer.from(imageBuffer).toString('base64');
        
        return {
          success: true,
          screenshot: base64
        };
      }
      
      return {
        success: false,
        error: 'Failed to generate screenshot'
      };
      
    } catch (error) {
      console.error('HtmlCssToImage error:', error);
      return {
        success: false,
        error: 'External service error'
      };
    }
  }

  /**
   * Capture avec un autre service API
   */
  private static async captureWithScreenshotAPI(options: ScreenshotOptions): Promise<ScreenshotResult> {
    // Implémentation pour d'autres services comme screenshot.guru, etc.
    return {
      success: false,
      error: 'Screenshot API not implemented'
    };
  }

  /**
   * Configuration viewport selon le device
   */
  private static getViewportConfig(device: 'desktop' | 'tablet' | 'mobile') {
    switch (device) {
      case 'mobile':
        return { width: 375, height: 667 };
      case 'tablet':
        return { width: 768, height: 1024 };
      case 'desktop':
      default:
        return { width: 1920, height: 1080 };
    }
  }

  /**
   * Capture multiple screenshots pour différents devices
   */
  static async captureMultipleScreenshots(url: string): Promise<{
    desktop?: string;
    tablet?: string;
    mobile?: string;
  }> {
    const results: any = {};
    
    try {
      // Desktop
      const desktopResult = await this.captureScreenshot({
        url,
        device: 'desktop',
        fullPage: false
      });
      if (desktopResult.success) {
        results.desktop = desktopResult.screenshot;
      }
      
      // Tablet
      const tabletResult = await this.captureScreenshot({
        url,
        device: 'tablet',
        fullPage: true
      });
      if (tabletResult.success) {
        results.tablet = tabletResult.screenshot;
      }
      
      // Mobile
      const mobileResult = await this.captureScreenshot({
        url,
        device: 'mobile',
        fullPage: true
      });
      if (mobileResult.success) {
        results.mobile = mobileResult.screenshot;
      }
      
    } catch (error) {
      console.error('Multiple screenshots error:', error);
    }
    
    return results;
  }
}