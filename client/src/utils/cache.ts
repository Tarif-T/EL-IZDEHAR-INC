/**
 * Client-side caching utilities
 */

interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
  maxSize?: number; // Maximum number of entries
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expires: number;
}

/**
 * In-memory cache with TTL and size limits
 */
export class MemoryCache<T = any> {
  private cache = new Map<string, CacheEntry<T>>();
  private readonly ttl: number;
  private readonly maxSize: number;

  constructor(options: CacheOptions = {}) {
    this.ttl = options.ttl || 5 * 60 * 1000; // 5 minutes default
    this.maxSize = options.maxSize || 100;
  }

  set(key: string, data: T, customTtl?: number): void {
    const now = Date.now();
    const expires = now + (customTtl || this.ttl);

    // Remove oldest entry if cache is full
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey) {
        this.cache.delete(oldestKey);
      }
    }

    this.cache.set(key, {
      data,
      timestamp: now,
      expires,
    });
  }

  get(key: string): T | undefined {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return undefined;
    }

    // Check if entry has expired
    if (Date.now() > entry.expires) {
      this.cache.delete(key);
      return undefined;
    }

    return entry.data;
  }

  has(key: string): boolean {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return false;
    }

    // Check if entry has expired
    if (Date.now() > entry.expires) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    // Clean expired entries first
    this.cleanExpired();
    return this.cache.size;
  }

  private cleanExpired(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expires) {
        this.cache.delete(key);
      }
    }
  }

  keys(): string[] {
    this.cleanExpired();
    return Array.from(this.cache.keys());
  }

  values(): T[] {
    this.cleanExpired();
    return Array.from(this.cache.values()).map(entry => entry.data);
  }
}

/**
 * localStorage cache with JSON serialization
 */
export class LocalStorageCache<T = any> {
  private readonly prefix: string;
  private readonly ttl: number;

  constructor(prefix = "app_cache_", ttl = 24 * 60 * 60 * 1000) { // 24 hours default
    this.prefix = prefix;
    this.ttl = ttl;
  }

  set(key: string, data: T, customTtl?: number): void {
    if (typeof window === "undefined") return;

    const expires = Date.now() + (customTtl || this.ttl);
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      expires,
    };

    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(entry));
    } catch (error) {
      console.warn("Failed to save to localStorage:", error);
    }
  }

  get(key: string): T | undefined {
    if (typeof window === "undefined") return undefined;

    try {
      const item = localStorage.getItem(this.prefix + key);
      if (!item) return undefined;

      const entry: CacheEntry<T> = JSON.parse(item);
      
      // Check if entry has expired
      if (Date.now() > entry.expires) {
        this.delete(key);
        return undefined;
      }

      return entry.data;
    } catch (error) {
      console.warn("Failed to read from localStorage:", error);
      this.delete(key);
      return undefined;
    }
  }

  has(key: string): boolean {
    return this.get(key) !== undefined;
  }

  delete(key: string): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(this.prefix + key);
  }

  clear(): void {
    if (typeof window === "undefined") return;

    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(this.prefix)) {
        localStorage.removeItem(key);
      }
    });
  }

  keys(): string[] {
    if (typeof window === "undefined") return [];

    return Object.keys(localStorage)
      .filter(key => key.startsWith(this.prefix))
      .map(key => key.substring(this.prefix.length));
  }
}

/**
 * Session storage cache
 */
export class SessionStorageCache<T = any> {
  private readonly prefix: string;
  private readonly ttl: number;

  constructor(prefix = "app_cache_", ttl = 24 * 60 * 60 * 1000) { // 24 hours default
    this.prefix = prefix;
    this.ttl = ttl;
  }
  set(key: string, data: T, customTtl?: number): void {
    if (typeof window === "undefined") return;

    const expires = Date.now() + (customTtl || this.ttl);
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      expires,
    };

    try {
      sessionStorage.setItem(this.prefix + key, JSON.stringify(entry));
    } catch (error) {
      console.warn("Failed to save to sessionStorage:", error);
    }
  }

  get(key: string): T | undefined {
    if (typeof window === "undefined") return undefined;

    try {
      const item = sessionStorage.getItem(this.prefix + key);
      if (!item) return undefined;

      const entry: CacheEntry<T> = JSON.parse(item);
      
      if (Date.now() > entry.expires) {
        this.delete(key);
        return undefined;
      }

      return entry.data;
    } catch (error) {
      console.warn("Failed to read from sessionStorage:", error);
      this.delete(key);
      return undefined;
    }
  }

  delete(key: string): void {
    if (typeof window === "undefined") return;
    sessionStorage.removeItem(this.prefix + key);
  }

  clear(): void {
    if (typeof window === "undefined") return;

    const keys = Object.keys(sessionStorage);
    keys.forEach(key => {
      if (key.startsWith(this.prefix)) {
        sessionStorage.removeItem(key);
      }
    });
  }
}

// Export singleton instances
export const memoryCache = new MemoryCache();
export const localCache = new LocalStorageCache("elizdehar_");
export const sessionCache = new SessionStorageCache("elizdehar_session_");
