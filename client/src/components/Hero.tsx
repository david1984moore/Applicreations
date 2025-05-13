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
        paddingTop: 'calc(70px + 50px)', /* Account for navbar height (70px) plus some extra space */
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
        className={`text-center transform transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} mb-[40px] mt-[20px]`}
        style={{ transitionDelay: '0.4s' }}
      >
        <p className="text-[1.65rem] md:text-[1.8rem] font-bold text-white leading-tight">
          We turn <span className="text-white">problems</span> into <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">solutions</span>
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
