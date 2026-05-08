/**
 * SEO optimization hooks
 */
import { useEffect } from "react";
import { useLocation } from "wouter";
import { SEOOptimizer } from "@/utils/sitemap";
import { useI18n } from "@/lib/i18n";

/**
 * Hook for page-specific SEO optimization
 */
export function useSEO(metadata: {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  type?: string;
  structuredData?: object;
}) {
  const [location] = useLocation();
  const { language } = useI18n();

  useEffect(() => {
    // Update document title
    document.title = metadata.title;

    // Update meta description
    updateMetaTag("description", metadata.description);

    // Update keywords
    if (metadata.keywords) {
      updateMetaTag("keywords", metadata.keywords.join(", "));
    }

    // Update Open Graph tags
    updateMetaTag("og:title", metadata.title, "property");
    updateMetaTag("og:description", metadata.description, "property");
    updateMetaTag("og:type", metadata.type || "website", "property");
    updateMetaTag("og:url", window.location.href, "property");
    updateMetaTag("og:locale", language === "ar" ? "ar_SD" : "en_US", "property");

    if (metadata.image) {
      updateMetaTag("og:image", metadata.image, "property");
      updateMetaTag("og:image:alt", metadata.title, "property");
    }

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", metadata.title);
    updateMetaTag("twitter:description", metadata.description);

    if (metadata.image) {
      updateMetaTag("twitter:image", metadata.image);
    }

    // Add structured data
    if (metadata.structuredData) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(metadata.structuredData);
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [location, metadata, language]);
}

function updateMetaTag(name: string, content: string, attribute: string = "name") {
  let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
  
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attribute, name);
    document.head.appendChild(meta);
  }
  
  meta.content = content;
}

/**
 * Hook for Core Web Vitals optimization
 */
export function useCoreWebVitals() {
  useEffect(() => {
    const optimizer = SEOOptimizer.getInstance();
    optimizer.optimizeCoreWebVitals();

    // Optimize images on load
    const handleLoad = () => {
      optimizer.optimizeImages();
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);
}

/**
 * Hook for tracking page views and SEO events
 */
export function useSEOTracking() {
  const [location] = useLocation();

  useEffect(() => {
    // Track page view
    if (typeof gtag !== "undefined") {
      gtag("config", "GA_MEASUREMENT_ID", {
        page_location: window.location.href,
        page_title: document.title,
      });
    }

    // Track Core Web Vitals
    if ("web-vitals" in window) {
      // Implementation would go here for web-vitals library
    }
  }, [location]);
}

/**
 * Hook for managing breadcrumbs
 */
export function useBreadcrumbs(breadcrumbs: { name: string; url: string }[]) {
  useEffect(() => {
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
      }))
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [breadcrumbs]);
}

/**
 * Hook for language-specific SEO optimization
 */
export function useLanguageSEO() {
  const { language } = useI18n();

  useEffect(() => {
    // Set language attributes
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

    // Update content language meta tag
    updateMetaTag("content-language", language);

    // Add hreflang links
    const baseUrl = window.location.origin;
    const currentPath = window.location.pathname;

    // Remove existing hreflang links
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(link => {
      link.remove();
    });

    // Add new hreflang links
    const languages = [
      { code: "en", url: `${baseUrl}/en${currentPath}` },
      { code: "ar", url: `${baseUrl}/ar${currentPath}` },
      { code: "x-default", url: `${baseUrl}${currentPath}` }
    ];

    languages.forEach(lang => {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = lang.code;
      link.href = lang.url;
      document.head.appendChild(link);
    });
  }, [language]);
}

// Declare gtag for TypeScript
declare global {
  function gtag(...args: any[]): void;
}