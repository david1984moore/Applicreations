import { useState, useEffect } from 'react';
import { Logo } from './Logo';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Check for scroll position on component mount and when scrolling
  useEffect(() => {
    const checkScrollPosition = () => {
      setScrolled(window.scrollY > 0);
    };
    
    checkScrollPosition();
    window.addEventListener('scroll', checkScrollPosition);
    
    // Update text colors in SVG logo
    const updateLogoColors = () => {
      const logoTexts = document.querySelectorAll('.cls-1, .cls-4, .cls-9, .cls-10, .cls-11, .cls-12, .cls-15');
      logoTexts.forEach(text => {
        if (text instanceof SVGElement) {
          text.style.fill = 'white';
        }
      });
    };
    
    updateLogoColors();
    document.documentElement.style.setProperty('--nav-link-hover', '#f0f0f0');
    
    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
    };
  }, []);
  
  const handleNavClick = (sectionId: string) => {
    // Close mobile menu first for better UX
    setMobileMenuOpen(false);
    
    // Slight delay to allow menu to close before scrolling
    setTimeout(() => {
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
        
        // Use replaceState instead of pushState to prevent navigation issues in WebViews
        history.replaceState(null, '', `#${sectionId}`);
      } else {
        console.error("Section not found:", sectionId);
      }
    }, 10);
  };

  // Change background color to black
  const navbarBackground = '#000000';
  
  return (
    <div className="sticky top-0 left-0 right-0 w-full z-[1000]">
      <header 
        className="z-[1000] flex items-center h-[70px] w-full"
        style={{ 
          background: navbarBackground,
          borderBottom: 'none',
          boxShadow: scrolled ? '0 2px 10px rgba(0,0,0,0.2)' : 'none',
          transition: 'all 0.3s ease',
          // Ensure status bar area isn't blocked for tap-to-top functionality
          paddingTop: 'env(safe-area-inset-top, 0)',
          position: 'relative' // Ensure position is relative within sticky container
        }}
      >
        <nav className="w-full px-4 flex items-center justify-between h-full">
          <a 
            href="#home" 
            className="navbar-logo max-w-[70%] md:max-w-none"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
          >
            <Logo className="text-white scale-[0.85] md:scale-100" />
          </a>
          
          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-6">
            <li>
              <a 
                href="#home" 
                className="nav-link font-medium text-md transition-colors duration-300 text-white"
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
                className="nav-link font-medium text-md transition-colors duration-300 text-white"
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
                className="nav-link font-medium text-md transition-colors duration-300 text-white"
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
                className="nav-link font-medium text-md transition-colors duration-300 text-white"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('contact');
                }}
              >
                Contact
              </a>
            </li>
          </ul>
          
          {/* Simple Hamburger Button - No fancy logic */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 18L18 6M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20M4 12H20M4 18H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        </nav>
      </header>
      
      {/* Very Simple Static Mobile Menu */}
      {mobileMenuOpen && (
        <div 
          className="absolute left-0 right-0 w-full z-[999]"
          style={{
            background: navbarBackground, // Uses black background from navbar
            top: '70px', // Position calculated from navbar height
            paddingBottom: 'env(safe-area-inset-bottom, 0)',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
            paddingTop: '0'
          }}
        >
          <div className="py-2 px-4 flex flex-col items-end">
            <a 
              href="#home"
              className="block py-1.5 text-white text-base font-medium"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('home');
              }}
            >
              Home
            </a>
            <a 
              href="#what-we-do"
              className="block py-1.5 text-white text-base font-medium"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('what-we-do');
              }}
            >
              Our Process
            </a>
            <a 
              href="#our-services"
              className="block py-1.5 text-white text-base font-medium"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('our-services');
              }}
            >
              Services
            </a>
            <a 
              href="#contact"
              className="block py-1.5 text-white text-base font-medium"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('contact');
              }}
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
