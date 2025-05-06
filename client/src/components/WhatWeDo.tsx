import { useEffect, useRef } from 'react';

// Custom SVG component for process icons
function Icon({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-16 h-16 bg-gradient rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-3 relative z-10">
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
    <section id="what-we-do" ref={sectionRef} className="pt-24 pb-12 bg-neutral-light light-bg-section">
      <div className="container mx-auto px-6 md:px-10 lg:px-16 xl:px-24">
        <div className="text-center mb-12 reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-2">What We Do</h2>
        </div>

        {/* Process Timeline - Desktop view shows horizontal flow */}
        <div className="hidden lg:block mb-16 reveal">
          <div className="relative">
            {/* Process connection line */}
            <div className="absolute top-1/2 left-[12%] right-[12%] h-1 bg-gradient-to-r from-purple/30 via-purple/50 to-purple/30 transform -translate-y-1/2"></div>

            <div className="flex justify-between">
              {/* Process Step 1 */}
              <div className="w-1/3 px-4">
                <div className="flex flex-col items-center">
                  <Icon>
                    <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </Icon>
                  <div className="bg-white rounded-lg shadow-md p-5 text-center transition-all duration-300 hover:shadow-lg mt-3 w-full">
                    <h3 className="text-xl font-semibold text-neutral-dark mb-2">Ideate</h3>
                    <p className="text-neutral-dark/70">
                      We collaborate closely with you to understand your goals, challenges, and vision to create the perfect plan.
                    </p>
                  </div>
                </div>
              </div>

              {/* Process Step 2 */}
              <div className="w-1/3 px-4">
                <div className="flex flex-col items-center">
                  <Icon>
                    <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </Icon>
                  <div className="bg-white rounded-lg shadow-md p-5 text-center transition-all duration-300 hover:shadow-lg mt-3 w-full">
                    <h3 className="text-xl font-semibold text-neutral-dark mb-2">Iterate</h3>
                    <p className="text-neutral-dark/70">
                      We build, test, and refine your product through collaborative feedback cycles to ensure exceptional quality.
                    </p>
                  </div>
                </div>
              </div>

              {/* Process Step 3 */}
              <div className="w-1/3 px-4">
                <div className="flex flex-col items-center">
                  <Icon>
                    <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </Icon>
                  <div className="bg-white rounded-lg shadow-md p-5 text-center transition-all duration-300 hover:shadow-lg mt-3 w-full">
                    <h3 className="text-xl font-semibold text-neutral-dark mb-2">Congratulate</h3>
                    <p className="text-neutral-dark/70">
                      We deliver your polished product and celebrate your success as your digital solution reaches its audience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Process Mobile View - Vertical flow */}
        <div className="lg:hidden mb-12 reveal">
          <div className="grid grid-cols-1 gap-12 relative">
            {/* Vertical line connecting process steps */}
            <div className="absolute top-0 bottom-0 left-8 w-1 bg-gradient-to-b from-purple/30 via-purple/50 to-purple/30"></div>

            {/* Process Step 1 */}
            <div className="flex">
              <div className="mr-6 relative z-10">
                <Icon>
                  <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </Icon>
              </div>
              <div className="bg-white rounded-lg shadow-md p-5 flex-1">
                <h3 className="text-xl font-semibold text-neutral-dark mb-2">Ideate</h3>
                <p className="text-neutral-dark/70">
                  We collaborate closely with you to understand your goals, challenges, and vision to create the perfect plan.
                </p>
              </div>
            </div>

            {/* Process Step 2 */}
            <div className="flex">
              <div className="mr-6 relative z-10">
                <Icon>
                  <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </Icon>
              </div>
              <div className="bg-white rounded-lg shadow-md p-5 flex-1">
                <h3 className="text-xl font-semibold text-neutral-dark mb-2">Iterate</h3>
                <p className="text-neutral-dark/70">
                  We build, test, and refine your product through collaborative feedback cycles to ensure exceptional quality.
                </p>
              </div>
            </div>

            {/* Process Step 3 */}
            <div className="flex">
              <div className="mr-6 relative z-10">
                <Icon>
                  <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </Icon>
              </div>
              <div className="bg-white rounded-lg shadow-md p-5 flex-1">
                <h3 className="text-xl font-semibold text-neutral-dark mb-2">Congratulate</h3>
                <p className="text-neutral-dark/70">
                  We deliver your polished product and celebrate your success as your digital solution reaches its audience.
                </p>
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}