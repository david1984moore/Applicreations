import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { Logo } from './Logo';

export function Footer() {
  const [currentYear] = useState(new Date().getFullYear());
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // Update mobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Use the same handling as regular navigation links for consistency
    handleNavClick('home');
  };
  
  // Changed to black background
  const footerBgClass = "bg-black";
    
  const handleNavClick = (sectionId: string) => {
    // Similar approach as in Navbar.tsx for consistent behavior
    const section = document.getElementById(sectionId);
    
    if (section) {
      // Get safe area inset top value (or 0 if not supported)
      const safeAreaTop = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-top') || '0');
      
      // Calculate offset with safe area considerations
      const navbarHeight = 70;
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
      
      // Use replaceState instead of pushState to prevent navigation issues
      history.replaceState(null, '', `#${sectionId}`);
    } else {
      console.error("Section not found:", sectionId);
    }
  };
  
  return (
    <footer className={`${footerBgClass} py-10 text-white mt-auto`}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-center items-center mb-8">
          <div className="text-center">
            <p className="text-white/90 mb-2 font-medium">Wilmington, Delaware</p>
          </div>
        </div>
        
        {/* Navigation Links */}
        <div className="flex justify-center mb-8">
          <ul className="flex flex-wrap justify-center gap-6 md:gap-10">
            <li>
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
            </li>
            <li>
              <a 
                href="#what-we-do" 
                className="text-white hover:text-white/80 transition-colors duration-300 text-sm md:text-base"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('what-we-do');
                }}
              >
                Our Process
              </a>
            </li>
            <li>
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
            </li>
            <li>
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
            </li>
          </ul>
        </div>
        
        <div className="border-t border-white/20 pt-6 text-center">
          {/* Logo section in the middle - clickable */}
          <div className="mb-4 flex justify-center px-4">
            <a 
              href="#home" 
              onClick={handleLogoClick}
              className="h-20 md:w-52 w-full max-w-[280px] flex items-center justify-center py-3 cursor-pointer transition-transform duration-300 hover:scale-105 overflow-visible"
              aria-label="Go to home"
            >
              <Logo className="text-white w-full overflow-visible" />
            </a>
          </div>
          
          {/* Copyright section */}
          <div className="flex items-center justify-center">
            <span className="text-sm text-white/80">&copy; {currentYear} ALL rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
