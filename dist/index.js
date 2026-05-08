var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import "dotenv/config";
import express2 from "express";
import cors from "cors";
import helmet from "helmet";

// server/routes.ts
import { createServer } from "http";

// server/controllers/contactController.ts
import { z } from "zod";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  contactSubmissions: () => contactSubmissions,
  insertContactSubmissionSchema: () => insertContactSubmissionSchema,
  insertUserSchema: () => insertUserSchema,
  users: () => users
});
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  serviceInterest: text("service_interest").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertContactSubmissionSchema = createInsertSchema(contactSubmissions).pick({
  firstName: true,
  lastName: true,
  email: true,
  serviceInterest: true,
  message: true
});

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
import { eq, desc, and, ilike, count } from "drizzle-orm";
var DatabaseStorage = class {
  /**
   * Get user by ID
   */
  async getUser(id) {
    try {
      const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
      return user;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw new Error("Failed to fetch user");
    }
  }
  /**
   * Get user by username
   */
  async getUserByUsername(username) {
    try {
      const [user] = await db.select().from(users).where(eq(users.username, username)).limit(1);
      return user;
    } catch (error) {
      console.error("Error fetching user by username:", error);
      throw new Error("Failed to fetch user");
    }
  }
  /**
   * Create a new user
   */
  async createUser(insertUser) {
    try {
      const [user] = await db.insert(users).values(insertUser).returning();
      return user;
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Failed to create user");
    }
  }
  /**
   * Create a new contact submission
   */
  async createContactSubmission(insertSubmission) {
    try {
      const [submission] = await db.insert(contactSubmissions).values(insertSubmission).returning();
      return submission;
    } catch (error) {
      console.error("Error creating contact submission:", error);
      throw new Error("Failed to create contact submission");
    }
  }
  /**
   * Get contact submissions with pagination
   */
  async getContactSubmissions(options = {}) {
    try {
      const {
        page = 1,
        limit = 20,
        sortBy = "createdAt",
        sortOrder = "desc"
      } = options;
      const offset = (page - 1) * limit;
      const [{ total }] = await db.select({ total: count() }).from(contactSubmissions);
      const data = await db.select().from(contactSubmissions).orderBy(sortOrder === "desc" ? desc(contactSubmissions.createdAt) : contactSubmissions.createdAt).limit(limit).offset(offset);
      return {
        data,
        pagination: {
          page,
          limit,
          total: Number(total),
          totalPages: Math.ceil(Number(total) / limit)
        }
      };
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      throw new Error("Failed to fetch contact submissions");
    }
  }
  /**
   * Get contact submission by ID
   */
  async getContactSubmissionById(id) {
    try {
      const [submission] = await db.select().from(contactSubmissions).where(eq(contactSubmissions.id, id)).limit(1);
      return submission;
    } catch (error) {
      console.error("Error fetching contact submission by ID:", error);
      throw new Error("Failed to fetch contact submission");
    }
  }
  /**
   * Search contact submissions
   */
  async searchContactSubmissions(query, options = {}) {
    try {
      const {
        page = 1,
        limit = 20,
        sortBy = "createdAt",
        sortOrder = "desc"
      } = options;
      const offset = (page - 1) * limit;
      const searchQuery = `%${query}%`;
      const whereClause = and(
        ilike(contactSubmissions.firstName, searchQuery),
        ilike(contactSubmissions.lastName, searchQuery),
        ilike(contactSubmissions.email, searchQuery),
        ilike(contactSubmissions.message, searchQuery)
      );
      const [{ total }] = await db.select({ total: count() }).from(contactSubmissions).where(whereClause);
      const data = await db.select().from(contactSubmissions).where(whereClause).orderBy(sortOrder === "desc" ? desc(contactSubmissions.createdAt) : contactSubmissions.createdAt).limit(limit).offset(offset);
      return {
        data,
        pagination: {
          page,
          limit,
          total: Number(total),
          totalPages: Math.ceil(Number(total) / limit)
        }
      };
    } catch (error) {
      console.error("Error searching contact submissions:", error);
      throw new Error("Failed to search contact submissions");
    }
  }
};
var storage = new DatabaseStorage();

// server/controllers/contactController.ts
var ContactController = class _ContactController {
  /**
   * Create a new contact submission
   */
  static async createContactSubmission(req, res) {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      const response = {
        success: true,
        message: "Contact submission received successfully",
        data: {
          id: submission.id,
          message: "Thank you for your inquiry. We'll get back to you soon!"
        }
      };
      res.status(201).json(response);
    } catch (error) {
      _ContactController.handleError(error, res);
    }
  }
  /**
   * Get all contact submissions (admin endpoint)
   */
  static async getContactSubmissions(req, res) {
    try {
      const submissions = await storage.getContactSubmissions();
      const response = {
        success: true,
        message: "Contact submissions retrieved successfully",
        data: submissions
      };
      res.json(response);
    } catch (error) {
      _ContactController.handleError(error, res);
    }
  }
  /**
   * Centralized error handling
   */
  static handleError(error, res) {
    if (error instanceof z.ZodError) {
      const response = {
        success: false,
        message: "Invalid form data",
        errors: error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message
        }))
      };
      res.status(400).json(response);
    } else {
      console.error("Contact controller error:", error);
      const response = {
        success: false,
        message: "Internal server error"
      };
      res.status(500).json(response);
    }
  }
};

// server/middleware/validation.ts
import { ZodError } from "zod";
import { z as z2 } from "zod";
var validateRequest = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const response = {
          success: false,
          message: "Validation error",
          errors: error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
            code: err.code
          }))
        };
        res.status(400).json(response);
      } else {
        next(error);
      }
    }
  };
};
var contactValidationSchema = z2.object({
  body: insertContactSubmissionSchema
});

// server/middleware/errorHandler.ts
var errorHandler = (err, req, res, next) => {
  console.error(`Error ${req.method} ${req.path}:`, err);
  const status = err.status || err.statusCode || 500;
  const response = {
    success: false,
    message: err.message || "Internal Server Error"
  };
  if (process.env.NODE_ENV === "development") {
    response.errors = [{ stack: err.stack }];
  }
  res.status(status).json(response);
};
var notFoundHandler = (req, res) => {
  const response = {
    success: false,
    message: `Route ${req.originalUrl} not found`
  };
  res.status(404).json(response);
};

// server/utils/cache.ts
import { LRUCache } from "lru-cache";
var MemoryCache = class {
  cache;
  constructor(maxSize = 1e3, ttl = 5 * 60 * 1e3) {
    this.cache = new LRUCache({
      max: maxSize,
      ttl
    });
  }
  async get(key) {
    return this.cache.get(key) || null;
  }
  async set(key, value, ttl) {
    if (ttl) {
      this.cache.set(key, value, { ttl });
    } else {
      this.cache.set(key, value);
    }
  }
  async del(key) {
    this.cache.delete(key);
  }
  async exists(key) {
    return this.cache.has(key);
  }
  async clear() {
    this.cache.clear();
  }
  // Additional methods for monitoring
  size() {
    return this.cache.size;
  }
  keys() {
    return Array.from(this.cache.keys());
  }
};
var CacheManager = class {
  cache;
  keyPrefix;
  constructor(cache, keyPrefix = "elizdehar:") {
    this.cache = cache;
    this.keyPrefix = keyPrefix;
  }
  getKey(key) {
    return `${this.keyPrefix}${key}`;
  }
  /**
   * Get cached value with JSON parsing
   */
  async get(key) {
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
  async set(key, value, ttl) {
    try {
      await this.cache.set(this.getKey(key), JSON.stringify(value), ttl);
    } catch (error) {
      console.warn(`Cache set error for key ${key}:`, error);
    }
  }
  /**
   * Delete cached value
   */
  async del(key) {
    await this.cache.del(this.getKey(key));
  }
  /**
   * Check if key exists
   */
  async exists(key) {
    return await this.cache.exists(this.getKey(key));
  }
  /**
   * Get or set cached value (cache-aside pattern)
   */
  async getOrSet(key, fetcher, ttl) {
    let value = await this.get(key);
    if (value === null) {
      value = await fetcher();
      await this.set(key, value, ttl);
    }
    return value;
  }
  /**
   * Invalidate cache by pattern
   */
  async invalidatePattern(pattern) {
    if (this.cache instanceof MemoryCache) {
      const keys = this.cache.keys();
      const matchingKeys = keys.filter((key) => key.includes(pattern));
      for (const key of matchingKeys) {
        await this.cache.del(key);
      }
    }
  }
  /**
   * Warm up cache with data
   */
  async warmUp(data, ttl) {
    const promises = Object.entries(data).map(
      ([key, value]) => this.set(key, value, ttl)
    );
    await Promise.all(promises);
  }
};
var memoryCache = new MemoryCache();
var cacheManager = new CacheManager(memoryCache);

// server/middleware/rateLimiter.ts
var RateLimiter = class {
  config;
  constructor(config) {
    this.config = {
      message: "Too many requests, please try again later",
      skipSuccessfulRequests: false,
      skipFailedRequests: false,
      keyGenerator: (req) => req.ip || "unknown",
      ...config
    };
  }
  middleware() {
    return async (req, res, next) => {
      const key = `rate_limit:${this.config.keyGenerator(req)}`;
      const now = Date.now();
      const windowStart = now - this.config.windowMs;
      try {
        let rateLimitInfo = await cacheManager.get(key);
        if (!rateLimitInfo) {
          rateLimitInfo = {
            requests: [],
            resetTime: now + this.config.windowMs
          };
        }
        rateLimitInfo.requests = rateLimitInfo.requests.filter(
          (timestamp2) => timestamp2 > windowStart
        );
        if (rateLimitInfo.requests.length >= this.config.maxRequests) {
          const resetTime2 = Math.ceil(
            (rateLimitInfo.resetTime - now) / 1e3
          );
          res.status(429).set({
            "X-RateLimit-Limit": this.config.maxRequests.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": resetTime2.toString(),
            "Retry-After": resetTime2.toString()
          });
          return res.json({
            success: false,
            message: this.config.message,
            retryAfter: resetTime2
          });
        }
        rateLimitInfo.requests.push(now);
        await cacheManager.set(key, rateLimitInfo, this.config.windowMs);
        const remaining = this.config.maxRequests - rateLimitInfo.requests.length;
        const resetTime = Math.ceil(
          (rateLimitInfo.resetTime - now) / 1e3
        );
        res.set({
          "X-RateLimit-Limit": this.config.maxRequests.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": resetTime.toString()
        });
        const originalSend = res.send;
        const config = this.config;
        res.send = function(body) {
          const shouldSkip = res.statusCode < 400 && config.skipSuccessfulRequests || res.statusCode >= 400 && config.skipFailedRequests;
          if (shouldSkip) {
            rateLimitInfo.requests.pop();
            cacheManager.set(key, rateLimitInfo, config.windowMs);
          }
          return originalSend.call(this, body);
        };
        next();
      } catch (error) {
        console.error("Rate limiter error:", error);
        next();
      }
    };
  }
};
var rateLimiters = {
  // General API rate limiter
  general: new RateLimiter({
    windowMs: 15 * 60 * 1e3,
    // 15 minutes
    maxRequests: 100,
    message: "Too many requests from this IP, please try again later"
  }),
  // Contact form rate limiter
  contact: new RateLimiter({
    windowMs: 60 * 60 * 1e3,
    // 1 hour
    maxRequests: 5,
    message: "Too many contact form submissions, please try again in an hour",
    skipFailedRequests: true
  }),
  // Auth rate limiter (if needed)
  auth: new RateLimiter({
    windowMs: 15 * 60 * 1e3,
    // 15 minutes
    maxRequests: 10,
    message: "Too many authentication attempts, please try again later",
    skipSuccessfulRequests: true
  }),
  // Health check rate limiter
  health: new RateLimiter({
    windowMs: 60 * 1e3,
    // 1 minute
    maxRequests: 60,
    message: "Health check rate limit exceeded"
  })
};

// client/src/utils/sitemap.ts
var sitemapUrls = [
  {
    loc: "/",
    lastmod: (/* @__PURE__ */ new Date()).toISOString(),
    changefreq: "weekly",
    priority: 1,
    alternates: [
      { lang: "en", href: "/en" },
      { lang: "ar", href: "/ar" }
    ]
  },
  {
    loc: "/about",
    lastmod: (/* @__PURE__ */ new Date()).toISOString(),
    changefreq: "monthly",
    priority: 0.9,
    alternates: [
      { lang: "en", href: "/en/about" },
      { lang: "ar", href: "/ar/about" }
    ]
  },
  {
    loc: "/services",
    lastmod: (/* @__PURE__ */ new Date()).toISOString(),
    changefreq: "weekly",
    priority: 0.9,
    alternates: [
      { lang: "en", href: "/en/services" },
      { lang: "ar", href: "/ar/services" }
    ]
  },
  {
    loc: "/shoes-factory",
    lastmod: (/* @__PURE__ */ new Date()).toISOString(),
    changefreq: "monthly",
    priority: 0.8,
    alternates: [
      { lang: "en", href: "/en/shoes-factory" },
      { lang: "ar", href: "/ar/shoes-factory" }
    ]
  },
  {
    loc: "/agriculture",
    lastmod: (/* @__PURE__ */ new Date()).toISOString(),
    changefreq: "monthly",
    priority: 0.8,
    alternates: [
      { lang: "en", href: "/en/agriculture" },
      { lang: "ar", href: "/ar/agriculture" }
    ]
  },
  {
    loc: "/import-export",
    lastmod: (/* @__PURE__ */ new Date()).toISOString(),
    changefreq: "monthly",
    priority: 0.8,
    alternates: [
      { lang: "en", href: "/en/import-export" },
      { lang: "ar", href: "/ar/import-export" }
    ]
  },
  {
    loc: "/team",
    lastmod: (/* @__PURE__ */ new Date()).toISOString(),
    changefreq: "monthly",
    priority: 0.7,
    alternates: [
      { lang: "en", href: "/en/team" },
      { lang: "ar", href: "/ar/team" }
    ]
  },
  {
    loc: "/contact",
    lastmod: (/* @__PURE__ */ new Date()).toISOString(),
    changefreq: "monthly",
    priority: 0.8,
    alternates: [
      { lang: "en", href: "/en/contact" },
      { lang: "ar", href: "/ar/contact" }
    ]
  }
];
function generateSitemap(baseUrl) {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">';
  const urlsetClose = "</urlset>";
  const urls = sitemapUrls.map((url) => {
    const alternates = url.alternates?.map(
      (alt) => `<xhtml:link rel="alternate" hreflang="${alt.lang}" href="${baseUrl}${alt.href}"/>`
    ).join("\n    ") || "";
    return `
  <url>
    <loc>${baseUrl}${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
    ${alternates}
  </url>`;
  }).join("");
  return `${xmlHeader}
${urlsetOpen}${urls}
${urlsetClose}`;
}
function generateRobotsTxt(baseUrl) {
  return `User-agent: *
Allow: /

# Google
User-agent: Googlebot
Allow: /
Crawl-delay: 1

# Bing
User-agent: Bingbot
Allow: /
Crawl-delay: 1

# Yandex
User-agent: YandexBot
Allow: /
Crawl-delay: 1

# Baidu
User-agent: Baiduspider
Allow: /
Crawl-delay: 1

# Disallow admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /private/
Disallow: /*.json$

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Crawl rate optimization
Request-rate: 1/10s
Visit-time: 0400-0800`;
}

// server/routes/seo.ts
function serveSitemap(req, res) {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const sitemap = generateSitemap(baseUrl);
    res.setHeader("Content-Type", "application/xml");
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.send(sitemap);
  } catch (error) {
    console.error("Error generating sitemap:", error);
    res.status(500).send("Error generating sitemap");
  }
}
function serveRobotsTxt(req, res) {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const robotsTxt = generateRobotsTxt(baseUrl);
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.send(robotsTxt);
  } catch (error) {
    console.error("Error generating robots.txt:", error);
    res.status(500).send("Error generating robots.txt");
  }
}
function serveManifest(req, res) {
  const manifest = {
    name: "ELIZDEHAR Inc. - Manufacturing & Export Excellence",
    short_name: "ELIZDEHAR",
    description: "Leading Sudanese manufacturer and global exporter since 1990. Premium footwear, agriculture, and international trade.",
    start_url: "/",
    display: "standalone",
    background_color: "#111814",
    theme_color: "#6dbb45",
    orientation: "portrait-primary",
    categories: ["business", "manufacturing", "trade"],
    lang: "en",
    icons: [
      {
        src: "/icons/icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
        purpose: "maskable any"
      },
      {
        src: "/icons/icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
        purpose: "maskable any"
      },
      {
        src: "/icons/icon-128x128.png",
        sizes: "128x128",
        type: "image/png",
        purpose: "maskable any"
      },
      {
        src: "/icons/icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
        purpose: "maskable any"
      },
      {
        src: "/icons/icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
        purpose: "maskable any"
      },
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable any"
      },
      {
        src: "/icons/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
        purpose: "maskable any"
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable any"
      }
    ],
    screenshots: []
  };
  res.setHeader("Content-Type", "application/manifest+json");
  res.setHeader("Cache-Control", "public, max-age=86400");
  res.json(manifest);
}
function serveOpenSearch(req, res) {
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  const openSearch = `<?xml version="1.0" encoding="UTF-8"?>
<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">
  <ShortName>ELIZDEHAR Inc.</ShortName>
  <Description>Search ELIZDEHAR Inc. products and services</Description>
  <Tags>manufacturing footwear agriculture trade Sudan</Tags>
  <Contact>info@elizdehar.com</Contact>
  <Url type="text/html" template="${baseUrl}/search?q={searchTerms}"/>
  <Url type="application/x-suggestions+json" template="${baseUrl}/api/search/suggestions?q={searchTerms}"/>
  <Image height="64" width="64" type="image/png">${baseUrl}/icons/icon-64x64.png</Image>
  <Image height="16" width="16" type="image/vnd.microsoft.icon">${baseUrl}/favicon.ico</Image>
  <Developer>ELIZDEHAR Inc. Development Team</Developer>
  <Attribution>Copyright 2026 ELIZDEHAR Inc. All rights reserved.</Attribution>
  <SyndicationRight>open</SyndicationRight>
  <AdultContent>false</AdultContent>
  <Language>en-us</Language>
  <Language>ar-sd</Language>
  <OutputEncoding>UTF-8</OutputEncoding>
  <InputEncoding>UTF-8</InputEncoding>
</OpenSearchDescription>`;
  res.setHeader("Content-Type", "application/opensearchdescription+xml");
  res.setHeader("Cache-Control", "public, max-age=86400");
  res.send(openSearch);
}
function handleSearch(req, res) {
  const query = req.query.q;
  if (!query) {
    return res.redirect("/");
  }
  res.redirect(`/?search=${encodeURIComponent(query)}`);
}
function searchSuggestions(req, res) {
  const query = req.query.q;
  const suggestions = [
    "footwear manufacturing",
    "agriculture services",
    "import export",
    "plastic shoes",
    "sustainable farming",
    "international trade",
    "Tag Elsir Abd Elrahman",
    "Sudan manufacturing",
    "Khartoum exports"
  ].filter(
    (suggestion) => suggestion.toLowerCase().includes(query?.toLowerCase() || "")
  );
  res.json([query, suggestions.slice(0, 10)]);
}

// server/routes.ts
async function registerRoutes(app) {
  app.get("/api/health", rateLimiters.health.middleware(), (req, res) => {
    const metrics = process.memoryUsage();
    res.json({
      success: true,
      message: "ELIZDEHAR Inc. API is running",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      environment: process.env.NODE_ENV || "development",
      uptime: process.uptime(),
      memory: {
        rss: Math.round(metrics.rss / 1024 / 1024),
        heapUsed: Math.round(metrics.heapUsed / 1024 / 1024),
        heapTotal: Math.round(metrics.heapTotal / 1024 / 1024),
        external: Math.round(metrics.external / 1024 / 1024)
      },
      version: process.version
    });
  });
  app.post(
    "/api/contact",
    rateLimiters.contact.middleware(),
    validateRequest(contactValidationSchema),
    ContactController.createContactSubmission
  );
  app.get(
    "/api/contact-submissions",
    ContactController.getContactSubmissions
  );
  app.get("/sitemap.xml", serveSitemap);
  app.get("/robots.txt", serveRobotsTxt);
  app.get("/manifest.json", serveManifest);
  app.get("/opensearch.xml", serveOpenSearch);
  app.get("/search", handleSearch);
  app.get("/api/search/suggestions", searchSuggestions);
  app.use("/api/*", notFoundHandler);
  const httpServer = createServer(app);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app.use(express.static(distPath));
  app.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/middleware/requestLogger.ts
var requestLogger = (req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      const userAgent = req.get("User-Agent");
      if (userAgent) {
        logLine += ` | ${userAgent.substring(0, 50)}`;
      }
      if (capturedJsonResponse) {
        const summary = capturedJsonResponse.success ? "\u2713" : "\u2717";
        logLine += ` | ${summary} ${capturedJsonResponse.message}`;
      }
      if (logLine.length > 150) {
        logLine = logLine.slice(0, 149) + "\u2026";
      }
      console.log(logLine);
    }
  });
  next();
};

// server/middleware/compression.ts
import compression from "compression";
var compressionConfig = compression({
  // Only compress responses larger than 1kb
  threshold: 1024,
  // Compression level (1-9, 6 is default)
  level: 6,
  // Memory level (1-9, 8 is default)
  memLevel: 8,
  // Custom filter function
  filter: (req, res) => {
    if (req.headers["x-no-compression"]) {
      return false;
    }
    if (res.getHeader("content-encoding")) {
      return false;
    }
    const rawContentType = res.getHeader("content-type");
    const contentType = Array.isArray(rawContentType) ? rawContentType.join(";") : String(rawContentType || "");
    if (contentType.includes("text/event-stream")) {
      return false;
    }
    if (contentType) {
      const skipTypes = [
        "image/",
        "video/",
        "audio/",
        "application/pdf",
        "application/zip",
        "application/gzip"
      ];
      if (skipTypes.some((type) => contentType.startsWith(type))) {
        return false;
      }
    }
    return compression.filter(req, res);
  },
  // Custom compression strategy
  strategy: 0,
  // Z_DEFAULT_STRATEGY equivalent
  // Window bits (9-15, 15 is default)
  windowBits: 15,
  // Chunk size in bytes
  chunkSize: 16 * 1024
  // 16kb
});
function adaptiveCompression() {
  return (req, res, next) => {
    const acceptEncoding = req.headers["accept-encoding"] || "";
    const supportsBrotli = acceptEncoding.includes("br");
    const supportsGzip = acceptEncoding.includes("gzip");
    const supportsDeflate = acceptEncoding.includes("deflate");
    if (supportsBrotli) {
      req.headers["x-preferred-compression"] = "br";
    } else if (supportsGzip) {
      req.headers["x-preferred-compression"] = "gzip";
    } else if (supportsDeflate) {
      req.headers["x-preferred-compression"] = "deflate";
    }
    const startTime = Date.now();
    const originalSend = res.send;
    res.send = function(body) {
      const compressionTime = Date.now() - startTime;
      res.setHeader("X-Compression-Time", compressionTime.toString());
      if (res.getHeader("content-encoding")) {
        const originalSize = Buffer.byteLength(Buffer.isBuffer(body) ? body : String(body));
        const compressedSize = parseInt(res.getHeader("content-length")) || originalSize;
        const ratio = ((originalSize - compressedSize) / originalSize * 100).toFixed(2);
        console.log(`Compression: ${originalSize} \u2192 ${compressedSize} bytes (${ratio}% reduction) in ${compressionTime}ms`);
      }
      return originalSend.call(this, body);
    };
    next();
  };
}
function responseSizeMonitor() {
  return (req, res, next) => {
    const originalSend = res.send;
    res.send = function(body) {
      const size = Buffer.byteLength(Buffer.isBuffer(body) ? body : String(body));
      if (size > 1024 * 1024) {
        console.warn(`Large response detected: ${req.method} ${req.path} - ${(size / 1024 / 1024).toFixed(2)}MB`);
      }
      res.setHeader("X-Response-Size", size.toString());
      return originalSend.call(this, body);
    };
    next();
  };
}

// server/index.ts
function createApp() {
  const app = express2();
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"]
      }
    },
    crossOriginEmbedderPolicy: false
  }));
  app.use(cors({
    origin: process.env.NODE_ENV === "production" ? ["https://elizdehar.replit.app", "https://elizdehar.com"] : true,
    credentials: true
  }));
  app.use(adaptiveCompression());
  app.use(compressionConfig);
  app.use(responseSizeMonitor());
  app.use("/api/", rateLimiters.general.middleware());
  app.use(express2.json({ limit: "10mb" }));
  app.use(express2.urlencoded({ extended: true, limit: "10mb" }));
  app.use(requestLogger);
  return app;
}
async function startServer() {
  try {
    const app = createApp();
    const server = await registerRoutes(app);
    app.use(errorHandler);
    if (process.env.NODE_ENV === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }
    const port = parseInt(process.env.PORT || "5000", 10);
    const host = "0.0.0.0";
    server.listen(port, host, () => {
      log(`\u{1F680} ELIZDEHAR Inc. server running on http://${host}:${port}`);
      log(`\u{1F4DA} Environment: ${process.env.NODE_ENV || "development"}`);
      log(`\u{1F4BE} Database: Connected to PostgreSQL`);
    });
    process.on("SIGTERM", () => {
      log("SIGTERM received. Shutting down gracefully...");
      server.close(() => {
        log("Server closed.");
        process.exit(0);
      });
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}
startServer();
