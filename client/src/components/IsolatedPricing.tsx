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
        body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
        button { padding: 8px 16px; background: none; border: 1px solid blue; color: blue; border-radius: 4px; }
        .content { margin-top: 10px; padding: 10px; background-color: #f5f5f5; display: none; }
      </style>
    </head>
    <body>
      <h3>Starter Package - $2,000+</h3>
      <button id="toggleBtn">Show Details</button>
      <div id="content" class="content">
        <p>The Starter package is designed for freelancers and small businesses.</p>
        <p>It includes everything you need to establish a professional online presence.</p>
      </div>
      <script>
        document.getElementById('toggleBtn').addEventListener('click', function() {
          const content = document.getElementById('content');
          const isHidden = content.style.display === 'none' || content.style.display === '';
          content.style.display = isHidden ? 'block' : 'none';
          this.textContent = isHidden ? 'Hide Details' : 'Show Details';
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
        body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
        button { padding: 8px 16px; background: none; border: 1px solid blue; color: blue; border-radius: 4px; }
        .content { margin-top: 10px; padding: 10px; background-color: #f5f5f5; display: none; }
      </style>
    </head>
    <body>
      <h3>Growth Package - $5,000+</h3>
      <button id="toggleBtn">Show Details</button>
      <div id="content" class="content">
        <p>The Growth package is perfect for growing businesses and enterprises.</p>
        <p>It includes advanced features for scaling your digital presence.</p>
      </div>
      <script>
        document.getElementById('toggleBtn').addEventListener('click', function() {
          const content = document.getElementById('content');
          const isHidden = content.style.display === 'none' || content.style.display === '';
          content.style.display = isHidden ? 'block' : 'none';
          this.textContent = isHidden ? 'Hide Details' : 'Show Details';
        });
      </script>
    </body>
    </html>
  `;

  return (
    <section style={{ padding: '40px', backgroundColor: '#f4f7ff', textAlign: 'center' }}>
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
          height: '300px', 
          border: '1px solid #ccc',
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
          height: '300px', 
          border: '1px solid #ccc',
          borderRadius: '8px',
          overflow: 'hidden',
          background: 'white'
        }}>
          <iframe 
            srcDoc={card2Html}
            title="Growth Package"
            style={{ width: '100%', height: '100%', border: 'none' }}
          />
        </div>
      </div>
    </section>
  );
}