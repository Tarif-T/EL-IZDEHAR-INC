/**
 * Optimized providers with error boundaries and performance monitoring
 */
import React, { Suspense } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider } from "@/lib/i18n";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { queryClient } from "@/lib/queryClient";
import { PerformanceMonitor } from "@/utils/performance";
import { SEOProvider } from "@/components/seo/SEOProvider";
import { ThemeProvider } from "@/components/theme/theme-provider";

interface OptimizedProvidersProps {
  children: React.ReactNode;
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white text-lg">Loading ELIZDEHAR Inc...</p>
      </div>
    </div>
  );
}

function PerformanceWrapper({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    PerformanceMonitor.mark("app-start");
    
    return () => {
      PerformanceMonitor.measure("app-total-time", "app-start");
    };
  }, []);

  return <>{children}</>;
}

export function OptimizedProviders({ children }: OptimizedProvidersProps) {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <I18nProvider>
          <ThemeProvider>
            <TooltipProvider>
              <SEOProvider>
                <PerformanceWrapper>
                  <Suspense fallback={<LoadingFallback />}>
                    {children}
                  </Suspense>
                  
                  <Toaster />
                </PerformanceWrapper>
              </SEOProvider>
            </TooltipProvider>
          </ThemeProvider>
        </I18nProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
