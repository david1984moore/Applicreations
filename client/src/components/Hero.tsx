import { useEffect, useRef, useState } from 'react';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add animation on load
    if (heroRef.current) {
      setTimeout(() => {
        setIsVisible(true);
      }, 100);
    }

    // Create floating shapes animation
    const createShapes = () => {
      const shapes = heroRef.current?.querySelectorAll('.floating-shape');
      shapes?.forEach((shape) => {
        const randomDelay = Math.random() * 2;
        const randomDuration = 15 + Math.random() * 15;
        (shape as HTMLElement).style.animationDelay = `${randomDelay}s`;
        (shape as HTMLElement).style.animationDuration = `${randomDuration}s`;
      });
    };

    createShapes();
  }, []);

  const handleClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Background gradient with animated elements */}
      <div className="absolute inset-0 bg-hero-gradient z-0">
        {/* Floating shapes */}
        <div className="floating-shape shape-circle-1"></div>
        <div className="floating-shape shape-circle-2"></div>
        <div className="floating-shape shape-circle-3"></div>
        <div className="floating-shape shape-blob-1"></div>
        <div className="floating-shape shape-blob-2"></div>
        
        {/* Light effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-20"></div>
      </div>
      
      {/* Content */}
      <div className="container relative z-10 mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div 
            className={`text-left transform transition-all duration-1000 ease-out ${
              isVisible 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-12 opacity-0'
            }`}
          >
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Digital <span className="relative">
                <span className="relative z-10">solutions</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-secondary/30 -rotate-1 z-0"></span>
              </span> to real world problems
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-xl">
              Simple, beautiful websites and apps for businesses and consumers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => handleClick('contact')}
                className="hero-cta-button py-4 px-8 text-white font-semibold rounded-full shadow-glow hover:shadow-glow-intense transform hover:scale-105 transition-all duration-300"
              >
                Get Started
              </button>
              <button 
                onClick={() => handleClick('services')}
                className="py-4 px-8 bg-white/10 backdrop-blur-sm text-white border border-white/20 font-semibold rounded-full hover:bg-white/20 transition-all duration-300"
              >
                Explore Services
              </button>
            </div>
            
            {/* Trust indicators */}
            <div className={`mt-12 transform transition-all delay-500 duration-1000 ease-out ${
              isVisible 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-12 opacity-0'
            }`}>
              <p className="text-white/60 text-sm uppercase tracking-wider mb-3">Trusted by innovative brands</p>
              <div className="flex flex-wrap gap-8 items-center">
                <div className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity">
                  <div className="w-20 h-8 bg-white/20 rounded-md backdrop-blur-sm"></div>
                </div>
                <div className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity">
                  <div className="w-24 h-8 bg-white/20 rounded-md backdrop-blur-sm"></div>
                </div>
                <div className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity">
                  <div className="w-28 h-8 bg-white/20 rounded-md backdrop-blur-sm"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Visual element */}
          <div className={`relative transform transition-all duration-1000 delay-300 ease-out ${
            isVisible 
              ? 'translate-y-0 opacity-100 rotate-0' 
              : 'translate-y-12 opacity-0 rotate-3'
          }`}>
            <div className="relative">
              {/* Main device mockup */}
              <div className="p-2 bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 transform rotate-6 hover:rotate-0 transition-transform duration-700">
                <div className="aspect-[9/16] w-full max-w-sm mx-auto bg-white/95 rounded-2xl overflow-hidden shadow-inner">
                  <div className="w-full h-8 bg-neutral-100 flex items-center justify-center">
                    <div className="w-24 h-2 bg-neutral-200 rounded-full"></div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 h-full w-full flex items-center justify-center">
                    <div className="p-6">
                      <div className="h-8 w-4/5 bg-neutral-200 rounded-lg mb-4"></div>
                      <div className="h-36 w-full bg-white rounded-xl shadow-sm mb-4"></div>
                      <div className="space-y-2">
                        <div className="h-4 w-full bg-neutral-200 rounded-full"></div>
                        <div className="h-4 w-5/6 bg-neutral-200 rounded-full"></div>
                        <div className="h-4 w-4/6 bg-neutral-200 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -right-6 top-1/3 w-12 h-12 bg-secondary/80 backdrop-blur-sm rounded-xl transform rotate-12 animate-float-slow"></div>
              <div className="absolute -left-8 bottom-1/4 w-16 h-16 bg-primary/80 backdrop-blur-sm rounded-full animate-float"></div>
              <div className="absolute right-1/4 -bottom-6 w-20 h-8 bg-white/30 backdrop-blur-sm rounded-lg transform -rotate-6 animate-float"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Add this to the global scope or in a separate file if needed
if (typeof window !== "undefined") {
  window.addEventListener('scroll', function() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(function(reveal) {
      const revealTop = reveal.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      const revealPoint = 150;
      
      if (revealTop < windowHeight - revealPoint) {
        reveal.classList.add('active');
      }
    });
  });
}
