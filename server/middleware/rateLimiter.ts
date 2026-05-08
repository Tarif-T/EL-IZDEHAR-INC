/**
 * Advanced rate limiting middleware
 */
import { Request, Response, NextFunction } from "express";
import { cacheManager } from "../utils/cache";

interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
  message?: string;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
  keyGenerator?: (req: Request) => string;
}

interface RateLimitInfo {
  requests: number[];
  resetTime: number;
}

/**
 * Advanced rate limiter with sliding window
 */
export class RateLimiter {
  private config: Required<RateLimitConfig>;

  constructor(config: RateLimitConfig) {
    this.config = {
      message: "Too many requests, please try again later",
      skipSuccessfulRequests: false,
      skipFailedRequests: false,
      keyGenerator: (req) => req.ip || "unknown",
      ...config,
    };
  }

  middleware() {
    return async (req: Request, res: Response, next: NextFunction) => {
      const key = `rate_limit:${this.config.keyGenerator(req)}`;
      const now = Date.now();
      const windowStart = now - this.config.windowMs;

      try {
        // Get current rate limit info
        let rateLimitInfo = await cacheManager.get<RateLimitInfo>(key);

        if (!rateLimitInfo) {
          rateLimitInfo = {
            requests: [],
            resetTime: now + this.config.windowMs,
          };
        }

        // Remove old requests outside the window
        rateLimitInfo.requests = rateLimitInfo.requests.filter(
          (timestamp) => timestamp > windowStart
        );

        // Check if limit exceeded
        if (rateLimitInfo.requests.length >= this.config.maxRequests) {
          const resetTime = Math.ceil(
            (rateLimitInfo.resetTime - now) / 1000
          );

          res.status(429).set({
            "X-RateLimit-Limit": this.config.maxRequests.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": resetTime.toString(),
            "Retry-After": resetTime.toString(),
          });

          return res.json({
            success: false,
            message: this.config.message,
            retryAfter: resetTime,
          });
        }

        // Add current request timestamp
        rateLimitInfo.requests.push(now);

        // Update cache
        await cacheManager.set(key, rateLimitInfo, this.config.windowMs);

        // Set rate limit headers
        const remaining = this.config.maxRequests - rateLimitInfo.requests.length;
        const resetTime = Math.ceil(
          (rateLimitInfo.resetTime - now) / 1000
        );

        res.set({
          "X-RateLimit-Limit": this.config.maxRequests.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": resetTime.toString(),
        });

        // Skip counting on response if configured
        const originalSend = res.send;
        const config = this.config;
        res.send = function (body) {
          const shouldSkip =
            (res.statusCode < 400 && config.skipSuccessfulRequests) ||
            (res.statusCode >= 400 && config.skipFailedRequests);

          if (shouldSkip) {
            // Remove the request from count
            rateLimitInfo!.requests.pop();
            cacheManager.set(key, rateLimitInfo!, config.windowMs);
          }

          return originalSend.call(this, body);
        };

        next();
      } catch (error) {
        console.error("Rate limiter error:", error);
        next(); // Continue on error
      }
    };
  }
}

/**
 * Predefined rate limiters for different endpoints
 */
export const rateLimiters = {
  // General API rate limiter
  general: new RateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100,
    message: "Too many requests from this IP, please try again later",
  }),

  // Contact form rate limiter
  contact: new RateLimiter({
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 5,
    message: "Too many contact form submissions, please try again in an hour",
    skipFailedRequests: true,
  }),

  // Auth rate limiter (if needed)
  auth: new RateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 10,
    message: "Too many authentication attempts, please try again later",
    skipSuccessfulRequests: true,
  }),

  // Health check rate limiter
  health: new RateLimiter({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 60,
    message: "Health check rate limit exceeded",
  }),
};

/**
 * IP-based rate limiter with different tiers
 */
export class TieredRateLimiter {
  private tiers: Map<string, RateLimitConfig>;

  constructor() {
    this.tiers = new Map([
      ["default", { windowMs: 15 * 60 * 1000, maxRequests: 100 }],
      ["premium", { windowMs: 15 * 60 * 1000, maxRequests: 1000 }],
      ["internal", { windowMs: 15 * 60 * 1000, maxRequests: 10000 }],
    ]);
  }

  addTier(name: string, config: RateLimitConfig) {
    this.tiers.set(name, config);
  }

  middleware(getTier: (req: Request) => string = () => "default") {
    return (req: Request, res: Response, next: NextFunction) => {
      const tier = getTier(req);
      const config = this.tiers.get(tier) || this.tiers.get("default")!;
      
      const limiter = new RateLimiter(config);
      return limiter.middleware()(req, res, next);
    };
  }
}

/**
 * Distributed rate limiter (for future Redis integration)
 */
export class DistributedRateLimiter extends RateLimiter {
  // This would integrate with Redis for distributed rate limiting
  // For now, uses the same implementation as RateLimiter
  constructor(config: RateLimitConfig) {
    super(config);
  }
}
