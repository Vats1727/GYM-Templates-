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

    // Stagger reveal on grid card items
    const cards = document.querySelectorAll(
      '.spec-card, .trans-card, .testi-card, .price-card'
    );
    cards.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 3) * 0.1}s`;
      el.classList.add('reveal');
    });

    const elementsToReveal = document.querySelectorAll('.reveal, .reveal-left');
    elementsToReveal.forEach((el) => observer.observe(el));

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
      elementsToReveal.forEach((el) => observer.unobserve(el));
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
