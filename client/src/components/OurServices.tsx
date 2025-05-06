import { 
  ServerIcon, 
  WrenchScrewdriverIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';

// Function to extract key features from service descriptions
function getServiceFeatures(description: string): string[] {
  const sentences = description.split('.');
  // Filter out empty strings and trim each sentence
  return sentences
    .map(s => s.trim())
    .filter(s => s.length > 0)
    .slice(0, 2); // Take first two sentences as features
}

export function OurServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeService, setActiveService] = useState<number | null>(null);

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

  // Service data to make the code more maintainable
  const services = [
    {
      title: "Web Development",
      icon: GlobeAltIcon,
      description: "We create responsive, modern websites that showcase your brand and deliver an exceptional user experience across all devices. Our web solutions combine striking visuals with intuitive navigation to help you connect with your audience effectively.",
      keyFeatures: ["Responsive design", "SEO optimization"]
    },
    {
      title: "App Development",
      icon: DevicePhoneMobileIcon,
      description: "We design and develop intuitive, feature-rich mobile applications that engage users and solve real business problems. Our mobile solutions work seamlessly across platforms, providing a consistent experience that keeps users coming back.",
      keyFeatures: ["Cross-platform compatibility", "Intuitive user interfaces"]
    },
    {
      title: "Hosting Services",
      icon: ServerIcon,
      description: "We provide reliable, secure, and scalable hosting solutions to ensure your websites and applications are always available and performing optimally. Our infrastructure is built for speed, security, and reliability so you can focus on growing your business.",
      keyFeatures: ["99.9% uptime guarantee", "Advanced security measures"]
    },
    {
      title: "Maintenance & Support",
      icon: WrenchScrewdriverIcon,
      description: "We offer ongoing maintenance and support services to keep your digital solutions running smoothly, secure, and up-to-date with the latest technologies. Our team provides responsive support to address issues promptly and implement enhancements to keep your business moving forward.",
      keyFeatures: ["24/7 technical support", "Regular updates & improvements"]
    }
  ];

  return (
    <section id="our-services" ref={sectionRef} className="py-12 bg-neutral-light">
      <div className="container mx-auto px-6 md:px-10 lg:px-16 xl:px-24">
        <div className="text-center mb-12 reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient">Our Services</h2>
          <div className="w-24 h-1 bg-gradient mx-auto mb-6"></div>
          <p className="text-lg text-neutral-dark/80 max-w-2xl mx-auto">
            We provide a comprehensive suite of digital solutions tailored to your business needs.
          </p>
        </div>

        {/* Services - Alternating left-right layout */}
        <div className="space-y-14 reveal px-4 md:px-12 lg:px-20 xl:px-32">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isEven = index % 2 === 0;
            
            return (
              <div 
                key={index}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center reveal service-card p-4 rounded-lg"
                onMouseEnter={() => setActiveService(index)}
                onMouseLeave={() => setActiveService(null)}
              >
                {/* Icon section */}
                <div className={`md:col-span-4 ${!isEven ? 'md:order-2' : ''} 
                                flex justify-center items-center py-4 service-icon-container`}>
                  <Icon className={`h-28 w-28 text-purple service-icon transition-all duration-500 ${activeService === index ? 'animate-float' : ''}`} />
                </div>
                
                {/* Content section */}
                <div className={`md:col-span-8 ${!isEven ? 'md:order-1 order-2' : ''} px-2`}>
                  <h3 className="text-2xl font-semibold mb-3 service-title">{service.title}</h3>
                  <div className="w-16 h-1 bg-purple/40 mb-4 service-divider"></div>
                  <p className="text-neutral-dark/80 mb-4 service-text">
                    {service.description}
                  </p>
                  
                  {/* Key Features */}
                  <div className="space-y-2 mt-4">
                    {service.keyFeatures.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-2">
                        <CheckCircleIcon className="h-5 w-5 text-purple mt-0.5 flex-shrink-0" />
                        <span className="text-sm service-highlight">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Learn more link with hover effect */}
                  <div className="mt-4">
                    <a href="#contact" className="inline-flex items-center text-sm font-medium text-purple hover:text-purple/80 transition-colors group">
                      Learn more
                      <svg className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}