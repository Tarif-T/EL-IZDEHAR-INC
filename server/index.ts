import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { requestLogger } from "./middleware/requestLogger";
import { errorHandler } from "./middleware/errorHandler";
import { compressionConfig, adaptiveCompression, responseSizeMonitor } from "./middleware/compression";
import { rateLimiters } from "./middleware/rateLimiter";

function getAllowedOrigins(): string[] | true {
  if (process.env.NODE_ENV !== "production") {
    return true;
  }

  const configuredOrigins = process.env.CORS_ORIGINS;
  if (configuredOrigins) {
    return configuredOrigins
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean);
  }

  const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null;
  return [
    process.env.FRONTEND_URL,
    vercelUrl,
    "https://elizdehar.com",
  ].filter((origin): origin is string => Boolean(origin));
}

/**
 * Initialize and configure the Express application
 */
function createApp(): express.Express {
  const app = express();

  // Security middleware
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      },
    },
    crossOriginEmbedderPolicy: false,
  }));

  // CORS configuration
  app.use(cors({
    origin: getAllowedOrigins(),
    credentials: true,
  }));

  // Advanced compression with monitoring
  app.use(adaptiveCompression());
  app.use(compressionConfig);
  app.use(responseSizeMonitor());

  // Rate limiting
  app.use("/api/", rateLimiters.general.middleware());

  // Body parsing middleware
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // Request logging
  app.use(requestLogger);

  return app;
}

/**
 * Start the server
 */
async function startServer(): Promise<void> {
  try {
    const app = createApp();
    const server = await registerRoutes(app);

    // Global error handler (must be last)
    app.use(errorHandler);

    // Setup Vite in development or serve static files in production
    if (process.env.NODE_ENV === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }

    // Start server
    const port = Number.parseInt(process.env.PORT || "5000", 10);
    const host = "0.0.0.0";

    server.listen(port, host, () => {
      log(`🚀 ELIZDEHAR Inc. server running on http://${host}:${port}`);
      log(`📚 Environment: ${process.env.NODE_ENV || "development"}`);
      log(`💾 Database: Connected to PostgreSQL`);
    });

    // Graceful shutdown handling
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

// Start the application
await startServer();
