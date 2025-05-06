import { useState, useEffect } from 'react';
import { Logo } from './Logo';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
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
        top: element.offsetTop - 50,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className={`fixed w-full bg-white z-50 ${scrolled ? 'shadow-md' : ''} h-16 flex items-center overflow-visible pb-0`}>
      <nav className="container mx-auto px-6 py-0">
        <div className="flex justify-between items-center py-0">
          <a 
            href="#home" 
            className="flex items-center"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
          >
            <Logo className="h-[14rem] w-auto transform scale-125 -my-4" />
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 ml-auto">
            <a 
              href="#home" 
              className="nav-link text-neutral-dark hover:text-purple font-medium text-md transition-colors duration-300"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('home');
              }}
            >
              Home
            </a>
            <a 
              href="#what-we-do" 
              className="nav-link text-neutral-dark hover:text-purple font-medium text-md transition-colors duration-300"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('what-we-do');
              }}
            >
              What We Do
            </a>
            <a 
              href="#contact" 
              className="nav-link text-neutral-dark hover:text-purple font-medium text-md transition-colors duration-300"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('contact');
              }}
            >
              Contact
            </a>
          </div>
          
          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button 
              aria-label="Toggle mobile menu"
              className="text-neutral-dark focus:outline-none"
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
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-40' : 'max-h-0'
          }`}
        >
          <div className="pt-2 pb-1 space-y-2">
            <a 
              href="#home" 
              className="block text-neutral-dark hover:text-purple font-medium py-1 text-sm transition-colors duration-300"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('home');
              }}
            >
              Home
            </a>
            <a 
              href="#what-we-do" 
              className="block text-neutral-dark hover:text-purple font-medium py-1 text-sm transition-colors duration-300"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('what-we-do');
              }}
            >
              What We Do
            </a>
            <a 
              href="#contact" 
              className="block text-neutral-dark hover:text-purple font-medium py-1 text-sm transition-colors duration-300"
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
