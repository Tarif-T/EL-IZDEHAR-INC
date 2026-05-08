/**
 * Structured data schemas for enhanced SEO
 */

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ELIZDEHAR Inc.",
  "alternateName": "El Izdehar Group",
  "url": "https://elizdehar.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://elizdehar.com/logo.png",
    "width": 400,
    "height": 400
  },
  "description": "Leading Sudanese manufacturer and global exporter specializing in premium footwear, sustainable agriculture, and international trade since 1990.",
  "foundingDate": "1990",
  "founder": {
    "@type": "Person",
    "name": "Tag Elsir Abd Elrahman Abdullah",
    "jobTitle": "Founder & CEO"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "SD",
    "addressLocality": "Khartoum",
    "addressRegion": "Khartoum State",
    "streetAddress": "123 Business District"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+249-123-456-789",
    "contactType": "customer service",
    "email": "info@elizdehar.com",
    "availableLanguage": ["English", "Arabic"]
  },
  "sameAs": [
    "https://linkedin.com/company/elizdehar",
    "https://facebook.com/elizdehar"
  ],
  "keywords": "manufacturing, footwear, agriculture, import export, Sudan, Khartoum",
  "industry": "Manufacturing and International Trade",
  "numberOfEmployees": "50-100",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "ELIZDEHAR Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Footwear Manufacturing",
          "description": "Premium plastic and leather footwear manufacturing"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Agricultural Services",
          "description": "Sustainable agriculture and organic farming solutions"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Import Export Services",
          "description": "International trade and logistics services"
        }
      }
    ]
  }
};

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "ELIZDEHAR Inc.",
  "image": "https://elizdehar.com/logo.png",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Business District",
    "addressLocality": "Khartoum",
    "addressRegion": "Khartoum State",
    "postalCode": "11111",
    "addressCountry": "SD"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "15.5007",
    "longitude": "32.5599"
  },
  "telephone": "+249-123-456-789",
  "email": "info@elizdehar.com",
  "url": "https://elizdehar.com",
  "openingHours": "Mo-Fr 08:00-17:00",
  "priceRange": "$$",
  "servedCuisine": "Manufacturing Services",
  "paymentAccepted": "Cash, Credit Card, Bank Transfer"
};

export const manufacturerSchema = {
  "@context": "https://schema.org",
  "@type": "Manufacturer",
  "name": "ELIZDEHAR Inc.",
  "url": "https://elizdehar.com",
  "logo": "https://elizdehar.com/logo.png",
  "description": "Premium footwear manufacturer and agricultural products supplier",
  "foundingDate": "1990",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "SD",
    "addressLocality": "Khartoum"
  },
  "makesOffer": [
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Product",
        "name": "Premium Footwear",
        "category": "Shoes & Footwear",
        "description": "High-quality plastic and leather footwear"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Product",
        "name": "Agricultural Products",
        "category": "Agriculture",
        "description": "Fresh fruits, vegetables, and organic produce"
      }
    }
  ]
};

export const faqSchema = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

export const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ELIZDEHAR Inc.",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "bestRating": "5",
    "worstRating": "1",
    "ratingCount": "127"
  },
  "review": [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Ahmed Hassan"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "Excellent quality footwear and professional service. ELIZDEHAR has been our trusted partner for years."
    }
  ]
};

export const articleSchema = (article: {
  title: string;
  description: string;
  author: string;
  publishedDate: string;
  modifiedDate?: string;
  image?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": article.title,
  "description": article.description,
  "author": {
    "@type": "Person",
    "name": article.author
  },
  "publisher": {
    "@type": "Organization",
    "name": "ELIZDEHAR Inc.",
    "logo": {
      "@type": "ImageObject",
      "url": "https://elizdehar.com/logo.png"
    }
  },
  "datePublished": article.publishedDate,
  "dateModified": article.modifiedDate || article.publishedDate,
  "image": article.image ? {
    "@type": "ImageObject",
    "url": article.image,
    "width": 1200,
    "height": 630
  } : undefined,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": window.location.href
  }
});