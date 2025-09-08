import { useState } from 'react';
import { Logo } from './Logo';

export function Footer() {
  const [currentYear] = useState(new Date().getFullYear());
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -70; // account for navbar height
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({top: y, behavior: 'smooth'});
    }
  };

  return (
    <footer className="bg-black py-8 text-white">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="text-center mb-6">
          <p className="text-white/80 text-sm">Wilmington, Delaware</p>
        </div>
        
        <div className="mb-8 w-full flex justify-center">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-white text-sm md:text-base hover:opacity-80"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('our-services')}
              className="text-white text-sm md:text-base hover:opacity-80"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-white text-sm md:text-base hover:opacity-80"
            >
              Contact
            </button>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-6 text-center">
          <div className="mb-4">
            <button
              onClick={() => scrollToSection('home')}
              className="inline-block"
              aria-label="Go to home"
            >
              <Logo className="text-white h-16 w-auto" />
            </button>
          </div>
          
          <p className="text-xs text-white/70">
            &copy; {currentYear} ALL rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
