/**
 * Advanced compression middleware
 */
import { Request, Response, NextFunction } from "express";
import compression from "compression";

/**
 * Custom compression configuration
 */
export const compressionConfig = compression({
  // Only compress responses larger than 1kb
  threshold: 1024,
  
  // Compression level (1-9, 6 is default)
  level: 6,
  
  // Memory level (1-9, 8 is default)
  memLevel: 8,
  
  // Custom filter function
  filter: (req: Request, res: Response) => {
    // Don't compress responses with this request header
    if (req.headers["x-no-compression"]) {
      return false;
    }

    // Don't compress if response is already compressed
    if (res.getHeader("content-encoding")) {
      return false;
    }

    const rawContentType = res.getHeader("content-type");
    const contentType = Array.isArray(rawContentType) ? rawContentType.join(";") : String(rawContentType || "");

    // Don't compress server-sent events
    if (contentType.includes("text/event-stream")) {
      return false;
    }

    // Don't compress images and videos (already compressed)
    if (contentType) {
      const skipTypes = [
        "image/",
        "video/",
        "audio/",
        "application/pdf",
        "application/zip",
        "application/gzip",
      ];
      
      if (skipTypes.some(type => contentType.startsWith(type))) {
        return false;
      }
    }

    // Use compression filter by default
    return compression.filter(req, res);
  },

  // Custom compression strategy
  strategy: 0, // Z_DEFAULT_STRATEGY equivalent
  
  // Window bits (9-15, 15 is default)
  windowBits: 15,
  
  // Chunk size in bytes
  chunkSize: 16 * 1024, // 16kb
});

/**
 * Adaptive compression based on client capabilities
 */
export function adaptiveCompression() {
  return (req: Request, res: Response, next: NextFunction) => {
    const acceptEncoding = req.headers["accept-encoding"] || "";
    
    // Check for modern compression support
    const supportsBrotli = acceptEncoding.includes("br");
    const supportsGzip = acceptEncoding.includes("gzip");
    const supportsDeflate = acceptEncoding.includes("deflate");

    // Set compression preference
    if (supportsBrotli) {
      req.headers["x-preferred-compression"] = "br";
    } else if (supportsGzip) {
      req.headers["x-preferred-compression"] = "gzip";
    } else if (supportsDeflate) {
      req.headers["x-preferred-compression"] = "deflate";
    }

    // Add compression timing
    const startTime = Date.now();
    const originalSend = res.send;
    
    res.send = function(body) {
      const compressionTime = Date.now() - startTime;
      res.setHeader("X-Compression-Time", compressionTime.toString());
      
      // Log compression statistics
      if (res.getHeader("content-encoding")) {
        const originalSize = Buffer.byteLength(Buffer.isBuffer(body) ? body : String(body));
        const compressedSize = parseInt(res.getHeader("content-length") as string) || originalSize;
        const ratio = ((originalSize - compressedSize) / originalSize * 100).toFixed(2);
        
        console.log(`Compression: ${originalSize} → ${compressedSize} bytes (${ratio}% reduction) in ${compressionTime}ms`);
      }
      
      return originalSend.call(this, body);
    };

    next();
  };
}

/**
 * Response size monitoring
 */
export function responseSizeMonitor() {
  return (req: Request, res: Response, next: NextFunction) => {
    const originalSend = res.send;
    
    res.send = function(body) {
      const size = Buffer.byteLength(Buffer.isBuffer(body) ? body : String(body));
      
      // Log large responses
      if (size > 1024 * 1024) { // 1MB
        console.warn(`Large response detected: ${req.method} ${req.path} - ${(size / 1024 / 1024).toFixed(2)}MB`);
      }
      
      // Add response size header
      res.setHeader("X-Response-Size", size.toString());
      
      return originalSend.call(this, body);
    };

    next();
  };
}
