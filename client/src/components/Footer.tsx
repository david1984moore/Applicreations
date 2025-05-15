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
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <p className="text-white/80 text-sm">Wilmington, Delaware</p>
        </div>
        
        <nav className="mb-8">
          <ul className="flex flex-wrap justify-center gap-5">
            <li>
              <button 
                onClick={() => scrollToSection('home')}
                className="text-white text-sm md:text-base hover:opacity-80"
              >
                Home
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('what-we-do')}
                className="text-white text-sm md:text-base hover:opacity-80"
              >
                Our Process
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('our-services')}
                className="text-white text-sm md:text-base hover:opacity-80"
              >
                Services
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="text-white text-sm md:text-base hover:opacity-80 font-semibold"
              >
                Pricing
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-white text-sm md:text-base hover:opacity-80"
              >
                Contact
              </button>
            </li>
          </ul>
        </nav>
        
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
