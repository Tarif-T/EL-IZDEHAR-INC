/**
 * Advanced SEO component with structured data and meta tags
 */
import { useEffect } from "react";
import { useI18n } from "@/lib/i18n";

interface AdvancedSEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  type?: "website" | "article" | "product" | "organization";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  structuredData?: object;
  canonicalUrl?: string;
  hreflangUrls?: { lang: string; url: string }[];
}

export function AdvancedSEO({
  title,
  description,
  keywords = [],
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  author,
  structuredData,
  canonicalUrl,
  hreflangUrls = []
}: AdvancedSEOProps) {
  const { language } = useI18n();

  useEffect(() => {
    // Set document title
    document.title = title;

    // Update meta tags
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords.join(", "));
    updateMetaTag("robots", "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");
    updateMetaTag("googlebot", "index, follow");
    updateMetaTag("bingbot", "index, follow");
    
    // Language and content
    updateMetaTag("language", language);
    updateMetaTag("content-language", language);
    document.documentElement.lang = language;

    // Open Graph tags
    updateMetaTag("og:title", title, "property");
    updateMetaTag("og:description", description, "property");
    updateMetaTag("og:type", type, "property");
    updateMetaTag("og:locale", language === "ar" ? "ar_SD" : "en_US", "property");
    updateMetaTag("og:site_name", "ELIZDEHAR Inc.", "property");
    
    if (image) {
      updateMetaTag("og:image", image, "property");
      updateMetaTag("og:image:alt", title, "property");
      updateMetaTag("og:image:width", "1200", "property");
      updateMetaTag("og:image:height", "630", "property");
    }

    if (publishedTime) {
      updateMetaTag("article:published_time", publishedTime, "property");
    }

    if (modifiedTime) {
      updateMetaTag("article:modified_time", modifiedTime, "property");
    }

    if (author) {
      updateMetaTag("article:author", author, "property");
    }

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:site", "@elizdehar");
    updateMetaTag("twitter:creator", "@elizdehar");
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    
    if (image) {
      updateMetaTag("twitter:image", image);
      updateMetaTag("twitter:image:alt", title);
    }

    // Additional SEO tags
    updateMetaTag("theme-color", "#6dbb45");
    updateMetaTag("msapplication-TileColor", "#6dbb45");
    updateMetaTag("apple-mobile-web-app-capable", "yes");
    updateMetaTag("apple-mobile-web-app-status-bar-style", "default");
    updateMetaTag("format-detection", "telephone=no");

    // Canonical URL
    if (canonicalUrl) {
      updateLinkTag("canonical", canonicalUrl);
    }

    // Hreflang tags for multilingual SEO
    hreflangUrls.forEach(({ lang, url }) => {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = lang;
      link.href = url;
      document.head.appendChild(link);
    });

    // Structured data
    if (structuredData) {
      updateStructuredData(structuredData);
    }

    // Cleanup function
    return () => {
      // Remove hreflang tags on unmount
      document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(link => {
        link.remove();
      });
    };
  }, [title, description, keywords, image, type, language, publishedTime, modifiedTime, author, structuredData, canonicalUrl, hreflangUrls]);

  return null; // This component doesn't render anything
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

function updateLinkTag(rel: string, href: string) {
  let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
  
  if (!link) {
    link = document.createElement("link");
    link.rel = rel;
    document.head.appendChild(link);
  }
  
  link.href = href;
}

function updateStructuredData(data: object) {
  let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
  
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  
  script.textContent = JSON.stringify(data);
}
