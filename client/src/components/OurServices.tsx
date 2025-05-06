import { 
  ServerIcon, 
  WrenchScrewdriverIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon
} from '@heroicons/react/24/outline';
import { useEffect, useRef } from 'react';

export function OurServices() {
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
    <section id="our-services" ref={sectionRef} className="py-12 bg-neutral-light">
      <div className="container mx-auto px-6 md:px-10 lg:px-16 xl:px-24">
        <div className="text-center mb-12 reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-2">Our Services</h2>
          <p className="text-lg text-neutral-dark/70 max-w-2xl mx-auto">
            We provide a comprehensive suite of digital solutions tailored to your business needs.
          </p>
        </div>

        {/* Services - Alternating left-right layout */}
        <div className="space-y-12 reveal px-4 md:px-12 lg:px-20 xl:px-32">
          {/* Web Development - Left image, right text */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center reveal">
            <div className="md:col-span-4 flex justify-center items-center py-4">
              <GlobeAltIcon className="h-28 w-28 text-purple" />
            </div>
            <div className="md:col-span-8 px-2">
              <h3 className="text-2xl font-semibold text-neutral-dark mb-3">Web Development</h3>
              <div className="w-16 h-1 bg-gradient mb-4"></div>
              <p className="text-neutral-dark/70">
                We create responsive, modern websites that showcase your brand and deliver an exceptional user experience across all devices. 
                Our web solutions combine striking visuals with intuitive navigation to help you connect with your audience effectively.
              </p>
            </div>
          </div>

          {/* App Development - Right image, left text */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center reveal">
            <div className="md:col-span-8 md:order-1 order-2 px-2">
              <h3 className="text-2xl font-semibold text-neutral-dark mb-3">App Development</h3>
              <div className="w-16 h-1 bg-gradient mb-4"></div>
              <p className="text-neutral-dark/70">
                We design and develop intuitive, feature-rich mobile applications that engage users and solve real business problems.
                Our mobile solutions work seamlessly across platforms, providing a consistent experience that keeps users coming back.
              </p>
            </div>
            <div className="md:col-span-4 md:order-2 order-1 flex justify-center items-center py-4">
              <DevicePhoneMobileIcon className="h-28 w-28 text-purple" />
            </div>
          </div>

          {/* Hosting Services - Left image, right text */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center reveal">
            <div className="md:col-span-4 flex justify-center items-center py-4">
              <ServerIcon className="h-28 w-28 text-purple" />
            </div>
            <div className="md:col-span-8 px-2">
              <h3 className="text-2xl font-semibold text-neutral-dark mb-3">Hosting Services</h3>
              <div className="w-16 h-1 bg-gradient mb-4"></div>
              <p className="text-neutral-dark/70">
                We provide reliable, secure, and scalable hosting solutions to ensure your websites and applications are always available and performing optimally.
                Our infrastructure is built for speed, security, and reliability so you can focus on growing your business.
              </p>
            </div>
          </div>

          {/* Maintenance & Support - Right image, left text */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center reveal">
            <div className="md:col-span-8 md:order-1 order-2 px-2">
              <h3 className="text-2xl font-semibold text-neutral-dark mb-3">Maintenance & Support</h3>
              <div className="w-16 h-1 bg-gradient mb-4"></div>
              <p className="text-neutral-dark/70">
                We offer ongoing maintenance and support services to keep your digital solutions running smoothly, secure, and up-to-date with the latest technologies.
                Our team provides responsive support to address issues promptly and implement enhancements to keep your business moving forward.
              </p>
            </div>
            <div className="md:col-span-4 md:order-2 order-1 flex justify-center items-center py-4">
              <WrenchScrewdriverIcon className="h-28 w-28 text-purple" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}