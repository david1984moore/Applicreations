# Applicreations Web Platform

## Overview

Applicreations is a professional web platform for a web and app development service based in Wilmington, Delaware. The platform showcases the company's digital solutions through a modern, responsive design with advanced animations and interactive components. The application includes a comprehensive customer bill payment system that enables clients to pay bills online using credit/debit cards or ACH bank transfers. The system features secure admin access for bill management and automatic email notifications with professional branding.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**React + Vite + TypeScript Stack**: The client-side application is built with React and TypeScript, using Vite as the build tool for fast development and optimized production builds. The application follows a component-based architecture with separate components for different sections (Hero, Navbar, Contact, etc.).

**Styling and UI Framework**: The application uses Tailwind CSS for styling with shadcn/ui components for consistent, accessible UI elements. Radix UI provides the foundation for complex components like dialogs, dropdowns, and form elements. The design system supports both light and dark themes through CSS custom properties.

**State Management**: The application uses React hooks (useState, useEffect) for local state management. React Query (@tanstack/react-query) handles data fetching and caching for API calls.

**Responsive Design**: The application implements a mobile-first responsive design with careful consideration for iOS-specific features like safe area insets and pull-to-refresh functionality. The navigation bar adapts between mobile and desktop layouts using CSS media queries.

### Backend Architecture

**Express.js Server**: The server-side application is built with Express.js and TypeScript, providing a RESTful API for client communications. The server implements security middleware for HTTPS redirects and security headers.

**Database Layer**: Uses Drizzle ORM with PostgreSQL for data persistence. The database schema includes tables for contacts, users, bills, and payments with proper TypeScript type definitions generated from the schema.

**Bill Payment System**: Comprehensive customer billing system integrated with Stripe for payment processing. Customers can pay bills using their account number without requiring login. The system supports credit/debit cards and ACH bank transfers (with lower processing fees). Bills are managed through an admin panel with Replit Auth authentication.

**Email Integration**: Automated email notification system using Nodemailer with Hostinger SMTP configuration. When bills are created in the admin panel, customers automatically receive professionally branded email notifications with:
- Embedded Applicreations logo
- Bill details (account number, amount, description, due date)
- Direct payment link with pre-filled account number
- Clear call-to-action button
- Mobile-responsive HTML design
Contact form submissions also send notifications to the business owner.

**Security Implementation**: Comprehensive security measures including HTTPS support, security headers (CSP, HSTS, X-Frame-Options), and CORS configuration. The application supports SSL certificate management for production deployments.

### Data Storage Solutions

**PostgreSQL Database**: Primary data storage using PostgreSQL with Drizzle ORM for type-safe database operations. The database stores contact form submissions and user data.

**Database Configuration**: Uses Neon's serverless PostgreSQL with connection pooling for scalable database access. Database migrations are managed through Drizzle Kit.

### Authentication and Authorization

**Basic Authentication Schema**: Includes user table structure with username/password authentication, though the current implementation focuses primarily on the public-facing website rather than user management.

**Form Validation**: Implements both client-side and server-side validation using Zod schemas for contact forms and other user inputs.

## External Dependencies

### Development and Build Tools
- **Vite**: Frontend build tool and development server
- **TypeScript**: Type system for JavaScript
- **ESBuild**: Fast JavaScript bundler for server-side code

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component library
- **shadcn/ui**: Pre-built component system
- **Lucide React**: Icon library
- **PostCSS**: CSS processing with autoprefixer

### Database and ORM
- **@neondatabase/serverless**: Neon PostgreSQL serverless driver
- **Drizzle ORM**: Type-safe SQL ORM
- **WebSocket (ws)**: For database connections

### Payment Processing
- **Stripe**: Payment processing platform for credit/debit cards and ACH bank transfers
- **@stripe/stripe-js**: Stripe.js JavaScript library for frontend
- **@stripe/react-stripe-js**: React components for Stripe Elements

### Email Service
- **Nodemailer**: Email sending library
- **Hostinger SMTP**: Email service provider integration
- **Professional Email Templates**: Branded HTML emails with embedded logo for bill notifications

### Development Environment
- **Replit**: Cloud development environment with live deployment
- **Replit-specific plugins**: Cartographer for development tooling and runtime error handling

### Fonts and Assets
- **Google Fonts (Inter)**: Typography system
- **Custom SVG assets**: Logo and graphic elements

The application is configured for deployment on Replit with automatic SSL certificate management and includes comprehensive documentation for security setup, deployment procedures, and contribution guidelines.