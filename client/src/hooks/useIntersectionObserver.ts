/**
 * Custom hook for intersection observer with performance optimizations
 */
import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverProps {
  threshold?: number | number[];
  rootMargin?: string;
  root?: Element | null;
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver<T extends Element = HTMLDivElement>({
  threshold = 0,
  rootMargin = "0px",
  root = null,
  freezeOnceVisible = false,
}: UseIntersectionObserverProps = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const targetRef = useRef<T | null>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    // Don't run observer if element was already visible and freezeOnceVisible is true
    if (freezeOnceVisible && hasBeenVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        setIsIntersecting(isVisible);
        
        if (isVisible && !hasBeenVisible) {
          setHasBeenVisible(true);
        }
      },
      {
        threshold,
        rootMargin,
        root,
      }
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [threshold, rootMargin, root, freezeOnceVisible, hasBeenVisible]);

  return {
    targetRef,
    isIntersecting,
    hasBeenVisible,
  };
}

/**
 * Hook for lazy loading with intersection observer
 */
export function useLazyLoad(threshold = 0.1) {
  return useIntersectionObserver({
    threshold,
    rootMargin: "50px",
    freezeOnceVisible: true,
  });
}

/**
 * Hook for animations on scroll
 */
export function useScrollAnimation(threshold = 0.2) {
  return useIntersectionObserver({
    threshold,
    rootMargin: "-50px",
    freezeOnceVisible: true,
  });
}
