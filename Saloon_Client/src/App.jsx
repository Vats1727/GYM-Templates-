import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/Admin/ProtectedRoute';
import RecoverPassword from './pages/RecoverPassword';
import ForgotPassword from './pages/ForgotPassword';
import Login from './pages/Login';
import { ToastProvider } from './components/Admin/ToastContext';
import AdminLayout from './components/Admin/AdminLayout';
import AdminRoutes from './routes/AdminRoutes';
import Home from './pages/Home';

function PublicLayout() {
  // Check if we are in admin preview mode
  const isPreview = window.location.search.includes('admin_preview');

  return (
    <>
      {/* RESTORE CURSOR & PREVENT LAG INSIDE IFRAME */}
      {isPreview && <style>{`body, html, a, button, select, input, textarea, * { cursor: auto !important; }`}</style>}
      <Home />
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
              <Route index element={
                <div style={{ padding: '40px 24px', textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#f8fafc' }}>
                  <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Velour Customizer</h1>
                  <p style={{ fontSize: '13px', color: '#64748b', maxWidth: '300px', lineHeight: '1.6', margin: 0 }}>
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
