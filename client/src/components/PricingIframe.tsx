import React from 'react';

export function PricingIframe() {
  return (
    <section id="pricing" className="py-20 md:py-28 overflow-hidden" style={{background: 'linear-gradient(135deg, #f4f7ff 0%, #edf3ff 100%)'}}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block text-black">
            Pricing Packages
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            At Applicreations, we provide tailored digital solutions for businesses of all sizes. 
            Each package is a starting point, fully customizable to meet your unique needs and budget.
          </p>
        </div>
        
        {/* Hard-coded pricing cards - no dynamic rendering */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* BASIC PACKAGE */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden flex flex-col">
            <div className="p-6 bg-gray-50">
              <h3 className="text-2xl font-bold">Basic</h3>
              <p className="text-gray-600 mt-1">For individuals or startups on a budget</p>
            </div>
            
            <div className="p-6 flex-grow">
              <div className="mb-6">
                <p className="text-3xl font-bold">$600</p>
                <p className="text-gray-500 text-sm">One-time development fee</p>
                <p className="text-xl font-semibold mt-2">$50/month</p>
                <p className="text-gray-500 text-sm">Hosting & maintenance</p>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex">
                  <span className="text-indigo-600 mr-2">✓</span>
                  Simple 1-page website
                </li>
                <li className="flex">
                  <span className="text-indigo-600 mr-2">✓</span>
                  Basic template design
                </li>
                <li className="flex">
                  <span className="text-indigo-600 mr-2">✓</span>
                  Reliable hosting with 2GB storage
                </li>
                <li className="flex">
                  <span className="text-indigo-600 mr-2">✓</span>
                  SSL certificate for security
                </li>
                <li className="flex">
                  <span className="text-indigo-600 mr-2">✓</span>
                  1 hour monthly maintenance
                </li>
                <li className="flex">
                  <span className="text-indigo-600 mr-2">✓</span>
                  1 professional email account
                </li>
              </ul>
            </div>
            
            <div className="p-6 mt-auto border-t border-gray-100">
              <a 
                href="#contact" 
                className="block w-full py-3 px-6 text-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md"
              >
                Get Started
              </a>
            </div>
          </div>
          
          {/* STARTER PACKAGE */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden flex flex-col">
            <div className="p-6 bg-gray-50">
              <h3 className="text-2xl font-bold">Starter</h3>
              <p className="text-gray-600 mt-1">For freelancers and small businesses</p>
            </div>
            
            <div className="p-6 flex-grow">
              <div className="mb-6">
                <p className="text-3xl font-bold">$2,000</p>
                <p className="text-gray-500 text-sm">One-time development fee</p>
                <p className="text-xl font-semibold mt-2">$50/month</p>
                <p className="text-gray-500 text-sm">Hosting & maintenance</p>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex">
                  <span className="text-indigo-600 mr-2">✓</span>
                  Professional website with up to 5 pages
                </li>
                <li className="flex">
                  <span className="text-indigo-600 mr-2">✓</span>
                  Customizable template design
                </li>
                <li className="flex">
                  <span className="text-indigo-600 mr-2">✓</span>
                  Reliable shared hosting with 5GB storage
                </li>
                <li className="flex">
                  <span className="text-indigo-600 mr-2">✓</span>
                  SSL certificate for security
                </li>
                <li className="flex">
                  <span className="text-indigo-600 mr-2">✓</span>
                  2 hours monthly maintenance
                </li>
                <li className="flex">
                  <span className="text-indigo-600 mr-2">✓</span>
                  Up to 5 professional email accounts
                </li>
              </ul>
            </div>
            
            <div className="p-6 mt-auto border-t border-gray-100">
              <a 
                href="#contact" 
                className="block w-full py-3 px-6 text-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md"
              >
                Get Started
              </a>
            </div>
          </div>
          
          {/* GROWTH PACKAGE */}
          <div className="bg-white rounded-lg shadow-lg border-2 border-indigo-500 overflow-hidden flex flex-col relative">
            <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-bl-md">
              Popular
            </div>
            
            <div className="p-6 bg-indigo-50">
              <h3 className="text-2xl font-bold">Growth</h3>
              <p className="text-gray-600 mt-1">For growing businesses and enterprises</p>
            </div>
            
            <div className="p-6 flex-grow">
              <div className="mb-6">
                <p className="text-3xl font-bold">$5,000</p>
                <p className="text-gray-500 text-sm">One-time development fee</p>
                <p className="text-xl font-semibold mt-2">$150/month</p>
                <p className="text-gray-500 text-sm">Hosting & maintenance</p>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex">
                  <span className="text-indigo-600 mr-2">✓</span>
                  Custom website with up to 10 pages
                </li>
                <li className="flex">
                  <span className="text-indigo-600 mr-2">✓</span>
                  Advanced functionality (e-commerce, booking)
                </li>
                <li className="flex">
                  <span className="text-indigo-600 mr-2">✓</span>
                  VPS hosting with 20GB storage
                </li>
                <li className="flex">
                  <span className="text-indigo-600 mr-2">✓</span>
                  Daily backups and dedicated resources
                </li>
                <li className="flex">
                  <span className="text-indigo-600 mr-2">✓</span>
                  5 hours monthly maintenance
                </li>
                <li className="flex">
                  <span className="text-indigo-600 mr-2">✓</span>
                  Up to 10 professional email accounts
                </li>
              </ul>
            </div>
            
            <div className="p-6 mt-auto border-t border-gray-100">
              <a 
                href="#contact" 
                className="block w-full py-3 px-6 text-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md"
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