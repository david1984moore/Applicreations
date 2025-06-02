#!/bin/bash

# Script to push Applicreations project to GitHub
# Run this script from your project root directory

echo "Setting up Git repository..."

# Initialize git repository if not already done
if [ ! -d ".git" ]; then
    git init
    echo "Git repository initialized."
fi

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Applicreations web platform

- React frontend with TypeScript
- Express backend with PostgreSQL
- Responsive design with Tailwind CSS
- Interactive pricing components
- Email integration
- Session management"

echo "Files committed to local Git repository."
echo ""
echo "Next steps:"
echo "1. Create a new repository on GitHub.com"
echo "2. Copy the repository URL (e.g., https://github.com/yourusername/applicreations-web-platform.git)"
echo "3. Run: git remote add origin YOUR_GITHUB_REPO_URL"
echo "4. Run: git branch -M main"
echo "5. Run: git push -u origin main"
echo ""
echo "Your project will then be available on GitHub!"