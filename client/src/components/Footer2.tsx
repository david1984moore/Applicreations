import { Logo } from './Logo';
import { useState } from 'react';

export function Footer2() {
  const [currentYear] = useState(new Date().getFullYear());
  
  const handleNavClick = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    
    if (section) {
      const navbarHeight = 70;
      const scrollToPosition = section.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: scrollToPosition,
        behavior: 'smooth'
      });
      
      history.replaceState(null, '', `#${sectionId}`);
    }
  };
  
  return (
    <footer className="bg-black py-10 text-white mt-auto">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-center items-center mb-8">
          <div className="text-center">
            <p className="text-white/90 mb-2 font-medium">Wilmington, Delaware</p>
          </div>
        </div>
        
        {/* Navigation Links */}
        <div 
          className="mb-8" 
          style={{
            display: 'grid !important',
            placeItems: 'center !important',
            width: '100% !important',
            textAlign: 'center !important'
          }}
        >
          <div 
            style={{
              display: 'flex !important',
              justifyContent: 'center !important',
              alignItems: 'center !important',
              gap: '24px !important',
              width: '100% !important'
            }}
          >
            <a 
              href="#home" 
              className="text-white hover:text-white/80 transition-colors duration-300 text-sm md:text-base"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('home');
              }}
            >
              Home
            </a>
            <a 
              href="#our-services" 
              className="text-white hover:text-white/80 transition-colors duration-300 text-sm md:text-base"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('our-services');
              }}
            >
              Services
            </a>
            <a 
              href="#contact" 
              className="text-white hover:text-white/80 transition-colors duration-300 text-sm md:text-base"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('contact');
              }}
            >
              Contact
            </a>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-6 text-center">
          <div className="mb-4 flex justify-center px-4">
            <a 
              href="#home" 
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('home');
              }}
              className="h-20 md:w-52 w-full max-w-[280px] flex items-center justify-center py-3 cursor-pointer transition-transform duration-300 hover:scale-105 overflow-visible"
              aria-label="Go to home"
            >
              <Logo className="text-white w-full overflow-visible" />
            </a>
          </div>
          
          <div className="flex items-center justify-center">
            <span className="text-sm text-white/80">&copy; {currentYear} ALL rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}