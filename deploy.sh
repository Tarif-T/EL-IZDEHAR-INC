#!/bin/bash

# ELIZDEHAR Inc. Deployment Script
# Production deployment automation

set -e  # Exit on any error

echo "🚀 Starting ELIZDEHAR Inc. deployment..."

# Environment check
if [ "$NODE_ENV" != "production" ]; then
    echo "⚠️  Warning: NODE_ENV is not set to production"
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Check required environment variables
required_vars=("DATABASE_URL" "SESSION_SECRET")
for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        echo "❌ Required environment variable $var is not set"
        exit 1
    fi
done

echo "✅ Environment variables validated"

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --only=production

# Build application
echo "🔨 Building application..."
npm run build

# Database migration (if using a migration system)
echo "🗄️  Running database migrations..."
# npm run migrate

# Run tests
echo "🧪 Running tests..."
npm test -- --passWithNoTests

# Security audit
echo "🔒 Running security audit..."
npm audit --audit-level moderate

# Build Docker image
echo "🐳 Building Docker image..."
docker build -t elizdehar-inc:latest .

# Tag image with version
VERSION=$(date +%Y%m%d-%H%M%S)
docker tag elizdehar-inc:latest elizdehar-inc:$VERSION

echo "✅ Build completed successfully!"
echo "📋 Deployment Summary:"
echo "   - Image: elizdehar-inc:$VERSION"
echo "   - Environment: $NODE_ENV"
echo "   - Build time: $(date)"

# Optional: Push to registry
if [ "$1" = "--push" ]; then
    echo "📤 Pushing to registry..."
    # docker push elizdehar-inc:latest
    # docker push elizdehar-inc:$VERSION
fi

# Optional: Deploy to production
if [ "$1" = "--deploy" ]; then
    echo "🚀 Deploying to production..."
    docker-compose down
    docker-compose up -d
    
    # Health check
    echo "🏥 Performing health check..."
    sleep 10
    if curl -f http://localhost:5000/api/health > /dev/null 2>&1; then
        echo "✅ Deployment successful! Application is healthy."
    else
        echo "❌ Health check failed!"
        exit 1
    fi
fi

echo "🎉 Deployment completed successfully!"