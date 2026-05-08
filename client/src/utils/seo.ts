/**
 * SEO optimization utilities
 */

interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  canonicalUrl?: string;
  structuredData?: object;
}

/**
 * Update document metadata for SEO
 */
export function updateSEOMetadata(metadata: SEOMetadata) {
  if (typeof window === "undefined") return;

  // Update title
  document.title = metadata.title;

  // Update or create meta tags
  updateMetaTag("description", metadata.description);
  
  if (metadata.keywords) {
    updateMetaTag("keywords", metadata.keywords.join(", "));
  }

  // Open Graph tags
  updateMetaTag("og:title", metadata.ogTitle || metadata.title, "property");
  updateMetaTag("og:description", metadata.ogDescription || metadata.description, "property");
  updateMetaTag("og:type", "website", "property");
  
  if (metadata.ogImage) {
    updateMetaTag("og:image", metadata.ogImage, "property");
  }
  
  if (metadata.ogUrl) {
    updateMetaTag("og:url", metadata.ogUrl, "property");
  }

  // Twitter Card tags
  updateMetaTag("twitter:card", "summary_large_image");
  updateMetaTag("twitter:title", metadata.ogTitle || metadata.title);
  updateMetaTag("twitter:description", metadata.ogDescription || metadata.description);
  
  if (metadata.ogImage) {
    updateMetaTag("twitter:image", metadata.ogImage);
  }

  // Canonical URL
  if (metadata.canonicalUrl) {
    updateLinkTag("canonical", metadata.canonicalUrl);
  }

  // Structured data
  if (metadata.structuredData) {
    updateStructuredData(metadata.structuredData);
  }
}

/**
 * Update or create meta tag
 */
function updateMetaTag(name: string, content: string, attribute: string = "name") {
  let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
  
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attribute, name);
    document.head.appendChild(meta);
  }
  
  meta.content = content;
}

/**
 * Update or create link tag
 */
function updateLinkTag(rel: string, href: string) {
  let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
  
  if (!link) {
    link = document.createElement("link");
    link.rel = rel;
    document.head.appendChild(link);
  }
  
  link.href = href;
}

/**
 * Update structured data (JSON-LD)
 */
function updateStructuredData(data: object) {
  let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
  
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  
  script.textContent = JSON.stringify(data);
}

/**
 * Generate SEO metadata for different pages with enhanced keywords
 */
export const seoMetadata = {
  home: {
    title: "ELIZDEHAR Inc. - Premier Manufacturing & Export Company Sudan | Since 1990",
    description: "Leading Sudanese manufacturer and global exporter since 1990. Premium footwear manufacturing, sustainable agriculture solutions, and international trade services. Based in Khartoum, serving worldwide markets with 30+ years of excellence.",
    keywords: [
      "ELIZDEHAR Inc", "Sudan manufacturing", "Khartoum exports", "footwear manufacturer Sudan", 
      "agriculture Sudan", "import export Sudan", "Tag Elsir Abd Elrahman", "Sudanese companies",
      "plastic shoes factory", "El Izdehar Group", "Sudan trade", "African manufacturing",
      "sustainable agriculture Sudan", "international trade Khartoum", "Sudan business directory"
    ],
    ogImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=630&fit=crop",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "ELIZDEHAR Inc.",
      "url": "https://elizdehar.com",
      "logo": "https://elizdehar.com/logo.png",
      "description": "Leading manufacturer and global exporter specializing in premium footwear, sustainable agriculture, and international trade.",
      "foundingDate": "1990",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "SD",
        "addressLocality": "Khartoum"
      },
      "sameAs": [
        "https://linkedin.com/company/elizdehar",
        "https://facebook.com/elizdehar"
      ]
    }
  },

  about: {
    title: "About ELIZDEHAR Inc. - Founded by Tag Elsir Abd Elrahman | Sudan Success Story",
    description: "The inspiring story of ELIZDEHAR Inc., founded by visionary leader Tag Elsir Abd Elrahman Abdullah in 1990. From banking pioneer to manufacturing excellence across footwear, agriculture, and international trade in Sudan.",
    keywords: [
      "Tag Elsir Abd Elrahman Abdullah", "ELIZDEHAR founder", "Sudan entrepreneur", 
      "banking Sudan", "Al-Nile Bank", "Al Baraka Bank", "Saudi Sudanese Bank",
      "El-izdihar Plastic Shoe Factory", "Sudan business leader", "Amin Tagelsir",
      "Tahir Tag Elsir", "EL IZDEHAR Economic Foundation", "Sudanese philanthropy"
    ],
    ogImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=630&fit=crop"
  },

  services: {
    title: "Manufacturing & Trade Services Sudan - Footwear, Agriculture, Export | ELIZDEHAR",
    description: "Comprehensive manufacturing and trade services in Sudan. Premium footwear production, sustainable agriculture solutions, and global import/export operations. Serving international markets from Khartoum since 1990.",
    keywords: [
      "footwear manufacturing Sudan", "plastic shoes Sudan", "agriculture services Sudan",
      "import export services Khartoum", "manufacturing Sudan", "Sudan exports",
      "agricultural products Sudan", "international trade Sudan", "quality footwear Sudan",
      "sustainable farming Sudan", "trade services Africa", "manufacturing excellence Sudan"
    ],
    ogImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=630&fit=crop"
  },

  team: {
    title: "Meet Our Team - Leadership & Expertise | ELIZDEHAR Inc.",
    description: "Meet the experienced team behind ELIZDEHAR's success. Our dedicated professionals bring decades of expertise in manufacturing, agriculture, and international trade.",
    keywords: ["team", "leadership", "expertise", "professionals"],
    ogImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=630&fit=crop"
  },

  contact: {
    title: "Contact ELIZDEHAR Inc. - Get in Touch for Business Inquiries",
    description: "Contact ELIZDEHAR Inc. for manufacturing, agriculture, and trade inquiries. Based in Khartoum, Sudan, serving clients globally since 1990.",
    keywords: ["contact", "business inquiries", "Khartoum", "Sudan"],
    ogImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=630&fit=crop"
  }
};

/**
 * Hook for managing SEO metadata
 */
export function useSEO(pageKey: keyof typeof seoMetadata) {
  if (typeof window !== "undefined") {
    const metadata = seoMetadata[pageKey];
    const currentUrl = window.location.href;
    
    updateSEOMetadata({
      ...metadata,
      ogUrl: currentUrl,
      canonicalUrl: currentUrl,
    });
  }
}