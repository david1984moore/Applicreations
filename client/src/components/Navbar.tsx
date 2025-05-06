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

    // Function to set colors based on the current section
    const setColorsForSection = (sectionId: string) => {
      console.log('Current section:', sectionId);
      
      // Set the current section for UI state
      setCurrentSection(sectionId);
      
      // Update colors based on the section background
      if (sectionId === 'home') {
        // Home section (dark gradient background) - use light text
        // Always show a solid background when scrolled (even slightly)
        setNavBgColor(scrolled ? 'linear-gradient(90deg, #6b48ff, #00ddeb)' : 'transparent');
        setTextColor('white');
        updateLogoTextColors('white');
        document.documentElement.style.setProperty('--nav-link-hover', '#f0f0f0');
        console.log('Home section - white text');
      } 
      else if (sectionId === 'our-services' || sectionId === 'what-we-do') {
        // Services & What We Do sections (light background) - use dark text
        // Use a light solid background when scrolled (with slight transparency)
        setNavBgColor(scrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent');
        setTextColor('#000000');
        updateLogoTextColors('#000000');
        document.documentElement.style.setProperty('--nav-link-hover', '#333333');
        console.log(`${sectionId} section - black text`);
      }
      else if (sectionId === 'contact') {
        // Contact section (dark background) - use light text
        // Use a dark solid background when scrolled
        setNavBgColor(scrolled ? 'rgba(31, 41, 55, 0.95)' : 'transparent');
        setTextColor('white');
        updateLogoTextColors('white');
        document.documentElement.style.setProperty('--nav-link-hover', '#f0f0f0');
        console.log('Contact section - white text');
      }
    };

    // Function to handle basic scroll for navbar background effects (blur/shadow)
    const handleBasicScroll = () => {
      // Show solid background at the very first pixel of scroll
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Set up the IntersectionObserver to detect when sections enter viewport
    const setupIntersectionObserver = () => {
      // Get all the sections we need to track
      const sections = [
        document.getElementById('home'),
        document.getElementById('our-services'),
        document.getElementById('what-we-do'),
        document.getElementById('contact')
      ];

      // Ensure all sections are loaded before proceeding
      if (sections.some(section => !section)) {
        console.log('Waiting for all sections to load...');
        setTimeout(setupIntersectionObserver, 100);
        return;
      }

      console.log('All sections found, setting up IntersectionObserver');

      // We need two separate observers with different thresholds
      // 1. A main observer that tracks when a section is primarily visible
      // 2. A boundary observer that detects the exact moment a section hits the navbar

      // Observer 1: For precise boundary detection (triggers immediately at boundary)
      const boundaryObserverOptions = {
        root: null, // Use the viewport
        // The key adjustment: negative offset ensures we detect when navbar hits section top edge
        // Adjust this value to fine-tune exactly when color changes happen
        rootMargin: '-70px 0px 0px 0px', // Exactly matches navbar height for precise detection
        threshold: [0, 0.05], // Trigger the moment ANY part of the section reaches the navbar bottom
      };

      // Observer 2: For stable section detection (less jumpy)
      const mainObserverOptions = {
        root: null, // Use the viewport
        rootMargin: '-70px 0px 0px 0px', // Offset for the navbar height
        threshold: [0.4], // Trigger when a significant portion is visible
      };

      // Create a debounced version of setColorsForSection to prevent flickering
      let lastSectionId = '';
      let debounceTimer: ReturnType<typeof setTimeout> | null = null;
      
      const debouncedSetColors = (sectionId: string) => {
        // If it's the same section, update immediately
        if (sectionId === lastSectionId) {
          return;
        }
        
        // For transitions between dark and light sections, apply immediately
        const isDarkToLight = 
          (lastSectionId === 'home' || lastSectionId === 'contact') && 
          (sectionId === 'our-services' || sectionId === 'what-we-do');
          
        const isLightToDark = 
          (lastSectionId === 'our-services' || lastSectionId === 'what-we-do') && 
          (sectionId === 'home' || sectionId === 'contact');
        
        if (isDarkToLight || isLightToDark) {
          if (debounceTimer) clearTimeout(debounceTimer);
          lastSectionId = sectionId;
          setColorsForSection(sectionId);
          return;
        }
        
        // Otherwise, debounce to prevent flickering
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          lastSectionId = sectionId;
          setColorsForSection(sectionId);
        }, 100);
      };

      // Create our observers
      const boundaryObserver = new IntersectionObserver((entries) => {
        // When a section crosses the boundary exactly
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Entry is intersecting - section is now partially in view
            debouncedSetColors(entry.target.id);
          }
        });
      }, boundaryObserverOptions);
      
      // Main observer for stable behavior
      const mainObserver = new IntersectionObserver((entries) => {
        // Sort entries by intersection ratio for stable section detection
        const visibleEntries = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        // If we have a visible section with sufficient visibility, use it
        if (visibleEntries.length > 0) {
          const topSection = visibleEntries[0].target;
          debouncedSetColors(topSection.id);
        }
      }, mainObserverOptions);

      // Start observing each section with both observers
      sections.forEach(section => {
        if (section) {
          boundaryObserver.observe(section);
          mainObserver.observe(section);
        }
      });

      // Return a cleanup function that will be called when component unmounts
      return () => {
        // Clean up by stopping observation of all sections
        sections.forEach(section => {
          if (section) {
            boundaryObserver.unobserve(section);
            mainObserver.unobserve(section);
          }
        });
        
        // Disconnect observers to clean up all resources
        boundaryObserver.disconnect();
        mainObserver.disconnect();
      };
    };

    // Set up scroll listener for basic navbar effects
    window.addEventListener('scroll', handleBasicScroll);
    
    // Initialize the intersection observer with a delay to ensure DOM is loaded
    const observerCleanup = setTimeout(setupIntersectionObserver, 500);
    
    // Set initial colors based on the initial section (likely 'home')
    setColorsForSection('home');
    
    // Clean up event listeners and timers on component unmount
    return () => {
      window.removeEventListener('scroll', handleBasicScroll);
      clearTimeout(observerCleanup);
    };
  }, [scrolled]); // Add scrolled as a dependency since we reference it in the effect

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
        transition: 'all 0.3s ease',
        zIndex: 1000,
        width: '100%',
        boxShadow: scrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none',
        backdropFilter: scrolled ? 'blur(5px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(5px)' : 'none'
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
            backdropFilter: scrolled ? 'blur(5px)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(5px)' : 'none',
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
