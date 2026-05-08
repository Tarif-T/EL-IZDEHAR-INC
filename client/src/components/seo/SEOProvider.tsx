/**
 * SEO Provider component for global SEO optimization
 */
import React, { useEffect } from "react";
import { useLocation } from "wouter";
import { useCoreWebVitals, useLanguageSEO } from "@/hooks/useSEO";

interface SEOProviderProps {
  children: React.ReactNode;
}

export function SEOProvider({ children }: SEOProviderProps) {
  const [location] = useLocation();

  // Initialize Core Web Vitals optimization
  useCoreWebVitals();

  // Initialize language-specific SEO
  useLanguageSEO();

  useEffect(() => {
    // Add global meta tags
    addGlobalMetaTags();

    // Add preconnect links for performance
    addPreconnectLinks();

    // Add PWA meta tags
    addPWAMetaTags();

    // Initialize performance monitoring
    initializePerformanceMonitoring();
  }, []);

  // Track route changes for analytics
  useEffect(() => {
    // Track page view
    if (typeof gtag !== "undefined") {
      gtag("event", "page_view", {
        page_location: window.location.href,
        page_title: document.title,
      });
    }

    // Update canonical URL
    updateCanonicalUrl();
  }, [location]);

  return <>{children}</>;
}

function addGlobalMetaTags() {
  const metaTags = [
    // Basic meta tags
    { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
    { name: "googlebot", content: "index, follow" },
    { name: "bingbot", content: "index, follow" },
    { name: "author", content: "ELIZDEHAR Inc." },
    { name: "publisher", content: "ELIZDEHAR Inc." },
    { name: "copyright", content: "Copyright 2026 ELIZDEHAR Inc. All rights reserved." },
    
    // Geo meta tags
    { name: "geo.region", content: "SD-KH" },
    { name: "geo.placename", content: "Khartoum, Sudan" },
    { name: "geo.position", content: "15.5007;32.5599" },
    { name: "ICBM", content: "15.5007, 32.5599" },
    
    // Business meta tags
    { name: "category", content: "Manufacturing, Agriculture, International Trade" },
    { name: "coverage", content: "Worldwide" },
    { name: "distribution", content: "Global" },
    { name: "rating", content: "General" },
    
    // Technical meta tags
    { name: "format-detection", content: "telephone=no" },
    { name: "mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "default" },
    { name: "msapplication-TileColor", content: "#6dbb45" },
    { name: "theme-color", content: "#6dbb45" },
    
    // Open Graph defaults
    { property: "og:site_name", content: "ELIZDEHAR Inc." },
    { property: "og:locale", content: "en_US" },
    { property: "og:locale:alternate", content: "ar_SD" },
    
    // Twitter Card defaults
    { name: "twitter:site", content: "@elizdehar" },
    { name: "twitter:creator", content: "@elizdehar" },
  ];

  metaTags.forEach(tag => {
    const meta = document.createElement("meta");
    if (tag.property) {
      meta.setAttribute("property", tag.property);
    } else {
      meta.setAttribute("name", tag.name!);
    }
    meta.content = tag.content;
    
    // Only add if doesn't exist
    const existing = document.querySelector(`meta[${tag.property ? 'property' : 'name'}="${tag.property || tag.name!}"]`);
    if (!existing) {
      document.head.appendChild(meta);
    }
  });
}

function addPreconnectLinks() {
  const preconnectUrls = [
    "https://fonts.googleapis.com",
    "https://fonts.gstatic.com",
    "https://images.unsplash.com",
    "https://www.google-analytics.com",
    "https://www.googletagmanager.com"
  ];

  preconnectUrls.forEach(url => {
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = url;
    if (url.includes("gstatic")) {
      link.crossOrigin = "anonymous";
    }
    
    // Only add if doesn't exist
    const existing = document.querySelector(`link[rel="preconnect"][href="${url}"]`);
    if (!existing) {
      document.head.appendChild(link);
    }
  });
}

function addPWAMetaTags() {
  const pwaLinks = [
    { rel: "manifest", href: "/manifest.json" },
    { rel: "icon", href: "/favicon.ico", sizes: "any" },
    { rel: "icon", href: "/icon.svg", type: "image/svg+xml" },
    { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
    { rel: "mask-icon", href: "/mask-icon.svg", color: "#6dbb45" }
  ];

  pwaLinks.forEach(linkData => {
    const existing = document.querySelector(`link[rel="${linkData.rel}"]`);
    if (!existing) {
      const link = document.createElement("link");
      Object.entries(linkData).forEach(([key, value]) => {
        link.setAttribute(key, value);
      });
      document.head.appendChild(link);
    }
  });
}

function updateCanonicalUrl() {
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  
  canonical.href = window.location.href;
}

function initializePerformanceMonitoring() {
  // Monitor Core Web Vitals
  if ("PerformanceObserver" in window) {
    // LCP (Largest Contentful Paint)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lcpEntry = entries[entries.length - 1];
      
      if (typeof gtag !== "undefined") {
        gtag("event", "web_vitals", {
          event_category: "Web Vitals",
          event_label: "LCP",
          value: Math.round(lcpEntry.startTime),
          custom_map: { metric_name: "largest_contentful_paint" }
        });
      }
    });
    lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });

    // FID (First Input Delay)
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        const fidEntry = entry as any; // PerformanceEventTiming
        const fid = fidEntry.processingStart - fidEntry.startTime;
        
        if (typeof gtag !== "undefined") {
          gtag("event", "web_vitals", {
            event_category: "Web Vitals",
            event_label: "FID",
            value: Math.round(fid),
            custom_map: { metric_name: "first_input_delay" }
          });
        }
      });
    });
    fidObserver.observe({ entryTypes: ["first-input"] });

    // CLS (Cumulative Layout Shift)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        const clsEntry = entry as any; // LayoutShift
        if (!clsEntry.hadRecentInput) {
          clsValue += clsEntry.value;
        }
      });
      
      if (typeof gtag !== "undefined") {
        gtag("event", "web_vitals", {
          event_category: "Web Vitals",
          event_label: "CLS",
          value: Math.round(clsValue * 1000),
          custom_map: { metric_name: "cumulative_layout_shift" }
        });
      }
    });
    clsObserver.observe({ entryTypes: ["layout-shift"] });
  }
}

// Declare gtag for TypeScript
declare global {
  function gtag(...args: any[]): void;
}
