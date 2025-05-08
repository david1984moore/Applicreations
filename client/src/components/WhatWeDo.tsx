import { useEffect, useRef, useState } from 'react';

// Custom SVG component for process icons with the new design
function Icon({ children, color = "bg-white/20", iconColor = "text-white" }: { 
  children: React.ReactNode;
  color?: string;
  iconColor?: string;
}) {
  return (
    <div className={`w-16 h-16 rounded-full ${color} backdrop-blur-sm flex items-center justify-center mx-auto relative z-10 shadow-lg`}>
      <div className={iconColor}>
        {children}
      </div>
    </div>
  );
}

// Light Bulb container with trigger-based animation
function LightBulbContainer({ children }: { children: React.ReactNode }) {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleMouseEnter = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      // Reset animation after 1.5 seconds
      setTimeout(() => {
        setIsAnimating(false);
      }, 1500);
    }
  };
  
  return (
    <div 
      className="lightbulb-container w-full" 
      title="Hover to light up the idea!"
      onMouseEnter={handleMouseEnter}
    >
      {/* Light bulb glow and rays */}
      <div className={`lightbulb-glow ${isAnimating ? 'animate-glow' : ''}`}></div>
      <div className={`lightbulb-rays ${isAnimating ? 'animate-rays' : ''}`}>
        <div className="lightbulb-ray ray-1"></div>
        <div className="lightbulb-ray ray-2"></div>
        <div className="lightbulb-ray ray-3"></div>
        <div className="lightbulb-ray ray-4"></div>
        <div className="lightbulb-ray ray-5"></div>
        <div className="lightbulb-ray ray-6"></div>
        <div className="lightbulb-ray ray-7"></div>
        <div className="lightbulb-ray ray-8"></div>
      </div>
      
      {children}
    </div>
  );
}

// Confetti container with trigger-based animation
function ConfettiContainer({ children }: { children: React.ReactNode }) {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleMouseEnter = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      // Reset animation after 1.5 seconds
      setTimeout(() => {
        setIsAnimating(false);
      }, 1500);
    }
  };
  
  return (
    <div 
      className="confetti-container w-full" 
      title="Hover for celebration!"
      onMouseEnter={handleMouseEnter}
    >
      {/* Confetti pieces - positioned around the icon */}
      <div className={`confetti ${isAnimating ? 'animate-confetti' : ''}`} style={{ top: '-10px', left: '25%', animationDelay: '0s' }}></div>
      <div className={`confetti yellow ${isAnimating ? 'animate-confetti' : ''}`} style={{ top: '-5px', left: '60%', animationDelay: '0.1s' }}></div>
      <div className={`confetti blue ${isAnimating ? 'animate-confetti' : ''}`} style={{ top: '0px', left: '80%', animationDelay: '0.2s' }}></div>
      <div className={`confetti green ${isAnimating ? 'animate-confetti' : ''}`} style={{ top: '5px', left: '30%', animationDelay: '0.3s' }}></div>
      <div className={`confetti purple ${isAnimating ? 'animate-confetti' : ''}`} style={{ top: '10px', left: '70%', animationDelay: '0.4s' }}></div>
      <div className={`confetti yellow ${isAnimating ? 'animate-confetti' : ''}`} style={{ top: '-5px', left: '40%', animationDelay: '0.5s' }}></div>
      <div className={`confetti ${isAnimating ? 'animate-confetti' : ''}`} style={{ top: '0px', left: '20%', animationDelay: '0.6s' }}></div>
      <div className={`confetti blue ${isAnimating ? 'animate-confetti' : ''}`} style={{ top: '5px', left: '55%', animationDelay: '0.7s' }}></div>
      
      {children}
    </div>
  );
}

// Roof container with trigger-based animation
function RoofContainer({ children }: { children: React.ReactNode }) {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleMouseEnter = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      // Reset animation after 1.5 seconds
      setTimeout(() => {
        setIsAnimating(false);
      }, 1500);
    }
  };
  
  return (
    <div 
      className="roof-container w-full" 
      title="Hover to see construction!"
      onMouseEnter={handleMouseEnter}
    >
      {/* Roof elements */}
      <div className={`roof ${isAnimating ? 'animate-roof' : ''}`}></div>
      <div className={`roof-body ${isAnimating ? 'animate-roof-body' : ''}`}></div>
      <div className={`chimney ${isAnimating ? 'animate-chimney' : ''}`}></div>
      <div className={`smoke smoke-1 ${isAnimating ? 'animate-smoke' : ''}`} style={{ animationDelay: '0.1s' }}></div>
      <div className={`smoke smoke-2 ${isAnimating ? 'animate-smoke' : ''}`} style={{ animationDelay: '0.2s' }}></div>
      <div className={`smoke smoke-3 ${isAnimating ? 'animate-smoke' : ''}`} style={{ animationDelay: '0.3s' }}></div>
      
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
    <section 
      id="what-we-do" 
      ref={sectionRef} 
      className="py-24 relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(110deg, #6b48ff 20%, #4b79ff 80%, #3881ff)',
      }}
    >
      {/* Subtle background pattern for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-20"></div>
      
      <div className="container mx-auto px-6 md:px-10 lg:px-16 xl:px-24 relative z-10">
        <div className="text-center mb-16 reveal">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">What We Do</h2>
        </div>

        {/* Desktop View */}
        <div className="hidden md:flex gap-8 reveal">
          {/* Card 1: Ideate - Orange/Red Color Scheme with Light Bulb */}
          <LightBulbContainer>
            <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-lg transition-all duration-300 cursor-pointer">
              <div className="flex flex-col items-center text-center">
                <Icon color="bg-gradient-to-br from-orange-400 to-red-500" iconColor="text-white">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </Icon>
                <h3 className="text-2xl font-bold text-white mt-6 mb-4">Ideate</h3>
                <p className="text-white/90 text-lg">
                  We collaborate closely with you to understand your goals, challenges, and vision to create the perfect plan.
                </p>
              </div>
            </div>
          </LightBulbContainer>

          {/* Card 2: Iterate - Green Color Scheme with Roof */}
          <RoofContainer>
            <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-lg transition-all duration-300 cursor-pointer">
              <div className="flex flex-col items-center text-center">
                <Icon color="bg-gradient-to-br from-emerald-400 to-teal-500" iconColor="text-white">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </Icon>
                <h3 className="text-2xl font-bold text-white mt-6 mb-4">Iterate</h3>
                <p className="text-white/90 text-lg">
                  We build, test, and refine your product through collaborative feedback cycles to ensure exceptional quality.
                </p>
              </div>
            </div>
          </RoofContainer>

          {/* Card 3: Congratulate - Pink Color Scheme with Confetti */}
          <ConfettiContainer>
            <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-lg transition-all duration-300 cursor-pointer">
              <div className="flex flex-col items-center text-center">
                <Icon color="bg-gradient-to-br from-pink-400 to-rose-500" iconColor="text-white">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </Icon>
                <h3 className="text-2xl font-bold text-white mt-6 mb-4">Congratulate</h3>
                <p className="text-white/90 text-lg">
                  We deliver your polished product and celebrate your success as your digital solution reaches its audience.
                </p>
              </div>
            </div>
          </ConfettiContainer>
        </div>

        {/* Mobile View - Stacked cards */}
        <div className="md:hidden space-y-6 reveal">
          {/* Card 1: Ideate - Orange/Red Color Scheme with Light Bulb */}
          <LightBulbContainer>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg cursor-pointer">
              <div className="flex flex-col items-center text-center">
                <Icon color="bg-gradient-to-br from-orange-400 to-red-500" iconColor="text-white">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </Icon>
                <h3 className="text-xl font-bold text-white mt-4 mb-2">Ideate</h3>
                <p className="text-white/90">
                  We collaborate closely with you to understand your goals, challenges, and vision to create the perfect plan.
                </p>
              </div>
            </div>
          </LightBulbContainer>

          {/* Card 2: Iterate - Green Color Scheme with Roof */}
          <RoofContainer>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg cursor-pointer">
              <div className="flex flex-col items-center text-center">
                <Icon color="bg-gradient-to-br from-emerald-400 to-teal-500" iconColor="text-white">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </Icon>
                <h3 className="text-xl font-bold text-white mt-4 mb-2">Iterate</h3>
                <p className="text-white/90">
                  We build, test, and refine your product through collaborative feedback cycles to ensure exceptional quality.
                </p>
              </div>
            </div>
          </RoofContainer>

          {/* Card 3: Congratulate - Pink Color Scheme with Confetti */}
          <ConfettiContainer>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg cursor-pointer">
              <div className="flex flex-col items-center text-center">
                <Icon color="bg-gradient-to-br from-pink-400 to-rose-500" iconColor="text-white">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </Icon>
                <h3 className="text-xl font-bold text-white mt-4 mb-2">Congratulate</h3>
                <p className="text-white/90">
                  We deliver your polished product and celebrate your success as your digital solution reaches its audience.
                </p>
              </div>
            </div>
          </ConfettiContainer>
        </div>
      </div>
    </section>
  );
}