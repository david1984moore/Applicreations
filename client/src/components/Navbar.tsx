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
    const section = document.getElementById(sectionId);
    
    if (section) {
      // Force scroll to section using scrollIntoView even if hash is the same
      section.scrollIntoView({ behavior: 'smooth' });
      
      // Add a small delay and then adjust for navbar height
      setTimeout(() => {
        window.scrollBy({
          top: -70, // Adjust for navbar height
          behavior: 'smooth'
        });
      }, 50);
      
      // Update hash without causing a scroll (which we've already handled)
      history.pushState(null, '', `#${sectionId}`);
    } else {
      console.error("Section not found:", sectionId);
    }
    
    // Close mobile menu if open
    setMobileMenuOpen(false);
  };

  // Different gradients for mobile versus desktop
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // Update isMobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Use the same gradient for all screen sizes to match the rest of the site
  const navbarBackground = 'linear-gradient(110deg, #6b48ff 20%, #4b79ff 80%, #3881ff)';

  // No border to avoid line between navbar and content
  const borderStyle = 'none';

  // No box shadow to avoid line between navbar and content
  const boxShadowStyle = 'none';

  return (
    <header 
      className="z-[1000] flex items-center h-[70px] fixed top-0"
      style={{ 
        background: 'transparent',
        borderBottom: 'none',
        boxShadow: 'none',
        transition: 'all 0.3s ease',
        width: 'calc(100% - var(--scrollbar-width))', // Subtract scrollbar width from total width
        left: 0,
        right: 'var(--scrollbar-width)',
        outline: 'none',
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
            className="text-white p-2 rounded-md hover:bg-white/10 focus:outline-none transition-colors"
            onClick={toggleMobileMenu}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      
        {/* Mobile Navigation Menu */}
        <div 
          className={`fixed left-0 w-full top-[70px] md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
          }`}
          style={{
            background: 'linear-gradient(110deg, #6b48ff 20%, #4b79ff 80%, #3881ff)',
            boxShadow: 'none',
            zIndex: 999,
            transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-10px)',
          }}
        >
          <div className="pt-3 pb-3 space-y-4 px-6">
            <a 
              href="#home" 
              className="block font-medium py-2 text-base text-white hover:text-gray-200 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('home');
              }}
            >
              Home
            </a>
            <a 
              href="#what-we-do" 
              className="block font-medium py-2 text-base text-white hover:text-gray-200 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('what-we-do');
              }}
            >
              What We Do
            </a>
            <a 
              href="#contact" 
              className="block font-medium py-2 text-base text-white hover:text-gray-200 transition-colors"
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
