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
    link.setAttribute('type', 'image/svg+xml');
    link.setAttribute('href', 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M20 40 C 20 20, 40 20, 50 30 Q 60 40, 45 50 T 30 60 Q 20 65, 20 55 T 30 45 Z" fill="%238A4FFF" /><circle cx="20" cy="45" r="10" fill="%2365B2FF" /></svg>');
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
