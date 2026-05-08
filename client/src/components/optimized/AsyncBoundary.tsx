/**
 * Async boundary for handling loading states and errors
 */
import React, { Suspense } from "react";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { Skeleton } from "@/components/ui/loading-skeleton";

interface AsyncBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType;
  errorFallback?: React.ComponentType<{ error?: Error; retry: () => void }>;
  skeleton?: React.ComponentType;
  name?: string;
}

/**
 * Combined async boundary with error handling and loading states
 */
export function AsyncBoundary({ 
  children, 
  fallback: Fallback,
  errorFallback: ErrorFallback,
  skeleton: SkeletonComponent,
  name = "Component"
}: AsyncBoundaryProps) {
  const LoadingComponent = Fallback || SkeletonComponent || DefaultLoadingFallback;
  
  return (
    <ErrorBoundary fallback={ErrorFallback}>
      <Suspense fallback={<LoadingComponent />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}

/**
 * Default loading fallback
 */
function DefaultLoadingFallback() {
  return (
    <div className="space-y-4 p-6">
      <Skeleton className="h-8 w-[300px]" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-[80%]" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[60%]" />
        <Skeleton className="h-4 w-[40%]" />
      </div>
    </div>
  );
}

/**
 * Specialized async boundaries for different use cases
 */
export const PageAsyncBoundary = ({ children }: { children: React.ReactNode }) => (
  <AsyncBoundary
    fallback={() => (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Loading page...</p>
        </div>
      </div>
    )}
    name="Page"
  >
    {children}
  </AsyncBoundary>
);

export const ComponentAsyncBoundary = ({ children }: { children: React.ReactNode }) => (
  <AsyncBoundary
    skeleton={() => <Skeleton className="h-32 w-full rounded-lg" />}
    name="Component"
  >
    {children}
  </AsyncBoundary>
);

export const FormAsyncBoundary = ({ children }: { children: React.ReactNode }) => (
  <AsyncBoundary
    fallback={() => (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-10 w-32" />
      </div>
    )}
    name="Form"
  >
    {children}
  </AsyncBoundary>
);

/**
 * Hook for managing async boundaries programmatically
 */
export function useAsyncBoundary() {
  const [error, setError] = React.useState<Error | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const captureError = React.useCallback((error: Error) => {
    setError(error);
    setIsLoading(false);
  }, []);

  const reset = React.useCallback(() => {
    setError(null);
    setIsLoading(false);
  }, []);

  const startLoading = React.useCallback(() => {
    setIsLoading(true);
    setError(null);
  }, []);

  const stopLoading = React.useCallback(() => {
    setIsLoading(false);
  }, []);

  return {
    error,
    isLoading,
    captureError,
    reset,
    startLoading,
    stopLoading,
  };
}