import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/Admin/ProtectedRoute';
import RecoverPassword from './pages/RecoverPassword';
import ForgotPassword from './pages/ForgotPassword';
import Login from './pages/Login';
import { ToastProvider } from './components/Admin/ToastContext';
import AdminLayout from './components/Admin/AdminLayout';
import AdminRoutes from './routes/AdminRoutes';

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import Programs from "./components/Programs";
import Stats from "./components/Stats";
import Trainers from "./components/Trainers";
import Pricing from "./components/Pricing";
import Schedule from "./components/Schedule";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

function PublicLayout() {
  const [dark, setDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [big, setBig] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Only apply custom cursor on public landing page
    document.body.classList.add('custom-cursor-active');
    return () => {
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  // Check if we are in admin preview mode to disable custom cursor scaling bounds
  const isPreview = window.location.search.includes('admin_preview');

  useEffect(() => {
    if (isPreview) return;
    const onMove = e => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [isPreview]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    // Initial scan
    document.querySelectorAll(".fade-in").forEach(el => obs.observe(el));

    // Dynamic observer for dynamically injected elements (e.g. async loads/re-renders)
    const mutationObs = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.classList.contains('fade-in')) {
              obs.observe(node);
            }
            node.querySelectorAll('.fade-in').forEach(el => obs.observe(el));
          }
        });
      });
    });

    mutationObs.observe(document.body, { childList: true, subtree: true });

    return () => {
      obs.disconnect();
      mutationObs.disconnect();
    };
  }, []);

  const hover = () => setBig(true);
  const unhover = () => setBig(false);

  return (
    <>
      {/* RESTORE CURSOR & PREVENT LAG INSIDE IFRAME */}
      {isPreview && <style>{`body, html, a, button, select, input, textarea, * { cursor: auto !important; }`}</style>}

      {/* CURSOR */}
      {!isPreview && <div className={`cursor ${big ? " big" : ""}`} style={{ left: cursor.x, top: cursor.y }} />}

      {/* NAVBAR */}
      <Navbar scrolled={scrolled} dark={dark} setDark={setDark} hover={hover} unhover={unhover} />

      {/* MAIN SECTIONS */}
      <Hero hover={hover} unhover={unhover} />
      <Ticker />
      <Programs hover={hover} unhover={unhover} />
      <Stats />
      <Trainers hover={hover} unhover={unhover} />
      <Pricing hover={hover} unhover={unhover} />
      <Schedule hover={hover} unhover={unhover} />
      <Testimonials hover={hover} unhover={unhover} />
      <CTA hover={hover} unhover={unhover} />
      <Footer hover={hover} unhover={unhover} />
    </>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <Router basename={import.meta.env.VITE_ROUTER_BASE || '/'}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/recover-password" element={<RecoverPassword />} />
          
          <Route path="/" element={<PublicLayout />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<div style={{ padding: '20px' }}><h1>Welcome to Admin Dashboard</h1><p>Select a section from the sidebar to manage content.</p></div>} />
              <Route path="*" element={<AdminRoutes />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </ToastProvider>
  );
}
