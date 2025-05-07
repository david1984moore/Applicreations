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
      
      {/* CTA Button with animation - Recreated from the provided spec */}
      <a 
        href="#contact"
        className={`${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-transform duration-700 ease-out`}
        style={{ transitionDelay: '0.6s' }}
      >
        <button className="link-button group/link-button relative inline-block w-max cursor-pointer select-none items-center rounded-full px-4 py-2 text-2 capitalize [--text-color:white]">
          <span className="grid grid-flow-col items-center gap-x-2.5 text-[--text-color]">
            <span className="size-2.5 rounded-full bg-current"></span>
            <span className="overflow-clip">
              <span className="block animate-transform" style={{ "--in-transform-1": "translateY(0%)", "--in-transform-2": "translateY(-100%)", "--duration": "400ms", "--delay": "0ms" } as React.CSSProperties}>
                <span>
                  Get Started Now
                </span>
              </span>
            </span>
          </span>
          <span 
            style={{ 
              '--top': '14.199998069263137px', 
              '--right': '79.579045776872px', 
              '--bottom': '14.20001163171377px', 
              '--left': '16px',
              '--in-transform-1': 'scale(0.5)',
              '--in-transform-2': 'scale(0.1)'
            } as React.CSSProperties} 
            className="absolute bottom-[--bottom] left-[--left] right-[--right] top-[--top] rounded-full bg-[--text-color] transition-[top,right,bottom,left] group-hover/link-button:rounded-full"
          ></span>
          <span 
            className="grid grid-flow-col items-center gap-x-2.5 invert span-full" 
            aria-hidden 
            style={{ 
              '--in-transform-1': 'translateY(0%)', 
              '--in-transform-2': 'translateY(-100%)', 
              '--duration': '400ms', 
              '--delay': '0ms'
            } as React.CSSProperties
          }>
            <span 
              className="size-2.5 animate-transform rounded-full bg-current" 
              style={{ 
                '--in-transform-1': 'scale(0.5)', 
                '--in-transform-2': 'scale(0.1)',
                '--duration': '400ms', 
                '--delay': '0ms'
              } as React.CSSProperties
            }></span>
          </span>
          <span className="absolute inset-0 rounded-full opacity-20 ring-1 ring-inset ring-[--text-color]"></span>
        </button>
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
