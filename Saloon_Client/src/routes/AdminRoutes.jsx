import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const HeroSectionManager = lazy(() => import('../pages/Admin/Sections/HeroSectionManager'));
const TickerManager = lazy(() => import('../pages/Admin/Sections/TickerManager'));
const ServicesManager = lazy(() => import('../pages/Admin/Sections/ServicesManager'));
const WorkManager = lazy(() => import('../pages/Admin/Sections/WorkManager'));
const TeamManager = lazy(() => import('../pages/Admin/Sections/TeamManager'));
const RewardsManager = lazy(() => import('../pages/Admin/Sections/RewardsManager'));
const ProductsManager = lazy(() => import('../pages/Admin/Sections/ProductsManager'));
const ReviewsManager = lazy(() => import('../pages/Admin/Sections/ReviewsManager'));
const FaqManager = lazy(() => import('../pages/Admin/Sections/FaqManager'));
const BookingManager = lazy(() => import('../pages/Admin/Sections/BookingManager'));
const NavbarManager = lazy(() => import('../pages/Admin/Sections/NavbarManager'));
const FooterManager = lazy(() => import('../pages/Admin/Sections/FooterManager'));

const AdminRoutes = () => {
  return (
    <Suspense fallback={<div style={{ padding: '24px', fontSize: '14px', color: '#64748b' }}>Accessing Velour Section Config...</div>}>
      <Routes>
        <Route path="hero_section" element={<HeroSectionManager />} />
        <Route path="ticker" element={<TickerManager />} />
        <Route path="services" element={<ServicesManager />} />
        <Route path="work" element={<WorkManager />} />
        <Route path="team" element={<TeamManager />} />
        <Route path="rewards" element={<RewardsManager />} />
        <Route path="products" element={<ProductsManager />} />
        <Route path="reviews" element={<ReviewsManager />} />
        <Route path="faq" element={<FaqManager />} />
        <Route path="booked_appointments" element={<BookingManager />} />
        <Route path="navbar" element={<NavbarManager />} />
        <Route path="footer" element={<FooterManager />} />
      </Routes>
    </Suspense>
  );
};

export default AdminRoutes;
