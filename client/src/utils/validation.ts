/**
 * Validation utility functions
 */

import { VALIDATION } from "@/lib/constants";

/**
 * Validate email address
 */
export function validateEmail(email: string): boolean {
  return VALIDATION.EMAIL_REGEX.test(email.trim());
}

/**
 * Validate phone number
 */
export function validatePhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, "");
  return cleaned.length >= 10 && cleaned.length <= 15;
}

/**
 * Validate required field
 */
export function validateRequired(value: string): boolean {
  return value.trim().length > 0;
}

/**
 * Validate minimum length
 */
export function validateMinLength(value: string, minLength: number): boolean {
  return value.trim().length >= minLength;
}

/**
 * Validate maximum length
 */
export function validateMaxLength(value: string, maxLength: number): boolean {
  return value.trim().length <= maxLength;
}

/**
 * Validate URL
 */
export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate contact form data
 */
export interface ContactFormValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  serviceInterest?: string;
  message?: string;
}

export function validateContactForm(data: {
  firstName: string;
  lastName: string;
  email: string;
  serviceInterest: string;
  message: string;
}): ContactFormValidationErrors {
  const errors: ContactFormValidationErrors = {};

  // First name validation
  if (!validateRequired(data.firstName)) {
    errors.firstName = "First name is required";
  } else if (!validateMinLength(data.firstName, 2)) {
    errors.firstName = "First name must be at least 2 characters";
  }

  // Last name validation
  if (!validateRequired(data.lastName)) {
    errors.lastName = "Last name is required";
  } else if (!validateMinLength(data.lastName, 2)) {
    errors.lastName = "Last name must be at least 2 characters";
  }

  // Email validation
  if (!validateRequired(data.email)) {
    errors.email = "Email is required";
  } else if (!validateEmail(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  // Service interest validation
  if (!validateRequired(data.serviceInterest)) {
    errors.serviceInterest = "Please select a service";
  }

  // Message validation
  if (!validateRequired(data.message)) {
    errors.message = "Message is required";
  } else if (!validateMinLength(data.message, VALIDATION.MIN_MESSAGE_LENGTH)) {
    errors.message = `Message must be at least ${VALIDATION.MIN_MESSAGE_LENGTH} characters`;
  } else if (!validateMaxLength(data.message, VALIDATION.MAX_MESSAGE_LENGTH)) {
    errors.message = `Message must not exceed ${VALIDATION.MAX_MESSAGE_LENGTH} characters`;
  }

  return errors;
}

/**
 * Check if validation errors exist
 */
export function hasValidationErrors(errors: Record<string, string | undefined>): boolean {
  return Object.values(errors).some(error => error !== undefined);
}

/**
 * Sanitize string input
 */
export function sanitizeString(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, "") // Remove potential HTML tags
    .slice(0, 1000); // Limit length
}

/**
 * Validate file upload
 */
export interface FileValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateFile(
  file: File,
  options: {
    maxSize?: number; // in bytes
    allowedTypes?: string[];
  } = {}
): FileValidationResult {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"],
  } = options;

  if (file.size > maxSize) {
    return {
      isValid: false,
      error: `File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`,
    };
  }

  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: `File type not allowed. Allowed types: ${allowedTypes.join(", ")}`,
    };
  }

  return { isValid: true };
}

/**
 * Debounce validation function
 */
export function debounceValidation<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}