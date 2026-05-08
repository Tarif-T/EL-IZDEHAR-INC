/**
 * Server-side caching utilities
 */
import { LRUCache } from "lru-cache";

/**
 * Redis-like cache interface for future Redis integration
 */
interface CacheInterface {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, ttl?: number): Promise<void>;
  del(key: string): Promise<void>;
  exists(key: string): Promise<boolean>;
  clear(): Promise<void>;
}

/**
 * In-memory cache implementation with LRU eviction
 */
export class MemoryCache implements CacheInterface {
  private cache: LRUCache<string, string>;

  constructor(maxSize = 1000, ttl = 5 * 60 * 1000) { // 5 minutes default
    this.cache = new LRUCache({
      max: maxSize,
      ttl,
    });
  }

  async get(key: string): Promise<string | null> {
    return this.cache.get(key) || null;
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    if (ttl) {
      this.cache.set(key, value, { ttl });
    } else {
      this.cache.set(key, value);
    }
  }

  async del(key: string): Promise<void> {
    this.cache.delete(key);
  }

  async exists(key: string): Promise<boolean> {
    return this.cache.has(key);
  }

  async clear(): Promise<void> {
    this.cache.clear();
  }

  // Additional methods for monitoring
  size(): number {
    return this.cache.size;
  }

  keys(): string[] {
    return Array.from(this.cache.keys());
  }
}

/**
 * Cache manager with multiple strategies
 */
export class CacheManager {
  private cache: CacheInterface;
  private keyPrefix: string;

  constructor(cache: CacheInterface, keyPrefix = "elizdehar:") {
    this.cache = cache;
    this.keyPrefix = keyPrefix;
  }

  private getKey(key: string): string {
    return `${this.keyPrefix}${key}`;
  }

  /**
   * Get cached value with JSON parsing
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await this.cache.get(this.getKey(key));
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.warn(`Cache get error for key ${key}:`, error);
      return null;
    }
  }

  /**
   * Set cached value with JSON serialization
   */
  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    try {
      await this.cache.set(this.getKey(key), JSON.stringify(value), ttl);
    } catch (error) {
      console.warn(`Cache set error for key ${key}:`, error);
    }
  }

  /**
   * Delete cached value
   */
  async del(key: string): Promise<void> {
    await this.cache.del(this.getKey(key));
  }

  /**
   * Check if key exists
   */
  async exists(key: string): Promise<boolean> {
    return await this.cache.exists(this.getKey(key));
  }

  /**
   * Get or set cached value (cache-aside pattern)
   */
  async getOrSet<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttl?: number
  ): Promise<T> {
    let value = await this.get<T>(key);
    
    if (value === null) {
      value = await fetcher();
      await this.set(key, value, ttl);
    }
    
    return value;
  }

  /**
   * Invalidate cache by pattern
   */
  async invalidatePattern(pattern: string): Promise<void> {
    if (this.cache instanceof MemoryCache) {
      const keys = this.cache.keys();
      const matchingKeys = keys.filter(key => key.includes(pattern));
      
      for (const key of matchingKeys) {
        await this.cache.del(key);
      }
    }
  }

  /**
   * Warm up cache with data
   */
  async warmUp<T>(data: Record<string, T>, ttl?: number): Promise<void> {
    const promises = Object.entries(data).map(([key, value]) =>
      this.set(key, value, ttl)
    );
    
    await Promise.all(promises);
  }
}

// Cache instances
export const memoryCache = new MemoryCache();
export const cacheManager = new CacheManager(memoryCache);

/**
 * Cache decorators for methods
 */
export function CacheResult(ttl: number = 5 * 60 * 1000) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const cacheKey = `${target.constructor.name}:${propertyName}:${JSON.stringify(args)}`;
      
      let result = await cacheManager.get(cacheKey);
      
      if (result === null) {
        result = await method.apply(this, args);
        await cacheManager.set(cacheKey, result, ttl);
      }
      
      return result;
    };

    return descriptor;
  };
}

/**
 * Cache invalidation decorator
 */
export function InvalidateCache(patterns: string[]) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const result = await method.apply(this, args);
      
      // Invalidate cache patterns after successful operation
      for (const pattern of patterns) {
        await cacheManager.invalidatePattern(pattern);
      }
      
      return result;
    };

    return descriptor;
  };
}