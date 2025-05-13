import { Request, Response, NextFunction } from 'express';

/**
 * Middleware that redirects HTTP requests to HTTPS
 */
export function httpsRedirectMiddleware(req: Request, res: Response, next: NextFunction) {
  // Skip for non-production environments or if already HTTPS
  if (process.env.NODE_ENV !== 'production' || req.secure || req.headers['x-forwarded-proto'] === 'https') {
    return next();
  }
  
  // Redirect to HTTPS
  const httpsUrl = `https://${req.headers.host}${req.originalUrl}`;
  return res.redirect(301, httpsUrl);
}

/**
 * Middleware that adds important security headers to HTTP responses
 */
export function securityMiddleware(req: Request, res: Response, next: NextFunction) {
  // X-Content-Type-Options prevents MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // X-Frame-Options protects against clickjacking
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  
  // X-XSS-Protection enables the cross-site scripting filter in some browsers
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Referrer-Policy restricts the amount of information sent in the Referer header
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Content-Security-Policy helps prevent XSS and other code injection attacks
  res.setHeader('Content-Security-Policy', 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " + 
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https:; " +
    "font-src 'self'; " +
    "connect-src 'self';"
  );
  
  // If site is served over HTTPS, add Strict-Transport-Security header
  if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
    // HSTS instructs browsers to only use HTTPS for future requests
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  
  next();
}