import { useState } from 'react';
import { useMobile } from '@/hooks/use-mobile';

// Simple pricing card component
const PricingCard = ({
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
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`flex flex-col h-full bg-white rounded-lg ${
        highlighted ? 'border-2 border-primary shadow-lg' : 'border border-gray-200'
      }`}
    >
      {highlighted && (
        <div className="absolute top-0 right-0">
          <div className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-bl-md">
            Popular
          </div>
        </div>
      )}

      <div className={`p-6 ${highlighted ? 'bg-primary/5' : ''}`}>
        <h3 className="text-2xl font-bold text-black">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>

      <div className="p-6 border-t border-gray-100 flex-grow">
        <div className="mb-4">
          <p className="text-3xl font-bold text-black">{price}</p>
          <p className="text-sm text-gray-500">One-time development fee</p>
          <p className="text-lg font-semibold text-black mt-1">{monthlyCost}</p>
          <p className="text-sm text-gray-500">Hosting & maintenance</p>
        </div>

        <div className="space-y-3">
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

        {isMobile && (
          <button 
            className="mt-4 w-full flex items-center justify-center text-primary text-sm font-medium"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Show less" : "Show details"}
            <svg 
              className={`ml-1 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        )}

        {(!isMobile || isExpanded) && (
          <div className="mt-4 text-sm text-gray-700 bg-gray-50 p-3 rounded-md">
            <p className="font-bold mb-1">Target Audience:</p>
            <p className="mb-2">{targetAudience}</p>
            
            <p className="font-bold mb-1">App Add-On:</p>
            <p className="mb-2">Optional mobile app development starting at {appAddOnPrice}, customized based on features.</p>
            
            <p className="font-bold mb-1">Customization Options:</p>
            <p>Each package is flexible and can be tailored to fit your specific business needs.</p>
          </div>
        )}
      </div>

      <div className="p-6 mt-auto">
        <a
          href="#contact"
          className="block w-full bg-primary hover:bg-primary/90 text-white py-3 px-4 rounded-full font-medium text-center"
        >
          Get Started
        </a>
      </div>
    </div>
  );
};

export function Pricing() {
  const isMobile = useMobile();

  // Basic package features
  const basicFeatures = [
    "Simple 1-page website",
    "Basic template design",
    "Reliable hosting with 2GB storage",
    "SSL certificate for security",
    "1 hour monthly maintenance",
    "1 professional email account"
  ];

  // Starter package features
  const starterFeatures = [
    "Professional website with up to 5 pages",
    "Customizable template design",
    "Reliable shared hosting with 5GB storage",
    "SSL certificate for security",
    "2 hours monthly maintenance",
    "Up to 5 professional email accounts",
    "Optional basic mobile app for one platform (iOS or Android)"
  ];
  
  // Growth package features
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
      className="py-20 bg-gradient-to-b from-blue-50 to-white"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Pricing Packages</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            At Applicreations, we provide tailored digital solutions for businesses of all sizes.
            Each package is a starting point, fully customizable to meet your unique needs and budget.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Basic Package */}
          <PricingCard
            title="Basic"
            description="For individuals or startups on a budget"
            price="$600"
            monthlyCost="$50/month"
            features={basicFeatures}
            targetAudience="The Basic package is ideal for individuals or startups needing a simple online presence on a tight budget."
            appAddOnPrice="$1,500"
            isMobile={isMobile}
          />

          {/* Starter Package */}
          <PricingCard
            title="Starter"
            description="For freelancers, solo entrepreneurs, and small local businesses"
            price="$2,000"
            monthlyCost="$50/month"
            features={starterFeatures}
            targetAudience="The Starter package is designed for freelancers, solo entrepreneurs, and small local businesses (e.g., cafes, retail shops, service providers). It's ideal for those seeking an affordable, professional online presence with essential features."
            appAddOnPrice="$2,000"
            isMobile={isMobile}
          />

          {/* Growth Package */}
          <PricingCard
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

        {/* Add-ons section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h3 className="text-xl md:text-2xl font-bold mb-8 text-center">
            Optional Add-Ons and Enhancements
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path>
                  </svg>
                </div>
                <h4 className="font-semibold">SEO Optimization</h4>
              </div>
              <p className="text-sm text-gray-600">Boost search engine visibility (starting at $500)</p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h4 className="font-semibold">Social Media Integration</h4>
              </div>
              <p className="text-sm text-gray-600">Connect your site to social platforms (starting at $300)</p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h4 className="font-semibold">Additional Email Accounts</h4>
              </div>
              <p className="text-sm text-gray-600">Expand beyond included accounts ($1/month per mailbox)</p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-full transition-colors"
          >
            Contact Us For Custom Quote
          </a>
        </div>
      </div>
    </section>
  );
}