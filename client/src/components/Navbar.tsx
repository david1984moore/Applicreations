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
      
      // Get navbar height and calculate its bottom position
      const navbarHeight = 70;
      const scrollY = window.scrollY;
      const navbarBottomPosition = scrollY + navbarHeight;
      
      // Get all sections by ID
      const homeSection = document.getElementById('home');
      const servicesSection = document.getElementById('our-services');
      const whatWeDoSection = document.getElementById('what-we-do');
      const contactSection = document.getElementById('contact');
      
      // Calculate section boundaries
      // We add a small buffer (10px) to make transitions smoother
      const buffer = 10;
      
      // Explicitly calculate the boundaries for each section
      const homeSectionTop = homeSection ? homeSection.offsetTop : 0;
      const homeSectionBottom = homeSection ? homeSectionTop + homeSection.offsetHeight : 0;
      
      const servicesSectionTop = servicesSection ? servicesSection.offsetTop - buffer : 0;
      const servicesSectionBottom = servicesSection ? servicesSectionTop + servicesSection.offsetHeight : 0;
      
      const whatWeDoSectionTop = whatWeDoSection ? whatWeDoSection.offsetTop - buffer : 0;
      const whatWeDoSectionBottom = whatWeDoSection ? whatWeDoSectionTop + whatWeDoSection.offsetHeight : 0;
      
      const contactSectionTop = contactSection ? contactSection.offsetTop - buffer : 0;
      
      // Debug logging to verify positions
      console.log('Navbar bottom position:', navbarBottomPosition);
      console.log('Home section:', homeSectionTop, 'to', homeSectionBottom);
      console.log('Services section:', servicesSectionTop, 'to', servicesSectionBottom);
      console.log('What We Do section:', whatWeDoSectionTop, 'to', whatWeDoSectionBottom);
      console.log('Contact section starts at:', contactSectionTop);
      
      // Determine which section we're in based on the navbar's position
      // We check if any part of the navbar is in each section
      
      // Hard-coded approach for maximum reliability
      // Check from bottom to top of page to prioritize the section we're entering
      if (navbarBottomPosition >= contactSectionTop) {
        // Contact section has dark background
        setCurrentSection('contact');
        setNavBgColor(scrolled ? 'rgba(31, 41, 55, 0.9)' : 'transparent');
        setTextColor('white');
        updateLogoTextColors('white');
        document.documentElement.style.setProperty('--nav-link-hover', '#f0f0f0');
        console.log('In contact section - white text');
      } 
      else if (navbarBottomPosition >= whatWeDoSectionTop && navbarBottomPosition < contactSectionTop) {
        // What We Do section has light background
        setCurrentSection('what-we-do');
        setNavBgColor(scrolled ? '#f5f5f5' : 'transparent');
        setTextColor('#000000');
        updateLogoTextColors('#000000');
        document.documentElement.style.setProperty('--nav-link-hover', '#333333');
        console.log('In what-we-do section - black text');
      } 
      else if (navbarBottomPosition >= servicesSectionTop && navbarBottomPosition < whatWeDoSectionTop) {
        // Services section has light background
        setCurrentSection('our-services');
        setNavBgColor(scrolled ? '#f5f5f5' : 'transparent');
        setTextColor('#000000');
        updateLogoTextColors('#000000');
        document.documentElement.style.setProperty('--nav-link-hover', '#333333');
        console.log('In services section - black text');
      } 
      else {
        // Home/hero section has dark background
        setCurrentSection('home');
        setNavBgColor(scrolled ? 'linear-gradient(90deg, #6b48ff, #00ddeb)' : 'transparent');
        setTextColor('white');
        updateLogoTextColors('white');
        document.documentElement.style.setProperty('--nav-link-hover', '#f0f0f0');
        console.log('In home section - white text');
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
