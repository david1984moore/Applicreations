import { useRef, useEffect } from 'react';
import { useMobile } from '@/hooks/use-mobile';

export function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useMobile();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    const revealElements = sectionRef.current?.querySelectorAll('.reveal');
    revealElements?.forEach(el => {
      observer.observe(el);
    });

    return () => {
      revealElements?.forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section 
      id="pricing" 
      ref={sectionRef} 
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #f4f7ff 0%, #edf3ff 100%)',
        position: 'relative'
      }}
    >
      {/* Add a subtle gradient accent */}
      <div 
        className="absolute inset-0 opacity-10" 
        style={{ 
          background: 'linear-gradient(135deg, #6b48ff 0%, #3E8BFF 100%)'
        }}
      ></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4xNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTEyIDBoNnY2aC02di02em0xMiAwaDZ2NmgtNnYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16 reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block text-black">
            Pricing Packages
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            At Applicreations, we provide tailored digital solutions for businesses of all sizes. 
            Each package is a starting point, fully customizable to meet your unique needs and budget.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-6xl mx-auto">
          {/* Starter Package */}
          <div className="reveal pricing-card" style={{ transitionDelay: "0s" }}>
            <div className="h-full relative overflow-hidden transition-all duration-300 rounded-lg border border-gray-200 bg-white">
              <div className="pb-6">
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-black">Starter</h3>
                  <p className="text-sm text-gray-600">For freelancers, solo entrepreneurs, and small local businesses</p>
                </div>
              </div>
              
              <div className="px-6 pt-4">
                <div className="mb-6">
                  <p className="text-3xl font-bold text-black">$2,000+</p>
                  <p className="text-sm text-gray-500">One-time development fee</p>
                  <p className="text-lg font-semibold text-black mt-2">$50/month</p>
                  <p className="text-sm text-gray-500">Hosting & maintenance</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 mt-0.5 text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <p className="ml-3 text-sm text-gray-700">Professional website with up to 5 pages</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 mt-0.5 text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <p className="ml-3 text-sm text-gray-700">Customizable template design</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 mt-0.5 text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <p className="ml-3 text-sm text-gray-700">Reliable shared hosting with 5GB storage</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 mt-0.5 text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <p className="ml-3 text-sm text-gray-700">SSL certificate for security</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 mt-0.5 text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <p className="ml-3 text-sm text-gray-700">2 hours monthly maintenance</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 mt-0.5 text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <p className="ml-3 text-sm text-gray-700">Up to 5 professional email accounts</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 mt-0.5 text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <p className="ml-3 text-sm text-gray-700">Optional basic mobile app for one platform</p>
                  </div>
                </div>
                
                {/* Expandable details */}
                <div className="mt-6">
                  <button 
                    id="basic-toggle"
                    className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1 transition-colors toggle-details"
                    onClick={(e) => {
                      e.preventDefault();
                      const content = document.getElementById('basic-details');
                      const btn = document.getElementById('basic-toggle');
                      const arrow = document.getElementById('basic-arrow');
                      
                      if (content && btn && arrow) {
                        const isHidden = content.style.display === 'none' || content.style.display === '';
                        content.style.display = isHidden ? 'block' : 'none';
                        btn.querySelector('.button-text')!.textContent = isHidden ? 'View less' : 'View details';
                        arrow.style.transform = isHidden ? 'rotate(90deg)' : 'rotate(0deg)';
                      }
                    }}
                  >
                    <span className="button-text">View details</span>
                    <svg id="basic-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                  
                  <div id="basic-details" className="mt-4 text-sm text-gray-700 bg-gray-50 p-4 rounded-md" style={{ display: 'none' }}>
                    <p className="font-medium mb-2">Target Audience:</p>
                    <p className="mb-4">The Starter package is designed for freelancers, solo entrepreneurs, and small local businesses (e.g., cafes, retail shops, service providers). It's ideal for those seeking an affordable, professional online presence with essential features.</p>
                    
                    <p className="font-medium mb-2">App Add-On:</p>
                    <p className="mb-4">Optional mobile app development starting at $2,000+, customized based on features.</p>
                    
                    <p className="font-medium mb-2">Customization Options:</p>
                    <p>Each package is flexible and can be tailored to fit your specific business needs.</p>
                  </div>
                </div>
              </div>
              
              <div className="px-6 pt-2 pb-6 mt-8">
                <a
                  href="#contact"
                  className="block w-full bg-white hover:bg-gray-50 text-primary border border-primary py-2.5 px-4 rounded-full font-medium text-center transition-all duration-300"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>

          {/* Growth Package */}
          <div className="reveal pricing-card" style={{ transitionDelay: "0.2s" }}>
            <div className="h-full relative overflow-hidden transition-all duration-300 rounded-lg border-2 border-primary shadow-lg shadow-primary/20 bg-white">
              <div className="absolute top-0 right-0">
                <div className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-bl-md">
                  Popular
                </div>
              </div>
              
              <div className="pb-6 bg-primary/5">
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-black">Growth</h3>
                  <p className="text-sm text-gray-600">For growing local businesses and small-to-medium enterprises</p>
                </div>
              </div>
              
              <div className="px-6 pt-4">
                <div className="mb-6">
                  <p className="text-3xl font-bold text-black">$5,000+</p>
                  <p className="text-sm text-gray-500">One-time development fee</p>
                  <p className="text-lg font-semibold text-black mt-2">$150/month</p>
                  <p className="text-sm text-gray-500">Hosting & maintenance</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 mt-0.5 text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <p className="ml-3 text-sm text-gray-700">Custom website with up to 10 pages</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 mt-0.5 text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <p className="ml-3 text-sm text-gray-700">Advanced functionality (e-commerce, booking systems)</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 mt-0.5 text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <p className="ml-3 text-sm text-gray-700">VPS hosting with 20GB storage</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 mt-0.5 text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <p className="ml-3 text-sm text-gray-700">Daily backups and dedicated resources</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 mt-0.5 text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <p className="ml-3 text-sm text-gray-700">5 hours monthly maintenance</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 mt-0.5 text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <p className="ml-3 text-sm text-gray-700">Up to 10 professional email accounts</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 mt-0.5 text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <p className="ml-3 text-sm text-gray-700">Optional cross-platform mobile app (iOS and Android)</p>
                  </div>
                </div>
                
                {/* Expandable details */}
                <div className="mt-6">
                  <button 
                    id="pro-toggle"
                    className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1 transition-colors toggle-details"
                    onClick={(e) => {
                      e.preventDefault();
                      const content = document.getElementById('pro-details');
                      const btn = document.getElementById('pro-toggle');
                      const arrow = document.getElementById('pro-arrow');
                      
                      if (content && btn && arrow) {
                        const isHidden = content.style.display === 'none' || content.style.display === '';
                        content.style.display = isHidden ? 'block' : 'none';
                        btn.querySelector('.button-text')!.textContent = isHidden ? 'View less' : 'View details';
                        arrow.style.transform = isHidden ? 'rotate(90deg)' : 'rotate(0deg)';
                      }
                    }}
                  >
                    <span className="button-text">View details</span>
                    <svg id="pro-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                  
                  <div id="pro-details" className="mt-4 text-sm text-gray-700 bg-gray-50 p-4 rounded-md" style={{ display: 'none' }}>
                    <p className="font-medium mb-2">Target Audience:</p>
                    <p className="mb-4">The Growth package is perfect for growing local businesses and small-to-medium enterprises (e.g., local chains, startups with 5–50 employees). It's designed for businesses ready to scale with advanced digital solutions.</p>
                    
                    <p className="font-medium mb-2">App Add-On:</p>
                    <p className="mb-4">Optional mobile app development starting at $5,000+, customized based on features.</p>
                    
                    <p className="font-medium mb-2">Customization Options:</p>
                    <p>Each package is flexible and can be tailored to fit your specific business needs.</p>
                  </div>
                </div>
              </div>
              
              <div className="px-6 pt-2 pb-6 mt-8">
                <a
                  href="#contact"
                  className="block w-full btn-gradient text-white py-2.5 px-4 rounded-full font-medium text-center transition-all duration-300"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 max-w-4xl mx-auto text-center reveal">
          <h3 className="text-xl md:text-2xl font-semibold mb-4 text-black">Optional Add-Ons and Enhancements</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 text-left">
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm">
              <p className="font-medium text-black mb-1">SEO Optimization</p>
              <p className="text-sm text-gray-600">Boost search engine visibility (starting at $500)</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm">
              <p className="font-medium text-black mb-1">Social Media Integration</p>
              <p className="text-sm text-gray-600">Connect your site to social platforms (starting at $300)</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm">
              <p className="font-medium text-black mb-1">Additional Email Accounts</p>
              <p className="text-sm text-gray-600">Expand beyond included accounts ($1/month per mailbox)</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm md:col-span-2">
              <p className="font-medium text-black mb-1">Premium Support</p>
              <p className="text-sm text-gray-600">Priority assistance for faster response times (starting at $100/month)</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm">
              <p className="font-medium text-black mb-1">Mobile App Development</p>
              <p className="text-sm text-gray-600">Starting at $2,000 (Starter) or $5,000 (Growth)</p>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <a
            href="#contact"
            className={`animated-button ${isMobile ? 'animated-button-mobile' : ''} relative inline-flex items-center justify-center py-[10px] px-[26px] font-[500] text-[0.95rem] rounded-[50px] border-0 transition-transform duration-700 ease-out overflow-hidden outline-none shadow-none mx-auto`}
          >
            <span className="button-text relative z-10 ml-5">
              Contact Us For Custom Quote
            </span>
            <span className="button-text-hover absolute z-10 ml-5">
              Contact Us For Custom Quote
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}