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
    
    // Function to determine if a background is light or dark
    const isLightBackground = (section: Element): boolean => {
      // Get the background color of the section
      const bgColor = window.getComputedStyle(section).backgroundColor;
      const bgImage = window.getComputedStyle(section).backgroundImage;
      
      // If it has a gradient background (like hero and contact sections), consider it dark
      if (bgImage.includes('gradient') && (
          bgImage.includes('6b48ff') || 
          bgImage.includes('00ddeb') || 
          bgImage.includes('8A4FFF') || 
          bgImage.includes('3E8BFF')
      )) {
        return false; // Dark background
      }
      
      // If it has light neutral background colors (like services and what-we-do sections)
      if (bgColor.includes('rgb(245, 245, 245)') || // #f5f5f5
          bgColor.includes('rgb(255, 255, 255)') || // white
          bgColor.includes('rgb(250, 250, 250)') || // near-white
          bgColor.includes('rgba(255, 255, 255') || // white with alpha
          section.id === 'our-services' ||
          section.id === 'what-we-do') {
        return true; // Light background
      }
      
      // Default to dark for other cases
      return false;
    };
    
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Get navbar height to account for offset
      const navbarHeight = 70;
      
      // Get all main sections
      const sections = [
        document.getElementById('home'),
        document.getElementById('our-services'),
        document.getElementById('what-we-do'),
        document.getElementById('contact')
      ].filter(section => section !== null) as HTMLElement[];
      
      // Determine which section the navbar is currently over
      // We use the middle of the navbar as the reference point
      const navbarMiddle = window.scrollY + (navbarHeight / 2);
      
      let activeSection: HTMLElement | null = null;
      let currentSectionId = '';
      
      // Find the current section based on scroll position
      for (const section of sections) {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (navbarMiddle >= sectionTop && navbarMiddle < sectionBottom) {
          activeSection = section;
          currentSectionId = section.id;
          break;
        }
      }
      
      // If no section is found (shouldn't happen), use the first section
      if (!activeSection && sections.length > 0) {
        activeSection = sections[0];
        currentSectionId = activeSection.id;
      }
      
      // Debug logging
      console.log('Scroll position:', navbarMiddle);
      console.log('Active section:', currentSectionId);
      
      // Set colors based on the active section
      if (activeSection) {
        setCurrentSection(currentSectionId);
        
        const isLight = isLightBackground(activeSection);
        
        if (isLight) {
          // Light background - use dark text
          setNavBgColor(scrolled ? '#f5f5f5' : 'transparent');
          setTextColor('#000000');
          updateLogoTextColors('#000000');
          document.documentElement.style.setProperty('--nav-link-hover', '#333333');
        } else {
          // Dark background - use light text
          setNavBgColor(scrolled ? 'rgba(31, 41, 55, 0.9)' : 'transparent');
          setTextColor('white');
          updateLogoTextColors('white');
          document.documentElement.style.setProperty('--nav-link-hover', '#f0f0f0');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial call to set the correct section on page load
    handleScroll();
    
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
