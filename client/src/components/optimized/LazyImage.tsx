/**
 * Optimized lazy-loading image component
 */
import React, { useState, useCallback } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholder?: string;
  fallback?: string;
  aspectRatio?: number;
  loading?: "eager" | "lazy";
  onLoad?: () => void;
  onError?: () => void;
}

export function LazyImage({
  src,
  alt,
  placeholder,
  fallback,
  aspectRatio,
  className,
  loading = "lazy",
  onLoad,
  onError,
  ...props
}: LazyImageProps) {
  const [imageState, setImageState] = useState<{
    isLoaded: boolean;
    isError: boolean;
    currentSrc: string;
  }>({
    isLoaded: false,
    isError: false,
    currentSrc: placeholder || "",
  });

  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "50px",
    freezeOnceVisible: true,
  });

  const handleLoad = useCallback(() => {
    setImageState(prev => ({ ...prev, isLoaded: true }));
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setImageState(prev => ({
      ...prev,
      isError: true,
      currentSrc: fallback || placeholder || "",
    }));
    onError?.();
  }, [fallback, placeholder, onError]);

  const shouldLoad = loading === "eager" || isIntersecting;
  const displaySrc = shouldLoad ? src : (placeholder || "");

  return (
    <div
      ref={targetRef}
      className={cn("relative overflow-hidden", className)}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <img
        src={displaySrc}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          {
            "opacity-0": !imageState.isLoaded && shouldLoad,
            "opacity-100": imageState.isLoaded || !shouldLoad,
          }
        )}
        loading={loading}
        decoding="async"
        {...props}
      />
      
      {/* Loading placeholder */}
      {shouldLoad && !imageState.isLoaded && !imageState.isError && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      {/* Error state */}
      {imageState.isError && (
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-gray-500 dark:text-gray-400">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )}
    </div>
  );
}