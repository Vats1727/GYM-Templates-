import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const HeroSectionManager = lazy(() => import('../pages/Admin/Sections/HeroSectionManager'));
const AboutSectionManager = lazy(() => import('../pages/Admin/Sections/AboutSectionManager'));
const SpecialtiesManager = lazy(() => import('../pages/Admin/Sections/SpecialtiesManager'));
const TransformationsManager = lazy(() => import('../pages/Admin/Sections/TransformationsManager'));
const HowItWorksManager = lazy(() => import('../pages/Admin/Sections/HowItWorksManager'));
const TestimonialsManager = lazy(() => import('../pages/Admin/Sections/TestimonialsManager'));
const BookingManager = lazy(() => import('../pages/Admin/Sections/BookingManager'));
const NavbarManager = lazy(() => import('../pages/Admin/Sections/NavbarManager'));
const FooterManager = lazy(() => import('../pages/Admin/Sections/FooterManager'));
const ProgramsManager = lazy(() => import('../pages/Admin/Sections/ProgramsManager'));

const AdminRoutes = () => {
  return (
    <Suspense fallback={<div style={{ padding: '24px', fontSize: '14px', color: 'var(--text3)' }}>Accessing Admin Section Config...</div>}>
      <Routes>
        <Route path="navbar" element={<NavbarManager />} />
        <Route path="hero" element={<HeroSectionManager />} />
        <Route path="about" element={<AboutSectionManager />} />
        <Route path="specialties" element={<SpecialtiesManager />} />
        <Route path="transformations" element={<TransformationsManager />} />
        <Route path="how-it-works" element={<HowItWorksManager />} />
        <Route path="testimonials" element={<TestimonialsManager />} />
        <Route path="bookings" element={<BookingManager />} />
        <Route path="footer" element={<FooterManager />} />
        <Route path="programs" element={<ProgramsManager />} />
      </Routes>
    </Suspense>
  );
};

export default AdminRoutes;
