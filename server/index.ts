import { createApp } from "./app";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { errorHandler } from "./middleware/errorHandler";

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
