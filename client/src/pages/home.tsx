import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { WhatWeDo } from '@/components/WhatWeDo';
import { OurServices } from '@/components/OurServices';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

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
    
    return () => {
      revealElements.forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="min-h-screen w-full m-0 p-0 overflow-hidden" style={{ background: 'none' }}>
      <div className="navbar-hero-container">
        <Navbar />
        <Hero />
      </div>
      
      {/* Create an extra white section that overlaps with the hero gradient for a smoother transition */}
      <div style={{ 
        position: 'relative', 
        zIndex: 10, 
        background: 'white',
        marginTop: '-80px', /* Create an overlap with the hero section */
        paddingTop: '80px',  /* Add padding to compensate for the negative margin */
        borderTopLeftRadius: '100% 80px', /* Subtle curve to help break any potential hard lines */
        borderTopRightRadius: '100% 80px'
      }}>
        <OurServices />
        <WhatWeDo />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
