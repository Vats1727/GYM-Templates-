import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import Ticker from '../components/Ticker';
import About from '../components/About';
import Specialties from '../components/Specialties';
import Transformations from '../components/Transformations';
import Programs from '../components/Programs';
import Testimonials from '../components/Testimonials';
import HowItWorks from '../components/HowItWorks';

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    const observeNewElements = () => {
      // Find all target elements that need reveal
      const elements = document.querySelectorAll(
        '.reveal, .reveal-left, .spec-card, .trans-card, .testi-card, .price-card'
      );
      
      elements.forEach((el) => {
        // If it's a grid item card, ensure it has the reveal class and set proper stagger delay
        if (
          el.classList.contains('spec-card') ||
          el.classList.contains('trans-card') ||
          el.classList.contains('testi-card') ||
          el.classList.contains('price-card')
        ) {
          if (!el.classList.contains('reveal')) {
            el.classList.add('reveal');
          }
          
          // Stagger based on card index within its parent grid container
          const parent = el.parentElement;
          if (parent) {
            const siblings = Array.from(parent.children).filter(c =>
              c.classList.contains('spec-card') ||
              c.classList.contains('trans-card') ||
              c.classList.contains('testi-card') ||
              c.classList.contains('price-card')
            );
            const index = siblings.indexOf(el);
            if (index !== -1) {
              el.style.transitionDelay = `${(index % 3) * 0.1}s`;
            }
          }
        }
        
        observer.observe(el);
      });
    };

    // Run initial observation
    observeNewElements();

    // Set up MutationObserver to watch for dynamically loaded/rendered elements
    const mutationObserver = new MutationObserver(() => {
      observeNewElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Active nav link highlight on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    const handleScroll = () => {
      let currentSectionId = '';
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 100) {
          currentSectionId = section.id;
        }
      });

      navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (href === `#${currentSectionId}`) {
          link.style.color = 'var(--accent)';
        } else {
          link.style.color = '';
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Hero />
      <Ticker />
      <About />
      <Specialties />
      <Transformations />
      <Programs />
      <Testimonials />
      <HowItWorks />
    </>
  );
}
