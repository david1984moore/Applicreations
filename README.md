# Applicreations Web Platform

A professional web platform for Applicreations demonstrating advanced web development techniques with an emphasis on interactive, responsive design and engaging user experiences.

## Technologies Used

- React with Vite
- TypeScript
- Tailwind CSS for styling
- Radix UI for accessible components
- Express.js for backend
- PostgreSQL with Drizzle ORM for database
- React Query for data fetching

## Features

- Responsive mobile-first design
- Advanced gradient and transition effects
- Dynamic SVG and animation implementations
- Comprehensive, interactive pricing component

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database

### Installation

1. Clone the repository
   ```
   git clone https://github.com/YOUR_USERNAME/applicreations-web-platform.git
   cd applicreations-web-platform
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory with the following:
   ```
   DATABASE_URL=postgres://username:password@localhost:5432/dbname
   ```

4. Initialize the database
   ```
   npm run db:push
   npm run db:seed
   ```

5. Start the development server
   ```
   npm run dev
   ```

## Project Structure

- `/client` - Frontend React application
- `/server` - Backend Express API
- `/shared` - Shared code between frontend and backend
- `/db` - Database configuration and seed data

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:push` - Update database schema
- `npm run db:seed` - Seed the database with initial data