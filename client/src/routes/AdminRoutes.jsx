import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const HeroSectionManager = lazy(() => import('../pages/Admin/Sections/HeroSectionManager'));
const CtaSectionManager = lazy(() => import('../pages/Admin/Sections/CtaSectionManager'));
const TickerManager = lazy(() => import('../pages/Admin/Sections/TickerManager'));
const ProgramsManager = lazy(() => import('../pages/Admin/Sections/ProgramsManager'));
const StatsManager = lazy(() => import('../pages/Admin/Sections/StatsManager'));
const TrainersManager = lazy(() => import('../pages/Admin/Sections/TrainersManager'));
const PricingManager = lazy(() => import('../pages/Admin/Sections/PricingManager'));
const ScheduleManager = lazy(() => import('../pages/Admin/Sections/ScheduleManager'));
const TestimonialsManager = lazy(() => import('../pages/Admin/Sections/TestimonialsManager'));
const NavbarManager = lazy(() => import('../pages/Admin/Sections/NavbarManager'));
const FooterManager = lazy(() => import('../pages/Admin/Sections/FooterManager'));

const AdminRoutes = () => {
  return (
    <Suspense fallback={<div style={{ padding: '20px' }}>Loading Section...</div>}>
      <Routes>
        <Route path="hero_section" element={<HeroSectionManager />} />
        <Route path="cta_section" element={<CtaSectionManager />} />
        <Route path="ticker" element={<TickerManager />} />
        <Route path="programs" element={<ProgramsManager />} />
        <Route path="stats" element={<StatsManager />} />
        <Route path="trainers" element={<TrainersManager />} />
        <Route path="pricing" element={<PricingManager />} />
        <Route path="schedule" element={<ScheduleManager />} />
        <Route path="testimonials" element={<TestimonialsManager />} />
        <Route path="navbar" element={<NavbarManager />} />
        <Route path="footer" element={<FooterManager />} />
      </Routes>
    </Suspense>
  );
};

export default AdminRoutes;
