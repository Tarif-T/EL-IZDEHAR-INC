/**
 * Image optimization utilities for consistent aspect ratios and performance
 */

export const imageClasses = {
  // Logo classes - consistent sizing with proper aspect ratio
  logo: {
    navbar: "h-12 w-12 object-contain",
    footer: "h-16 w-16 object-contain",
    large: "h-20 w-20 object-contain"
  },
  
  // Hero images - maintain aspect ratio while filling container
  hero: {
    main: "w-full h-full object-cover",
    circular: "w-full h-full object-cover rounded-full",
    page: "w-full max-w-2xl mx-auto object-contain"
  },
  
  // Team member images
  team: {
    card: "w-full h-80 object-cover",
    avatar: "w-32 h-32 rounded-full object-cover",
    founder: "w-full max-w-md mx-auto object-contain"
  },
  
  // Service and product images
  service: {
    card: "w-full h-48 object-cover",
    preview: "absolute inset-0 w-full h-full object-cover",
    icon: "w-12 h-12 object-contain"
  },
  
  // Gallery images
  gallery: {
    standard: "w-full h-64 object-cover rounded-lg",
    process: "w-full h-48 object-cover rounded-xl",
    product: "w-full h-56 object-cover rounded-lg"
  }
};

/**
 * Get optimized image classes based on usage type
 */
export function getImageClasses(type: keyof typeof imageClasses, variant?: string): string {
  const typeClasses = imageClasses[type];
  if (variant && variant in typeClasses) {
    return typeClasses[variant as keyof typeof typeClasses];
  }
  return Object.values(typeClasses)[0];
}

/**
 * Image loading optimization
 */
export function optimizeImageLoading(img: HTMLImageElement, index: number = 0) {
  // Add loading attribute based on position
  if (index > 2) {
    img.loading = 'lazy';
  } else {
    img.loading = 'eager';
  }
  
  // Add decoding attribute for better performance
  img.decoding = 'async';
  
  // Add sizes attribute for responsive images
  if (img.srcset) {
    img.sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
  }
}

/**
 * Prevent layout shift by adding aspect ratio containers
 */
export function addAspectRatioContainer(element: HTMLElement, aspectRatio: string = '16/9') {
  element.style.aspectRatio = aspectRatio;
  element.style.overflow = 'hidden';
}

/**
 * Image error handling
 */
export function handleImageError(img: HTMLImageElement, fallbackSrc?: string) {
  img.onerror = () => {
    if (fallbackSrc) {
      img.src = fallbackSrc;
    } else {
      // Create a placeholder
      img.alt = img.alt || 'Image not available';
      img.style.backgroundColor = '#f3f4f6';
      img.style.color = '#6b7280';
      img.style.display = 'flex';
      img.style.alignItems = 'center';
      img.style.justifyContent = 'center';
    }
  };
}

/**
 * Progressive image loading with blur effect
 */
export function addProgressiveLoading(img: HTMLImageElement, lowResSrc?: string) {
  if (lowResSrc) {
    // Create low-res placeholder
    const placeholder = new Image();
    placeholder.src = lowResSrc;
    placeholder.style.filter = 'blur(10px)';
    placeholder.style.transition = 'filter 0.3s ease';
    
    // Insert placeholder
    img.parentNode?.insertBefore(placeholder, img);
    
    // Load high-res image
    img.onload = () => {
      placeholder.style.opacity = '0';
      setTimeout(() => {
        placeholder.remove();
      }, 300);
    };
  }
}

/**
 * Auto-optimize all images on page load
 */
export function optimizeAllImages() {
  // Only run in browser environment
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  try {
    const images = document.querySelectorAll('img');
    images.forEach((img, index) => {
      // Skip if image is not loaded or has invalid src
      if (!img.src || img.src.startsWith('blob:') || img.src.includes('pica')) {
        return;
      }

      optimizeImageLoading(img as HTMLImageElement, index);
      handleImageError(img as HTMLImageElement);
      
      // Add proper aspect ratio for logos
      if (img.alt?.toLowerCase().includes('elizdehar') || 
          img.src.includes('logo') || 
          img.classList.contains('logo')) {
        img.style.objectFit = 'contain';
      }
    });
  } catch (error) {
    console.warn('Image optimization failed:', error);
  }
}

// Auto-run optimization when DOM is loaded
if (typeof window !== 'undefined') {
  // Use a more robust approach to avoid SSR issues
  const runOptimization = () => {
    if (document.readyState === 'complete') {
      optimizeAllImages();
    } else {
      setTimeout(runOptimization, 100);
    }
  };
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runOptimization);
  } else {
    runOptimization();
  }
}