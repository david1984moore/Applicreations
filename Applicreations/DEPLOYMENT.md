# Deployment Guide

## Files to Include on GitHub

Your project contains the following important directories and files:

### Core Application Files
- `client/` - Frontend React application
- `server/` - Backend Express API
- `shared/` - Shared code between frontend and backend
- `db/` - Database configuration and seed files
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `vite.config.ts` - Vite configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `drizzle.config.ts` - Database ORM configuration

### Configuration Files
- `README.md` - Project documentation
- `LICENSE` - MIT license
- `CONTRIBUTING.md` - Contribution guidelines
- `.gitignore` - Files to exclude from Git
- `.env.example` - Environment variable template
- `.github/workflows/ci.yml` - GitHub Actions CI/CD

### Files to Exclude (already in .gitignore)
- `node_modules/` - Dependencies (will be installed via npm)
- `.env` - Environment variables (contains sensitive data)
- `dist/` - Build output
- `attached_assets/` - Development assets
- `.replit` - Replit-specific configuration

## Steps to Push to GitHub

1. Download this project as a ZIP file from Replit
2. Extract the ZIP file on your computer
3. Create a new repository on GitHub.com
4. Use Git commands or GitHub Desktop to push the code

## Environment Setup for Production

After deploying, make sure to set these environment variables:
- `DATABASE_URL` - PostgreSQL connection string
- `SESSION_SECRET` - Random string for session security
- `NODE_ENV=production`
- Email configuration if using contact forms