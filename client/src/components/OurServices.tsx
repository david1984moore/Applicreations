import { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';

// Custom animated SVG icons
const WebDevIcon = () => (
  <svg className="icon-pulse h-24 w-24 text-purple" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" 
      fill="currentColor"
      className="animate-globe"
    />
    <path d="M15.07 8.1C15.16 8.09 15.24 8.09 15.33 8.08C15.639 8.07 15.94 8.11 16.23 8.19C16.5119 8.26863 16.7787 8.39482 17.02 8.56C17.2397 8.70562 17.4396 8.87782 17.615 9.07C17.785 9.25 17.926 9.459 18.032 9.684C18.141 9.91832 18.2157 10.1658 18.2541 10.4209C18.2925 10.6759 18.2942 10.9353 18.259 11.1909C18.2026 11.7035 18.0331 12.1948 17.765 12.625C17.4923 13.0476 17.1278 13.4118 16.6985 13.6921C16.2691 13.9725 15.7858 14.1621 15.283 14.248C14.7802 14.3339 14.2681 14.3143 13.773 14.19C13.2778 14.0658 12.8106 13.8391 12.4 13.525C11.9969 13.2155 11.6626 12.8231 11.4188 12.3739C11.175 11.9246 11.0273 11.4288 10.9863 10.9199C10.9453 10.4109 11.012 9.89917 11.182 9.42C11.352 8.94083 11.6214 8.50338 11.97 8.13C12.3185 7.75661 12.7413 7.45825 13.2101 7.25687C13.6789 7.05549 14.1835 6.95585 14.69 6.965C14.816 6.971 14.94 6.982 15.063 6.998" 
      strokeWidth="2" 
      stroke="currentColor" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className="animate-pulse-slow"
    />
  </svg>
);

const AppDevIcon = () => (
  <svg className="icon-float h-24 w-24 text-purple" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="2" width="14" height="20" rx="2" fill="currentColor" fillOpacity="0.3" className="phone-body" />
    <rect x="7" y="4" width="10" height="16" rx="1" fill="currentColor" fillOpacity="0.9" className="phone-screen" />
    <circle cx="12" cy="20" r="1" fill="white" className="phone-button" />
    <path d="M10 8L14 12L10 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="phone-arrow" />
  </svg>
);

const HostingIcon = () => (
  <svg className="icon-spin h-24 w-24 text-purple" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="16" height="4" rx="1" fill="currentColor" className="server-top" />
    <rect x="4" y="10" width="16" height="4" rx="1" fill="currentColor" className="server-middle" />
    <rect x="4" y="16" width="16" height="4" rx="1" fill="currentColor" className="server-bottom" />
    <circle cx="6.5" cy="6" r="0.5" fill="white" className="animate-blink" />
    <circle cx="6.5" cy="12" r="0.5" fill="white" className="animate-blink animation-delay-300" />
    <circle cx="6.5" cy="18" r="0.5" fill="white" className="animate-blink animation-delay-600" />
    <circle cx="8.5" cy="6" r="0.5" fill="#4ADE80" className="animate-blink animation-delay-150" />
    <circle cx="8.5" cy="12" r="0.5" fill="#4ADE80" className="animate-blink animation-delay-450" />
    <circle cx="8.5" cy="18" r="0.5" fill="#4ADE80" className="animate-blink animation-delay-750" />
  </svg>
);

const SupportIcon = () => (
  <svg className="icon-rotate h-24 w-24 text-purple" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" 
      fill="currentColor"
      className="wrench-body"
    />
    <path d="M10.5 13.5L7.5 10.5M11.5 9.5L8.5 6.5" stroke="white" strokeWidth="0.75" strokeLinecap="round" className="wrench-lines" />
  </svg>
);

export function OurServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeHover, setActiveHover] = useState<number | null>(null);

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
    <section id="our-services" ref={sectionRef} className="py-16 bg-neutral-50">
      <div className="container mx-auto px-6 md:px-10 lg:px-16 xl:px-24">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">Our Services</h2>
          <div className="w-24 h-1 bg-gradient mx-auto mb-6"></div>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            We provide a comprehensive suite of digital solutions tailored to your business needs.
          </p>
        </div>

        {/* Services - Alternating left-right layout */}
        <div className="space-y-16 reveal px-4 md:px-12 lg:px-20 xl:px-32">
          {/* Web Development */}
          <div 
            className={`grid grid-cols-1 md:grid-cols-12 gap-8 items-center reveal service-card rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 ease-in-out ${activeHover === 0 ? 'service-hover' : ''}`}
            onMouseEnter={() => setActiveHover(0)}
            onMouseLeave={() => setActiveHover(null)}
          >
            <div className="md:col-span-4 flex justify-center items-center py-4">
              <div className="icon-container">
                <WebDevIcon />
              </div>
            </div>
            <div className="md:col-span-8 px-2">
              <h3 className="text-2xl font-semibold text-neutral-800 mb-3">Web Development</h3>
              <div className="w-16 h-1 bg-gradient mb-4"></div>
              <p className="text-neutral-600 mb-4">
                We create responsive, modern websites that showcase your brand and deliver an exceptional user experience across all devices. 
                Our web solutions combine striking visuals with intuitive navigation to help you connect with your audience effectively.
              </p>
              <div className="service-link">
                <span className="text-sm font-medium text-purple hover:underline cursor-pointer">Learn more →</span>
              </div>
            </div>
          </div>

          {/* App Development */}
          <div 
            className={`grid grid-cols-1 md:grid-cols-12 gap-8 items-center reveal service-card rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 ease-in-out ${activeHover === 1 ? 'service-hover' : ''}`}
            onMouseEnter={() => setActiveHover(1)}
            onMouseLeave={() => setActiveHover(null)}
          >
            <div className="md:col-span-8 md:order-1 order-2 px-2">
              <h3 className="text-2xl font-semibold text-neutral-800 mb-3">App Development</h3>
              <div className="w-16 h-1 bg-gradient mb-4"></div>
              <p className="text-neutral-600 mb-4">
                We design and develop intuitive, feature-rich mobile applications that engage users and solve real business problems.
                Our mobile solutions work seamlessly across platforms, providing a consistent experience that keeps users coming back.
              </p>
              <div className="service-link">
                <span className="text-sm font-medium text-purple hover:underline cursor-pointer">Learn more →</span>
              </div>
            </div>
            <div className="md:col-span-4 md:order-2 order-1 flex justify-center items-center py-4">
              <div className="icon-container">
                <AppDevIcon />
              </div>
            </div>
          </div>

          {/* Hosting Services */}
          <div 
            className={`grid grid-cols-1 md:grid-cols-12 gap-8 items-center reveal service-card rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 ease-in-out ${activeHover === 2 ? 'service-hover' : ''}`}
            onMouseEnter={() => setActiveHover(2)}
            onMouseLeave={() => setActiveHover(null)}
          >
            <div className="md:col-span-4 flex justify-center items-center py-4">
              <div className="icon-container">
                <HostingIcon />
              </div>
            </div>
            <div className="md:col-span-8 px-2">
              <h3 className="text-2xl font-semibold text-neutral-800 mb-3">Hosting Services</h3>
              <div className="w-16 h-1 bg-gradient mb-4"></div>
              <p className="text-neutral-600 mb-4">
                We provide reliable, secure, and scalable hosting solutions to ensure your websites and applications are always available and performing optimally.
                Our infrastructure is built for speed, security, and reliability so you can focus on growing your business.
              </p>
              <div className="service-link">
                <span className="text-sm font-medium text-purple hover:underline cursor-pointer">Learn more →</span>
              </div>
            </div>
          </div>

          {/* Maintenance & Support */}
          <div 
            className={`grid grid-cols-1 md:grid-cols-12 gap-8 items-center reveal service-card rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 ease-in-out ${activeHover === 3 ? 'service-hover' : ''}`}
            onMouseEnter={() => setActiveHover(3)}
            onMouseLeave={() => setActiveHover(null)}
          >
            <div className="md:col-span-8 md:order-1 order-2 px-2">
              <h3 className="text-2xl font-semibold text-neutral-800 mb-3">Maintenance & Support</h3>
              <div className="w-16 h-1 bg-gradient mb-4"></div>
              <p className="text-neutral-600 mb-4">
                We offer ongoing maintenance and support services to keep your digital solutions running smoothly, secure, and up-to-date with the latest technologies.
                Our team provides responsive support to address issues promptly and implement enhancements to keep your business moving forward.
              </p>
              <div className="service-link">
                <span className="text-sm font-medium text-purple hover:underline cursor-pointer">Learn more →</span>
              </div>
            </div>
            <div className="md:col-span-4 md:order-2 order-1 flex justify-center items-center py-4">
              <div className="icon-container">
                <SupportIcon />
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-16 reveal">
          <Link href="#contact">
            <button className="btn-gradient text-white font-semibold py-3 px-8 rounded-lg shadow-lg inline-flex items-center">
              <span>Get in Touch</span>
              <svg className="ml-2 w-5 h-5 animate-bounce-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}