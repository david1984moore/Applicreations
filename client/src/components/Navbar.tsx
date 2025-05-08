import { useState, useEffect, useRef } from 'react';
import { Logo } from './Logo';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Check for scroll position on component mount and when scrolling
  useEffect(() => {
    const checkScrollPosition = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    // Initial check
    checkScrollPosition();
    
    // Add event listener
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
    
    // Execute once on mount
    updateLogoColors();
    document.documentElement.style.setProperty('--nav-link-hover', '#f0f0f0');
    
    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
    };
  }, []);

  // Setup click outside handler to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuOpen) {
        // Check if click is outside both menu and the hamburger button
        const target = event.target as Node;
        const isOutsideMenu = menuRef.current && !menuRef.current.contains(target);
        const isOutsideButton = buttonRef.current && !buttonRef.current.contains(target);
        
        if (isOutsideMenu && isOutsideButton) {
          setMobileMenuOpen(false);
        }
      }
    };
    
    // Add click event listener 
    document.addEventListener('mousedown', handleClickOutside);
    
    // Clean up event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMobileMenuOpen(prevState => !prevState);
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

  return (
    <header 
      className="z-[1000] flex items-center h-[70px] fixed top-0 w-full"
      style={{ 
        background: scrolled ? navbarBackground : 'transparent',
        borderBottom: 'none',
        boxShadow: 'none',
        transition: 'all 0.3s ease',
        width: '100%', // Use full width for mobile
        left: 0,
        right: 0,
        outline: 'none',
        padding: '0 5px', // Add some padding for mobile
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
        <div className="md:hidden flex items-center justify-center z-50 mr-0">
          <button 
            ref={buttonRef}
            aria-label="Toggle mobile menu"
            className="text-white p-3 focus:outline-none transition-colors"
            onClick={toggleMobileMenu}
            aria-expanded={mobileMenuOpen}
            style={{
              marginRight: '0',
              background: 'transparent',
              border: 'none'
            }}
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <div className="w-7 h-7 flex flex-col justify-center items-center">
                <div className="w-6 h-0.5 bg-white mb-1.5"></div>
                <div className="w-6 h-0.5 bg-white"></div>
                <div className="w-6 h-0.5 bg-white mt-1.5"></div>
              </div>
            )}
          </button>
        </div>
      </nav>
      
      {/* Mobile Navigation Menu - Now outside the nav to avoid nested layout issues */}
      {/* Render it only in the DOM when it's open */}
      {isMobile && (
        <div 
          ref={menuRef}
          className={`fixed left-0 w-full top-[70px] md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'block max-h-[300px] opacity-100' : 'invisible max-h-0 opacity-0'
          }`}
          style={{
            background: 'linear-gradient(110deg, #6b48ff 20%, #4b79ff 80%, #3881ff)',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            zIndex: 49,
            transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-10px)',
          }}
        >
          <div className="pt-3 pb-3 space-y-4 px-6">
            <a 
              href="#home" 
              className="block font-medium py-2 text-base text-white hover:text-gray-200 transition-colors text-right pr-8"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('home');
              }}
            >
              Home
            </a>
            <a 
              href="#what-we-do" 
              className="block font-medium py-2 text-base text-white hover:text-gray-200 transition-colors text-right pr-8"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('what-we-do');
              }}
            >
              What We Do
            </a>
            <a 
              href="#contact" 
              className="block font-medium py-2 text-base text-white hover:text-gray-200 transition-colors text-right pr-8"
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
    </header>
  );
}
