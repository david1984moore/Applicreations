import 'dotenv/config';
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { securityMiddleware, httpsRedirectMiddleware } from "./security";

// Log environment variables for debugging SSL setup and deployment mode
console.log('SSL Configuration:', {
  useHTTPS: process.env.USE_HTTPS,
  certPath: process.env.SSL_CERT_PATH,
  keyPath: process.env.SSL_KEY_PATH
});

console.log('Environment Configuration:', {
  nodeEnv: process.env.NODE_ENV
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// First apply HTTPS redirect in production environments
app.use(httpsRedirectMiddleware);

// Then apply security headers to all responses
app.use(securityMiddleware);

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // Import http module for plain HTTP server
  const http = require('http');
  
  // Register routes on the Express app
  await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  const isProduction = process.env.NODE_ENV === 'production';
  
  // Create HTTP server (Render handles HTTPS at load balancer level)
  const server = http.createServer(app);
  
  if (!isProduction) {
    console.log('Starting in development mode with Vite');
    await setupVite(app, server);
  } else {
    console.log('Starting in production mode - serving static files');
    serveStatic(app);
  }

  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;
  server.listen(port, "0.0.0.0", () => {
    log(`serving on port ${port}`);
  });
})();