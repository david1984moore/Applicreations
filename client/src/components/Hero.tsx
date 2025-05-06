import { useRef } from 'react';
import { Logo } from './Logo';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="hero min-h-[80vh] flex flex-col justify-center items-center px-10 py-[40px] overflow-hidden"
      style={{ background: 'linear-gradient(90deg, #6b48ff 0%, #00ddeb 100%)' }}
    >
      {/* Logo centered at the top */}
      <Logo className="h-[150px] w-auto mb-[20px]" />
      
      {/* Concise headline */}
      <h1 className="text-[3.5rem] font-[700] text-white leading-tight mb-[15px] text-center">
        Crafting Digital Excellence
      </h1>
      
      {/* Short tagline */}
      <p className="text-[1.3rem] text-white mb-[30px] text-center">
        We build stunning websites and apps tailored for your success.
      </p>
      
      {/* CTA Button */}
      <a 
        href="#contact"
        className="inline-flex items-center justify-center py-[15px] px-[40px] bg-white text-[#6b48ff] font-[600] text-[1.2rem] rounded-[50px] border-0 hover:bg-[#f0f0f0] transform hover:scale-[1.05] transition-all duration-300"
      >
        Get Started Now
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
