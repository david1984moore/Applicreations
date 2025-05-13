import { useMobile } from '@/hooks/use-mobile';
import { useState } from 'react';

// Pricing card component with collapsible details on mobile
function IndependentPricingCard({
  title,
  description,
  price,
  monthlyCost,
  features,
  targetAudience,
  appAddOnPrice,
  highlighted = false,
  isMobile = false
}: {
  title: string;
  description: string;
  price: string;
  monthlyCost: string;
  features: string[];
  targetAudience: string;
  appAddOnPrice: string;
  highlighted?: boolean;
  isMobile?: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle expanded state for mobile
  const toggleExpand = () => {
    if (isMobile) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div
      className={`h-full flex flex-col relative overflow-hidden transition-all duration-300 rounded-lg mb-4 ${
        highlighted
          ? 'border-2 border-primary shadow-lg shadow-primary/20'
          : 'border border-gray-200'
      } bg-white ${isMobile ? 'cursor-pointer' : ''}`}
      onClick={toggleExpand}
    >
      {highlighted && (
        <div className="absolute top-0 right-0">
          <div className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-bl-md">
            Popular
          </div>
        </div>
      )}
      
      <div className="pb-2 bg-primary/5">
        <div className="p-4 pb-2">
          <h3 className="text-2xl font-bold text-black">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
      </div>
      
      <div className="px-5 pt-2 flex-grow">
        <div className="mb-4">
          <p className="text-3xl font-bold text-black">{price}</p>
          <p className="text-sm text-gray-500">One-time development fee</p>
          <p className="text-lg font-semibold text-black mt-1">{monthlyCost}</p>
          <p className="text-sm text-gray-500">Hosting & maintenance</p>
        </div>
        
        {/* Content that toggles on mobile */}
        <div className={`${isMobile && !isExpanded ? 'hidden' : 'block'} transition-all duration-300`}>
          <div className="space-y-2 mb-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 mt-0.5 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <p className="ml-2 text-sm text-gray-700">{feature}</p>
              </div>
            ))}
          </div>
          
          <div>
            <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">
              <p className="font-bold mb-1">Target Audience:</p>
              <p className="mb-2">{targetAudience}</p>
              
              <p className="font-bold mb-1">App Add-On:</p>
              <p className="mb-2">Optional mobile app development starting at {appAddOnPrice}, customized based on features.</p>
              
              <p className="font-bold mb-1">Customization Options:</p>
              <p>Each package is flexible and can be tailored to fit your specific business needs.</p>
            </div>
          </div>
        </div>
        
        {/* Show toggle indicator on mobile */}
        {isMobile && (
          <div className="flex justify-center items-center my-3">
            <div className="h-5 w-5 text-primary mr-1">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
            <span className="text-sm text-primary font-medium">
              {isExpanded ? "Show less" : "View details"}
            </span>
          </div>
        )}
      </div>
      
      <div className="px-5 pt-4 pb-8 mt-auto">
        <a
          href="#contact"
          className="block w-full bg-primary hover:bg-primary/90 text-white py-3.5 px-6 rounded-full font-medium text-center transition-all duration-300"
          onClick={(e) => e.stopPropagation()} // Prevent clicking the button from toggling the card
        >
          Get Started
        </a>
      </div>
    </div>
  );
}

export function Pricing() {
  const isMobile = useMobile();

  const starterFeatures = [
    "Professional website with up to 5 pages",
    "Customizable template design",
    "Reliable shared hosting with 5GB storage",
    "SSL certificate for security",
    "2 hours monthly maintenance",
    "Up to 5 professional email accounts",
    "Optional basic mobile app for one platform (iOS or Android)"
  ];
  
  const growthFeatures = [
    "Custom website with up to 10 pages",
    "Advanced functionality (e-commerce, booking systems)",
    "VPS hosting with 20GB storage",
    "Daily backups and dedicated resources",
    "5 hours monthly maintenance",
    "Up to 10 professional email accounts",
    "Optional cross-platform mobile app (iOS and Android)"
  ];
  
  return (
    <section 
      id="pricing" 
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
        <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block text-black">
            Pricing Packages
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            At Applicreations, we provide tailored digital solutions for businesses of all sizes. 
            Each package is a starting point, fully customizable to meet your unique needs and budget.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-6xl mx-auto">
          <div style={{ transitionDelay: "0s" }}>
            <IndependentPricingCard
              title="Starter"
              description="For freelancers, solo entrepreneurs, and small local businesses"
              price="$2,000"
              monthlyCost="$50/month"
              features={starterFeatures}
              targetAudience="The Starter package is designed for freelancers, solo entrepreneurs, and small local businesses (e.g., cafes, retail shops, service providers). It's ideal for those seeking an affordable, professional online presence with essential features."
              appAddOnPrice="$2,000"
              isMobile={isMobile}
            />
          </div>
          
          <div style={{ transitionDelay: "0.2s" }}>
            <IndependentPricingCard
              title="Growth"
              description="For growing local businesses and small-to-medium enterprises"
              price="$5,000"
              monthlyCost="$150/month"
              features={growthFeatures}
              targetAudience="The Growth package is perfect for growing local businesses and small-to-medium enterprises (e.g., local chains, startups with 5–50 employees). It's designed for businesses ready to scale with advanced digital solutions."
              appAddOnPrice="$5,000"
              highlighted
              isMobile={isMobile}
            />
          </div>
        </div>
        
        <div className="mt-16 max-w-4xl mx-auto text-center">
          <h3 className="text-xl md:text-2xl font-bold mb-8 text-black text-center relative">
            Optional Add-Ons and Enhancements
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 text-left">
            <div className="bg-white backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-primary/10 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-blue-400"></div>
              <div className="flex items-center mb-3">
                <div className="p-2 rounded-full bg-primary/10 mr-3">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path>
                  </svg>
                </div>
                <p className="font-semibold text-black">SEO Optimization</p>
              </div>
              <p className="text-black">Boost search engine visibility <span className="font-bold text-black">(starting at $500)</span></p>
            </div>
            
            <div className="bg-white backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-primary/10 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-blue-400"></div>
              <div className="flex items-center mb-3">
                <div className="p-2 rounded-full bg-primary/10 mr-3">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <p className="font-semibold text-black">Social Media Integration</p>
              </div>
              <p className="text-black">Connect your site to social platforms <span className="font-bold text-black">(starting at $300)</span></p>
            </div>
            
            <div className="bg-white backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-primary/10 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-blue-400"></div>
              <div className="flex items-center mb-3">
                <div className="p-2 rounded-full bg-primary/10 mr-3">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <p className="font-semibold text-black">Additional Email Accounts</p>
              </div>
              <p className="text-black">Expand beyond included accounts <span className="font-bold text-black">($1/month per mailbox)</span></p>
            </div>
            
            <div className="bg-white backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-primary/10 relative overflow-hidden group md:col-span-2">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-blue-400"></div>
              <div className="flex items-center mb-3">
                <div className="p-2 rounded-full bg-primary/10 mr-3">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                </div>
                <p className="font-semibold text-black">Premium Support</p>
              </div>
              <p className="text-black">Priority assistance for faster response times <span className="font-bold text-black">(starting at $100/month)</span></p>
            </div>
            
            <div className="bg-white backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-primary/10 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-blue-400"></div>
              <div className="flex items-center mb-3">
                <div className="p-2 rounded-full bg-primary/10 mr-3">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <p className="font-semibold text-black">Mobile App Development</p>
              </div>
              <p className="text-black">Native applications for iOS and Android <span className="font-bold text-black">(starting at $2,000)</span></p>
            </div>
          </div>
        </div>
        
        <div className="mt-16 mb-8 text-center">
          <a
            href="#contact"
            className={`animated-button ${isMobile ? 'animated-button-mobile' : ''} relative inline-flex items-center justify-center py-[14px] px-[32px] font-[500] text-[0.95rem] rounded-[50px] border-0 transition-transform duration-700 ease-out overflow-hidden outline-none shadow-none mx-auto`}
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