import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const HeroSectionManager = lazy(() => import('../pages/Admin/Sections/HeroSectionManager'));
const AboutSectionManager = lazy(() => import('../pages/Admin/Sections/AboutSectionManager'));
const TreatmentsManager = lazy(() => import('../pages/Admin/Sections/TreatmentsManager'));
const CaseStudiesManager = lazy(() => import('../pages/Admin/Sections/CaseStudiesManager'));
const HowItWorksManager = lazy(() => import('../pages/Admin/Sections/HowItWorksManager'));
const ReviewsManager = lazy(() => import('../pages/Admin/Sections/ReviewsManager'));
const BookingManager = lazy(() => import('../pages/Admin/Sections/BookingManager'));
const NavbarManager = lazy(() => import('../pages/Admin/Sections/NavbarManager'));
const FooterManager = lazy(() => import('../pages/Admin/Sections/FooterManager'));

const AdminRoutes = () => {
  return (
    <Suspense fallback={<div style={{ padding: '24px', fontSize: '14px', color: '#64748b' }}>Accessing Admin Section Config...</div>}>
      <Routes>
        <Route path="navbar" element={<NavbarManager />} />
        <Route path="hero" element={<HeroSectionManager />} />
        <Route path="about" element={<AboutSectionManager />} />
        <Route path="treatments" element={<TreatmentsManager />} />
        <Route path="case-studies" element={<CaseStudiesManager />} />
        <Route path="how-it-works" element={<HowItWorksManager />} />
        <Route path="reviews" element={<ReviewsManager />} />
        <Route path="bookings" element={<BookingManager />} />
        <Route path="footer" element={<FooterManager />} />
      </Routes>
    </Suspense>
  );
};

export default AdminRoutes;
