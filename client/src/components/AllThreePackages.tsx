import React from 'react';

export function AllThreePackages() {
  return (
    <section id="pricing" className="py-20 md:py-28 bg-blue-50">
      <div className="container mx-auto px-4 md:px-8 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Pricing Packages</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            At Applicreations, we provide tailored digital solutions for businesses of all sizes.
            Each package is a starting point, fully customizable to meet your unique needs and budget.
          </p>
        </div>

        <div style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
          {/* BASIC PACKAGE */}
          <div style={{border: '1px solid #e5e7eb', borderRadius: '0.5rem', overflow: 'hidden', backgroundColor: 'white', maxWidth: '800px', margin: '0 auto'}}>
            <div style={{padding: '1.5rem', backgroundColor: '#f9fafb'}}>
              <h3 style={{fontSize: '1.5rem', fontWeight: 'bold', color: 'black'}}>Basic</h3>
              <p style={{fontSize: '0.875rem', color: '#4b5563', marginTop: '0.25rem'}}>For individuals or startups on a budget</p>
            </div>
            
            <div style={{padding: '1.5rem'}}>
              <div style={{marginBottom: '1.5rem'}}>
                <p style={{fontSize: '1.875rem', fontWeight: 'bold', color: 'black'}}>$600</p>
                <p style={{fontSize: '0.875rem', color: '#6b7280'}}>One-time development fee</p>
                <p style={{fontSize: '1.25rem', fontWeight: '600', color: 'black', marginTop: '0.5rem'}}>$50/month</p>
                <p style={{fontSize: '0.875rem', color: '#6b7280'}}>Hosting & maintenance</p>
              </div>
              
              <div>
                <div style={{display: 'flex', alignItems: 'flex-start', marginBottom: '0.75rem'}}>
                  <span style={{color: '#6b48ff', marginRight: '0.5rem', marginTop: '0.125rem'}}>✓</span>
                  <p style={{fontSize: '0.875rem', color: '#4b5563'}}>Simple 1-page website</p>
                </div>
                <div style={{display: 'flex', alignItems: 'flex-start', marginBottom: '0.75rem'}}>
                  <span style={{color: '#6b48ff', marginRight: '0.5rem', marginTop: '0.125rem'}}>✓</span>
                  <p style={{fontSize: '0.875rem', color: '#4b5563'}}>Basic template design</p>
                </div>
                <div style={{display: 'flex', alignItems: 'flex-start', marginBottom: '0.75rem'}}>
                  <span style={{color: '#6b48ff', marginRight: '0.5rem', marginTop: '0.125rem'}}>✓</span>
                  <p style={{fontSize: '0.875rem', color: '#4b5563'}}>Reliable hosting with 2GB storage</p>
                </div>
                <div style={{display: 'flex', alignItems: 'flex-start', marginBottom: '0.75rem'}}>
                  <span style={{color: '#6b48ff', marginRight: '0.5rem', marginTop: '0.125rem'}}>✓</span>
                  <p style={{fontSize: '0.875rem', color: '#4b5563'}}>SSL certificate for security</p>
                </div>
                <div style={{display: 'flex', alignItems: 'flex-start', marginBottom: '0.75rem'}}>
                  <span style={{color: '#6b48ff', marginRight: '0.5rem', marginTop: '0.125rem'}}>✓</span>
                  <p style={{fontSize: '0.875rem', color: '#4b5563'}}>1 hour monthly maintenance</p>
                </div>
                <div style={{display: 'flex', alignItems: 'flex-start', marginBottom: '0.75rem'}}>
                  <span style={{color: '#6b48ff', marginRight: '0.5rem', marginTop: '0.125rem'}}>✓</span>
                  <p style={{fontSize: '0.875rem', color: '#4b5563'}}>1 professional email account</p>
                </div>
              </div>
              
              <div style={{backgroundColor: '#f9fafb', borderRadius: '0.375rem', padding: '1rem', marginTop: '1.5rem', fontSize: '0.875rem', color: '#4b5563'}}>
                <p style={{fontWeight: 'bold', marginBottom: '0.25rem'}}>Target Audience:</p>
                <p style={{marginBottom: '0.75rem'}}>The Basic package is ideal for individuals or startups needing a simple online presence on a tight budget.</p>
                
                <p style={{fontWeight: 'bold', marginBottom: '0.25rem'}}>Customization Options:</p>
                <p>Each package is flexible and can be tailored to fit your specific business needs.</p>
              </div>
            </div>
            
            <div style={{padding: '1.5rem', borderTop: '1px solid #f3f4f6'}}>
              <a
                href="#contact"
                style={{
                  backgroundColor: '#6b48ff',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '9999px',
                  fontWeight: '500',
                  textAlign: 'center',
                  display: 'block',
                  width: '100%'
                }}
              >
                Get Started
              </a>
            </div>
          </div>

          {/* Starter Package */}
          <div style={{marginTop: '2rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem', overflow: 'hidden', backgroundColor: 'white', maxWidth: '800px', margin: '0 auto'}}>
            <div style={{padding: '1.5rem', backgroundColor: '#f9fafb'}}>
              <h3 style={{fontSize: '1.5rem', fontWeight: 'bold', color: 'black'}}>Starter</h3>
              <p style={{fontSize: '0.875rem', color: '#4b5563', marginTop: '0.25rem'}}>For freelancers, solo entrepreneurs, and small local businesses</p>
            </div>
            
            <div style={{padding: '1.5rem'}}>
              <div style={{marginBottom: '1.5rem'}}>
                <p style={{fontSize: '1.875rem', fontWeight: 'bold', color: 'black'}}>$2,000</p>
                <p style={{fontSize: '0.875rem', color: '#6b7280'}}>One-time development fee</p>
                <p style={{fontSize: '1.25rem', fontWeight: '600', color: 'black', marginTop: '0.5rem'}}>$50/month</p>
                <p style={{fontSize: '0.875rem', color: '#6b7280'}}>Hosting & maintenance</p>
              </div>
              
              <div>
                <div style={{display: 'flex', alignItems: 'flex-start', marginBottom: '0.75rem'}}>
                  <span style={{color: '#6b48ff', marginRight: '0.5rem', marginTop: '0.125rem'}}>✓</span>
                  <p style={{fontSize: '0.875rem', color: '#4b5563'}}>Professional website with up to 5 pages</p>
                </div>
                <div style={{display: 'flex', alignItems: 'flex-start', marginBottom: '0.75rem'}}>
                  <span style={{color: '#6b48ff', marginRight: '0.5rem', marginTop: '0.125rem'}}>✓</span>
                  <p style={{fontSize: '0.875rem', color: '#4b5563'}}>Customizable template design</p>
                </div>
                <div style={{display: 'flex', alignItems: 'flex-start', marginBottom: '0.75rem'}}>
                  <span style={{color: '#6b48ff', marginRight: '0.5rem', marginTop: '0.125rem'}}>✓</span>
                  <p style={{fontSize: '0.875rem', color: '#4b5563'}}>Reliable shared hosting with 5GB storage</p>
                </div>
              </div>
            </div>
            
            <div style={{padding: '1.5rem', borderTop: '1px solid #f3f4f6'}}>
              <a
                href="#contact"
                style={{
                  backgroundColor: '#6b48ff',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '9999px',
                  fontWeight: '500',
                  textAlign: 'center',
                  display: 'block',
                  width: '100%'
                }}
              >
                Get Started
              </a>
            </div>
          </div>

          {/* Growth Package */}
          <div style={{marginTop: '2rem', border: '2px solid #6b48ff', borderRadius: '0.5rem', overflow: 'hidden', backgroundColor: 'white', maxWidth: '800px', margin: '0 auto'}}>
            <div style={{padding: '1.5rem', backgroundColor: 'rgba(107, 72, 255, 0.05)', position: 'relative'}}>
              <div style={{position: 'absolute', top: 0, right: 0, backgroundColor: '#6b48ff', color: 'white', fontSize: '0.75rem', fontWeight: '600', padding: '0.25rem 0.75rem', borderBottomLeftRadius: '0.375rem'}}>
                Popular
              </div>
              <h3 style={{fontSize: '1.5rem', fontWeight: 'bold', color: 'black'}}>Growth</h3>
              <p style={{fontSize: '0.875rem', color: '#4b5563', marginTop: '0.25rem'}}>For growing local businesses and small-to-medium enterprises</p>
            </div>
            
            <div style={{padding: '1.5rem'}}>
              <div style={{marginBottom: '1.5rem'}}>
                <p style={{fontSize: '1.875rem', fontWeight: 'bold', color: 'black'}}>$5,000</p>
                <p style={{fontSize: '0.875rem', color: '#6b7280'}}>One-time development fee</p>
                <p style={{fontSize: '1.25rem', fontWeight: '600', color: 'black', marginTop: '0.5rem'}}>$150/month</p>
                <p style={{fontSize: '0.875rem', color: '#6b7280'}}>Hosting & maintenance</p>
              </div>
              
              <div>
                <div style={{display: 'flex', alignItems: 'flex-start', marginBottom: '0.75rem'}}>
                  <span style={{color: '#6b48ff', marginRight: '0.5rem', marginTop: '0.125rem'}}>✓</span>
                  <p style={{fontSize: '0.875rem', color: '#4b5563'}}>Custom website with up to 10 pages</p>
                </div>
                <div style={{display: 'flex', alignItems: 'flex-start', marginBottom: '0.75rem'}}>
                  <span style={{color: '#6b48ff', marginRight: '0.5rem', marginTop: '0.125rem'}}>✓</span>
                  <p style={{fontSize: '0.875rem', color: '#4b5563'}}>Advanced functionality (e-commerce, booking systems)</p>
                </div>
                <div style={{display: 'flex', alignItems: 'flex-start', marginBottom: '0.75rem'}}>
                  <span style={{color: '#6b48ff', marginRight: '0.5rem', marginTop: '0.125rem'}}>✓</span>
                  <p style={{fontSize: '0.875rem', color: '#4b5563'}}>VPS hosting with 20GB storage</p>
                </div>
              </div>
            </div>
            
            <div style={{padding: '1.5rem', borderTop: '1px solid #f3f4f6'}}>
              <a
                href="#contact"
                style={{
                  backgroundColor: '#6b48ff',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '9999px',
                  fontWeight: '500',
                  textAlign: 'center',
                  display: 'block',
                  width: '100%'
                }}
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}