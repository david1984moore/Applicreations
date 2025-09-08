import { useEffect, useRef } from 'react';
import { FileCode, Layers, CloudCog, Hammer } from "lucide-react";

// Add more compact styles for mobile
const iconContainerClass = "h-16 w-16 md:h-28 md:w-28 text-blue-600 drop-shadow-md";
const compactPaddingClass = "py-2 md:py-4";

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
    <section id="our-services" ref={sectionRef} className="pt-12 md:pt-24 pb-10 md:pb-16 bg-[#f8f9fb] light-bg-section" style={{ borderTop: 'none', marginTop: 0 }}>
      <div className="container mx-auto px-4 md:px-10 lg:px-16 xl:px-24">
        <div className="text-center mb-4 md:mb-16 reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-3 relative inline-block">
            Services
          </h2>
        </div>

        {/* Services - Alternating left-right layout with improved visuals */}
        <div className="space-y-4 md:space-y-20 reveal px-2 md:px-12 lg:px-20 xl:px-32">
          {/* Web Development - Left image, right text */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center reveal relative">
            <div className="absolute -z-10 w-full h-full opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4xNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTEyIDBoNnY2aC02di02em0xMiAwaDZ2NmgtNnYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] rounded-3xl transform rotate-3"></div>
            <div className="md:col-span-4 flex justify-center items-center py-2 md:py-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full opacity-20 blur-xl transform scale-125"></div>
                <div className="relative z-10">
                  <FileCode className="h-16 w-16 md:h-28 md:w-28 text-gray-600 drop-shadow-md" strokeWidth={1.5} />
                </div>
              </div>
            </div>
            <div className="md:col-span-8 px-1 md:px-2">
              <div className="bg-white bg-opacity-90 backdrop-blur-sm p-2 md:p-6 rounded-xl relative z-10 border-0 shadow-sm">
                <h3 className="text-xl md:text-2xl font-semibold text-black mb-1 md:mb-4">Web Development</h3>
                <div className="w-12 md:w-16 h-1 bg-gradient mb-1 md:mb-4"></div>
                <p className="text-neutral-dark/70 leading-relaxed">
                  We create responsive, modern websites that showcase your brand and deliver an exceptional user experience across all devices. 
                  Our web solutions combine striking visuals with intuitive navigation to help you connect with your audience effectively.
                </p>
                <p className="text-blue-600 font-medium mt-3 mb-1">
                  Starting at $250 for simple websites.
                </p>
                <div className="mt-2 md:mt-4 flex gap-2 md:gap-4">
                  <span className="inline-flex items-center text-sm font-medium text-blue-600"><svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Responsive Design</span>
                  <span className="inline-flex items-center text-sm font-medium text-blue-600"><svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Performance Focused</span>
                </div>
              </div>
            </div>
          </div>

          {/* App Development - Right image, left text */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center reveal relative">
            <div className="absolute -z-10 w-full h-full opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4xNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTEyIDBoNnY2aC02di02em0xMiAwaDZ2NmgtNnYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] rounded-3xl transform -rotate-2"></div>
            <div className="md:col-span-8 md:order-1 order-2 px-1 md:px-2">
              <div className="bg-white bg-opacity-90 backdrop-blur-sm p-2 md:p-6 rounded-xl relative z-10 border-0 shadow-sm">
                <h3 className="text-xl md:text-2xl font-semibold text-black mb-1 md:mb-4">App Development</h3>
                <div className="w-12 md:w-16 h-1 bg-gradient mb-1 md:mb-4"></div>
                <p className="text-neutral-dark/70 leading-relaxed">
                  Strategy and thoughtful design are the cornerstones of our process. We take the time to truly understand your problem and work closely with you to create the remedy you're seeking.
                </p>
                <p className="text-blue-600 font-medium mt-3">
                  Contact us for a free quote.
                </p>
              </div>
            </div>
            <div className="md:col-span-4 md:order-2 order-1 flex justify-center items-center py-2 md:py-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full opacity-20 blur-xl transform scale-125"></div>
                <div className="relative z-10">
                  <Layers className="h-16 w-16 md:h-28 md:w-28 text-gray-600 drop-shadow-md" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </div>

          {/* Hosting Services - Left image, right text */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center reveal relative">
            <div className="absolute -z-10 w-full h-full opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4xNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTEyIDBoNnY2aC02di02em0xMiAwaDZ2NmgtNnYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] rounded-3xl transform rotate-1"></div>
            <div className="md:col-span-4 flex justify-center items-center py-2 md:py-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full opacity-20 blur-xl transform scale-125"></div>
                <div className="relative z-10">
                  <CloudCog className="h-16 w-16 md:h-28 md:w-28 text-gray-600 drop-shadow-md" strokeWidth={1.5} />
                </div>
              </div>
            </div>
            <div className="md:col-span-8 px-1 md:px-2">
              <div className="bg-white bg-opacity-90 backdrop-blur-sm p-2 md:p-6 rounded-xl relative z-10 border-0 shadow-sm">
                <h3 className="text-xl md:text-2xl font-semibold text-black mb-1 md:mb-4">Hosting Services</h3>
                <div className="w-12 md:w-16 h-1 bg-gradient mb-1 md:mb-4"></div>
                <p className="text-neutral-dark/70 leading-relaxed">
                  We provide reliable, secure, and scalable hosting solutions to ensure your websites and applications are always available and performing optimally.
                  Our infrastructure is built for speed, security, and reliability so you can focus on growing your business.
                </p>
                <p className="text-blue-600 font-medium mt-3 mb-1">
                  Starting at $50 per month
                </p>
                <div className="mt-2 md:mt-4 flex gap-2 md:gap-4">
                  <span className="inline-flex items-center text-sm font-medium text-blue-600"><svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Cloud-based</span>
                  <span className="inline-flex items-center text-sm font-medium text-blue-600"><svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>99.9% Uptime</span>
                </div>
              </div>
            </div>
          </div>

          {/* Maintenance & Support - Right image, left text */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center reveal relative">
            <div className="absolute -z-10 w-full h-full opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4xNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTEyIDBoNnY2aC02di02em0xMiAwaDZ2NmgtNnYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] rounded-3xl transform -rotate-1"></div>
            <div className="md:col-span-8 md:order-1 order-2 px-1 md:px-2">
              <div className="bg-white bg-opacity-90 backdrop-blur-sm p-2 md:p-6 rounded-xl relative z-10 border-0 shadow-sm">
                <h3 className="text-xl md:text-2xl font-semibold text-black mb-1 md:mb-4">Maintenance & Support</h3>
                <div className="w-12 md:w-16 h-1 bg-gradient mb-1 md:mb-4"></div>
                <p className="text-neutral-dark/70 leading-relaxed">
                  We offer ongoing maintenance and support services to keep your digital solutions running smoothly, secure, and up-to-date with the latest technologies.
                  Our team provides responsive support to address issues promptly and implement enhancements to keep your business moving forward.
                </p>
                <p className="text-blue-600 font-medium mt-3 mb-1">
                  Starting at $50 per month
                </p>
                <div className="mt-2 md:mt-4 flex gap-2 md:gap-4">
                  <span className="inline-flex items-center text-sm font-medium text-blue-600"><svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>24/7 Support</span>
                  <span className="inline-flex items-center text-sm font-medium text-blue-600"><svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Regular Updates</span>
                </div>
              </div>
            </div>
            <div className="md:col-span-4 md:order-2 order-1 flex justify-center items-center py-2 md:py-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full opacity-20 blur-xl transform scale-125"></div>
                <div className="relative z-10">
                  <Hammer className="h-16 w-16 md:h-28 md:w-28 text-gray-600 drop-shadow-md" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}