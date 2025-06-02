# Security Setup Guide for Applicreations.com

This guide explains how to properly secure your web application by enabling HTTPS and implementing secure headers.

## Setting Up HTTPS

### Option 1: Using Let's Encrypt (Recommended for Production)

[Let's Encrypt](https://letsencrypt.org/) provides free SSL certificates that are trusted by all major browsers.

1. Install Certbot on your server:
   ```bash
   sudo apt-get update
   sudo apt-get install certbot
   ```

2. Obtain a certificate for your domain:
   ```bash
   sudo certbot certonly --standalone -d applicreations.com -d www.applicreations.com
   ```

3. Set the following environment variables to enable HTTPS:
   ```
   USE_HTTPS=true
   SSL_CERT_PATH=/etc/letsencrypt/live/applicreations.com/fullchain.pem
   SSL_KEY_PATH=/etc/letsencrypt/live/applicreations.com/privkey.pem
   NODE_ENV=production
   ```

4. Set up automatic renewal with a cron job:
   ```bash
   sudo crontab -e
   ```
   
   Add the following line:
   ```
   0 3 * * * certbot renew --quiet
   ```

### Option 2: Using Cloudflare (Easiest Option)

1. Sign up for a [Cloudflare](https://www.cloudflare.com/) account
2. Add your domain to Cloudflare
3. Update your domain's nameservers to Cloudflare's nameservers
4. In the Cloudflare dashboard, go to SSL/TLS and set the encryption mode to "Full" or "Full (strict)"
5. Keep `USE_HTTPS=false` on your server as Cloudflare will handle the SSL

### Option 3: Using a Domain Provider's SSL

Many domain registrars offer free SSL certificates as part of their hosting packages. Check with your domain provider for instructions.

## Application Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| USE_HTTPS | Enable or disable HTTPS | `true` |
| SSL_CERT_PATH | Path to SSL certificate | `/path/to/fullchain.pem` |
| SSL_KEY_PATH | Path to SSL private key | `/path/to/privkey.pem` |
| NODE_ENV | Environment mode | `production` |

## Security Headers Implemented

The application automatically sets the following security headers:

- **X-Content-Type-Options: nosniff** - Prevents MIME type sniffing
- **X-Frame-Options: SAMEORIGIN** - Prevents clickjacking attacks
- **X-XSS-Protection: 1; mode=block** - Enables browser XSS protection
- **Referrer-Policy: strict-origin-when-cross-origin** - Controls referrer information
- **Content-Security-Policy** - Prevents XSS and code injection attacks
- **Strict-Transport-Security** - Forces HTTPS usage (when HTTPS is enabled)

## Testing Security Configuration

You can test the security of your website using:

1. [SSL Labs Server Test](https://www.ssllabs.com/ssltest/)
2. [Security Headers](https://securityheaders.com/)
3. [Mozilla Observatory](https://observatory.mozilla.org/)

## Support

If you have any questions about setting up HTTPS or security configuration, please contact your system administrator.