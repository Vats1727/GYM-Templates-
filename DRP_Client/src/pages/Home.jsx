import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Treatments from '../components/Treatments';
import CaseStudies from '../components/CaseStudies';
import Reviews from '../components/Reviews';
import HowItWorks from '../components/HowItWorks';
import Booking from '../components/Booking';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Treatments />
        <CaseStudies />
        <Reviews />
        <HowItWorks />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
