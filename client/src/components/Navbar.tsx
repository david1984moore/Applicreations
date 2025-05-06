import { useState, useEffect } from 'react';
import { Logo } from './Logo';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentSection, setCurrentSection] = useState<string>('home');
  const [navBgColor, setNavBgColor] = useState<string>('transparent');
  const [textColor, setTextColor] = useState<string>('white');

  useEffect(() => {
    // Helper function to update logo text colors consistently
    const updateLogoTextColors = (color: string) => {
      // Select ALL possible text elements in the logo to ensure consistent coloring
      const logoTexts = document.querySelectorAll('.cls-1, .cls-4, .cls-9, .cls-10, .cls-11, .cls-12, .cls-15');
      logoTexts.forEach(text => {
        if (text instanceof SVGElement) {
          text.style.fill = color;
        }
      });
    };
    
    // Function to handle scroll events and update navbar colors
    const handleScroll = () => {
      // Handle scrolled state
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Get elements we need to check at the current scroll position
      const header = document.querySelector('header');
      if (!header) return;
      
      // Calculate the y-coordinate at the middle of the navbar
      const headerRect = header.getBoundingClientRect();
      const navbarMiddleY = headerRect.top + (headerRect.height / 2);
      
      // Find what element is at that y-coordinate in the middle of the screen horizontally
      // This is more reliable than calculating offsets
      const navbarMiddleX = window.innerWidth / 2;
      const elementAtNavbar = document.elementFromPoint(navbarMiddleX, navbarMiddleY);
      
      // Find the section that contains this element
      let currentSectionElement = elementAtNavbar;
      while (currentSectionElement && !currentSectionElement.id) {
        currentSectionElement = currentSectionElement.parentElement;
      }
      
      // Check if we're over a light background section
      // First, directly check if the current section or any parent has the light-bg-section class
      let isLightBg = false;
      let el = elementAtNavbar;
      while (el) {
        if (el.classList && el.classList.contains('light-bg-section')) {
          isLightBg = true;
          break;
        }
        el = el.parentElement;
      }
      
      // Fallback checks for specific section IDs
      let sectionId = 'home';
      if (currentSectionElement && currentSectionElement.id) {
        sectionId = currentSectionElement.id;
        console.log('Current Section ID:', sectionId);
        
        // Override light background check for specific sections if needed
        if (sectionId === 'our-services' || sectionId === 'what-we-do') {
          isLightBg = true;
        } else if (sectionId === 'home' || sectionId === 'contact') {
          isLightBg = false;
        }
      }
      
      setCurrentSection(sectionId);
      
      // Debug logging
      console.log('Is over light background:', isLightBg);
      console.log('Current section:', sectionId);
      
      // Set colors based on background
      if (isLightBg) {
        // Light background - use dark text
        setNavBgColor(scrolled ? '#f5f5f5' : 'transparent');
        setTextColor('#000000');
        updateLogoTextColors('#000000');
        document.documentElement.style.setProperty('--nav-link-hover', '#333333');
        console.log('Setting dark text for light background');
      } else {
        // Dark background - use light text
        setNavBgColor(scrolled ? 'rgba(31, 41, 55, 0.9)' : 'transparent');
        setTextColor('white');
        updateLogoTextColors('white');
        document.documentElement.style.setProperty('--nav-link-hover', '#f0f0f0');
        console.log('Setting light text for dark background');
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial call to set the correct colors on page load
    setTimeout(handleScroll, 100); // Small delay to ensure DOM is fully loaded
    
    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
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

  return (
    <header 
      className={`w-full z-50 flex items-center h-[70px] m-0 p-0 border-none outline-none fixed top-0 left-0 right-0`} 
      style={{ 
        background: scrolled ? navBgColor : 'transparent',
        transition: 'background 0.3s ease, box-shadow 0.3s ease',
        zIndex: 1000,
        width: '100%',
        boxShadow: scrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none'
      }}
    >
      <nav 
        className="container mx-auto px-6 flex items-center h-full m-0 border-none outline-none" 
        style={{ 
          background: 'none'
        }}
      >
        <div className="flex justify-between items-center w-full border-none">
          <a 
            href="#home" 
            className="navbar-logo"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            style={{
              fill: textColor,
              color: textColor,
              transition: 'color 0.3s ease, fill 0.3s ease'
            }}
          >
            <Logo className={textColor === 'white' ? 'text-white' : 'text-black'} />
          </a>
          
          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-6 justify-end flex-1 border-none">
            <li className="border-none">
              <a 
                href="#home" 
                className={`nav-link font-medium text-md transition-colors duration-300`}
                style={{ 
                  color: textColor,
                  transition: 'color 0.3s ease'
                }}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('home');
                }}
              >
                Home
              </a>
            </li>
            <li className="border-none">
              <a 
                href="#what-we-do" 
                className={`nav-link font-medium text-md transition-colors duration-300`}
                style={{ 
                  color: textColor,
                  transition: 'color 0.3s ease'
                }}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('what-we-do');
                }}
              >
                What We Do
              </a>
            </li>
            <li className="border-none">
              <a 
                href="#contact" 
                className={`nav-link font-medium text-md transition-colors duration-300`}
                style={{ 
                  color: textColor,
                  transition: 'color 0.3s ease'
                }}
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
              className="focus:outline-none"
              style={{ 
                color: textColor,
                transition: 'color 0.3s ease'
              }}
              onClick={toggleMobileMenu}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        <div 
          className={`absolute left-0 right-0 top-[70px] md:hidden overflow-hidden transition-all duration-300 ease-in-out border-none ${
            mobileMenuOpen ? 'max-h-40' : 'max-h-0'
          }`}
          style={{
            background: scrolled ? navBgColor : 'transparent',
            boxShadow: mobileMenuOpen && scrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none',
            zIndex: 999
          }}
        >
          <div className="pt-2 pb-1 space-y-2 px-6">
            <a 
              href="#home" 
              className="block font-medium py-1 text-sm transition-colors duration-300"
              style={{ 
                color: textColor,
                transition: 'color 0.3s ease'
              }}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('home');
              }}
            >
              Home
            </a>
            <a 
              href="#what-we-do" 
              className="block font-medium py-1 text-sm transition-colors duration-300"
              style={{ 
                color: textColor,
                transition: 'color 0.3s ease'
              }}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('what-we-do');
              }}
            >
              What We Do
            </a>
            <a 
              href="#contact" 
              className="block font-medium py-1 text-sm transition-colors duration-300"
              style={{ 
                color: textColor,
                transition: 'color 0.3s ease'
              }}
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
