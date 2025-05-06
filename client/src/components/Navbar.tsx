import { useState, useEffect, useRef } from 'react';
import { Logo } from './Logo';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentSection, setCurrentSection] = useState<string>('home');
  const [navBgColor, setNavBgColor] = useState<string>('transparent');
  const [textColor, setTextColor] = useState<string>('white');
  const logoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // Enhanced function to update all logo text colors consistently
    const updateLogoTextColors = (color: string) => {
      // Update all SVG text elements in the logo
      const logoTexts = document.querySelectorAll('.cls-1, .cls-4, .cls-9, .cls-10, .cls-11, .cls-12, .cls-15');
      logoTexts.forEach(text => {
        if (text instanceof SVGElement) {
          text.style.fill = color;
        }
      });
    };
    
    // Function to detect background color at a specific point on the screen
    const getBackgroundColorAtPoint = (element: Element): string => {
      // Get the computed background color
      const bgColor = window.getComputedStyle(element).backgroundColor;
      
      // Check if it's transparent (rgba(0, 0, 0, 0) or transparent)
      if (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
        // If transparent, try parent element
        if (element.parentElement) {
          return getBackgroundColorAtPoint(element.parentElement);
        }
        // Default fallback color if we reach the top of the DOM
        return 'rgb(255, 255, 255)';
      }
      
      return bgColor;
    };
    
    // Function to determine if background is dark or light
    const isBackgroundDark = (rgbColor: string): boolean => {
      // Extract RGB values from the string
      const match = rgbColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (!match) return false;
      
      const r = parseInt(match[1], 10);
      const g = parseInt(match[2], 10);
      const b = parseInt(match[3], 10);
      
      // Calculate perceived brightness using the formula
      // (299*R + 587*G + 114*B) / 1000
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      
      // Consider dark if brightness is below 128 (middle of 0-255)
      return brightness < 128;
    };
    
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Get navbar height to account for offset
      const navbarHeight = 70;
      
      // Calculate current scroll position with an offset for the navbar
      const scrollPosition = window.scrollY + navbarHeight;
      
      // Get all main sections
      const homeSection = document.getElementById('home');
      const servicesSection = document.getElementById('our-services');
      const whatWeDoSection = document.getElementById('what-we-do');
      const contactSection = document.getElementById('contact');
      
      // Calculate section offsets, adjusting for navbar height
      const homeSectionTop = homeSection ? homeSection.offsetTop - navbarHeight : 0;
      const servicesSectionTop = servicesSection ? servicesSection.offsetTop - navbarHeight : 0;
      const whatWeDoSectionTop = whatWeDoSection ? whatWeDoSection.offsetTop - navbarHeight : 0;
      const contactSectionTop = contactSection ? contactSection.offsetTop - navbarHeight : 0;
      
      // Debug logging to verify the scroll position and section offsets
      console.log('Scroll position:', scrollPosition);
      console.log('Home section top:', homeSectionTop);
      console.log('Services section top:', servicesSectionTop);
      console.log('What We Do section top:', whatWeDoSectionTop);
      console.log('Contact section top:', contactSectionTop);
      
      // Determine which section is currently in view
      let currentElement: HTMLElement | null = null;
      let newTextColor = 'white'; // Default
      
      if (homeSection && scrollPosition < (homeSectionTop + homeSection.offsetHeight)) {
        setCurrentSection('home');
        setNavBgColor('linear-gradient(90deg, #6b48ff, #00ddeb)');
        newTextColor = 'white'; // Home has a dark gradient background
        currentElement = homeSection;
      } else if (servicesSection && scrollPosition < (servicesSectionTop + servicesSection.offsetHeight)) {
        setCurrentSection('our-services');
        setNavBgColor('#f5f5f5');
        newTextColor = '#000000'; // Services has a light background
        currentElement = servicesSection;
      } else if (whatWeDoSection && scrollPosition < (whatWeDoSectionTop + whatWeDoSection.offsetHeight)) {
        setCurrentSection('what-we-do');
        setNavBgColor('#ffffff');
        newTextColor = '#000000'; // What We Do has a light background
        currentElement = whatWeDoSection;
      } else if (contactSection && scrollPosition >= contactSectionTop) {
        setCurrentSection('contact');
        setNavBgColor('#1f2937');
        newTextColor = 'white'; // Contact has a dark background
        currentElement = contactSection;
      }
      
      // If we have a current element, get its background color and determine text color
      if (currentElement) {
        const bgColor = getBackgroundColorAtPoint(currentElement);
        const shouldUseDarkText = !isBackgroundDark(bgColor);
        newTextColor = shouldUseDarkText ? '#000000' : 'white';
      }
      
      // Update text color state and apply to logo
      setTextColor(newTextColor);
      
      // Update logo text fill color with our helper function
      updateLogoTextColors(newTextColor);
      
      // Update nav link hover color based on text color
      document.documentElement.style.setProperty(
        '--nav-link-hover', 
        newTextColor === 'white' ? '#f0f0f0' : '#e0e0e0'
      );
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
