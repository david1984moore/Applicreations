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
      className="hero min-h-[80vh] flex flex-col justify-center items-center px-10 m-0 overflow-hidden"
      style={{ background: 'none', paddingTop: '90px', paddingBottom: '40px' }}
    >
      
      
      {/* Short tagline with animation */}
      <p 
        className={`text-[1.5rem] font-semibold text-white mb-[30px] text-center transform transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        style={{ transitionDelay: '0.4s' }}
      >
        Building apps and websites that solve problems.
      </p>
      
      {/* CTA Button with animation - Microfeller style dot expand effect */}
      <a 
        href="#contact"
        className={`animated-button relative inline-flex items-center justify-center py-[15px] px-[40px] font-[600] text-[1.2rem] rounded-[50px] border-0 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-transform duration-700 ease-out`}
        style={{ transitionDelay: '0.6s' }}
      >
        <span className="button-text relative z-10">Get Started Now</span>
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
