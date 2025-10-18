import fs from 'fs';
import path from 'path';
import https from 'https';

// Function to verify SSL certificates
function verifySSLCertificates() {
  console.log('SSL Certificate Verification Tool');
  console.log('================================\n');
  
  // Check certificate and key paths
  const certPath = process.env.SSL_CERT_PATH || './ssl/applicreations_fullchain.pem';
  const keyPath = process.env.SSL_KEY_PATH || './ssl/applicreations.key';
  
  console.log(`Certificate path: ${certPath}`);
  console.log(`Private key path: ${keyPath}`);
  
  // Check if certificate files exist
  try {
    if (!fs.existsSync(certPath)) {
      console.error(`\n❌ ERROR: Certificate file not found at ${certPath}`);
      return false;
    }
    
    if (!fs.existsSync(keyPath)) {
      console.error(`\n❌ ERROR: Private key file not found at ${keyPath}`);
      return false;
    }
    
    console.log(`\n✅ Both certificate and key files found`);
    
    // Try to read the certificate and key files
    try {
      const cert = fs.readFileSync(certPath);
      const key = fs.readFileSync(keyPath);
      
      console.log(`\n✅ Certificate and key files read successfully`);
      
      // Try to create an HTTPS server
      try {
        const options = { key, cert };
        const server = https.createServer(options, (req, res) => {
          res.writeHead(200);
          res.end('Hello World!');
        });
        
        server.listen(0, () => {
          const port = server.address().port;
          console.log(`\n✅ HTTPS server created successfully and listening on port ${port}`);
          console.log('\nCertificate is valid and properly configured!');
          console.log('\nTo enable HTTPS in your application:');
          console.log('1. Make sure your .env file has:');
          console.log('   USE_HTTPS=true');
          console.log(`   SSL_CERT_PATH=${certPath}`);
          console.log(`   SSL_KEY_PATH=${keyPath}`);
          console.log('2. Restart your server');
          
          // Close the server
          server.close(() => {
            console.log('\nVerification complete. Test server closed.');
          });
        });
      } catch (error) {
        console.error(`\n❌ ERROR: Could not create HTTPS server: ${error.message}`);
        return false;
      }
    } catch (error) {
      console.error(`\n❌ ERROR: Could not read certificate or key files: ${error.message}`);
      return false;
    }
  } catch (error) {
    console.error(`\n❌ ERROR: ${error.message}`);
    return false;
  }
  
  return true;
}

// Run the verification
verifySSLCertificates();