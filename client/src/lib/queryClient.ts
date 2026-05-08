import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { API_ENDPOINTS } from "./constants";
import { memoryCache } from "@/utils/cache";

/**
 * Enhanced error handling for API responses
 */
async function throwIfResNotOk(res: Response): Promise<void> {
  if (!res.ok) {
    let errorMessage: string;
    
    try {
      const errorData = await res.json();
      errorMessage = errorData.message || res.statusText;
    } catch {
      errorMessage = res.statusText || "Network error";
    }
    
    throw new Error(`${res.status}: ${errorMessage}`);
  }
}

/**
 * Enhanced API request function with better error handling and logging
 */
export async function apiRequest(
  method: string,
  url: string,
  data?: unknown,
): Promise<Response> {
  const requestConfig: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    credentials: "include",
  };

  if (data && method !== "GET") {
    requestConfig.body = JSON.stringify(data);
  }

  try {
    const res = await fetch(url, requestConfig);
    await throwIfResNotOk(res);
    return res;
  } catch (error) {
    console.error(`API ${method} ${url} failed:`, error);
    throw error;
  }
}

/**
 * Type-safe query function factory
 */
type UnauthorizedBehavior = "returnNull" | "throw";

export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey, signal }) => {
    const url = queryKey.join("/") as string;
    
    const res = await fetch(url, {
      credentials: "include",
      signal,
      headers: {
        "Accept": "application/json",
      },
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

/**
 * Enhanced Query Client with optimized defaults and caching
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: false,
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if (error instanceof Error && error.message.includes("4")) {
          return false;
        }
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      // Enable background refetching for better UX
      refetchInterval: false,
      refetchIntervalInBackground: false,
      // Use memory cache for additional performance
      select: (data) => {
        // Cache successful responses in memory for quick access
        if (data && typeof data === 'object') {
          const cacheKey = JSON.stringify(data);
          memoryCache.set(cacheKey, data, 2 * 60 * 1000); // 2 minutes
        }
        return data;
      },
    },
    mutations: {
      retry: false,
      gcTime: 5 * 60 * 1000, // 5 minutes
      // Clear related caches on mutation success
      onSuccess: () => {
        // Clear memory cache on successful mutations
        memoryCache.clear();
      },
    },
  },
});

/**
 * Utility function to invalidate queries by pattern
 */
export function invalidateQueries(pattern: string): void {
  queryClient.invalidateQueries({
    predicate: (query) => {
      return query.queryKey.some(key => 
        typeof key === "string" && key.includes(pattern)
      );
    },
  });
}

/**
 * Prefetch data for better UX
 */
export async function prefetchQuery<T>(
  queryKey: string[],
  queryFn: () => Promise<T>,
  staleTime = 5 * 60 * 1000
): Promise<void> {
  await queryClient.prefetchQuery({
    queryKey,
    queryFn,
    staleTime,
  });
}
