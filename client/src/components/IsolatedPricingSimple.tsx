import React from 'react';

// A simplified component with iframes to ensure complete isolation
export function IsolatedPricingSimple() {
  // Create HTML for standalone iframes for perfect isolation
  const card1Html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { margin: 0; padding: 20px; font-family: sans-serif; }
        .card { border: 1px solid #ddd; padding: 20px; border-radius: 8px; }
        .title { font-size: 24px; font-weight: bold; margin-bottom: 8px; }
        .price { font-size: 28px; font-weight: bold; margin: 16px 0 8px; }
        .description { color: #666; margin-bottom: 16px; }
        .features { margin: 16px 0; }
        .feature { display: flex; margin-bottom: 8px; }
        .feature-text { margin-left: 8px; }
        .toggle-btn { 
          background: none; 
          border: none; 
          color: blue; 
          cursor: pointer; 
          padding: 8px 0;
          display: flex;
          align-items: center;
        }
        .content { 
          background: #f5f5f5; 
          padding: 16px; 
          margin-top: 16px; 
          border-radius: 8px;
          display: none;
        }
        .button {
          display: block;
          width: 100%;
          padding: 10px;
          margin-top: 20px;
          background: white;
          border: 1px solid blue;
          color: blue;
          border-radius: 999px;
          text-align: center;
          text-decoration: none;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="title">Starter Package</div>
        <div class="description">For freelancers and small businesses</div>
        <div class="price">$2,000+</div>
        <div class="description">One-time development fee</div>
        <div class="price" style="font-size: 22px;">$50/month</div>
        <div class="description">Hosting & maintenance</div>
        
        <div class="features">
          <div class="feature">
            <span>✓</span>
            <span class="feature-text">Professional website with up to 5 pages</span>
          </div>
          <div class="feature">
            <span>✓</span>
            <span class="feature-text">Customizable template design</span>
          </div>
          <div class="feature">
            <span>✓</span>
            <span class="feature-text">Reliable shared hosting</span>
          </div>
        </div>
        
        <button id="toggleBtn" class="toggle-btn">
          <span id="btnText">View details</span>
          <span style="margin-left: 4px;">→</span>
        </button>
        
        <div id="content" class="content">
          <p><strong>Target Audience:</strong></p>
          <p style="margin-bottom: 12px;">The Starter package is designed for freelancers, solo entrepreneurs, and small local businesses. It's ideal for those seeking an affordable, professional online presence.</p>
          
          <p><strong>App Add-On:</strong></p>
          <p>Optional mobile app development starting at $2,000+, customized based on features.</p>
        </div>
        
        <a href="#contact" class="button">Get Started</a>
      </div>
      
      <script>
        document.getElementById('toggleBtn').addEventListener('click', function() {
          const content = document.getElementById('content');
          const btnText = document.getElementById('btnText');
          const isHidden = content.style.display === 'none' || content.style.display === '';
          content.style.display = isHidden ? 'block' : 'none';
          btnText.textContent = isHidden ? 'View less' : 'View details';
        });
      </script>
    </body>
    </html>
  `;

  const card2Html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { margin: 0; padding: 20px; font-family: sans-serif; }
        .card { 
          border: 2px solid blue; 
          padding: 20px; 
          border-radius: 8px; 
          position: relative;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .badge {
          position: absolute;
          top: 0;
          right: 0;
          background: blue;
          color: white;
          font-size: 12px;
          font-weight: bold;
          padding: 4px 8px;
          border-bottom-left-radius: 8px;
        }
        .title { font-size: 24px; font-weight: bold; margin-bottom: 8px; }
        .price { font-size: 28px; font-weight: bold; margin: 16px 0 8px; }
        .description { color: #666; margin-bottom: 16px; }
        .features { margin: 16px 0; }
        .feature { display: flex; margin-bottom: 8px; }
        .feature-text { margin-left: 8px; }
        .toggle-btn { 
          background: none; 
          border: none; 
          color: blue; 
          cursor: pointer; 
          padding: 8px 0;
          display: flex;
          align-items: center;
        }
        .content { 
          background: #f5f5f5; 
          padding: 16px; 
          margin-top: 16px; 
          border-radius: 8px;
          display: none;
        }
        .button {
          display: block;
          width: 100%;
          padding: 10px;
          margin-top: 20px;
          background: linear-gradient(to right, #4e54c8, #8f94fb);
          border: none;
          color: white;
          border-radius: 999px;
          text-align: center;
          text-decoration: none;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="badge">Popular</div>
        <div class="title">Growth Package</div>
        <div class="description">For growing businesses and enterprises</div>
        <div class="price">$5,000+</div>
        <div class="description">One-time development fee</div>
        <div class="price" style="font-size: 22px;">$150/month</div>
        <div class="description">Hosting & maintenance</div>
        
        <div class="features">
          <div class="feature">
            <span>✓</span>
            <span class="feature-text">Custom website with up to 10 pages</span>
          </div>
          <div class="feature">
            <span>✓</span>
            <span class="feature-text">Advanced functionality (e-commerce, bookings)</span>
          </div>
          <div class="feature">
            <span>✓</span>
            <span class="feature-text">VPS hosting with 20GB storage</span>
          </div>
        </div>
        
        <button id="toggleBtn" class="toggle-btn">
          <span id="btnText">View details</span>
          <span style="margin-left: 4px;">→</span>
        </button>
        
        <div id="content" class="content">
          <p><strong>Target Audience:</strong></p>
          <p style="margin-bottom: 12px;">The Growth package is perfect for growing businesses and small-to-medium enterprises. It's designed for businesses ready to scale with advanced digital solutions.</p>
          
          <p><strong>App Add-On:</strong></p>
          <p>Optional mobile app development starting at $5,000+, customized based on features.</p>
        </div>
        
        <a href="#contact" class="button">Get Started</a>
      </div>
      
      <script>
        document.getElementById('toggleBtn').addEventListener('click', function() {
          const content = document.getElementById('content');
          const btnText = document.getElementById('btnText');
          const isHidden = content.style.display === 'none' || content.style.display === '';
          content.style.display = isHidden ? 'block' : 'none';
          btnText.textContent = isHidden ? 'View less' : 'View details';
        });
      </script>
    </body>
    </html>
  `;

  return (
    <section style={{ 
      padding: '60px 20px', 
      backgroundColor: '#f4f7ff', 
      textAlign: 'center'
    }}>
      <h2 style={{ marginBottom: '30px' }}>Pricing Packages</h2>
      
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '20px', 
        justifyContent: 'center',
        margin: '0 auto',
        maxWidth: '1200px'
      }}>
        <div style={{ 
          flex: '1', 
          minWidth: '300px', 
          maxWidth: '500px', 
          height: '550px', 
          border: '1px solid #ddd',
          borderRadius: '8px',
          overflow: 'hidden',
          background: 'white'
        }}>
          <iframe 
            srcDoc={card1Html}
            title="Starter Package"
            style={{ width: '100%', height: '100%', border: 'none' }}
          />
        </div>
        
        <div style={{ 
          flex: '1', 
          minWidth: '300px', 
          maxWidth: '500px', 
          height: '550px', 
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          background: 'white'
        }}>
          <iframe 
            srcDoc={card2Html}
            title="Growth Package"
            style={{ width: '100%', height: '100%', border: 'none' }}
          />
        </div>
      </div>
      
      <div style={{ marginTop: '30px' }}>
        <a
          href="#contact"
          style={{
            display: 'inline-block',
            padding: '10px 30px',
            background: 'linear-gradient(to right, #4e54c8, #8f94fb)',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '999px',
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          Contact Us For Custom Quote
        </a>
      </div>
    </section>
  );
}