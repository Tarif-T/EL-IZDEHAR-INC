/**
 * Server-side type definitions
 */

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: unknown[];
}

export interface ErrorResponse {
  success: false;
  message: string;
  errors?: unknown[];
}

export interface SuccessResponse<T = unknown> {
  success: true;
  message: string;
  data?: T;
}

export interface ContactSubmissionResponse {
  id: string;
  message: string;
}

// Request/Response type guards
export const isApiError = (response: unknown): response is ErrorResponse => {
  return typeof response === 'object' && response !== null && 'success' in response && response.success === false;
};

export const isApiSuccess = (response: unknown): response is SuccessResponse => {
  return typeof response === 'object' && response !== null && 'success' in response && response.success === true;
};