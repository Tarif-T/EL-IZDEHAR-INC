const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const compression = require("compression");

/**
 * ELIZDEHAR Inc. - Corporate Website Server
 * Main server entry point with Express.js
 */

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

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
  origin: NODE_ENV === "production" 
    ? ["https://elizdehar.replit.app", "https://elizdehar.com"]
    : true,
  credentials: true,
}));

// Compression middleware
app.use(compression());

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp} - ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    message: 'ELIZDEHAR Inc. server is running'
  });
});

// API Routes
app.get('/api/status', (req, res) => {
  res.json({
    status: 'success',
    message: 'ELIZDEHAR Inc. API is operational',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Contact form endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, phone, message, service } = req.body;
  
  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({
      error: 'Missing required fields: name, email, and message are required'
    });
  }

  // Log the contact submission
  console.log('Contact form submission:', {
    name,
    email,
    phone,
    service,
    timestamp: new Date().toISOString()
  });

  // Send success response
  res.json({
    status: 'success',
    message: 'Thank you for your message. We will contact you soon!',
    timestamp: new Date().toISOString()
  });
});

// Serve static files in production
if (NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "dist")));
  
  // Serve React app for all non-API routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
} else {
  // Development message
  app.get("/", (req, res) => {
    res.json({
      message: "ELIZDEHAR Inc. Development Server",
      status: "running",
      environment: "development",
      note: "Frontend is served by Vite on a different port in development"
    });
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    error: 'API endpoint not found',
    path: req.path
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 ELIZDEHAR Inc. server running on http://0.0.0.0:${PORT}`);
  console.log(`📚 Environment: ${NODE_ENV}`);
  console.log(`⏰ Started at: ${new Date().toISOString()}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});