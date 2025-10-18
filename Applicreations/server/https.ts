import { Express } from 'express';
import { createServer as createHttpServer } from 'http';
import { createServer as createHttpsServer } from 'https';
import fs from 'fs';
import path from 'path';

interface HttpsOptions {
  enabled: boolean;
  certPath?: string;
  keyPath?: string;
}

/**
 * Creates either an HTTP or HTTPS server based on configuration.
 * If HTTPS is enabled but certificates are not found, falls back to HTTP with a warning.
 */
export function createSecureServer(app: Express, options: HttpsOptions = { enabled: false }) {
  // Default to HTTP server
  if (!options.enabled) {
    console.log('Starting HTTP server (not secure)');
    return createHttpServer(app);
  }

  // Check for SSL certificate files
  try {
    if (!options.certPath || !options.keyPath) {
      throw new Error('SSL certificate or key path not provided');
    }
    
    const cert = fs.readFileSync(options.certPath);
    const key = fs.readFileSync(options.keyPath);
    
    console.log('Starting HTTPS server (secure)');
    return createHttpsServer({ key, cert }, app);
  } catch (error) {
    console.warn('Failed to load SSL certificates, falling back to HTTP (not secure):', error);
    return createHttpServer(app);
  }
}