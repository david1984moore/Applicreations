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
      
      // Detect which section is currently in view
      const scrollPosition = window.scrollY + 100; // Adding offset to account for navbar height
      
      // Get all main sections
      const homeSection = document.getElementById('home');
      const servicesSection = document.getElementById('our-services');
      const whatWeDoSection = document.getElementById('what-we-do');
      const contactSection = document.getElementById('contact');
      
      if (homeSection && scrollPosition < (homeSection.offsetTop + homeSection.offsetHeight)) {
        setCurrentSection('home');
        setNavBgColor('linear-gradient(90deg, #6b48ff, #00ddeb)');
        setTextColor('white');
      } else if (servicesSection && scrollPosition < (servicesSection.offsetTop + servicesSection.offsetHeight)) {
        setCurrentSection('our-services');
        setNavBgColor('#f5f5f5');
        setTextColor('#1f2937');
      } else if (whatWeDoSection && scrollPosition < (whatWeDoSection.offsetTop + whatWeDoSection.offsetHeight)) {
        setCurrentSection('what-we-do');
        setNavBgColor('#ffffff');
        setTextColor('#1f2937');
      } else if (contactSection && scrollPosition >= contactSection.offsetTop) {
        setCurrentSection('contact');
        setNavBgColor('#1f2937');
        setTextColor('white');
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
        width: '100%',
        transition: 'background 0.3s ease',
        zIndex: 1000
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
