/**
 * Frontend type definitions
 */

// Re-export schema types for convenience
export type { 
  User, 
  InsertUser, 
  ContactSubmission, 
  InsertContactSubmission 
} from "@shared/schema";

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: unknown[];
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Array<{
    field?: string;
    message: string;
    code?: string;
  }>;
}

// UI Component Props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Page metadata
export interface PageMeta {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
}

// Navigation types
export interface NavigationItem {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: NavigationItem[];
}

// Form validation types
export interface FormFieldError {
  field: string;
  message: string;
}

// Language and i18n types
export interface LanguageConfig {
  code: string;
  name: string;
  direction: 'ltr' | 'rtl';
  flag: string;
}

// Service types for hero section
export interface Service {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  gradient: string;
  delay: string;
}

// Team member type
export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  testId: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

// Contact information
export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  hours: string;
}

// Achievement data
export interface Achievement {
  number: string;
  label: string;
}

// Loading and error states
export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

// Query options
export interface QueryOptions {
  enabled?: boolean;
  refetchOnMount?: boolean;
  refetchOnWindowFocus?: boolean;
  staleTime?: number;
}