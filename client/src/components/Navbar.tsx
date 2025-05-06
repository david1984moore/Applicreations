import { useState, useEffect, useRef } from 'react';
import { Logo } from './Logo';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentSection, setCurrentSection] = useState<string>('home');
  const [navBgColor, setNavBgColor] = useState<string>('transparent');
  const [textColor, setTextColor] = useState<string>('white');
  const navbarRef = useRef<HTMLDivElement>(null);

  // Function to determine if a color is light or dark
  const isColorLight = (color: string): boolean => {
    // Extract RGB components from color string
    let r = 0, g = 0, b = 0;
    
    // Handle gradient backgrounds
    if (color.includes('linear-gradient')) {
      // For gradients, let's assume they're dark by default
      return false;
    }
    
    // Handle hexadecimal colors
    if (color.startsWith('#')) {
      const hex = color.replace('#', '');
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    } 
    // Handle rgb/rgba colors
    else if (color.startsWith('rgb')) {
      const rgba = color.match(/\d+/g);
      if (rgba) {
        r = parseInt(rgba[0]);
        g = parseInt(rgba[1]);
        b = parseInt(rgba[2]);
      }
    }
    // Handle named colors
    else {
      // For named colors like 'white', 'black', etc.
      if (color === 'white' || color === '#ffffff' || color === '#fff') return true;
      if (color === 'transparent') return false; // Assume transparent is over a dark background initially
      if (color === 'black' || color === '#000000' || color === '#000') return false;
      
      // For other named colors, we'll need to map them to RGB
      const tempElement = document.createElement('div');
      tempElement.style.color = color;
      document.body.appendChild(tempElement);
      const computedColor = getComputedStyle(tempElement).color;
      document.body.removeChild(tempElement);
      
      const rgbValues = computedColor.match(/\d+/g);
      if (rgbValues) {
        r = parseInt(rgbValues[0]);
        g = parseInt(rgbValues[1]);
        b = parseInt(rgbValues[2]);
      }
    }
    
    // Calculate relative luminance using the sRGB color space formula
    // This gives more weight to green since human eyes are more sensitive to green
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Return true if color is light (luminance > 0.5), false if dark
    return luminance > 0.5;
  };

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

    // Get sections for background detection
    const homeSection = document.getElementById('home');
    const servicesSection = document.getElementById('our-services');
    const whatWeDoSection = document.getElementById('what-we-do');
    const contactSection = document.getElementById('contact');
    
    // Create color sensors for each section to be used with IntersectionObserver
    const navbarHeight = 35; // Half the navbar height for the observer
    
    // Create sensor elements for background color detection
    const sensors: HTMLDivElement[] = [];
    
    // Function to create a sensor element
    const createSensor = (id: string, zIndex: number = -1) => {
      const sensor = document.createElement('div');
      sensor.id = `color-sensor-${id}`;
      sensor.className = 'color-sensor';
      sensor.style.position = 'fixed';
      sensor.style.height = '1px';
      sensor.style.width = '100%';
      sensor.style.top = `${navbarHeight}px`;
      sensor.style.left = '0';
      sensor.style.pointerEvents = 'none';
      sensor.style.zIndex = zIndex.toString();
      sensor.style.opacity = '0';
      return sensor;
    };
    
    // Create and append sensors to the body
    const homeSensor = createSensor('home');
    const servicesSensor = createSensor('our-services');
    const whatWeDoSensor = createSensor('what-we-do');
    const contactSensor = createSensor('contact');
    
    sensors.push(homeSensor, servicesSensor, whatWeDoSensor, contactSensor);
    
    sensors.forEach(sensor => document.body.appendChild(sensor));
    
    // Function to get background color at sensor position
    const getBackgroundColorAt = (element: HTMLElement): string => {
      const rect = element.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      
      // Get the element at this position
      const elementAtPoint = document.elementFromPoint(x, y);
      
      if (elementAtPoint) {
        // Get the computed background color
        return window.getComputedStyle(elementAtPoint).backgroundColor;
      }
      
      return 'transparent';
    };
    
    const handleScroll = () => {
      // Update scrolled state
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Get navbar height to account for offset
      const navbarHeight = 70;
      
      // Calculate current scroll position with an offset for the navbar
      const scrollPosition = window.scrollY + navbarHeight;
      
      // Calculate section offsets, adjusting for navbar height
      const homeSectionTop = homeSection ? homeSection.offsetTop - navbarHeight : 0;
      const servicesSectionTop = servicesSection ? servicesSection.offsetTop - navbarHeight : 0;
      const whatWeDoSectionTop = whatWeDoSection ? whatWeDoSection.offsetTop - navbarHeight : 0;
      const contactSectionTop = contactSection ? contactSection.offsetTop - navbarHeight : 0;
      
      // For debugging
      console.log('Scroll position:', scrollPosition);
      console.log('Home section top:', homeSectionTop);
      console.log('Services section top:', servicesSectionTop);
      console.log('What We Do section top:', whatWeDoSectionTop);
      console.log('Contact section top:', contactSectionTop);
      
      // Determine which section is currently in view and set appropriate background color
      if (homeSection && scrollPosition < (homeSectionTop + homeSection.offsetHeight)) {
        setCurrentSection('home');
        setNavBgColor('linear-gradient(90deg, #6b48ff, #00ddeb)');
      } else if (servicesSection && scrollPosition < (servicesSectionTop + servicesSection.offsetHeight)) {
        setCurrentSection('our-services');
        setNavBgColor('#f5f5f5');
      } else if (whatWeDoSection && scrollPosition < (whatWeDoSectionTop + whatWeDoSection.offsetHeight)) {
        setCurrentSection('what-we-do');
        setNavBgColor('#ffffff');
      } else if (contactSection && scrollPosition >= contactSectionTop) {
        setCurrentSection('contact');
        setNavBgColor('#1f2937');
      }
      
      // Detect background color at current position
      let activeSensor: HTMLDivElement | null = null;
      
      // Find which section is currently at the navbar level
      if (homeSection && scrollPosition < (homeSectionTop + homeSection.offsetHeight)) {
        activeSensor = homeSensor;
      } else if (servicesSection && scrollPosition < (servicesSectionTop + servicesSection.offsetHeight)) {
        activeSensor = servicesSensor;
      } else if (whatWeDoSection && scrollPosition < (whatWeDoSectionTop + whatWeDoSection.offsetHeight)) {
        activeSensor = whatWeDoSensor;
      } else if (contactSection && scrollPosition >= contactSectionTop) {
        activeSensor = contactSensor;
      }
      
      // If we have an active sensor, check its background color
      if (activeSensor) {
        const bgColor = getBackgroundColorAt(activeSensor);
        const isLight = isColorLight(bgColor);
        
        // Update text color based on background brightness
        const newTextColor = isLight ? '#000000' : 'white';
        if (textColor !== newTextColor) {
          setTextColor(newTextColor);
          updateLogoTextColors(newTextColor);
          
          // Update nav link hover color
          document.documentElement.style.setProperty('--nav-link-hover', isLight ? '#e0e0e0' : '#f0f0f0');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial call to set the correct section on page load
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Clean up - remove sensors
      sensors.forEach(sensor => {
        if (document.body.contains(sensor)) {
          document.body.removeChild(sensor);
        }
      });
    };
  }, [textColor]);

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
      ref={navbarRef}
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
