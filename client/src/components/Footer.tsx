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
    const homeSection = document.getElementById('home');
    
    if (homeSection) {
      // Scroll to home section
      homeSection.scrollIntoView({ behavior: 'smooth' });
      
      // Adjust for navbar height
      setTimeout(() => {
        window.scrollBy({
          top: -70, // Adjust for navbar height
          behavior: 'smooth'
        });
      }, 50);
      
      // Update URL hash
      history.pushState(null, '', `#home`);
    }
  };
  
  // Changed to black background
  const footerBgClass = "bg-black";
    
  return (
    <footer className={`${footerBgClass} py-10 text-white`}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-center items-center mb-8">
          <div className="text-center">
            <p className="text-white/90 mb-2 font-medium">Wilmington, Delaware</p>
          </div>
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
