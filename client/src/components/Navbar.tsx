import { useState, useEffect } from 'react';
import { Logo } from './Logo';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Check for scroll position on component mount and when scrolling
  useEffect(() => {
    // Calculate scrollbar width to prevent navbar from extending over scrollbar
    const calculateScrollbarWidth = () => {
      // Create outer div
      const outer = document.createElement('div');
      outer.style.visibility = 'hidden';
      outer.style.overflow = 'scroll';
      document.body.appendChild(outer);
      
      // Create inner div
      const inner = document.createElement('div');
      outer.appendChild(inner);
      
      // Calculate the width difference
      const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
      
      // Remove divs
      outer.parentNode?.removeChild(outer);
      
      // Set the scrollbar width variable
      // If scrollbar width is 0 (mobile browsers often), use a fallback value
      const finalWidth = scrollbarWidth > 0 ? scrollbarWidth : 0;
      document.documentElement.style.setProperty('--scrollbar-width', `${finalWidth}px`);
    };

    const checkScrollPosition = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Calculate scrollbar width
    calculateScrollbarWidth();
    
    // Initial check
    checkScrollPosition();
    
    // Add event listener
    window.addEventListener('scroll', checkScrollPosition);
    window.addEventListener('resize', calculateScrollbarWidth);
    
    // Update text colors in SVG logo
    const updateLogoColors = () => {
      const logoTexts = document.querySelectorAll('.cls-1, .cls-4, .cls-9, .cls-10, .cls-11, .cls-12, .cls-15');
      logoTexts.forEach(text => {
        if (text instanceof SVGElement) {
          text.style.fill = 'white';
        }
      });
    };
    
    // Execute once on mount
    updateLogoColors();
    document.documentElement.style.setProperty('--nav-link-hover', '#f0f0f0');
    
    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
      window.removeEventListener('resize', calculateScrollbarWidth);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Calculate the offset considering the fixed navbar height
      const navbarHeight = 70; // Height of the navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  // Always apply gradient background regardless of scroll position
  const navbarBackground = 'linear-gradient(90deg, #6b48ff, #00ddeb)';

  // Border only when scrolled
  const borderStyle = scrolled ? '1px solid #ffffff' : 'none';

  // Box shadow only when scrolled
  const boxShadowStyle = scrolled ? '0 2px 10px rgba(0, 0, 0, 0.15)' : 'none';

  return (
    <header 
      className="z-[1000] flex items-center h-[70px] fixed top-0"
      style={{ 
        background: navbarBackground,
        borderBottom: borderStyle,
        boxShadow: boxShadowStyle,
        transition: 'all 0.3s ease',
        width: '100%', // Use 100% width
        left: 0,
        right: 0,
        paddingRight: 'var(--scrollbar-width)', // Use CSS variable for scrollbar width
      }}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between h-full">
        <a 
          href="#home" 
          className="navbar-logo"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
        >
          <Logo className="text-white" />
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
              What We Do
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
        
        {/* Mobile Navigation Button */}
        <div className="md:hidden">
          <button 
            aria-label="Toggle mobile menu"
            className="text-white focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      
        {/* Mobile Navigation Menu */}
        <div 
          className={`absolute left-0 top-[70px] md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-40' : 'max-h-0'
          }`}
          style={{
            background: navbarBackground,
            boxShadow: mobileMenuOpen ? boxShadowStyle : 'none',
            zIndex: 999,
            width: '100%', // Use 100% width
            paddingRight: 'var(--scrollbar-width)', // Use CSS variable for scrollbar width
          }}
        >
          <div className="pt-2 pb-1 space-y-2 px-6">
            <a 
              href="#home" 
              className="block font-medium py-1 text-sm text-white"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('home');
              }}
            >
              Home
            </a>
            <a 
              href="#what-we-do" 
              className="block font-medium py-1 text-sm text-white"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('what-we-do');
              }}
            >
              What We Do
            </a>
            <a 
              href="#contact" 
              className="block font-medium py-1 text-sm text-white"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('contact');
              }}
            >
              Contact
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
