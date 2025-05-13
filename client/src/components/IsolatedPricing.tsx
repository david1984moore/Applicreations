import React, { useEffect } from 'react';

// A component that creates completely isolated cards inside iframes
export function IsolatedPricing() {
  useEffect(() => {
    // Clear any existing global event handlers
    const allExistingButtons = document.querySelectorAll('button');
    allExistingButtons.forEach((button) => {
      const newButton = button.cloneNode(true);
      if (button.parentNode) {
        button.parentNode.replaceChild(newButton, button);
      }
    });
  }, []);

  // Create HTML for standalone iframes for perfect isolation
  const card1Html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }
        body {
          margin: 0;
          padding: 24px;
          display: flex;
          flex-direction: column;
          height: 100vh;
          background-color: white;
        }
        .card {
          height: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .card-header {
          padding-bottom: 16px;
        }
        .card-title {
          font-size: 24px;
          font-weight: bold;
          color: #000;
          margin-bottom: 8px;
        }
        .card-description {
          font-size: 14px;
          color: #666;
        }
        .card-price {
          margin: 16px 0;
        }
        .price-main {
          font-size: 28px;
          font-weight: bold;
          color: #000;
        }
        .price-caption {
          font-size: 14px;
          color: #777;
          margin-top: 2px;
        }
        .price-monthly {
          font-size: 18px;
          font-weight: 600;
          color: #000;
          margin-top: 8px;
        }
        .features {
          margin: 16px 0;
        }
        .feature-item {
          display: flex;
          margin-bottom: 10px;
          align-items: flex-start;
        }
        .feature-icon {
          width: 20px;
          height: 20px;
          margin-right: 8px;
          color: #3E8BFF;
          flex-shrink: 0;
        }
        .feature-text {
          font-size: 14px;
          color: #333;
        }
        .toggle-btn {
          background: none;
          border: none;
          color: #3E8BFF;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 0;
          margin: 16px 0;
        }
        .toggle-btn:hover {
          color: #2E6DD6;
        }
        .arrow-icon {
          width: 16px;
          height: 16px;
          margin-left: 4px;
          transition: transform 0.3s;
        }
        .expanded .arrow-icon {
          transform: rotate(90deg);
        }
        .details-content {
          display: none;
          background-color: #f7f7f7;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 16px;
        }
        .section-title {
          font-weight: 600;
          font-size: 14px;
          margin-bottom: 6px;
          color: #333;
        }
        .section-text {
          font-size: 14px;
          color: #666;
          margin-bottom: 12px;
        }
        .cta-button {
          margin-top: auto;
          width: 100%;
          border-radius: 9999px;
          padding: 10px;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          text-align: center;
          border: 1px solid #3E8BFF;
          background-color: white;
          color: #3E8BFF;
          text-decoration: none;
          transition: background-color 0.3s;
        }
        .cta-button:hover {
          background-color: #f5f8ff;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Starter</h3>
          <p class="card-description">For freelancers, solo entrepreneurs, and small local businesses</p>
        </div>
        
        <div class="card-price">
          <p class="price-main">$2,000+</p>
          <p class="price-caption">One-time development fee</p>
          <p class="price-monthly">$50/month</p>
          <p class="price-caption">Hosting & maintenance</p>
        </div>
        
        <div class="features">
          <div class="feature-item">
            <svg class="feature-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <p class="feature-text">Professional website with up to 5 pages</p>
          </div>
          <div class="feature-item">
            <svg class="feature-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <p class="feature-text">Customizable template design</p>
          </div>
          <div class="feature-item">
            <svg class="feature-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <p class="feature-text">Reliable shared hosting with 5GB storage</p>
          </div>
          <div class="feature-item">
            <svg class="feature-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <p class="feature-text">SSL certificate for security</p>
          </div>
          <div class="feature-item">
            <svg class="feature-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <p class="feature-text">2 hours monthly maintenance</p>
          </div>
        </div>
        
        <button id="toggleBtn" class="toggle-btn">
          View details
          <svg class="arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
        
        <div id="detailsContent" class="details-content">
          <p class="section-title">Target Audience:</p>
          <p class="section-text">The Starter package is designed for freelancers, solo entrepreneurs, and small local businesses (e.g., cafes, retail shops, service providers). It's ideal for those seeking an affordable, professional online presence with essential features.</p>
          
          <p class="section-title">App Add-On:</p>
          <p class="section-text">Optional mobile app development starting at $2,000+, customized based on features.</p>
          
          <p class="section-title">Customization Options:</p>
          <p class="section-text">Each package is flexible and can be tailored to fit your specific business needs.</p>
        </div>
        
        <a href="#contact" class="cta-button">Get Started</a>
      </div>
      
      <script>
        document.getElementById('toggleBtn').addEventListener('click', function() {
          const detailsContent = document.getElementById('detailsContent');
          const isHidden = detailsContent.style.display === 'none' || detailsContent.style.display === '';
          detailsContent.style.display = isHidden ? 'block' : 'none';
          
          // Toggle expanded class for arrow rotation
          if (isHidden) {
            this.classList.add('expanded');
            this.firstChild.textContent = 'View less';
          } else {
            this.classList.remove('expanded');
            this.firstChild.textContent = 'View details';
          }
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
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }
        body {
          margin: 0;
          padding: 24px;
          display: flex;
          flex-direction: column;
          height: 100vh;
          background-color: white;
        }
        .card {
          height: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
          border: 2px solid #3E8BFF;
          border-radius: 7px;
          padding: 24px;
          box-shadow: 0 4px 12px rgba(62, 139, 255, 0.2);
        }
        .popular-badge {
          position: absolute;
          top: 0;
          right: 0;
          background-color: #3E8BFF;
          color: white;
          font-size: 12px;
          font-weight: 600;
          padding: 4px 10px;
          border-bottom-left-radius: 6px;
        }
        .card-header {
          padding-bottom: 16px;
          background-color: rgba(62, 139, 255, 0.05);
          margin: -24px;
          margin-bottom: 0;
          padding: 24px;
          padding-bottom: 16px;
          border-top-left-radius: 6px;
          border-top-right-radius: 6px;
        }
        .card-title {
          font-size: 24px;
          font-weight: bold;
          color: #000;
          margin-bottom: 8px;
        }
        .card-description {
          font-size: 14px;
          color: #666;
        }
        .card-price {
          margin: 16px 0;
        }
        .price-main {
          font-size: 28px;
          font-weight: bold;
          color: #000;
        }
        .price-caption {
          font-size: 14px;
          color: #777;
          margin-top: 2px;
        }
        .price-monthly {
          font-size: 18px;
          font-weight: 600;
          color: #000;
          margin-top: 8px;
        }
        .features {
          margin: 16px 0;
        }
        .feature-item {
          display: flex;
          margin-bottom: 10px;
          align-items: flex-start;
        }
        .feature-icon {
          width: 20px;
          height: 20px;
          margin-right: 8px;
          color: #3E8BFF;
          flex-shrink: 0;
        }
        .feature-text {
          font-size: 14px;
          color: #333;
        }
        .toggle-btn {
          background: none;
          border: none;
          color: #3E8BFF;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 0;
          margin: 16px 0;
        }
        .toggle-btn:hover {
          color: #2E6DD6;
        }
        .arrow-icon {
          width: 16px;
          height: 16px;
          margin-left: 4px;
          transition: transform 0.3s;
        }
        .expanded .arrow-icon {
          transform: rotate(90deg);
        }
        .details-content {
          display: none;
          background-color: #f7f7f7;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 16px;
        }
        .section-title {
          font-weight: 600;
          font-size: 14px;
          margin-bottom: 6px;
          color: #333;
        }
        .section-text {
          font-size: 14px;
          color: #666;
          margin-bottom: 12px;
        }
        .cta-button {
          margin-top: auto;
          width: 100%;
          border-radius: 9999px;
          padding: 10px;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          text-align: center;
          background: linear-gradient(135deg, #6b48ff 0%, #3E8BFF 100%);
          color: white;
          text-decoration: none;
          transition: transform 0.3s;
        }
        .cta-button:hover {
          transform: translateY(-2px);
        }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="popular-badge">Popular</div>
        
        <div class="card-header">
          <h3 class="card-title">Growth</h3>
          <p class="card-description">For growing local businesses and small-to-medium enterprises</p>
        </div>
        
        <div class="card-price">
          <p class="price-main">$5,000+</p>
          <p class="price-caption">One-time development fee</p>
          <p class="price-monthly">$150/month</p>
          <p class="price-caption">Hosting & maintenance</p>
        </div>
        
        <div class="features">
          <div class="feature-item">
            <svg class="feature-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <p class="feature-text">Custom website with up to 10 pages</p>
          </div>
          <div class="feature-item">
            <svg class="feature-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <p class="feature-text">Advanced functionality (e-commerce, booking systems)</p>
          </div>
          <div class="feature-item">
            <svg class="feature-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <p class="feature-text">VPS hosting with 20GB storage</p>
          </div>
          <div class="feature-item">
            <svg class="feature-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <p class="feature-text">Daily backups and dedicated resources</p>
          </div>
          <div class="feature-item">
            <svg class="feature-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <p class="feature-text">5 hours monthly maintenance</p>
          </div>
        </div>
        
        <button id="toggleBtn" class="toggle-btn">
          View details
          <svg class="arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
        
        <div id="detailsContent" class="details-content">
          <p class="section-title">Target Audience:</p>
          <p class="section-text">The Growth package is perfect for growing local businesses and small-to-medium enterprises (e.g., local chains, startups with 5–50 employees). It's designed for businesses ready to scale with advanced digital solutions.</p>
          
          <p class="section-title">App Add-On:</p>
          <p class="section-text">Optional mobile app development starting at $5,000+, customized based on features.</p>
          
          <p class="section-title">Customization Options:</p>
          <p class="section-text">Each package is flexible and can be tailored to fit your specific business needs.</p>
        </div>
        
        <a href="#contact" class="cta-button">Get Started</a>
      </div>
      
      <script>
        document.getElementById('toggleBtn').addEventListener('click', function() {
          const detailsContent = document.getElementById('detailsContent');
          const isHidden = detailsContent.style.display === 'none' || detailsContent.style.display === '';
          detailsContent.style.display = isHidden ? 'block' : 'none';
          
          // Toggle expanded class for arrow rotation
          if (isHidden) {
            this.classList.add('expanded');
            this.firstChild.textContent = 'View less';
          } else {
            this.classList.remove('expanded');
            this.firstChild.textContent = 'View details';
          }
        });
      </script>
    </body>
    </html>
  `;

  return (
    <section style={{ 
      padding: '60px 20px', 
      backgroundColor: '#f4f7ff', 
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #f4f7ff 0%, #edf3ff 100%)'
    }}>
      {/* Add subtle background accents */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.1,
        background: 'linear-gradient(135deg, #6b48ff 0%, #3E8BFF 100%)'
      }}></div>
      
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.05,
        backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4xNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTEyIDBoNnY2aC02di02em0xMiAwaDZ2NmgtNnYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')`,
      }}></div>
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{ 
            fontSize: '2.25rem', 
            fontWeight: 'bold', 
            marginBottom: '1rem',
            color: '#000'
          }}>
            Pricing Packages
          </h2>
          <p style={{ 
            fontSize: '1.125rem', 
            color: '#555', 
            maxWidth: '800px',
            margin: '0 auto 3rem auto'
          }}>
            At Applicreations, we provide tailored digital solutions for businesses of all sizes. 
            Each package is a starting point, fully customizable to meet your unique needs and budget.
          </p>
          
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '2rem', 
            justifyContent: 'center',
            margin: '0 auto 4rem auto',
          }}>
            <div style={{ 
              flex: '1', 
              minWidth: '300px', 
              maxWidth: '500px', 
              height: '600px', 
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              transition: 'transform 0.3s',
            }}>
              <iframe 
                srcDoc={card1Html}
                title="Starter Package"
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  border: 'none', 
                  borderRadius: '8px'
                }}
              />
            </div>
            
            <div style={{ 
              flex: '1', 
              minWidth: '300px', 
              maxWidth: '500px', 
              height: '600px', 
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s',
            }}>
              <iframe 
                srcDoc={card2Html}
                title="Growth Package"
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  border: 'none', 
                  borderRadius: '8px'
                }}
              />
            </div>
          </div>
          
          {/* Add-ons section */}
          <div style={{ 
            maxWidth: '900px', 
            margin: '0 auto', 
            textAlign: 'center'
          }}>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '600', 
              marginBottom: '1.5rem',
              color: '#000'
            }}>
              Optional Add-Ons and Enhancements
            </h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '1rem',
              textAlign: 'left'
            }}>
              <div style={{ 
                background: 'rgba(255,255,255,0.8)', 
                backdropFilter: 'blur(4px)', 
                padding: '1rem', 
                borderRadius: '8px', 
                boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
              }}>
                <p style={{ fontWeight: '600', color: '#000', marginBottom: '0.25rem' }}>SEO Optimization</p>
                <p style={{ fontSize: '0.875rem', color: '#666' }}>Boost search engine visibility (starting at $500)</p>
              </div>
              <div style={{ 
                background: 'rgba(255,255,255,0.8)', 
                backdropFilter: 'blur(4px)', 
                padding: '1rem', 
                borderRadius: '8px', 
                boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
              }}>
                <p style={{ fontWeight: '600', color: '#000', marginBottom: '0.25rem' }}>Social Media Integration</p>
                <p style={{ fontSize: '0.875rem', color: '#666' }}>Connect your site to social platforms (starting at $300)</p>
              </div>
              <div style={{ 
                background: 'rgba(255,255,255,0.8)', 
                backdropFilter: 'blur(4px)', 
                padding: '1rem', 
                borderRadius: '8px', 
                boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
              }}>
                <p style={{ fontWeight: '600', color: '#000', marginBottom: '0.25rem' }}>Additional Email Accounts</p>
                <p style={{ fontSize: '0.875rem', color: '#666' }}>Expand beyond included accounts ($1/month per mailbox)</p>
              </div>
              <div style={{ 
                background: 'rgba(255,255,255,0.8)', 
                backdropFilter: 'blur(4px)', 
                padding: '1rem', 
                borderRadius: '8px', 
                boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                gridColumn: 'span 2'
              }}>
                <p style={{ fontWeight: '600', color: '#000', marginBottom: '0.25rem' }}>Premium Support</p>
                <p style={{ fontSize: '0.875rem', color: '#666' }}>Priority assistance for faster response times (starting at $100/month)</p>
              </div>
              <div style={{ 
                background: 'rgba(255,255,255,0.8)', 
                backdropFilter: 'blur(4px)', 
                padding: '1rem', 
                borderRadius: '8px', 
                boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
              }}>
                <p style={{ fontWeight: '600', color: '#000', marginBottom: '0.25rem' }}>Mobile App Development</p>
                <p style={{ fontSize: '0.875rem', color: '#666' }}>Starting at $2,000 (Starter) or $5,000 (Growth)</p>
              </div>
            </div>
          </div>
          
          {/* CTA button */}
          <div style={{ marginTop: '3rem' }}>
            <a
              href="#contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.75rem 1.5rem',
                borderRadius: '9999px',
                fontWeight: '500',
                fontSize: '0.95rem',
                background: 'linear-gradient(135deg, #6b48ff 0%, #3E8BFF 100%)',
                color: 'white',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(62, 139, 255, 0.3)',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(62, 139, 255, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(62, 139, 255, 0.3)';
              }}
            >
              Contact Us For Custom Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
}