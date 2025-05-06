import { useState, useEffect } from 'react';
import { Logo } from './Logo';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentSection, setCurrentSection] = useState<string>('home');
  const [navBgColor, setNavBgColor] = useState<string>('transparent');
  const [textColor, setTextColor] = useState<string>('white');

  useEffect(() => {
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
      
      // Get all main sections and their positions
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
      
      // Determine which section is currently in view and set colors accordingly
      if (homeSection && scrollPosition < (homeSectionTop + homeSection.offsetHeight)) {
        setCurrentSection('home');
        setNavBgColor('linear-gradient(90deg, #6b48ff, #00ddeb)');
        setTextColor('white');
        
        // Update logo text fill color and nav link colors
        const logoTexts = document.querySelectorAll('.cls-4, .cls-9, .cls-10, .cls-11, .cls-15');
        logoTexts.forEach(text => {
          if (text instanceof SVGElement) {
            text.style.fill = 'white';
          }
        });
        
        // Update nav link hover color
        document.documentElement.style.setProperty('--nav-link-hover', '#f0f0f0');
        
      } else if (servicesSection && scrollPosition < (servicesSectionTop + servicesSection.offsetHeight)) {
        setCurrentSection('our-services');
        setNavBgColor('#f5f5f5');
        setTextColor('#1f2937');
        
        // Update logo text fill color and nav link colors
        const logoTexts = document.querySelectorAll('.cls-4, .cls-9, .cls-10, .cls-11, .cls-15');
        logoTexts.forEach(text => {
          if (text instanceof SVGElement) {
            text.style.fill = '#1f2937';
          }
        });
        
        // Update nav link hover color
        document.documentElement.style.setProperty('--nav-link-hover', '#e0e0e0');
        
      } else if (whatWeDoSection && scrollPosition < (whatWeDoSectionTop + whatWeDoSection.offsetHeight)) {
        setCurrentSection('what-we-do');
        setNavBgColor('#ffffff');
        setTextColor('#1f2937');
        
        // Update logo text fill color and nav link colors
        const logoTexts = document.querySelectorAll('.cls-4, .cls-9, .cls-10, .cls-11, .cls-15');
        logoTexts.forEach(text => {
          if (text instanceof SVGElement) {
            text.style.fill = '#1f2937';
          }
        });
        
        // Update nav link hover color
        document.documentElement.style.setProperty('--nav-link-hover', '#e0e0e0');
        
      } else if (contactSection && scrollPosition >= contactSectionTop) {
        setCurrentSection('contact');
        setNavBgColor('#1f2937');
        setTextColor('white');
        
        // Update logo text fill color and nav link colors
        const logoTexts = document.querySelectorAll('.cls-4, .cls-9, .cls-10, .cls-11, .cls-15');
        logoTexts.forEach(text => {
          if (text instanceof SVGElement) {
            text.style.fill = 'white';
          }
        });
        
        // Update nav link hover color
        document.documentElement.style.setProperty('--nav-link-hover', '#f0f0f0');
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
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className={`w-full z-50 flex items-center h-[70px] m-0 p-0 border-none outline-none`} 
      style={{ 
        background: scrolled ? navBgColor : 'transparent',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        transition: 'background 0.3s ease',
        zIndex: 1000,
        margin: 0,
        padding: 0
      }}
    >
      <nav 
        className="container mx-auto px-6 flex items-center h-full m-0 border-none outline-none" 
        style={{ 
          boxShadow: 'none',
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
            <Logo className={textColor === 'white' ? 'text-white' : 'text-neutral-dark'} />
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
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-none ${
            mobileMenuOpen ? 'max-h-40' : 'max-h-0'
          }`}
          style={{
            background: scrolled ? navBgColor : 'transparent'
          }}
        >
          <div className="pt-2 pb-1 space-y-2">
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
