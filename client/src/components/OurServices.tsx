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
    <section id="our-services" ref={sectionRef} className="py-16 bg-gradient-to-b from-neutral-50 to-neutral-100">
      <div className="container mx-auto px-6 md:px-10 lg:px-16 xl:px-24">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-3 relative inline-block">
            Our Services
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient"></span>
          </h2>
          <p className="text-lg text-neutral-dark/70 max-w-2xl mx-auto mt-6">
            We provide a comprehensive suite of digital solutions tailored to your business needs.
          </p>
        </div>

        {/* Services - Alternating left-right layout with improved visuals */}
        <div className="space-y-20 reveal px-4 md:px-12 lg:px-20 xl:px-32">
          {/* Web Development - Left image, right text */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center reveal relative">
            <div className="absolute -z-10 w-full h-full opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4xNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTEyIDBoNnY2aC02di02em0xMiAwaDZ2NmgtNnYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] rounded-3xl transform rotate-3"></div>
            <div className="md:col-span-4 flex justify-center items-center py-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full opacity-20 blur-xl transform scale-125"></div>
                <div className="relative z-10">
                  <GlobeAltIcon className="h-28 w-28 text-purple drop-shadow-md" />
                </div>
              </div>
            </div>
            <div className="md:col-span-8 px-2">
              <div className="bg-white bg-opacity-70 backdrop-blur-sm p-6 rounded-xl shadow-sm relative z-10 border border-gray-100">
                <h3 className="text-2xl font-semibold text-neutral-dark mb-4">Web Development</h3>
                <div className="w-16 h-1 bg-gradient mb-4"></div>
                <p className="text-neutral-dark/70 leading-relaxed">
                  We create responsive, modern websites that showcase your brand and deliver an exceptional user experience across all devices. 
                  Our web solutions combine striking visuals with intuitive navigation to help you connect with your audience effectively.
                </p>
                <div className="mt-4 flex gap-3">
                  <span className="inline-block text-xs bg-purple-100 text-purple px-3 py-1 rounded-full">Responsive Design</span>
                  <span className="inline-block text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">Performance Focused</span>
                </div>
              </div>
            </div>
          </div>

          {/* App Development - Right image, left text */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center reveal relative">
            <div className="absolute -z-10 w-full h-full opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4xNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTEyIDBoNnY2aC02di02em0xMiAwaDZ2NmgtNnYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] rounded-3xl transform -rotate-2"></div>
            <div className="md:col-span-8 md:order-1 order-2 px-2">
              <div className="bg-white bg-opacity-70 backdrop-blur-sm p-6 rounded-xl shadow-sm relative z-10 border border-gray-100">
                <h3 className="text-2xl font-semibold text-neutral-dark mb-4">App Development</h3>
                <div className="w-16 h-1 bg-gradient mb-4"></div>
                <p className="text-neutral-dark/70 leading-relaxed">
                  We design and develop intuitive, feature-rich mobile applications that engage users and solve real business problems.
                  Our mobile solutions work seamlessly across platforms, providing a consistent experience that keeps users coming back.
                </p>
                <div className="mt-4 flex gap-3">
                  <span className="inline-block text-xs bg-purple-100 text-purple px-3 py-1 rounded-full">iOS & Android</span>
                  <span className="inline-block text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">User-Centered Design</span>
                </div>
              </div>
            </div>
            <div className="md:col-span-4 md:order-2 order-1 flex justify-center items-center py-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full opacity-20 blur-xl transform scale-125"></div>
                <div className="relative z-10">
                  <DevicePhoneMobileIcon className="h-28 w-28 text-purple drop-shadow-md" />
                </div>
              </div>
            </div>
          </div>

          {/* Hosting Services - Left image, right text */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center reveal relative">
            <div className="absolute -z-10 w-full h-full opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4xNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTEyIDBoNnY2aC02di02em0xMiAwaDZ2NmgtNnYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] rounded-3xl transform rotate-1"></div>
            <div className="md:col-span-4 flex justify-center items-center py-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full opacity-20 blur-xl transform scale-125"></div>
                <div className="relative z-10">
                  <ServerIcon className="h-28 w-28 text-purple drop-shadow-md" />
                </div>
              </div>
            </div>
            <div className="md:col-span-8 px-2">
              <div className="bg-white bg-opacity-70 backdrop-blur-sm p-6 rounded-xl shadow-sm relative z-10 border border-gray-100">
                <h3 className="text-2xl font-semibold text-neutral-dark mb-4">Hosting Services</h3>
                <div className="w-16 h-1 bg-gradient mb-4"></div>
                <p className="text-neutral-dark/70 leading-relaxed">
                  We provide reliable, secure, and scalable hosting solutions to ensure your websites and applications are always available and performing optimally.
                  Our infrastructure is built for speed, security, and reliability so you can focus on growing your business.
                </p>
                <div className="mt-4 flex gap-3">
                  <span className="inline-block text-xs bg-purple-100 text-purple px-3 py-1 rounded-full">Cloud-based</span>
                  <span className="inline-block text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">99.9% Uptime</span>
                </div>
              </div>
            </div>
          </div>

          {/* Maintenance & Support - Right image, left text */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center reveal relative">
            <div className="absolute -z-10 w-full h-full opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4xNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTEyIDBoNnY2aC02di02em0xMiAwaDZ2NmgtNnYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] rounded-3xl transform -rotate-1"></div>
            <div className="md:col-span-8 md:order-1 order-2 px-2">
              <div className="bg-white bg-opacity-70 backdrop-blur-sm p-6 rounded-xl shadow-sm relative z-10 border border-gray-100">
                <h3 className="text-2xl font-semibold text-neutral-dark mb-4">Maintenance & Support</h3>
                <div className="w-16 h-1 bg-gradient mb-4"></div>
                <p className="text-neutral-dark/70 leading-relaxed">
                  We offer ongoing maintenance and support services to keep your digital solutions running smoothly, secure, and up-to-date with the latest technologies.
                  Our team provides responsive support to address issues promptly and implement enhancements to keep your business moving forward.
                </p>
                <div className="mt-4 flex gap-3">
                  <span className="inline-block text-xs bg-purple-100 text-purple px-3 py-1 rounded-full">24/7 Support</span>
                  <span className="inline-block text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">Regular Updates</span>
                </div>
              </div>
            </div>
            <div className="md:col-span-4 md:order-2 order-1 flex justify-center items-center py-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full opacity-20 blur-xl transform scale-125"></div>
                <div className="relative z-10">
                  <WrenchScrewdriverIcon className="h-28 w-28 text-purple drop-shadow-md" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}