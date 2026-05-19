import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/Admin/ProtectedRoute';
import RecoverPassword from './pages/RecoverPassword';
import ForgotPassword from './pages/ForgotPassword';
import Login from './pages/Login';
import { ToastProvider } from './components/Admin/ToastContext';
import AdminLayout from './components/Admin/AdminLayout';
import AdminRoutes from './routes/AdminRoutes';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';

function PublicLayout() {
  const [theme, setTheme] = useState('dark');
  const [font, setFont] = useState('impact');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-font', font);
  }, [font]);

  const isPreview = window.location.search.includes('admin_preview');

  return (
    <>
      {isPreview && <style>{`body, html, a, button, select, input, textarea, * { cursor: auto !important; }`}</style>}
      <Navbar theme={theme} setTheme={setTheme} font={font} setFont={setFont} />
      <Home />
      <Footer />
    </>
  );
}

export default function App() {
  const getRouterBasename = () => {
    const configuredBase = import.meta.env.VITE_ROUTER_BASE || '';
    if (configuredBase && window.location.pathname.startsWith(configuredBase)) {
      return configuredBase;
    }
    return '/';
  };

  return (
    <ToastProvider>
      <Router basename={getRouterBasename()}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/recover-password" element={<RecoverPassword />} />
          
          <Route path="/" element={<PublicLayout />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={
                <div style={{ padding: '40px 24px', textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'var(--bg)' }}>
                  <h1 style={{ fontSize: '20px', fontWeight: '850', color: 'var(--text)', marginBottom: '8px', fontFamily: 'var(--ff-sub)', textTransform: 'uppercase' }}>MARCUS REID CUSTOMIZER</h1>
                  <p style={{ fontSize: '13px', color: 'var(--text3)', maxWidth: '300px', lineHeight: '1.6', margin: 0 }}>
                    Select a section from the upper carousel to live-edit content and branding options.
                  </p>
                </div>
              } />
              <Route path="*" element={<AdminRoutes />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </ToastProvider>
  );
}
