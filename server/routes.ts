import type { Express } from "express";
import { createServer, type Server } from "http";
import { ContactController } from "./controllers/contactController";
import { validateRequest, contactValidationSchema } from "./middleware/validation";
import { notFoundHandler } from "./middleware/errorHandler";
import { rateLimiters } from "./middleware/rateLimiter";
import { serveSitemap, serveRobotsTxt, serveManifest, serveOpenSearch, handleSearch, searchSuggestions } from "./routes/seo";

/**
 * Register all API routes
 */
export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint with rate limiting
  app.get("/api/health", rateLimiters.health.middleware(), (req, res) => {
    const metrics = process.memoryUsage();
    res.json({
      success: true,
      message: "ELIZDEHAR Inc. API is running",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
      uptime: process.uptime(),
      memory: {
        rss: Math.round(metrics.rss / 1024 / 1024),
        heapUsed: Math.round(metrics.heapUsed / 1024 / 1024),
        heapTotal: Math.round(metrics.heapTotal / 1024 / 1024),
        external: Math.round(metrics.external / 1024 / 1024),
      },
      version: process.version,
    });
  });

  // Contact routes with specific rate limiting
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

  // SEO routes
  app.get("/sitemap.xml", serveSitemap);
  app.get("/robots.txt", serveRobotsTxt);
  app.get("/manifest.json", serveManifest);
  app.get("/opensearch.xml", serveOpenSearch);
  app.get("/search", handleSearch);
  app.get("/api/search/suggestions", searchSuggestions);

  // 404 handler for API routes
  app.use("/api/*", notFoundHandler);

  const httpServer = createServer(app);
  return httpServer;
}
