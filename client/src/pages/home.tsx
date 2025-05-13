import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { WhatWeDo } from '@/components/WhatWeDo';
import { OurServices } from '@/components/OurServices';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';

export default function Home() {
  useEffect(() => {
    // Set page title and meta description for SEO
    document.title = "Applicreations | Digital Solutions to Real World Problems";
    
    // Implement smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Initialize observer for reveal animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });
    
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => {
      observer.observe(el);
    });
    
    // Ensure iOS tap-to-top functionality works
    // Make sure we don't have any handlers that would interfere
    // with the iOS native status bar tap behavior
    
    return () => {
      revealElements.forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="min-h-screen w-full m-0 p-0 gradient-container">
      <Navbar />
      <div className="navbar-hero-container" style={{ marginTop: '-70px' }}>
        <Hero />
      </div>
      {/* Content container with transparent background to let parent gradient show through */}
      <div style={{ 
        position: 'relative', 
        zIndex: 5, 
        background: 'transparent',
        marginTop: '-2px', /* Ensure no gap between sections */
        borderTop: 'none'
      }}>
        <WhatWeDo />
        <OurServices />
        <Contact />
        <Footer />
      </div>
      {/* Scroll to top button for browsers/devices without native tap-to-top functionality */}
      <ScrollToTop />
    </div>
  );
}
