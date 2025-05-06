import { useEffect, useRef } from 'react';
import { BoltIcon, ArrowPathIcon, CheckCircleIcon, ServerIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';

// Custom SVG component for icons
function Icon({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-16 h-16 bg-gradient rounded-full flex items-center justify-center mx-auto mb-6">
      {children}
    </div>
  );
}

export function WhatWeDo() {
  const sectionRef = useRef<HTMLElement>(null);

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
    <section id="what-we-do" ref={sectionRef} className="py-20 bg-neutral-light">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-4">What We Do</h2>
          <p className="text-lg text-neutral-dark/70 max-w-2xl mx-auto">
            We help businesses and consumers transform their ideas into exceptional digital experiences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 reveal">
          {/* Process Step 1 */}
          <div className="bg-white rounded-lg shadow-md p-8 text-center transition-all duration-300 hover:shadow-lg">
            <Icon>
              <BoltIcon className="h-8 w-8 text-white" />
            </Icon>
            <h3 className="text-xl font-semibold text-neutral-dark mb-4">Ideate</h3>
            <p className="text-neutral-dark/70">
              We collaborate closely with you to understand your goals, challenges, and vision to create the perfect plan.
            </p>
          </div>
          
          {/* Process Step 2 */}
          <div className="bg-white rounded-lg shadow-md p-8 text-center transition-all duration-300 hover:shadow-lg">
            <Icon>
              <ArrowPathIcon className="h-8 w-8 text-white" />
            </Icon>
            <h3 className="text-xl font-semibold text-neutral-dark mb-4">Iterate</h3>
            <p className="text-neutral-dark/70">
              We build, test, and refine your product through collaborative feedback cycles to ensure exceptional quality.
            </p>
          </div>
          
          {/* Process Step 3 */}
          <div className="bg-white rounded-lg shadow-md p-8 text-center transition-all duration-300 hover:shadow-lg">
            <Icon>
              <CheckCircleIcon className="h-8 w-8 text-white" />
            </Icon>
            <h3 className="text-xl font-semibold text-neutral-dark mb-4">Congratulate</h3>
            <p className="text-neutral-dark/70">
              We deliver your polished product and celebrate your success as your digital solution reaches its audience.
            </p>
          </div>
        </div>
        
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 reveal">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800" 
              alt="Website design mockup" 
              className="w-full h-64 object-cover"
              loading="lazy"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-neutral-dark mb-3">Web Development</h3>
              <p className="text-neutral-dark/70">
                We create responsive, modern websites that showcase your brand and deliver an exceptional user experience across all devices.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800" 
              alt="Mobile application interface" 
              className="w-full h-64 object-cover"
              loading="lazy"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-neutral-dark mb-3">App Development</h3>
              <p className="text-neutral-dark/70">
                We design and develop intuitive, feature-rich mobile applications that engage users and solve real business problems.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 reveal">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800" 
              alt="Server room with modern equipment" 
              className="w-full h-64 object-cover"
              loading="lazy"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-neutral-dark mb-3">Hosting Services</h3>
              <p className="text-neutral-dark/70">
                We provide reliable, secure, and scalable hosting solutions to ensure your websites and applications are always available and performing optimally.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1581093458791-9d19c9f0bf9d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800" 
              alt="Computer maintenance and tools" 
              className="w-full h-64 object-cover"
              loading="lazy"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-neutral-dark mb-3">Maintenance & Support</h3>
              <p className="text-neutral-dark/70">
                We offer ongoing maintenance and support services to keep your digital solutions running smoothly, secure, and up-to-date with the latest technologies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
