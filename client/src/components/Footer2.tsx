import { Logo } from './Logo';
import { useState } from 'react';

export function Footer2() {
  const [currentYear] = useState(new Date().getFullYear());
  
  const handleNavClick = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    
    if (section) {
      // Get safe area inset top value (or 0 if not supported)
      const safeAreaTop = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-top') || '0');
      
      // Calculate offset with safe area considerations
      // Use negative offset to account for section padding (Services has pt-12 md:pt-24)
      const navbarHeight = -50; // Negative offset to compensate for Services section padding
      const totalOffset = navbarHeight + safeAreaTop;
      
      // Get the position of the section relative to the document
      const sectionRect = section.getBoundingClientRect();
      const sectionTop = sectionRect.top + window.pageYOffset;
      
      // Calculate position accounting for navbar height and safe area
      const scrollToPosition = sectionTop - totalOffset;
      
      // Use window.scrollTo for more reliable smooth scrolling
      window.scrollTo({
        top: scrollToPosition,
        behavior: 'smooth'
      });
      
      // Use replaceState instead of pushState to prevent navigation issues in WebViews
      history.replaceState(null, '', `#${sectionId}`);
    } else {
      console.error("Section not found:", sectionId);
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
        <div className="mb-8 flex justify-center">
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              whiteSpace: 'nowrap'
            }}
          >
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
            <span className="text-sm text-white/80">&copy; {currentYear} Applicreations, ALL rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}