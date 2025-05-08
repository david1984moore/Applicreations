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
      {/* Our Services is positioned relative and has a high z-index to ensure it's above the gradient */}
      <div style={{ position: 'relative', zIndex: 5, background: 'white' }}>
        <OurServices />
        <WhatWeDo />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
