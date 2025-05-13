import React, { useEffect, useRef } from 'react';

// This component will render pure HTML and use vanilla JavaScript to manage its own DOM
export function VanillaPricing() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Create a completely standalone HTML structure
    containerRef.current.innerHTML = `
      <div style="padding: 40px; background-color: #f4f7ff; text-align: center;">
        <h2 style="margin-bottom: 30px;">Pricing Packages</h2>
        
        <div style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: center;">
          <div class="custom-card-1" style="flex: 1; min-width: 300px; max-width: 500px; border: 1px solid #ccc; border-radius: 8px; padding: 20px; background: white;">
            <h3>Starter Package - $2,000+</h3>
            <button class="toggle-button-1" data-target="content-1" style="margin-top: 10px; padding: 8px 16px; background: none; border: 1px solid blue; color: blue; cursor: pointer; border-radius: 4px;">
              Show Details
            </button>
            <div id="content-1" style="display: none; margin-top: 10px; padding: 15px; background-color: #f5f5f5; border-radius: 4px;">
              <p>The Starter package is designed for freelancers and small businesses.</p>
              <p>It includes everything you need to establish a professional online presence.</p>
            </div>
          </div>
          
          <div class="custom-card-2" style="flex: 1; min-width: 300px; max-width: 500px; border: 1px solid #ccc; border-radius: 8px; padding: 20px; background: white;">
            <h3>Growth Package - $5,000+</h3>
            <button class="toggle-button-2" data-target="content-2" style="margin-top: 10px; padding: 8px 16px; background: none; border: 1px solid blue; color: blue; cursor: pointer; border-radius: 4px;">
              Show Details
            </button>
            <div id="content-2" style="display: none; margin-top: 10px; padding: 15px; background-color: #f5f5f5; border-radius: 4px;">
              <p>The Growth package is perfect for growing businesses and enterprises.</p>
              <p>It includes advanced features for scaling your digital presence.</p>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Add click handlers with unique, specific selectors
    const button1 = containerRef.current.querySelector('.toggle-button-1');
    const button2 = containerRef.current.querySelector('.toggle-button-2');
    const content1 = containerRef.current.querySelector('#content-1');
    const content2 = containerRef.current.querySelector('#content-2');
    
    if (button1 && content1) {
      button1.addEventListener('click', () => {
        const content = content1 as HTMLElement;
        const isHidden = content.style.display === 'none';
        content.style.display = isHidden ? 'block' : 'none';
        (button1 as HTMLElement).innerText = isHidden ? 'Hide Details' : 'Show Details';
      });
    }
    
    if (button2 && content2) {
      button2.addEventListener('click', () => {
        const content = content2 as HTMLElement;
        const isHidden = content.style.display === 'none';
        content.style.display = isHidden ? 'block' : 'none';
        (button2 as HTMLElement).innerText = isHidden ? 'Hide Details' : 'Show Details';
      });
    }
    
    // Cleanup
    return () => {
      if (button1) button1.removeEventListener('click', () => {});
      if (button2) button2.removeEventListener('click', () => {});
    };
  }, []);
  
  return <div ref={containerRef} id="vanilla-pricing-container"></div>;
}