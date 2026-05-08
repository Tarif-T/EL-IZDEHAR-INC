import { Request, Response, NextFunction } from "express";

/**
 * Enhanced request logging middleware
 */
export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  // Capture JSON responses for API routes
  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    
    // Only log API routes
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      
      // Add user agent for debugging
      const userAgent = req.get("User-Agent");
      if (userAgent) {
        logLine += ` | ${userAgent.substring(0, 50)}`;
      }
      
      // Add response summary
      if (capturedJsonResponse) {
        const summary = capturedJsonResponse.success ? "✓" : "✗";
        logLine += ` | ${summary} ${capturedJsonResponse.message}`;
      }

      // Truncate long log lines
      if (logLine.length > 150) {
        logLine = logLine.slice(0, 149) + "…";
      }

      console.log(logLine);
    }
  });

  next();
};