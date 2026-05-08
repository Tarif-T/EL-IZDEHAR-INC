/**
 * Application constants and configuration
 */

// Company information
export const COMPANY = {
  name: "ELIZDEHAR Inc.",
  fullName: "El izdehar Inc.",
  tagline: "30+ Years of Excellence",
  description: "Leading provider of footwear manufacturing, agriculture solutions, and import/export services across global markets.",
  founded: 1994,
  experience: "30+",
} as const;

// Contact information
export const CONTACT_INFO = {
  address: "Khartoum, Sudan",
  phone: "+249 123 456 789",
  email: "info@elizdehar.com",
  website: "https://elizdehar.com",
  hours: "Sunday - Thursday: 8:00 AM - 6:00 PM",
} as const;

// Social media links
export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/elizdehar",
  instagram: "https://instagram.com/elizdehar",
  linkedin: "https://linkedin.com/company/elizdehar",
  twitter: "https://twitter.com/elizdehar",
} as const;

// Business divisions
export const SERVICES = {
  SHOES: {
    id: "shoes-factory",
    title: "Shoes Factory",
    description: "Premium footwear manufacturing with cutting-edge technology",
    gradient: "from-blue-600 to-purple-600",
  },
  AGRICULTURE: {
    id: "agriculture",
    title: "Agriculture",
    description: "Sustainable farming solutions for modern agriculture",
    gradient: "from-green-600 to-emerald-600",
  },
  IMPORT_EXPORT: {
    id: "import-export",
    title: "Import & Export",
    description: "Global trade partnerships across continents",
    gradient: "from-orange-600 to-red-600",
  },
} as const;

// API endpoints
export const API_ENDPOINTS = {
  CONTACT: "/api/contact",
  CONTACT_SUBMISSIONS: "/api/contact-submissions",
  HEALTH: "/api/health",
} as const;

// Query keys for React Query
export const QUERY_KEYS = {
  HEALTH: [API_ENDPOINTS.HEALTH],
  CONTACT_SUBMISSIONS: [API_ENDPOINTS.CONTACT_SUBMISSIONS],
} as const;

// Animation delays and durations
export const ANIMATIONS = {
  DELAYS: {
    HERO_CONTENT: "0.2s",
    HERO_IMAGE: "0.3s",
    SERVICE_CARD_BASE: 0.8,
    SERVICE_CARD_INCREMENT: 0.2,
    ACHIEVEMENT_BASE: 0.5,
    ACHIEVEMENT_INCREMENT: 0.1,
  },
  DURATIONS: {
    DEFAULT: "300ms",
    SLOW: "500ms",
    FAST: "150ms",
  },
} as const;

// Form validation patterns
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[\+]?[1-9][\d]{0,15}$/,
  MIN_MESSAGE_LENGTH: 10,
  MAX_MESSAGE_LENGTH: 1000,
} as const;

// Breakpoints (matching Tailwind CSS)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  "2XL": 1536,
} as const;

// Language configurations
export const LANGUAGES = {
  EN: {
    code: "en",
    name: "English",
    direction: "ltr" as const,
    flag: "🇺🇸",
  },
  AR: {
    code: "ar",
    name: "العربية",
    direction: "rtl" as const,
    flag: "🇸🇩",
  },
} as const;

// Environment variables (with fallbacks)
export const ENV = {
  NODE_ENV: import.meta.env.NODE_ENV || "development",
  VITE_APP_NAME: import.meta.env.VITE_APP_NAME || COMPANY.name,
  VITE_API_URL: import.meta.env.VITE_API_URL || "",
} as const;

// SEO defaults
export const SEO_DEFAULTS = {
  title: `${COMPANY.name} - ${COMPANY.tagline}`,
  description: COMPANY.description,
  keywords: [
    "ELIZDEHAR",
    "footwear manufacturing",
    "agriculture",
    "import export",
    "Sudan",
    "Khartoum",
    "business",
    "manufacturing",
    "trade",
  ],
  ogImage: "/og-image.jpg",
  twitterCard: "summary_large_image",
} as const;

// Achievement statistics
export const ACHIEVEMENTS = {
  YEARS: "30+",
  CLIENTS: "1000+",
  PROJECTS: "500+",
} as const;