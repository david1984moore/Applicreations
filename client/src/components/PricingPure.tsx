import React, { useState } from 'react';

// Super simple card component that only focuses on the expand/collapse functionality
// without any styling conflicts
function SimpleCard({ title, content }) {
  // Each card has its own independent state
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div style={{ 
      border: '1px solid #ccc', 
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '20px',
      backgroundColor: 'white'
    }}>
      <h3 style={{ margin: '0 0 10px 0' }}>{title}</h3>
      
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          background: 'none',
          border: 'none',
          padding: '8px 16px',
          cursor: 'pointer',
          color: '#3E8BFF',
          fontWeight: 'bold'
        }}
      >
        {isExpanded ? 'Hide Details' : 'Show Details'}
      </button>
      
      {isExpanded && (
        <div style={{ 
          marginTop: '10px',
          padding: '10px',
          backgroundColor: '#f5f5f5',
          borderRadius: '4px'
        }}>
          {content}
        </div>
      )}
    </div>
  );
}

// Main pricing component
export function Pricing() {
  return (
    <section id="pricing" style={{ padding: '40px 20px', backgroundColor: '#f4f7ff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Pricing Packages</h2>
        
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '20px'
        }}>
          <SimpleCard 
            title="Starter Package - $2,000+"
            content={
              <div>
                <p>The Starter package is designed for freelancers, solo entrepreneurs, and small local businesses.</p>
                <p>It's ideal for those seeking an affordable, professional online presence with essential features.</p>
              </div>
            }
          />
          
          <SimpleCard 
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