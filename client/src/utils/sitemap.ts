/**
 * SEO sitemap generator and utilities
 */

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
  alternates?: { lang: string; href: string }[];
}

export const sitemapUrls: SitemapUrl[] = [
  {
    loc: "/",
    lastmod: new Date().toISOString(),
    changefreq: "weekly",
    priority: 1.0,
    alternates: [
      { lang: "en", href: "/en" },
      { lang: "ar", href: "/ar" }
    ]
  },
  {
    loc: "/about",
    lastmod: new Date().toISOString(),
    changefreq: "monthly",
    priority: 0.9,
    alternates: [
      { lang: "en", href: "/en/about" },
      { lang: "ar", href: "/ar/about" }
    ]
  },
  {
    loc: "/services",
    lastmod: new Date().toISOString(),
    changefreq: "weekly",
    priority: 0.9,
    alternates: [
      { lang: "en", href: "/en/services" },
      { lang: "ar", href: "/ar/services" }
    ]
  },
  {
    loc: "/shoes-factory",
    lastmod: new Date().toISOString(),
    changefreq: "monthly",
    priority: 0.8,
    alternates: [
      { lang: "en", href: "/en/shoes-factory" },
      { lang: "ar", href: "/ar/shoes-factory" }
    ]
  },
  {
    loc: "/agriculture",
    lastmod: new Date().toISOString(),
    changefreq: "monthly",
    priority: 0.8,
    alternates: [
      { lang: "en", href: "/en/agriculture" },
      { lang: "ar", href: "/ar/agriculture" }
    ]
  },
  {
    loc: "/import-export",
    lastmod: new Date().toISOString(),
    changefreq: "monthly",
    priority: 0.8,
    alternates: [
      { lang: "en", href: "/en/import-export" },
      { lang: "ar", href: "/ar/import-export" }
    ]
  },
  {
    loc: "/team",
    lastmod: new Date().toISOString(),
    changefreq: "monthly",
    priority: 0.7,
    alternates: [
      { lang: "en", href: "/en/team" },
      { lang: "ar", href: "/ar/team" }
    ]
  },
  {
    loc: "/contact",
    lastmod: new Date().toISOString(),
    changefreq: "monthly",
    priority: 0.8,
    alternates: [
      { lang: "en", href: "/en/contact" },
      { lang: "ar", href: "/ar/contact" }
    ]
  }
];

/**
 * Generate XML sitemap
 */
export function generateSitemap(baseUrl: string): string {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">';
  const urlsetClose = '</urlset>';

  const urls = sitemapUrls.map(url => {
    const alternates = url.alternates?.map(alt => 
      `<xhtml:link rel="alternate" hreflang="${alt.lang}" href="${baseUrl}${alt.href}"/>`
    ).join('\n    ') || '';

    return `
  <url>
    <loc>${baseUrl}${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
    ${alternates}
  </url>`;
  }).join('');

  return `${xmlHeader}\n${urlsetOpen}${urls}\n${urlsetClose}`;
}

/**
 * Generate robots.txt content
 */
export function generateRobotsTxt(baseUrl: string): string {
  return `User-agent: *
Allow: /

# Google
User-agent: Googlebot
Allow: /
Crawl-delay: 1

# Bing
User-agent: Bingbot
Allow: /
Crawl-delay: 1

# Yandex
User-agent: YandexBot
Allow: /
Crawl-delay: 1

# Baidu
User-agent: Baiduspider
Allow: /
Crawl-delay: 1

# Disallow admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /private/
Disallow: /*.json$

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Crawl rate optimization
Request-rate: 1/10s
Visit-time: 0400-0800`;
}

/**
 * SEO performance optimization utilities
 */
export class SEOOptimizer {
  private static instance: SEOOptimizer;
  private performanceObserver?: PerformanceObserver;
  
  static getInstance(): SEOOptimizer {
    if (!SEOOptimizer.instance) {
      SEOOptimizer.instance = new SEOOptimizer();
    }
    return SEOOptimizer.instance;
  }

  /**
   * Optimize Core Web Vitals
   */
  optimizeCoreWebVitals() {
    // Largest Contentful Paint (LCP) optimization
    this.preloadCriticalResources();
    
    // First Input Delay (FID) optimization
    this.optimizeJavaScript();
    
    // Cumulative Layout Shift (CLS) optimization
    this.preventLayoutShifts();
    
    // Monitor performance
    this.startPerformanceMonitoring();
  }

  private preloadCriticalResources() {
    // The app already imports critical fonts and hero media through CSS/Vite.
    // Keep this lean so stale preloads do not trigger browser warnings.
    ["https://fonts.googleapis.com", "https://fonts.gstatic.com"].forEach((href) => {
      if (document.querySelector(`link[rel="preconnect"][href="${href}"]`)) {
        return;
      }

      const link = document.createElement("link");
      link.rel = "preconnect";
      link.href = href;
      if (href.includes("gstatic")) {
        link.crossOrigin = "anonymous";
      }
      document.head.appendChild(link);
    });
  }

  private optimizeJavaScript() {
    // Use requestIdleCallback for non-critical operations
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        // Initialize non-critical features
        this.initializeAnalytics();
      });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        this.initializeAnalytics();
      }, 1000);
    }
  }

  private preventLayoutShifts() {
    // Add size attributes to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (!img.width || !img.height) {
        (img as HTMLImageElement).style.aspectRatio = '16/9'; // Default aspect ratio
      }
    });

    // Reserve space for dynamic content
    const dynamicContainers = document.querySelectorAll('[data-dynamic-content]');
    dynamicContainers.forEach(container => {
      if (!(container as HTMLElement).style.minHeight) {
        (container as HTMLElement).style.minHeight = '200px';
      }
    });
  }

  private startPerformanceMonitoring() {
    if ('PerformanceObserver' in window) {
      // Monitor LCP
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lcpEntry = entries[entries.length - 1];
        console.log('LCP:', lcpEntry.startTime);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // Monitor FID
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          const fidEntry = entry as any; // PerformanceEventTiming
          console.log('FID:', fidEntry.processingStart - fidEntry.startTime);
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Monitor CLS
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        const entries = list.getEntries();
        entries.forEach(entry => {
          const clsEntry = entry as any; // LayoutShift
          if (!clsEntry.hadRecentInput) {
            clsValue += clsEntry.value;
          }
        });
        console.log('CLS:', clsValue);
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }
  }

  private initializeAnalytics() {
    // Initialize tracking scripts after page load
    // This prevents blocking the main thread
    console.log('Analytics initialized');
  }

  /**
   * Add structured data to page
   */
  addStructuredData(data: object) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }

  /**
   * Optimize images for SEO
   */
  optimizeImages() {
    const images = document.querySelectorAll('img');
    images.forEach((img, index) => {
      // Add loading attribute
      if (index > 2) { // Lazy load images below the fold
        img.loading = 'lazy';
      }

      // Add alt text if missing
      if (!img.alt) {
        img.alt = `Image ${index + 1} for ELIZDEHAR Inc.`;
      }

      // Add decoding attribute
      img.decoding = 'async';
    });
  }

  /**
   * Generate meta tags for social sharing
   */
  generateSocialMetaTags(data: {
    title: string;
    description: string;
    image: string;
    url: string;
  }) {
    const metaTags = [
      { property: 'og:title', content: data.title },
      { property: 'og:description', content: data.description },
      { property: 'og:image', content: data.image },
      { property: 'og:url', content: data.url },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: data.title },
      { name: 'twitter:description', content: data.description },
      { name: 'twitter:image', content: data.image },
    ];

    metaTags.forEach(tag => {
      const meta = document.createElement('meta');
      if (tag.property) {
        meta.setAttribute('property', tag.property);
      } else {
        meta.setAttribute('name', tag.name!);
      }
      meta.content = tag.content;
      document.head.appendChild(meta);
    });
  }
}
