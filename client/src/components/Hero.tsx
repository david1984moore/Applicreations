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
      
      {/* Animated Get Started Button with advanced hover effects */}
      <a 
        href="#contact"
        className={`get-started-button ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-700 ease-out`}
        style={{ transitionDelay: '0.6s' }}
      >
        <span className="button-content">
          Get Started Now
        </span>
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
