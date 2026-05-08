# ELIZDEHAR Inc. - Corporate Website

## Overview

ELIZDEHAR Inc. is a multi-division corporate website showcasing 30+ years of business excellence across three main industries: footwear manufacturing, agriculture, and import/export services. The application is built as a modern React-based single-page application with a Node.js/Express backend, featuring a comprehensive contact management system and professional corporate presentation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: Shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Form Handling**: React Hook Form with Zod validation for type-safe form processing
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Database ORM**: Drizzle ORM for type-safe database operations
- **API Design**: RESTful API endpoints for contact form submissions and data retrieval
- **Middleware**: Custom request logging and error handling middleware
- **Development**: Hot module replacement and development server integration

### Database Design
- **Schema**: PostgreSQL database with two main tables:
  - `users`: Basic user management with UUID primary keys
  - `contact_submissions`: Contact form data with timestamps
- **ORM Integration**: Drizzle with Zod schema validation for runtime type checking
- **Migration Support**: Database schema versioning through Drizzle Kit

### UI/UX Design System
- **Design Language**: "New York" style from Shadcn/ui with neutral color palette
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts
- **Component Library**: Comprehensive set of reusable UI components (buttons, forms, modals, etc.)
- **Theme System**: CSS custom properties for consistent color and spacing
- **Animation**: Smooth transitions and micro-interactions for enhanced user experience

### Development Tools
- **TypeScript Configuration**: Strict mode with modern ES modules
- **Path Aliases**: Organized imports with @ prefix for clean code structure
- **Code Quality**: ESLint and Prettier integration (implied by project structure)
- **Build Process**: Separate client and server builds with optimized production outputs

## External Dependencies

### Database Services
- **PostgreSQL**: Primary database using Neon Database serverless architecture
- **Connection**: Environment-based database URL configuration

### UI Component Libraries
- **Radix UI**: Headless UI primitives for accessibility and behavior
- **Lucide React**: SVG icon library for consistent iconography
- **React Hook Form**: Form state management and validation
- **TanStack Query**: Server state management and caching

### Development Dependencies
- **Vite**: Build tool and development server
- **TypeScript**: Static type checking and enhanced developer experience
- **Tailwind CSS**: Utility-first CSS framework with PostCSS processing
- **Date-fns**: Date manipulation and formatting utilities

### Hosting Integration
- **Replit**: Development environment with specific plugins and configurations
- **Environment Variables**: Database connections and configuration management
- **Static Assets**: Image hosting through Unsplash for professional photography

### Form Processing
- **Zod**: Runtime schema validation for form inputs and API data
- **Toast Notifications**: User feedback system for form submissions and interactions
- **File Upload**: Support for contact form attachments and media uploads

### Performance Optimization Layer
- **Advanced Caching**: Multi-tier caching with memory, localStorage, and sessionStorage strategies
- **Lazy Loading**: Intersection Observer-based lazy loading for images and components
- **Bundle Optimization**: Code splitting, tree shaking, and dynamic imports
- **Rate Limiting**: Tiered rate limiting with sliding window algorithm
- **Compression**: Adaptive compression with brotli/gzip support and size monitoring
- **Virtual Scrolling**: Virtualized lists for large datasets
- **Error Boundaries**: Comprehensive error handling with graceful fallbacks
- **Performance Monitoring**: Real-time performance metrics and bottleneck detection

### Multilingual Support
- **i18n System**: Complete Arabic and English translation system with context provider
- **RTL Support**: Right-to-left text direction for Arabic with proper layout adjustments
- **Font Integration**: Arabic (Noto Sans Arabic) and English (Inter) font loading
- **Language Detection**: Automatic browser language detection with local storage persistence
- **SEO Optimization**: Keyword-rich, location-specific hero descriptions for better search visibility

### Production Deployment Infrastructure
- **Docker Configuration**: Multi-stage Docker build with security-optimized production image
- **Nginx Reverse Proxy**: High-performance reverse proxy with SSL/TLS, compression, and security headers
- **Environment Management**: Comprehensive environment variable configuration for all deployment scenarios
- **Health Monitoring**: Application health checks, Core Web Vitals tracking, and performance monitoring
- **Security Implementation**: Rate limiting, input validation, security headers, and HTTPS enforcement
- **SEO Automation**: Automated sitemap generation, robots.txt serving, and structured data implementation
- **Deployment Scripts**: Automated deployment pipeline with testing, building, and production deployment
- **Database Integration**: PostgreSQL production configuration with connection pooling and optimization