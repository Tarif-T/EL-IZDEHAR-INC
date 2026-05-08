import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/lib/i18n";
import type { ApiResponse, ApiError } from "@/types";
import type { InsertContactSubmission, ContactSubmission } from "@shared/schema";

/**
 * Custom hook for contact form submission
 */
export function useContactSubmission() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { t } = useI18n();

  return useMutation({
    mutationFn: async (data: InsertContactSubmission): Promise<ApiResponse> => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: (data: ApiResponse) => {
      if (data.success) {
        toast({
          title: t('contact.success.title'),
          description: t('contact.success.description'),
        });
        queryClient.invalidateQueries({ queryKey: ['/api/contact-submissions'] });
      }
    },
    onError: (error: Error) => {
      console.error("Contact submission error:", error);
      toast({
        title: t('contact.error.title'),
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

/**
 * Custom hook for fetching contact submissions (admin)
 */
export function useContactSubmissions(enabled = false) {
  return useQuery({
    queryKey: ['/api/contact-submissions'],
    enabled,
    select: (data: ApiResponse<ContactSubmission[]>) => data.data || [],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Custom hook for API health check
 */
export function useHealthCheck() {
  return useQuery({
    queryKey: ['/api/health'],
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 60 * 1000, // 1 minute
    retry: 3,
  });
}

/**
 * Generic hook for API requests with error handling
 */
export function useApiGet<TData = unknown>(url: string) {
  return useQuery({
    queryKey: [url],
    select: (data: ApiResponse<TData>) => data.data,
  });
}

export function useApiMutate<TData = unknown, TVariables = unknown>({
  method,
  url,
  onSuccess,
  onError,
}: {
  method: 'POST' | 'PUT' | 'DELETE';
  url: string;
  onSuccess?: (data: TData) => void;
  onError?: (error: ApiError) => void;
}) {
  const { toast } = useToast();
  const { t } = useI18n();

  return useMutation({
    mutationFn: async (data?: TVariables): Promise<TData> => {
      const response = await apiRequest(method, url, data);
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message);
      }

      return result.data;
    },
    onSuccess: (data: TData) => {
      onSuccess?.(data);
    },
    onError: (error: Error) => {
      console.error(`API ${method} ${url} error:`, error);
      onError?.(error as any);

      toast({
        title: t('common.error'),
        description: error.message,
        variant: "destructive",
      });
    },
  });
}