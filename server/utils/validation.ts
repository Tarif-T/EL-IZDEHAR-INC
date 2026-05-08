/**
 * Server-side validation utilities
 */
import { z } from "zod";

/**
 * Enhanced email validation with domain checking
 */
export const emailSchema = z
  .string()
  .email("Invalid email format")
  .min(5, "Email must be at least 5 characters")
  .max(254, "Email must not exceed 254 characters")
  .refine(
    (email) => {
      // Check for valid email structure
      const parts = email.split("@");
      if (parts.length !== 2) return false;
      
      const [local, domain] = parts;
      
      // Local part validation
      if (local.length === 0 || local.length > 64) return false;
      if (local.startsWith(".") || local.endsWith(".")) return false;
      
      // Domain part validation
      if (domain.length === 0 || domain.length > 253) return false;
      if (domain.startsWith("-") || domain.endsWith("-")) return false;
      
      return true;
    },
    "Invalid email structure"
  );

/**
 * Phone number validation with international support
 */
export const phoneSchema = z
  .string()
  .min(10, "Phone number must be at least 10 digits")
  .max(15, "Phone number must not exceed 15 digits")
  .refine(
    (phone) => {
      // Remove all non-digit characters except +
      const cleaned = phone.replace(/[^\d+]/g, "");
      
      // Check if it starts with + and has valid length
      if (cleaned.startsWith("+")) {
        return cleaned.length >= 11 && cleaned.length <= 16;
      }
      
      // For local numbers
      return cleaned.length >= 10 && cleaned.length <= 15;
    },
    "Invalid phone number format"
  );

/**
 * Sanitize and validate text input
 */
export const textSchema = (min = 1, max = 1000) =>
  z
    .string()
    .min(min, `Text must be at least ${min} characters`)
    .max(max, `Text must not exceed ${max} characters`)
    .transform((str) => str.trim())
    .refine((str) => str.length > 0, "Text cannot be empty after trimming");

/**
 * Name validation schema
 */
export const nameSchema = z
  .string()
  .min(2, "Name must be at least 2 characters")
  .max(50, "Name must not exceed 50 characters")
  .regex(/^[a-zA-Z\s\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]+$/, "Name contains invalid characters")
  .transform((str) => str.trim());

/**
 * URL validation schema
 */
export const urlSchema = z
  .string()
  .url("Invalid URL format")
  .refine(
    (url) => {
      try {
        const parsed = new URL(url);
        return ["http:", "https:"].includes(parsed.protocol);
      } catch {
        return false;
      }
    },
    "URL must use HTTP or HTTPS protocol"
  );

/**
 * File validation schema
 */
export const fileSchema = z.object({
  filename: z.string().min(1, "Filename is required"),
  mimetype: z.string().min(1, "MIME type is required"),
  size: z.number().min(1, "File size must be greater than 0"),
});

/**
 * Pagination validation schema
 */
export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1, "Page must be at least 1").default(1),
  limit: z.coerce.number().int().min(1, "Limit must be at least 1").max(100, "Limit cannot exceed 100").default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

/**
 * Search query validation schema
 */
export const searchSchema = z.object({
  query: z.string().min(1, "Search query is required").max(100, "Search query too long"),
  filters: z.record(z.string()).optional(),
});

/**
 * Rate limiting validation
 */
export const rateLimitSchema = z.object({
  ip: z.string().ip("Invalid IP address"),
  endpoint: z.string().min(1, "Endpoint is required"),
  timestamp: z.date(),
});

/**
 * Security validation utilities
 */
export class SecurityValidator {
  /**
   * Check for SQL injection patterns
   */
  static validateSqlInjection(input: string): boolean {
    const sqlPatterns = [
      /(\bUNION\b|\bSELECT\b|\bINSERT\b|\bUPDATE\b|\bDELETE\b|\bDROP\b)/i,
      /(\bOR\b|\bAND\b)\s+\d+\s*=\s*\d+/i,
      /['"]\s*;\s*--/,
      /['"]\s*\|\|/,
    ];

    return !sqlPatterns.some(pattern => pattern.test(input));
  }

  /**
   * Check for XSS patterns
   */
  static validateXSS(input: string): boolean {
    const xssPatterns = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
      /<iframe/gi,
      /<object/gi,
      /<embed/gi,
    ];

    return !xssPatterns.some(pattern => pattern.test(input));
  }

  /**
   * Sanitize HTML input
   */
  static sanitizeHtml(input: string): string {
    return input
      .replace(/[<>]/g, "")
      .replace(/javascript:/gi, "")
      .replace(/on\w+\s*=/gi, "")
      .trim();
  }

  /**
   * Validate file upload security
   */
  static validateFileUpload(file: { filename: string; mimetype: string; size: number }): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];
    
    // Check file extension
    const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif", ".pdf", ".doc", ".docx"];
    const extension = file.filename.toLowerCase().substring(file.filename.lastIndexOf("."));
    
    if (!allowedExtensions.includes(extension)) {
      errors.push(`File type ${extension} is not allowed`);
    }

    // Check MIME type
    const allowedMimeTypes = [
      "image/jpeg",
      "image/png", 
      "image/gif",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      errors.push(`MIME type ${file.mimetype} is not allowed`);
    }

    // Check file size (10MB limit)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      errors.push("File size exceeds 10MB limit");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}