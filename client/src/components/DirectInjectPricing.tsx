import React from 'react';

export function DirectInjectPricing() {
  return (
    <section id="pricing-direct" className="bg-gray-100 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Pricing Options</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Basic */}
          <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200">
            <div className="p-6 bg-gray-50">
              <h3 className="text-2xl font-bold">Basic</h3>
              <p className="text-gray-600 mt-2">For individuals or startups on a budget</p>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <p className="text-3xl font-bold">$600</p>
                <p className="text-gray-500">One-time development fee</p>
                <p className="text-xl font-semibold mt-2">$50/month</p>
                <p className="text-gray-500">Hosting & maintenance</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Simple 1-page website</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Basic template design</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Reliable hosting with 2GB storage</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>SSL certificate for security</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>1 hour monthly maintenance</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>1 professional email account</span>
                </li>
              </ul>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-700">
                  <span className="font-bold">Target Audience:</span> The Basic package is ideal for individuals or startups needing a simple online presence on a tight budget.
                </p>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100">
              <a href="#contact" className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-md transition-colors">
                Get Started
              </a>
            </div>
          </div>
          
          {/* Starter */}
          <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200">
            <div className="p-6 bg-gray-50">
              <h3 className="text-2xl font-bold">Starter</h3>
              <p className="text-gray-600 mt-2">For freelancers and small businesses</p>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <p className="text-3xl font-bold">$2,000</p>
                <p className="text-gray-500">One-time development fee</p>
                <p className="text-xl font-semibold mt-2">$50/month</p>
                <p className="text-gray-500">Hosting & maintenance</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Professional website with up to 5 pages</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Customizable template design</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Reliable shared hosting with 5GB storage</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>2 hours monthly maintenance</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Up to 5 professional email accounts</span>
                </li>
              </ul>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-700">
                  <span className="font-bold">Target Audience:</span> The Starter package is designed for freelancers, solo entrepreneurs, and small local businesses.
                </p>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100">
              <a href="#contact" className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-md transition-colors">
                Get Started
              </a>
            </div>
          </div>
          
          {/* Growth */}
          <div className="bg-white rounded-lg overflow-hidden shadow-lg border-2 border-indigo-500 relative">
            <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              POPULAR
            </div>
            <div className="p-6 bg-indigo-50">
              <h3 className="text-2xl font-bold">Growth</h3>
              <p className="text-gray-600 mt-2">For growing businesses and enterprises</p>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <p className="text-3xl font-bold">$5,000</p>
                <p className="text-gray-500">One-time development fee</p>
                <p className="text-xl font-semibold mt-2">$150/month</p>
                <p className="text-gray-500">Hosting & maintenance</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Custom website with up to 10 pages</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Advanced functionality (e-commerce, booking)</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>VPS hosting with 20GB storage</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>5 hours monthly maintenance</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Up to 10 professional email accounts</span>
                </li>
              </ul>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-700">
                  <span className="font-bold">Target Audience:</span> The Growth package is perfect for growing local businesses and small-to-medium enterprises.
                </p>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100">
              <a href="#contact" className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-md transition-colors">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}