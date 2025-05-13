import React, { useState } from 'react';

interface SimpleCardProps {
  title: string;
  content: React.ReactNode;
}

function IndependentCard({ title, content }: SimpleCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div data-testid={`card-${title.toLowerCase().replace(/\s+/g, '-')}`} style={{ 
      border: '1px solid #ccc', 
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '20px',
      backgroundColor: 'white'
    }}>
      <h3 style={{ margin: '0 0 10px 0' }}>{title}</h3>
      
      <button 
        data-testid={`toggle-${title.toLowerCase().replace(/\s+/g, '-')}`}
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          background: 'none',
          border: '1px solid #3E8BFF',
          padding: '8px 16px',
          cursor: 'pointer',
          color: '#3E8BFF',
          fontWeight: 'bold',
          borderRadius: '4px'
        }}
      >
        {isExpanded ? 'Hide Details' : 'Show Details'}
      </button>
      
      {isExpanded && (
        <div 
          data-testid={`content-${title.toLowerCase().replace(/\s+/g, '-')}`}
          style={{ 
            marginTop: '10px',
            padding: '10px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px'
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
}

export function SimplePricing() {
  return (
    <section id="pricing" style={{ padding: '40px 20px', backgroundColor: '#f4f7ff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Pricing Packages</h2>
        
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '20px'
        }}>
          <IndependentCard 
            title="Starter Package - $2,000+"
            content={
              <div>
                <p>The Starter package is designed for freelancers, solo entrepreneurs, and small local businesses.</p>
                <p>It's ideal for those seeking an affordable, professional online presence with essential features.</p>
              </div>
            }
          />
          
          <IndependentCard 
            title="Growth Package - $5,000+"
            content={
              <div>
                <p>The Growth package is perfect for growing local businesses and small-to-medium enterprises.</p>
                <p>It's designed for businesses ready to scale with advanced digital solutions.</p>
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
}