import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { requestLogger } from "./middleware/requestLogger";
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
 * Initialize and configure the Express application.
 */
export function createApp(): express.Express {
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
