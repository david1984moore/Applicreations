import { useState, useRef, useEffect } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { useMobile } from '@/hooks/use-mobile';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PricingFeature {
  text: string;
}

interface PricingPlan {
  name: string;
  title: string;
  description: string;
  price: string;
  monthlyCost: string;
  features: PricingFeature[];
  highlighted?: boolean;
  appAddOnPrice: string;
  targetAudience: string;
}

const plans: PricingPlan[] = [
  {
    name: "basic",
    title: "Starter",
    description: "For freelancers, solo entrepreneurs, and small local businesses",
    price: "$2,000+",
    monthlyCost: "$50/month",
    appAddOnPrice: "$2,000+",
    targetAudience: "The Starter package is designed for freelancers, solo entrepreneurs, and small local businesses (e.g., cafes, retail shops, service providers). It's ideal for those seeking an affordable, professional online presence with essential features.",
    features: [
      { text: "Professional website with up to 5 pages" },
      { text: "Customizable template design" },
      { text: "Reliable shared hosting with 5GB storage" },
      { text: "SSL certificate for security" },
      { text: "2 hours monthly maintenance" },
      { text: "Up to 5 professional email accounts" },
      { text: "Optional basic mobile app for one platform (iOS or Android)" },
    ],
  },
  {
    name: "professional",
    title: "Growth",
    description: "For growing local businesses and small-to-medium enterprises",
    price: "$5,000+",
    monthlyCost: "$150/month",
    appAddOnPrice: "$5,000+",
    targetAudience: "The Growth package is perfect for growing local businesses and small-to-medium enterprises (e.g., local chains, startups with 5–50 employees). It's designed for businesses ready to scale with advanced digital solutions.",
    highlighted: true,
    features: [
      { text: "Custom website with up to 10 pages" },
      { text: "Advanced functionality (e-commerce, booking systems)" },
      { text: "VPS hosting with 20GB storage" },
      { text: "Daily backups and dedicated resources" },
      { text: "5 hours monthly maintenance" },
      { text: "Up to 10 professional email accounts" },
      { text: "Optional cross-platform mobile app (iOS and Android)" },
    ],
  },
];

export function Pricing() {
  // Instead of an object, use a single string to track which card is expanded (if any)
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
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

  const toggleCardExpansion = (name: string) => {
    // If the card is already expanded, close it, otherwise open this one
    setExpandedCard(expandedCard === name ? null : name);
  };

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
          {plans.map((plan) => (
            <div key={plan.name} className="reveal" style={{ transitionDelay: plan.name === "professional" ? "0.2s" : "0s" }}>
              <Card className={`h-full relative overflow-hidden transition-all duration-300 ${
                plan.highlighted 
                  ? 'border-2 border-primary shadow-lg shadow-primary/20' 
                  : 'border border-gray-200'
              }`}>
                {plan.highlighted && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-bl-md">
                      Popular
                    </div>
                  </div>
                )}
                
                <CardHeader className={`pb-6 ${plan.highlighted ? 'bg-primary/5' : ''}`}>
                  <CardTitle className="text-2xl font-bold text-black">{plan.title}</CardTitle>
                  <CardDescription className="text-sm text-gray-600">{plan.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="pt-4">
                  <div className="mb-6">
                    <p className="text-3xl font-bold text-black">{plan.price}</p>
                    <p className="text-sm text-gray-500">One-time development fee</p>
                    <p className="text-lg font-semibold text-black mt-2">{plan.monthlyCost}</p>
                    <p className="text-sm text-gray-500">Hosting & maintenance</p>
                  </div>
                  
                  <div className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 mt-0.5">
                          <Check className="h-5 w-5 text-primary" />
                        </div>
                        <p className="ml-3 text-sm text-gray-700">{feature.text}</p>
                      </div>
                    ))}
                  </div>
                  
                  {/* Expandable details */}
                  <div className="mt-6">
                    <button 
                      onClick={() => toggleCardExpansion(plan.name)}
                      className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1 transition-colors"
                    >
                      {expandedCard === plan.name ? 'View less' : 'View details'}
                      <ArrowRight className={`h-4 w-4 transition-transform duration-300 ${
                        expandedCard === plan.name ? 'rotate-90' : ''
                      }`} />
                    </button>
                    
                    {expandedCard === plan.name && (
                      <div className="mt-4 text-sm text-gray-700 bg-gray-50 p-4 rounded-md">
                        <p className="font-medium mb-2">Target Audience:</p>
                        <p className="mb-4">{plan.targetAudience}</p>
                        
                        <p className="font-medium mb-2">App Add-On:</p>
                        <p className="mb-4">Optional mobile app development starting at {plan.appAddOnPrice}, customized based on features.</p>
                        
                        <p className="font-medium mb-2">Customization Options:</p>
                        <p>Each package is flexible and can be tailored to fit your specific business needs.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter className="pt-2 pb-6">
                  <a
                    href="#contact"
                    className={`w-full ${
                      plan.highlighted 
                        ? 'btn-gradient text-white' 
                        : 'bg-white hover:bg-gray-50 text-primary border border-primary'
                    } py-2.5 px-4 rounded-full font-medium text-center transition-all duration-300`}
                  >
                    Get Started
                  </a>
                </CardFooter>
              </Card>
            </div>
          ))}
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