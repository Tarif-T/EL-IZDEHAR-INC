/**
 * Performance monitoring hooks
 */
import { useEffect, useRef, useState } from "react";
import { PerformanceMonitor } from "@/utils/performance";

/**
 * Hook to measure component render performance
 */
export function useRenderPerformance(componentName: string) {
  const renderCount = useRef(0);
  const lastRenderTime = useRef(0);

  useEffect(() => {
    renderCount.current++;
    const now = performance.now();
    
    if (lastRenderTime.current > 0) {
      const timeSinceLastRender = now - lastRenderTime.current;
      console.log(`${componentName} render #${renderCount.current}: ${timeSinceLastRender.toFixed(2)}ms since last render`);
    }
    
    lastRenderTime.current = now;
  });

  return {
    renderCount: renderCount.current,
  };
}

/**
 * Hook to measure operation performance
 */
export function useOperationPerformance() {
  const [metrics, setMetrics] = useState<Record<string, number>>({});

  const measureOperation = async <T>(
    operationName: string,
    operation: () => Promise<T>
  ): Promise<T> => {
    const startTime = performance.now();
    
    try {
      const result = await operation();
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      setMetrics(prev => ({
        ...prev,
        [operationName]: duration,
      }));
      
      PerformanceMonitor.mark(`${operationName}-start`);
      PerformanceMonitor.mark(`${operationName}-end`);
      PerformanceMonitor.measure(operationName, `${operationName}-start`, `${operationName}-end`);
      
      return result;
    } catch (error) {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      setMetrics(prev => ({
        ...prev,
        [`${operationName}-error`]: duration,
      }));
      
      throw error;
    }
  };

  return {
    metrics,
    measureOperation,
  };
}

/**
 * Hook to monitor page performance
 */
export function usePagePerformance(pageName: string) {
  useEffect(() => {
    PerformanceMonitor.mark(`page-${pageName}-start`);
    
    const handleLoad = () => {
      PerformanceMonitor.mark(`page-${pageName}-loaded`);
      PerformanceMonitor.measure(`page-${pageName}-load-time`, `page-${pageName}-start`, `page-${pageName}-loaded`);
    };

    // Measure when page is interactive
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
      PerformanceMonitor.mark(`page-${pageName}-unmount`);
      PerformanceMonitor.measure(`page-${pageName}-lifetime`, `page-${pageName}-start`, `page-${pageName}-unmount`);
    };
  }, [pageName]);
}

/**
 * Hook to track network performance
 */
export function useNetworkPerformance() {
  const [networkMetrics, setNetworkMetrics] = useState({
    online: navigator.onLine,
    connectionType: (navigator as any).connection?.effectiveType || 'unknown',
    rtt: (navigator as any).connection?.rtt || 0,
    downlink: (navigator as any).connection?.downlink || 0,
  });

  useEffect(() => {
    const updateNetworkInfo = () => {
      setNetworkMetrics({
        online: navigator.onLine,
        connectionType: (navigator as any).connection?.effectiveType || 'unknown',
        rtt: (navigator as any).connection?.rtt || 0,
        downlink: (navigator as any).connection?.downlink || 0,
      });
    };

    const handleOnline = () => setNetworkMetrics(prev => ({ ...prev, online: true }));
    const handleOffline = () => setNetworkMetrics(prev => ({ ...prev, online: false }));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    if ((navigator as any).connection) {
      (navigator as any).connection.addEventListener('change', updateNetworkInfo);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      
      if ((navigator as any).connection) {
        (navigator as any).connection.removeEventListener('change', updateNetworkInfo);
      }
    };
  }, []);

  return networkMetrics;
}

/**
 * Hook to track memory usage
 */
export function useMemoryPerformance() {
  const [memoryInfo, setMemoryInfo] = useState<any>(null);

  useEffect(() => {
    const updateMemoryInfo = () => {
      if ((performance as any).memory) {
        setMemoryInfo({
          usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
          totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
          jsHeapSizeLimit: (performance as any).memory.jsHeapSizeLimit,
        });
      }
    };

    updateMemoryInfo();
    const interval = setInterval(updateMemoryInfo, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return memoryInfo;
}