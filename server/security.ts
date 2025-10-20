import { Request, Response, NextFunction } from 'express';

/**
 * Middleware that redirects HTTP requests to HTTPS
 */
export function httpsRedirectMiddleware(req: Request, res: Response, next: NextFunction) {
  // Skip HTTPS redirects in development or if already secure
  // Render handles HTTPS at the load balancer level
  if (process.env.NODE_ENV !== 'production' || req.secure || req.headers['x-forwarded-proto'] === 'https') {
    return next();
  }
  
  // Redirect to HTTPS in production
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
  // Includes support for production domains: applicreations.com and *.onrender.com
  const host = req.get('host') || '';
  const isProduction = process.env.NODE_ENV === 'production';
  
  // Build CSP based on environment
  let csp = "default-src 'self'";
  
  // Add production domains to default-src if in production
  if (isProduction) {
    csp += " https://applicreations.com https://*.applicreations.com https://*.onrender.com";
  }
  
  csp += "; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://m.stripe.network" +
    (isProduction ? " https://applicreations.com https://*.applicreations.com https://*.onrender.com" : "") + "; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://js.stripe.com" +
    (isProduction ? " https://applicreations.com https://*.applicreations.com https://*.onrender.com" : "") + "; " +
    "img-src 'self' data: https:; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "connect-src 'self' https://api.stripe.com https://uploads.stripe.com" +
    (isProduction ? " https://applicreations.com https://*.applicreations.com https://*.onrender.com" : "") + "; " +
    "frame-src 'self' https://js.stripe.com https://hooks.stripe.com; " +
    "child-src 'self' https://js.stripe.com;";
  
  res.setHeader('Content-Security-Policy', csp);
  
  // If site is served over HTTPS, add Strict-Transport-Security header
  if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
    // HSTS instructs browsers to only use HTTPS for future requests
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  
  next();
}