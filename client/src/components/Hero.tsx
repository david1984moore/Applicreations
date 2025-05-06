import { useEffect, useRef } from 'react';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add animation on load
    if (heroRef.current) {
      setTimeout(() => {
        const element = heroRef.current?.querySelector('[data-animation]');
        if (element) {
          element.classList.add('animate-fade-in');
        }
      }, 100);
    }
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
      className="min-h-screen flex items-center pt-20 bg-gradient"
    >
      <div className="container mx-auto px-6 py-20">
        <div 
          className="max-w-4xl mx-auto text-center opacity-0" 
          data-animation="fade-in"
          style={{ animation: 'fadeIn 0.8s ease-out forwards' }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Digital solutions to <br className="hidden md:block"/> real world problems
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-10">
            We create simple, beautiful, functional websites and apps for people and businesses.
          </p>
          <button 
            onClick={() => handleClick('contact')}
            className="inline-block py-3 px-8 bg-white text-purple-600 font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Get Started
          </button>
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
