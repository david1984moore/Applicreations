#!/bin/bash

# Fix deployment directory structure for Replit static deployment
echo "🔧 Fixing deployment directory structure..."

# Ensure dist directory exists
mkdir -p dist

# Copy all files from dist/public to dist root (where static deployment expects them)
if [ -d "dist/public" ]; then
  echo "📁 Copying files from dist/public to dist root..."
  cp -r dist/public/* dist/
  echo "✅ Files copied successfully"
else
  echo "❌ dist/public directory not found. Please run 'npm run build' first."
  exit 1
fi

# Create _redirects file for SPA routing support
echo "🔀 Creating SPA routing configuration..."
echo "/*    /index.html   200" > dist/_redirects
echo "✅ SPA routing configuration created"

# Verify the setup
echo "🔍 Verifying deployment setup..."
if [ -f "dist/index.html" ]; then
  echo "✅ index.html found in dist directory"
else
  echo "❌ index.html not found in dist directory"
fi

if [ -f "dist/_redirects" ]; then
  echo "✅ _redirects file created for SPA routing"
else
  echo "❌ _redirects file not found"
fi

echo "🎉 Deployment fix completed!"
echo "ℹ️  Your static deployment should now work correctly with SPA routing."