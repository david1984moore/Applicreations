import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { WhatWeDo } from '@/components/WhatWeDo';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Home() {
  useEffect(() => {
    // Set page title and meta description for SEO
    document.title = "Applicreations | Digital Solutions to Real World Problems";
    
    // Add favicon
    const link = document.querySelector("link[rel~='icon']") || document.createElement('link');
    link.setAttribute('rel', 'icon');
    link.setAttribute('type', 'image/png');
    link.setAttribute('href', '/images/logo.png');
    document.head.appendChild(link);
    
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
    <>
      <Navbar />
      <Hero />
      <WhatWeDo />
      <Contact />
      <Footer />
    </>
  );
}
