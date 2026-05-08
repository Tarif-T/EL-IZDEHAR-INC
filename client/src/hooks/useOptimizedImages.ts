/**
 * Hook for optimized image loading with progressive enhancement
 */
import { useState, useCallback, useRef } from "react";

interface UseOptimizedImageProps {
  src: string;
  placeholder?: string;
  sizes?: string;
  quality?: number;
}

interface OptimizedImageState {
  isLoading: boolean;
  isError: boolean;
  currentSrc: string;
}

export function useOptimizedImage({
  src,
  placeholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2NjYyIvPjwvc3ZnPg==",
}: UseOptimizedImageProps) {
  const [state, setState] = useState<OptimizedImageState>({
    isLoading: true,
    isError: false,
    currentSrc: placeholder,
  });

  const imageRef = useRef<HTMLImageElement>();

  const loadImage = useCallback(() => {
    setState(prev => ({ ...prev, isLoading: true, isError: false }));

    const img = new Image();
    imageRef.current = img;

    img.onload = () => {
      setState({
        isLoading: false,
        isError: false,
        currentSrc: src,
      });
    };

    img.onerror = () => {
      setState(prev => ({
        ...prev,
        isLoading: false,
        isError: true,
      }));
    };

    img.src = src;
  }, [src]);

  const retry = useCallback(() => {
    loadImage();
  }, [loadImage]);

  return {
    ...state,
    retry,
    loadImage,
  };
}

/**
 * Generate optimized image URLs for different screen sizes
 */
export function generateImageSizes(baseSrc: string, sizes: number[] = [640, 768, 1024, 1280, 1920]) {
  // This would integrate with an image optimization service
  // For now, return the base source with different quality parameters
  return sizes.map(size => ({
    src: `${baseSrc}?w=${size}&q=75`,
    width: size,
    descriptor: `${size}w`,
  }));
}

/**
 * Hook for responsive images with WebP fallback
 */
export function useResponsiveImage(src: string) {
  const [supportsWebP, setSupportsWebP] = useState<boolean | null>(null);

  // Check WebP support
  const checkWebPSupport = useCallback(() => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      setSupportsWebP(webP.height === 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  }, []);

  const getOptimizedSrc = useCallback((originalSrc: string) => {
    if (supportsWebP === null) {
      checkWebPSupport();
      return originalSrc;
    }

    // Return WebP version if supported, otherwise original
    return supportsWebP ? originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp') : originalSrc;
  }, [supportsWebP, checkWebPSupport]);

  return {
    src: getOptimizedSrc(src),
    supportsWebP,
  };
}