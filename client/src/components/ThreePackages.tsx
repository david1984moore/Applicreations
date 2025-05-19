import React from 'react';

export function ThreePackages() {
  return (
    <section id="pricing" className="py-20 md:py-28 bg-blue-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Pricing Packages</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            At Applicreations, we provide tailored digital solutions for businesses of all sizes. 
            Each package is a starting point, fully customizable to meet your unique needs and budget.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* BASIC PACKAGE */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="p-6 bg-gray-50">
              <h3 className="text-2xl font-bold text-black">Basic</h3>
              <p className="text-sm text-gray-600 mt-1">For individuals or startups on a budget</p>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <p className="text-3xl font-bold text-black">$600</p>
                <p className="text-sm text-gray-500">One-time development fee</p>
                <p className="text-lg font-semibold text-black mt-2">$50/month</p>
                <p className="text-sm text-gray-500">Hosting & maintenance</p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 mt-0.5 text-purple-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="ml-2 text-sm text-gray-700">Simple 1-page website</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 mt-0.5 text-purple-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="ml-2 text-sm text-gray-700">Basic template design</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 mt-0.5 text-purple-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="ml-2 text-sm text-gray-700">Reliable hosting with 2GB storage</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 mt-0.5 text-purple-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="ml-2 text-sm text-gray-700">SSL certificate for security</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 mt-0.5 text-purple-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="ml-2 text-sm text-gray-700">1 hour monthly maintenance</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 mt-0.5 text-purple-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="ml-2 text-sm text-gray-700">1 professional email account</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md text-sm mb-6">
                <p className="font-bold mb-1">Target Audience:</p>
                <p className="mb-3">The Basic package is ideal for individuals or startups needing a simple online presence on a tight budget.</p>
                
                <p className="font-bold mb-1">Customization Options:</p>
                <p>Each package is flexible and can be tailored to fit your specific business needs.</p>
              </div>
            </div>
            
            <div className="px-6 pb-6">
              <a
                href="#contact"
                className="block w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-full font-medium text-center"
              >
                Get Started
              </a>
            </div>
          </div>
          
          {/* STARTER PACKAGE */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="p-6 bg-gray-50">
              <h3 className="text-2xl font-bold text-black">Starter</h3>
              <p className="text-sm text-gray-600 mt-1">For freelancers, solo entrepreneurs, and small local businesses</p>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <p className="text-3xl font-bold text-black">$2,000</p>
                <p className="text-sm text-gray-500">One-time development fee</p>
                <p className="text-lg font-semibold text-black mt-2">$50/month</p>
                <p className="text-sm text-gray-500">Hosting & maintenance</p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 mt-0.5 text-purple-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="ml-2 text-sm text-gray-700">Professional website with up to 5 pages</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 mt-0.5 text-purple-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="ml-2 text-sm text-gray-700">Customizable template design</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 mt-0.5 text-purple-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="ml-2 text-sm text-gray-700">Reliable shared hosting with 5GB storage</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 mt-0.5 text-purple-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="ml-2 text-sm text-gray-700">SSL certificate for security</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 mt-0.5 text-purple-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="ml-2 text-sm text-gray-700">2 hours monthly maintenance</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 mt-0.5 text-purple-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="ml-2 text-sm text-gray-700">Up to 5 professional email accounts</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 mt-0.5 text-purple-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="ml-2 text-sm text-gray-700">Optional basic mobile app for one platform (iOS or Android)</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md text-sm mb-6">
                <p className="font-bold mb-1">Target Audience:</p>
                <p className="mb-3">The Starter package is designed for freelancers, solo entrepreneurs, and small local businesses (e.g., cafes, retail shops, service providers). It's ideal for those seeking an affordable, professional online presence with essential features.</p>
                
                <p className="font-bold mb-1">Customization Options:</p>
                <p>Each package is flexible and can be tailored to fit your specific business needs.</p>
              </div>
            </div>
            
            <div className="px-6 pb-6">
              <a
                href="#contact"
                className="block w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-full font-medium text-center"
              >
                Get Started
              </a>
            </div>
          </div>
          
          {/* GROWTH PACKAGE */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-purple-600">
            <div className="relative">
              <div className="absolute top-0 right-0">
                <div className="bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-bl-md">
                  Popular
                </div>
              </div>
              <div className="p-6 bg-purple-50">
                <h3 className="text-2xl font-bold text-black">Growth</h3>
                <p className="text-sm text-gray-600 mt-1">For growing local businesses and small-to-medium enterprises</p>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <p className="text-3xl font-bold text-black">$5,000</p>
                <p className="text-sm text-gray-500">One-time development fee</p>
                <p className="text-lg font-semibold text-black mt-2">$150/month</p>
                <p className="text-sm text-gray-500">Hosting & maintenance</p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 mt-0.5 text-purple-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="ml-2 text-sm text-gray-700">Custom website with up to 10 pages</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 mt-0.5 text-purple-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="ml-2 text-sm text-gray-700">Advanced functionality (e-commerce, booking systems)</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 mt-0.5 text-purple-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="ml-2 text-sm text-gray-700">VPS hosting with 20GB storage</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 mt-0.5 text-purple-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="ml-2 text-sm text-gray-700">Daily backups and dedicated resources</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 mt-0.5 text-purple-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="ml-2 text-sm text-gray-700">5 hours monthly maintenance</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 mt-0.5 text-purple-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="ml-2 text-sm text-gray-700">Up to 10 professional email accounts</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 mt-0.5 text-purple-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="ml-2 text-sm text-gray-700">Optional cross-platform mobile app (iOS and Android)</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md text-sm mb-6">
                <p className="font-bold mb-1">Target Audience:</p>
                <p className="mb-3">The Growth package is perfect for growing local businesses and small-to-medium enterprises (e.g., local chains, startups with 5–50 employees). It's designed for businesses ready to scale with advanced digital solutions.</p>
                
                <p className="font-bold mb-1">Customization Options:</p>
                <p>Each package is flexible and can be tailored to fit your specific business needs.</p>
              </div>
            </div>
            
            <div className="px-6 pb-6">
              <a
                href="#contact"
                className="block w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-full font-medium text-center"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
        
        {/* Add-ons section */}
        <div className="mt-16 max-w-4xl mx-auto text-center">
          <h3 className="text-xl md:text-2xl font-bold mb-8 text-black text-center relative">
            Optional Add-Ons and Enhancements
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 text-left">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-blue-400"></div>
              <div className="flex items-center mb-3">
                <div className="p-2 rounded-full bg-purple-100 mr-3">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path>
                  </svg>
                </div>
                <p className="font-semibold text-black">SEO Optimization</p>
              </div>
              <p className="text-black">Boost search engine visibility <span className="font-bold text-black">(starting at $500)</span></p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-blue-400"></div>
              <div className="flex items-center mb-3">
                <div className="p-2 rounded-full bg-purple-100 mr-3">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <p className="font-semibold text-black">Social Media Integration</p>
              </div>
              <p className="text-black">Connect your site to social platforms <span className="font-bold text-black">(starting at $300)</span></p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-blue-400"></div>
              <div className="flex items-center mb-3">
                <div className="p-2 rounded-full bg-purple-100 mr-3">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <p className="font-semibold text-black">Additional Email Accounts</p>
              </div>
              <p className="text-black">Expand beyond included accounts <span className="font-bold text-black">($1/month per mailbox)</span></p>
            </div>
          </div>
        </div>
        
        {/* Contact button */}
        <div className="mt-16 text-center">
          <a
            href="#contact"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white py-3 px-8 rounded-full font-medium text-center"
          >
            Contact Us For Custom Quote
          </a>
        </div>
      </div>
    </section>
  );
}