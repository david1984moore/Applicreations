
import { useMobile } from '@/hooks/use-mobile';
import { useState, useEffect } from 'react';

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useMobile();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center overflow-hidden bg-primary py-20 md:py-28"
      style={{
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      }}
    >
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:30px_30px]"></div>
      
      <div className="container relative z-10 mx-auto px-4 text-center">
        <h1 
          className={`text-5xl md:text-7xl font-bold text-white mb-6 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          } transition-all duration-1000 ease-out`}
          style={{ transitionDelay: '0.1s' }}
        >
          We turn problems into <span className="text-yellow-300">solutions</span>
        </h1>
        
        <p
          className={`text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          } transition-all duration-1000 ease-out`}
          style={{ transitionDelay: '0.3s' }}
        >
          We build custom apps and websites that help your business thrive in the digital world
        </p>
        
        <a
          href="#contact"
          className={`animated-button ${isMobile ? 'animated-button-mobile' : ''} relative inline-flex items-center justify-center py-[10px] px-[26px] font-[500] text-[0.95rem] rounded-[50px] border-0 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-transform duration-700 ease-out overflow-hidden outline-none shadow-none`}
          style={{ 
            transitionDelay: '0.6s'
          }}
        >
          <span className="button-text relative z-10 ml-5">Get Started Now</span>
          <span className="button-text-hover absolute z-10 ml-5">Get Started Now</span>
        </a>
      </div>
    </section>
  );
}

import { useRef, useEffect, useState } from 'react';
import { useMobile } from '@/hooks/use-mobile';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useMobile();

  useEffect(() => {
    // Trigger animation after component mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="hero min-h-[85vh] flex flex-col justify-center items-center px-10 m-0 overflow-hidden"
      style={{ 
        background: 'none', /* Remove individual background */
        paddingTop: '120px', /* Extra space without relying on navbar height */
        paddingBottom: '180px',
        margin: 0,
        border: 'none',
        boxShadow: 'none',
        outline: 'none',
        position: 'relative',
        zIndex: 3 /* Position hero content above the gradient overlay */
      }}
    >
      
      
      {/* Eye-catching tagline with animation */}
      <div 
        className={`text-center transform transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} mb-[40px] mt-[100px]`}
        style={{ transitionDelay: '0.4s' }}
      >
        <p className="text-[1.65rem] md:text-[1.8rem] font-bold text-white leading-tight">
          We turn <span className="text-white">problems</span> into <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-orange-400">solutions</span>
        </p>
        <p className="text-[1.3rem] md:text-[1.5rem] font-medium text-white/90 mt-2">
          with custom apps and websites.
        </p>
      </div>
      
      {/* CTA Button with animation - Modified for mobile to prevent hover state */}
      <a 
        href="#contact"
        className={`animated-button ${isMobile ? 'animated-button-mobile' : ''} relative inline-flex items-center justify-center py-[10px] px-[26px] font-[500] text-[0.95rem] rounded-[50px] border-0 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-transform duration-700 ease-out overflow-hidden outline-none shadow-none`}
        style={{ 
          transitionDelay: '0.6s'
        }}
      >
        <span className="button-text relative z-10 ml-5">Get Started Now</span>
        <span className="button-text-hover absolute z-10 ml-5">Get Started Now</span>
      </a>
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
