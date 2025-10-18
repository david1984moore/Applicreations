#!/bin/bash

echo "🚀 Pushing code to GitHub..."
echo ""

# Add any new or modified files
echo "📦 Staging changes..."
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
  echo "✓ No new changes to commit"
else
  echo "💾 Committing changes..."
  git commit -m "Update codebase - $(date '+%Y-%m-%d %H:%M:%S')"
fi

# Push to GitHub
echo "⬆️  Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Done! Your code has been pushed to:"
echo "   https://github.com/david1984moore/Applicreations"
