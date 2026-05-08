/**
 * Performance optimization utilities
 */
import React from 'react';

/**
 * Lazy loading utility for dynamic imports
 */
export function createLazyComponent<T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  fallback?: React.ComponentType
) {
  return React.lazy(() => 
    importFn().catch(error => {
      console.error("Failed to load component:", error);
      const FallbackComponent = (fallback ?? (() => null)) as unknown as T;
      return { default: FallbackComponent };
    })
  );
}

/**
 * Preload critical resources
 */
export function preloadResource(href: string, as: string, crossorigin?: string) {
  if (typeof window === "undefined") return;

  const link = document.createElement("link");
  link.rel = "preload";
  link.href = href;
  link.as = as;
  if (crossorigin) link.crossOrigin = crossorigin;
  
  document.head.appendChild(link);
}

/**
 * Preload images for better UX
 */
export function preloadImages(urls: string[]): Promise<void[]> {
  const promises = urls.map(url => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = url;
    });
  });

  return Promise.all(promises);
}

/**
 * Measure and log performance metrics
 */
export class PerformanceMonitor {
  private static marks: Map<string, number> = new Map();

  static mark(name: string) {
    if (typeof window === "undefined") return;
    
    const now = performance.now();
    this.marks.set(name, now);
    
    if (performance.mark) {
      performance.mark(name);
    }
  }

  static measure(name: string, startMark: string, endMark?: string) {
    if (typeof window === "undefined") return;

    const startTime = this.marks.get(startMark);
    const endTime = endMark ? this.marks.get(endMark) : performance.now();

    if (startTime && endTime) {
      const duration = endTime - startTime;
      console.log(`${name}: ${duration.toFixed(2)}ms`);

      if (performance.measure) {
        performance.measure(name, startMark, endMark);
      }

      return duration;
    }
  }

  static getMetrics() {
    if (typeof window === "undefined") return {};

    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
    const paint = performance.getEntriesByType("paint");

    return {
      // Navigation timing
      domContentLoaded: navigation ? navigation.domContentLoadedEventEnd - navigation.startTime : undefined,
      loadComplete: navigation ? navigation.loadEventEnd - navigation.startTime : undefined,
      
      // Paint timing
      firstPaint: paint.find(entry => entry.name === "first-paint")?.startTime,
      firstContentfulPaint: paint.find(entry => entry.name === "first-contentful-paint")?.startTime,
      
      // Resource timing
      resources: performance.getEntriesByType("resource").length,
    };
  }
}

/**
 * Debounced scroll handler for performance
 */
export function createOptimizedScrollHandler(
  callback: (scrollY: number) => void,
  delay = 16
) {
  let ticking = false;
  let lastScrollY = 0;

  const updateScrollY = () => {
    lastScrollY = window.scrollY;
    callback(lastScrollY);
    ticking = false;
  };

  return () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollY);
      ticking = true;
    }
  };
}

/**
 * Intersection Observer for viewport-based optimizations
 */
export function createViewportObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
) {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
    return null;
  }

  return new IntersectionObserver(callback, {
    rootMargin: "50px",
    threshold: 0.1,
    ...options,
  });
}

/**
 * Resource preloading manager
 */
export class ResourcePreloader {
  private static loaded = new Set<string>();
  private static loading = new Set<string>();

  static async preloadScript(src: string): Promise<void> {
    if (this.loaded.has(src) || this.loading.has(src)) {
      return;
    }

    this.loading.add(src);

    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        this.loaded.add(src);
        this.loading.delete(src);
        resolve();
      };
      script.onerror = () => {
        this.loading.delete(src);
        reject(new Error(`Failed to load script: ${src}`));
      };
      document.head.appendChild(script);
    });
  }

  static async preloadStylesheet(href: string): Promise<void> {
    if (this.loaded.has(href) || this.loading.has(href)) {
      return;
    }

    this.loading.add(href);

    return new Promise((resolve, reject) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      link.onload = () => {
        this.loaded.add(href);
        this.loading.delete(href);
        resolve();
      };
      link.onerror = () => {
        this.loading.delete(href);
        reject(new Error(`Failed to load stylesheet: ${href}`));
      };
      document.head.appendChild(link);
    });
  }
}

/**
 * Bundle size analyzer (development only)
 */
export function analyzeBundleSize() {
  if (process.env.NODE_ENV !== "development") return;

  // This would integrate with webpack-bundle-analyzer or similar
  console.log("Bundle analysis available in production build");
}
