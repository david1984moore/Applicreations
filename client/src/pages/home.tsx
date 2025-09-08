import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
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
    <div className="min-h-screen w-full m-0 p-0" style={{ background: '#fff' }}>
      <Navbar />
      
      {/* Continuous gradient container for Hero and WhatWeDo sections */}
      <div 
        className="gradient-container" 
        style={{ 
          background: 'linear-gradient(to bottom, #6b48ff 0%, #5590ff 40%, #4bacff 70%, #4bc9ff 100%)',
          marginTop: '-70px',
          position: 'relative',
          zIndex: 3,
          overflow: 'hidden',
          border: 'none',
          outline: 'none'
        }}
      >
        <Hero />
      </div>
      
      {/* Our Services and remaining sections - ensure this container fills space to footer */}
      <div style={{ 
        position: 'relative', 
        zIndex: 5, 
        background: '#f8f9fb',
        marginTop: '-1px', /* Eliminate any possible gap */
        minHeight: '100vh', /* Ensure this container fills at least the full viewport height */
        display: 'flex',
        flexDirection: 'column'
      }}>
        <OurServices />
        <Contact />
        <Footer />
      </div>
      
      {/* Scroll to top button for browsers/devices without native tap-to-top functionality */}
      <ScrollToTop />
    </div>
  );
}
