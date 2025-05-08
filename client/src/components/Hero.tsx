import { useRef, useEffect, useState } from 'react';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
        background: 'transparent',
        paddingTop: '120px', /* Increased from 70px to 120px to create more space between navbar and hero */
        paddingBottom: '180px', 
        border: 'none',
        borderTop: 'none',
        boxShadow: 'none',
        outline: 'none',
        marginTop: 0,
        position: 'relative',
        zIndex: 2 /* Position above the gradient overlay */
      }}
    >
      
      
      {/* Eye-catching tagline with animation */}
      <div 
        className={`text-center transform transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} mb-[40px] mt-[20px]`}
        style={{ transitionDelay: '0.4s' }}
      >
        <p className="text-[1.65rem] md:text-[1.8rem] font-bold text-white leading-tight">
          We turn <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-orange-400">problems</span> into <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-teal-400">solutions</span>
        </p>
        <p className="text-[1.3rem] md:text-[1.5rem] font-medium text-white/90 mt-2">
          with custom apps and websites.
        </p>
      </div>
      
      {/* CTA Button with animation - Microfeller style dot expand effect - SMALLER SIZE */}
      <a 
        href="#contact"
        className={`animated-button relative inline-flex items-center justify-center py-[10px] px-[26px] font-[500] text-[0.95rem] rounded-[50px] border-0 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-transform duration-700 ease-out overflow-hidden outline-none shadow-none`}
        style={{ 
          transitionDelay: '0.6s',
          border: 'none',
          outline: 'none'
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
