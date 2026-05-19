import './Admin.css';
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';

const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [adminUser, setAdminUser] = useState(null);
  const [iframeKey, setIframeKey] = useState(0);
  const [previewMode, setPreviewMode] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const iframeRef = React.useRef(null);

  const getSimulatorWidth = () => {
    if (previewMode === 'mobile') return '390px';
    if (previewMode === 'tablet') return '768px';
    return '100%';
  };

  const getSimulatorHeight = () => {
    if (previewMode === 'mobile') return '85%';
    if (previewMode === 'tablet') return '95%';
    return '100%';
  };

  // Map paths to hash anchors for auto-scroll in gym preview
  const routeAnchorMap = {
    '/admin/navbar': '#navbar',
    '/admin/hero': '#home',
    '/admin/about': '#about',
    '/admin/specialties': '#specialties',
    '/admin/transformations': '#transformations',
    '/admin/programs': '#programs',
    '/admin/testimonials': '#testimonials',
    '/admin/how-it-works': '#process',
    '/admin/footer': '#booking',
  };

  const getPreviewUrl = () => {
    const baseUrl = import.meta.env.VITE_ROUTER_BASE || '/';
    return `${baseUrl}?admin_preview=true`;
  };

  // Intelligent Zero-Flicker Active Section Tracker ⚓️
  useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const anchor = routeAnchorMap[location.pathname] || '';
      try {
        if (anchor) {
          iframeRef.current.contentWindow.location.hash = anchor;
        } else {
          iframeRef.current.contentWindow.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } catch (err) {}
    }
  }, [location.pathname]);

  const handleIframeLoad = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const anchor = routeAnchorMap[location.pathname] || '';
      try {
        if (anchor) {
          iframeRef.current.contentWindow.location.hash = anchor;
        }
      } catch (err) {}
    }
  };

  const handleRefreshPreview = () => {
    setIframeKey(prev => prev + 1);
  };

  useEffect(() => {
    const handleApiUpdate = () => {
      setTimeout(() => {
        if (iframeRef.current && iframeRef.current.contentWindow) {
          try {
            iframeRef.current.contentWindow.postMessage({ type: 'LIVE_DATA_REFRESH' }, '*');
          } catch (err) {
            setIframeKey(prev => prev + 1);
          }
        }
      }, 250);
    };

    const handleWindowMessage = (event) => {
      if (event.data && event.data.type === 'OPEN_SECTION') {
        console.log('🚀 Contextual Link Clicked! Diverting customizer sidebar to:', event.data.section);
        navigate(event.data.section);
      }
    };

    window.addEventListener('api-data-updated', handleApiUpdate);
    window.addEventListener('message', handleWindowMessage);

    return () => {
      window.removeEventListener('api-data-updated', handleApiUpdate);
      window.removeEventListener('message', handleWindowMessage);
    };
  }, [navigate]);

  useEffect(() => {
    const user = localStorage.getItem('admin_user');
    if (user) {
      setAdminUser(JSON.parse(user));
    }
    if (window.innerWidth <= 1200) {
      setSidebarOpen(false);
    }
  }, []);

  useEffect(() => {
    if (location.pathname === '/admin' || location.pathname === '/admin/') {
      navigate('/admin/hero'); 
    }
  }, [location.pathname, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    navigate('/login');
  };

  const navItems = [
    { title: 'Navbar Settings', path: '/admin/navbar', icon: 'Menu' },
    { title: 'Hero Section', path: '/admin/hero', icon: 'Home' },
    { title: 'About Marcus', path: '/admin/about', icon: 'User' },
    { title: 'Training Specialties', path: '/admin/specialties', icon: 'Activity' },
    { title: 'Client Transformations', path: '/admin/transformations', icon: 'TrendingUp' },
    { title: 'Membership Programs', path: '/admin/programs', icon: 'Award' },
    { title: 'Reviews & Feedback', path: '/admin/testimonials', icon: 'Star' },
    { title: 'Process Steps', path: '/admin/how-it-works', icon: 'ListOrdered' },
    { title: 'Bookings Database', path: '/admin/bookings', icon: 'CalendarCheck' },
    { title: 'Footer Settings', path: '/admin/footer', icon: 'Layout' },
  ];

  const currentPath = location.pathname;
  const currentItem = navItems.find(item => item.path === currentPath) || { title: 'Admin' };
  const isWideApp = location.pathname === '/admin/bookings';

  return (
    <div className="admin-container mode-customizer">
      {isSidebarOpen && window.innerWidth <= 1024 && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`admin-sidebar editing-active ${!isSidebarOpen ? 'collapsed-active' : ''}`}>
        <div className="modern-sidebar-header">
          <div className="admin-logo-box">
            <div className="logo-icon">
              <LucideIcons.ShieldCheck size={20} color="var(--accent)" />
            </div>
            <span>MARCUS<span className="slash">/</span>REID</span>
          </div>
          <button 
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            style={{
              background: 'var(--surface)', border: 'none', color: 'var(--text2)',
              width: '32px', height: '32px', borderRadius: '4px', display: 'flex',
              alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              transition: 'all 0.2s', border: '1px solid var(--border)'
            }}
            title={isSidebarOpen ? "Collapse Settings Sidebar" : "Expand Settings Sidebar"}
          >
            {isSidebarOpen ? <LucideIcons.PanelLeftClose size={18} /> : <LucideIcons.PanelLeftOpen size={18} />}
          </button>
        </div>

        <div className="sections-horizontal-carousel">
          {navItems.filter(item => item.path !== '/admin').map((item, idx) => {
            const Icon = LucideIcons[item.icon] || LucideIcons.Circle;
            const isActive = location.pathname === item.path;
            const displayTitle = item.title
              .replace('Section', '')
              .replace('List', '')
              .replace('Settings', '')
              .replace('Database', '')
              .replace('Bookings', 'Bookings')
              .trim();

            return (
              <Link 
                key={idx} 
                to={item.path} 
                className={`carousel-card ${isActive ? 'active' : ''}`}
                title={item.title}
              >
                <div className="card-icon-container">
                  <Icon size={18} />
                </div>
                <span className="card-label">{displayTitle}</span>
                {isActive && <span className="active-dot-indicator" />}
              </Link>
            );
          })}
        </div>

        <div className="sidebar-native-outlet-wrapper">
          {!isWideApp && <Outlet />}
          {isWideApp && (
            <div style={{ 
              padding: '40px 24px', textAlign: 'center', height: '100%', 
              display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
              background: 'var(--surface)', borderRadius: '4px', border: '1px solid var(--border)'
            }}>
              <div style={{ background: 'rgba(232,255,0,0.1)', color: 'var(--accent)', padding: '16px', borderRadius: '4px', marginBottom: '20px', display: 'flex' }}>
                <LucideIcons.CalendarCheck size={32} />
              </div>
              <h3 style={{ fontSize: '15px', color: 'var(--text)', margin: '0 0 8px', fontWeight: '800', fontFamily: 'var(--ff-sub)', textTransform: 'uppercase' }}>Bookings Intake List</h3>
              <p style={{ fontSize: '12px', lineHeight: '1.6', color: 'var(--text3)', margin: 0 }}>
                The live bookings database list occupies the complete width of the screen to give you a full spreadsheet view.
              </p>
            </div>
          )}
        </div>

        <div className="modern-sidebar-footer">
          <a 
            href={(() => {
              const path = window.location.pathname;
              const adminIdx = path.toLowerCase().indexOf('/admin');
              if (adminIdx !== -1) {
                return path.substring(0, adminIdx) + '/';
              }
              return '/';
            })()} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer-action-link" 
            title="View Live Public Site"
          >
            <LucideIcons.Globe size={18} />
            <span className="footer-label">Live Public Site</span>
          </a>
          <button className="footer-action-btn" onClick={handleLogout} title="Sign Out of Admin">
            <LucideIcons.LogOut size={18} />
            <span className="footer-label">Log Out</span>
          </button>
        </div>
      </aside>

      <main className="admin-main">
        {isWideApp ? (
          <div 
            style={{ 
              position: 'fixed',
              top: '0px',
              bottom: '0px',
              right: '0px',
              left: isSidebarOpen ? '380px' : '80px',
              width: isSidebarOpen ? 'calc(100vw - 380px)' : 'calc(100vw - 80px)',
              height: '100vh',
              zIndex: '10',
              background: 'var(--bg)',
              overflowY: 'auto',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <Outlet />
          </div>
        ) : (
          <section className="admin-content-container">
            <div 
              className="admin-preview-panel absolute-canvas"
              style={{ 
              position: 'fixed',
              top: '0px',
              bottom: '0px',
              right: '0px',
              left: isSidebarOpen ? '380px' : '80px',
              width: isSidebarOpen ? 'calc(100vw - 380px)' : 'calc(100vw - 80px)',
              height: '100vh',
              margin: '0px',
              padding: '0px',
              zIndex: '10',
              background: 'var(--bg)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
              justifyContent: 'stretch',
              boxSizing: 'border-box',
              overflow: 'hidden',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <div 
              className={`browser-simulator-card mode-${previewMode}`}
              style={{ 
                width: previewMode === 'desktop' ? '100%' : getSimulatorWidth(),
                maxWidth: '100%',
                height: previewMode === 'desktop' ? '100%' : getSimulatorHeight(),
                maxHeight: '100%',
                position: 'absolute',
                top: previewMode === 'desktop' ? '0px' : '50%',
                left: previewMode === 'desktop' ? '0px' : '50%',
                transform: previewMode === 'desktop' ? 'none' : 'translate(-50%, -50%)',
                margin: '0px',
                padding: '0px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: previewMode === 'desktop' ? '0px' : '6px',
                boxShadow: previewMode === 'desktop' ? 'none' : '0 20px 50px rgba(0,0,0,0.5)',
                border: previewMode === 'desktop' ? 'none' : '1px solid var(--border)',
                borderLeft: '1px solid var(--border)'
              }}
            >
              <div className="preview-header">
                <div className="preview-status">
                  <span className="status-dot pulsing"></span> Live Preview
                </div>

                <div className="preview-device-controls">
                  <div className="device-btn-group">
                    <button 
                      className={`device-toggle-btn ${previewMode === 'mobile' ? 'active' : ''}`} 
                      onClick={() => setPreviewMode('mobile')}
                      title="Mobile Preset View"
                    >
                      <LucideIcons.Smartphone size={14} />
                    </button>
                    <button 
                      className={`device-toggle-btn ${previewMode === 'tablet' ? 'active' : ''}`} 
                      onClick={() => setPreviewMode('tablet')}
                      title="Tablet Preset View"
                    >
                      <LucideIcons.Tablet size={14} />
                    </button>
                    <button 
                      className={`device-toggle-btn ${previewMode === 'desktop' ? 'active' : ''}`} 
                      onClick={() => setPreviewMode('desktop')}
                      title="Desktop Preset View"
                    >
                      <LucideIcons.Monitor size={14} />
                    </button>
                  </div>
                </div>

                <button className="refresh-preview-btn" onClick={handleRefreshPreview} title="Refresh Page Context">
                  <LucideIcons.RotateCw size={14} />
                </button>
              </div>
              
              <iframe 
                key={iframeKey}
                src={getPreviewUrl()} 
                className="admin-preview-iframe"
                ref={iframeRef}
                onLoad={handleIframeLoad}
                title="Live Customizer Preview"
              />
            </div>
          </div>
        </section>
        )}
      </main>

      <style>{`
        html, body, a, button, select, input, textarea, [role="button"], * {
          cursor: auto !important;
        }

        .admin-container.mode-customizer {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          max-width: 100vw !important;
          max-height: 100vh !important;
          margin: 0 !important;
          padding: 0 !important;
          z-index: 99999 !important;
          overflow: hidden !important;
          background: var(--bg) !important;
          display: flex !important;
        }

        .admin-sidebar.editing-active {
          flex: 0 0 380px !important;
          width: 380px !important;
          min-width: 380px !important;
          max-width: 380px !important;
          background: var(--card) !important;
          border-right: 1px solid var(--border) !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          display: flex !important;
          flex-direction: column !important;
          height: 100vh !important;
          overflow: hidden !important;
          box-shadow: 4px 0 24px rgba(0,0,0,0.3) !important;
          opacity: 1 !important;
        }

        .admin-sidebar.editing-active.collapsed-active {
          flex: 0 0 80px !important;
          width: 80px !important;
          min-width: 80px !important;
          max-width: 80px !important;
          border-right: 1px solid var(--border) !important;
          opacity: 1 !important;
          pointer-events: auto !important;
        }

        .admin-sidebar.editing-active.collapsed-active .modern-sidebar-header {
          padding: 14px 0 !important;
          justify-content: center !important;
          flex-direction: column !important;
        }
        .admin-sidebar.editing-active.collapsed-active .admin-logo-box span {
          display: none !important;
        }
        .admin-sidebar.editing-active.collapsed-active .sidebar-native-outlet-wrapper {
          display: none !important;
        }
        .admin-sidebar.editing-active.collapsed-active .sections-horizontal-carousel {
          flex-direction: column !important;
          overflow-y: auto !important;
          overflow-x: hidden !important;
          padding: 16px 0 !important;
          gap: 16px !important;
          align-items: center !important;
          background: var(--card) !important;
          border-bottom: none !important;
          height: 100% !important;
        }
        .admin-sidebar.editing-active.collapsed-active .carousel-card {
          width: 44px !important;
          height: 44px !important;
          min-width: 44px !important;
          flex-shrink: 0 !important;
          padding: 0 !important;
          justify-content: center !important;
          border-radius: 4px !important;
        }
        .admin-sidebar.editing-active.collapsed-active .card-label,
        .admin-sidebar.editing-active.collapsed-active .active-dot-indicator {
          display: none !important;
        }

        .sidebar-content-wrapper {
          flex: 1 !important;
          display: flex !important;
          flex-direction: column !important;
          min-height: 0 !important;
          overflow: hidden !important;
        }

        .modern-sidebar-header {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          padding: 14px 20px !important;
          border-bottom: 1px solid var(--border) !important;
          background: var(--card) !important;
          flex-shrink: 0 !important;
        }
        .modern-sidebar-header .admin-logo-box {
          display: flex !important;
          align-items: center !important;
          gap: 8px !important;
        }
        .modern-sidebar-header .admin-logo-box span {
          font-weight: 850 !important;
          font-size: 14px !important;
          color: var(--text) !important;
          letter-spacing: 0.05em !important;
          font-family: var(--ff-sub) !important;
        }
        .modern-sidebar-footer {
          margin-top: auto !important;
          border-top: 1px solid var(--border) !important;
          padding: 16px 20px !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 12px !important;
          background: var(--card) !important;
          flex-shrink: 0 !important;
        }
        .footer-action-btn, .footer-action-link {
          display: flex !important;
          align-items: center !important;
          gap: 12px !important;
          background: transparent !important;
          border: none !important;
          color: var(--text3) !important;
          cursor: pointer !important;
          padding: 10px 12px !important;
          border-radius: 4px !important;
          font-weight: 600 !important;
          font-size: 13px !important;
          text-decoration: none !important;
          transition: all 0.2s !important;
          width: 100% !important;
          box-sizing: border-box !important;
        }
        .footer-action-link:hover {
          background: rgba(232, 255, 0, 0.1) !important;
          color: var(--accent) !important;
        }
        .footer-action-btn:hover {
          background: rgba(239, 68, 68, 0.1) !important;
          color: #ef4444 !important;
        }

        .admin-sidebar.editing-active.collapsed-active .modern-sidebar-footer {
          padding: 16px 0 !important;
          align-items: center !important;
        }
        .admin-sidebar.editing-active.collapsed-active .footer-label {
          display: none !important;
        }
        .admin-sidebar.editing-active.collapsed-active .footer-action-btn,
        .admin-sidebar.editing-active.collapsed-active .footer-action-link {
          justify-content: center !important;
          padding: 10px !important;
          width: 44px !important;
          height: 44px !important;
          gap: 0 !important;
        }

        .sections-horizontal-carousel {
          display: flex !important;
          overflow-x: auto !important;
          gap: 12px !important;
          padding: 16px 20px 12px 20px !important;
          background: var(--surface) !important;
          border-bottom: 1px solid var(--border) !important;
          flex-shrink: 0 !important;
          scrollbar-width: thin !important;
          scrollbar-color: var(--border) transparent !important;
        }

        .sections-horizontal-carousel::-webkit-scrollbar {
          height: 4px !important;
          display: block !important;
        }
        .sections-horizontal-carousel::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05) !important;
        }
        .sections-horizontal-carousel::-webkit-scrollbar-thumb {
          background: var(--border) !important;
          border-radius: 2px !important;
        }

        .carousel-card {
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          gap: 6px !important;
          text-decoration: none !important;
          color: var(--text3) !important;
          flex-shrink: 0 !important;
          width: 62px !important;
          transition: all 0.2s ease-in-out !important;
          position: relative !important;
        }
        .card-icon-container {
          width: 42px !important;
          height: 42px !important;
          border-radius: 4px !important;
          background: var(--card) !important;
          border: 1px solid var(--border) !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          transition: all 0.2s !important;
          color: var(--text2) !important;
        }
        .card-label {
          font-size: 9px !important;
          font-weight: 700 !important;
          text-align: center !important;
          max-width: 100% !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
          white-space: nowrap !important;
          text-transform: uppercase !important;
          letter-spacing: 0.05em !important;
        }

        .carousel-card:hover .card-icon-container {
          border-color: var(--accent) !important;
          color: var(--text) !important;
          transform: translateY(-1px) !important;
        }
        .carousel-card:hover .card-label {
          color: var(--text) !important;
        }

        .carousel-card.active .card-icon-container {
          background: var(--accent) !important;
          border-color: var(--accent) !important;
          color: var(--bg) !important;
          box-shadow: 0 4px 12px rgba(232, 255, 0, 0.2) !important;
        }
        .carousel-card.active .card-label {
          color: var(--accent) !important;
          font-weight: 850 !important;
        }
        .active-dot-indicator {
          position: absolute !important;
          bottom: -10px !important;
          width: 4px !important;
          height: 4px !important;
          background: var(--accent) !important;
          border-radius: 50% !important;
        }

        .sidebar-native-outlet-wrapper,
        .sidebar-native-outlet-wrapper * {
          box-sizing: border-box !important;
        }
        .sidebar-native-outlet-wrapper {
          background: var(--bg) !important;
          flex: 1 !important;
          padding: 16px 16px 32px 16px !important;
          overflow-y: auto !important;
          min-height: 0 !important;
        }
        
        .sidebar-native-outlet-wrapper::-webkit-scrollbar {
          width: 6px;
        }
        .sidebar-native-outlet-wrapper::-webkit-scrollbar-track {
          background: var(--bg);
        }
        .sidebar-native-outlet-wrapper::-webkit-scrollbar-thumb {
          background: var(--border);
          border-radius: 3px;
        }
        
        .sidebar-native-outlet-wrapper .admin-card {
          background: var(--card) !important;
          border: 1px solid var(--border) !important;
          border-radius: 6px !important;
          padding: 18px !important;
          margin-bottom: 16px !important;
        }

        .sidebar-native-outlet-wrapper .admin-section-header,
        .sidebar-native-outlet-wrapper .admin-card-header {
          margin-bottom: 12px !important;
          margin-top: 0px !important;
          padding-top: 0px !important;
        }
        
        .sidebar-native-outlet-wrapper .admin-section-header h2,
        .sidebar-native-outlet-wrapper .admin-card-title {
          font-size: 16px !important;
          font-weight: 850 !important;
          margin-bottom: 0px !important;
          margin-top: 0px !important;
          letter-spacing: 0.03em !important;
          text-transform: uppercase !important;
          font-family: var(--ff-sub) !important;
          color: var(--text) !important;
        }
        
        .sidebar-native-outlet-wrapper .admin-section-header p,
        .sidebar-native-outlet-wrapper .admin-card-subtitle {
          display: none !important;
        }
        
        .sidebar-native-outlet-wrapper .admin-card-header h3 {
          font-size: 13px !important;
        }

        .sidebar-native-outlet-wrapper .admin-btn {
          padding: 8px 14px !important;
          font-size: 12px !important;
          min-height: unset !important;
          height: auto !important;
          gap: 6px !important;
          border-radius: 4px !important;
        }
        
        .sidebar-native-outlet-wrapper .admin-table-wrap {
          box-shadow: none !important;
          border: 1px solid var(--border) !important;
          margin-top: 8px !important;
          border-radius: 4px !important;
        }
        .sidebar-native-outlet-wrapper table.admin-table {
          width: 100% !important;
          table-layout: fixed !important;
          font-size: 12px !important;
        }
        .sidebar-native-outlet-wrapper table.admin-table th {
          padding: 8px 10px !important;
          font-size: 10px !important;
          background: var(--surface) !important;
          letter-spacing: 0.5px !important;
          font-weight: 750 !important;
          color: var(--text3) !important;
          text-transform: uppercase !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
          white-space: nowrap !important;
        }
        .sidebar-native-outlet-wrapper table.admin-table td {
          padding: 8px 10px !important;
          vertical-align: middle !important;
          height: auto !important;
          line-height: 1.3 !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
          white-space: nowrap !important;
        }
        
        .sidebar-native-outlet-wrapper table.admin-table th:first-child,
        .sidebar-native-outlet-wrapper table.admin-table td:first-child {
          width: 36px !important;
        }
        .sidebar-native-outlet-wrapper table.admin-table th:last-child,
        .sidebar-native-outlet-wrapper table.admin-table td:last-child {
          width: 85px !important;
          text-align: right !important;
        }
        
        .sidebar-native-outlet-wrapper table.admin-table th:nth-child(n+5):not(:last-child),
        .sidebar-native-outlet-wrapper table.admin-table td:nth-child(n+5):not(:last-child) {
          display: none !important;
        }
        
        .sidebar-native-outlet-wrapper table.admin-table img {
          width: 36px !important;
          height: 36px !important;
          border-radius: 4px !important;
          object-fit: cover !important;
        }
        
        .sidebar-native-outlet-wrapper .admin-actions {
          gap: 4px !important;
        }
        .sidebar-native-outlet-wrapper .admin-action-btn {
          width: 28px !important;
          height: 28px !important;
          font-size: 12px !important;
          padding: 0 !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          border-radius: 4px !important;
        }
        .sidebar-native-outlet-wrapper .admin-action-btn svg {
          width: 14px !important;
          height: 14px !important;
        }
        
        .sidebar-native-outlet-wrapper .admin-form-grid {
          grid-template-columns: 1fr !important;
          gap: 12px !important;
          width: 100% !important;
          max-width: 100% !important;
        }
        
        .sidebar-native-outlet-wrapper .admin-form-group {
          margin-bottom: 12px !important;
          width: 100% !important;
          max-width: 100% !important;
        }

        .sidebar-native-outlet-wrapper .admin-input,
        .sidebar-native-outlet-wrapper .admin-textarea,
        .sidebar-native-outlet-wrapper input:not([type="color"]):not([type="checkbox"]):not([type="radio"]),
        .sidebar-native-outlet-wrapper textarea,
        .sidebar-native-outlet-wrapper select,
        .sidebar-native-outlet-wrapper .icon-selector-premium,
        .sidebar-native-outlet-wrapper .icon-current,
        .sidebar-native-outlet-wrapper .input-wrapper-premium,
        .sidebar-native-outlet-wrapper .image-upload-box-premium,
        .sidebar-native-outlet-wrapper .text-repeater,
        .sidebar-native-outlet-wrapper .repeater-item {
          width: 100% !important;
          max-width: 100% !important;
        }

        .sidebar-native-outlet-wrapper input[type="color"] {
          width: 50px !important;
          min-width: 50px !important;
          max-width: 50px !important;
          height: 42px !important;
          min-height: 42px !important;
          padding: 2px !important;
          background: var(--card) !important;
          cursor: pointer !important;
          border: 1px solid var(--border) !important;
          border-radius: 4px !important;
        }

        .sidebar-native-outlet-wrapper .admin-label {
          font-size: 12px !important;
          margin-bottom: 4px !important;
          font-weight: 700 !important;
          color: var(--text2) !important;
          font-family: var(--ff-sub) !important;
          text-transform: uppercase !important;
          letter-spacing: 0.05em !important;
        }

        .sidebar-native-outlet-wrapper .admin-input,
        .sidebar-native-outlet-wrapper .admin-textarea,
        .sidebar-native-outlet-wrapper input:not([type="color"]):not([type="checkbox"]):not([type="radio"]),
        .sidebar-native-outlet-wrapper textarea,
        .sidebar-native-outlet-wrapper select {
          padding: 8px 12px !important;
          font-size: 13px !important;
          min-height: 38px !important;
          height: auto !important;
          border-radius: 4px !important;
          background: var(--surface) !important;
          border: 1px solid var(--border) !important;
          color: var(--text) !important;
        }
        .sidebar-native-outlet-wrapper select option {
          background: var(--card) !important;
          color: var(--text) !important;
        }
        .sidebar-native-outlet-wrapper .admin-input:focus,
        .sidebar-native-outlet-wrapper .admin-textarea:focus,
        .sidebar-native-outlet-wrapper input:not([type="color"]):not([type="checkbox"]):not([type="radio"]):focus,
        .sidebar-native-outlet-wrapper textarea:focus,
        .sidebar-native-outlet-wrapper select:focus {
          border-color: var(--accent) !important;
          outline: none !important;
        }
        
        .sidebar-native-outlet-wrapper .admin-search-box-premium {
          position: relative !important;
          display: flex !important;
          align-items: center !important;
          width: 100% !important;
        }
        .sidebar-native-outlet-wrapper .admin-search-box-premium svg {
          position: absolute !important;
          left: 14px !important;
          color: var(--text3) !important;
          pointer-events: none !important;
          z-index: 10 !important;
          transition: color 0.2s !important;
        }
        .sidebar-native-outlet-wrapper .admin-search-box-premium input.admin-input,
        .sidebar-native-outlet-wrapper .admin-search-box-premium input:not([type="color"]):not([type="checkbox"]):not([type="radio"]) {
          padding-left: 42px !important;
          width: 100% !important;
        }
        .sidebar-native-outlet-wrapper .admin-search-box-premium:focus-within svg {
          color: var(--accent) !important;
        }
        
        .sidebar-native-outlet-wrapper .admin-textarea,
        .sidebar-native-outlet-wrapper textarea {
          min-height: 80px !important;
          max-height: 140px !important;
          resize: vertical !important;
        }

        .sidebar-native-outlet-wrapper .icon-current svg {
          stroke: var(--text) !important;
          stroke-width: 2px !important;
          display: inline-block !important;
          vertical-align: middle !important;
          margin-right: 10px !important;
          flex-shrink: 0 !important;
        }

        .sidebar-native-outlet-wrapper .icon-search-bar {
          background: var(--surface) !important;
          border: 1px solid var(--border) !important;
          border-radius: 4px !important;
          padding: 4px 12px !important;
          display: flex !important;
          align-items: center !important;
          gap: 8px !important;
          width: 100% !important;
        }
        .sidebar-native-outlet-wrapper .icon-search-bar svg {
          stroke: var(--text3) !important;
          stroke-width: 2px !important;
          flex-shrink: 0 !important;
        }
        .sidebar-native-outlet-wrapper .icon-search-bar input {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 6px 4px !important;
          min-height: unset !important;
          height: 28px !important;
          color: var(--text) !important;
          font-size: 13px !important;
          outline: none !important;
          width: 100% !important;
        }
        .sidebar-native-outlet-wrapper .icon-search-bar input::placeholder {
          color: var(--text3) !important;
          opacity: 1 !important;
        }
        
        .sidebar-native-outlet-wrapper .icon-dropdown-grid {
          width: 100% !important;
          min-width: 100% !important;
          max-width: 100% !important;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5) !important;
          border-color: var(--border) !important;
          background: var(--card) !important;
          left: 0 !important;
        }

        .sidebar-native-outlet-wrapper .icon-grid-item {
          color: var(--text2) !important;
          font-weight: 500 !important;
          font-size: 11px !important;
          border-color: var(--border) !important;
        }
        
        .sidebar-native-outlet-wrapper .icon-grid-item svg {
          stroke: var(--text2) !important;
          stroke-width: 2px !important;
          display: block !important;
          flex-shrink: 0 !important;
        }
        
        .sidebar-native-outlet-wrapper .icon-grid-item:hover {
          background: rgba(232, 255, 0, 0.1) !important;
          color: var(--accent) !important;
        }
        .sidebar-native-outlet-wrapper .icon-grid-item:hover svg {
          stroke: var(--accent) !important;
        }

        .sidebar-native-outlet-wrapper .icon-grid-item.active {
          background: var(--accent) !important;
          color: var(--bg) !important;
        }
        .sidebar-native-outlet-wrapper .icon-grid-item.active svg {
          stroke: var(--bg) !important;
        }

        .sidebar-native-outlet-wrapper .icon-grid-scroll {
          grid-template-columns: repeat(auto-fill, minmax(90px, 1fr)) !important;
          gap: 6px !important;
        }
        
        .sidebar-native-outlet-wrapper .admin-form-actions {
          margin-top: 16px !important;
          padding-top: 16px !important;
          gap: 8px !important;
          display: flex !important;
          justify-content: flex-end !important;
        }

        .sidebar-native-outlet-wrapper {
          overflow-x: hidden !important;
        }

        .sidebar-native-outlet-wrapper .admin-vertical-card-grid {
          grid-template-columns: 1fr !important;
          width: 100% !important;
          max-width: 100% !important;
          gap: 16px !important;
          margin-top: 12px !important;
          box-sizing: border-box !important;
        }

        .sidebar-native-outlet-wrapper .admin-info-card {
          width: 100% !important;
          max-width: 100% !important;
          box-sizing: border-box !important;
          margin: 0 0 16px 0 !important;
          background: var(--card) !important;
          border: 1px solid var(--border) !important;
          border-radius: 4px !important;
        }

        .sidebar-native-outlet-wrapper .admin-info-row {
          padding: 10px 14px !important;
          min-height: unset !important;
          height: auto !important;
          gap: 6px !important;
          width: 100% !important;
          max-width: 100% !important;
          margin: 0 0 4px 0 !important;
          box-sizing: border-box !important;
          display: flex !important;
          justify-content: space-between !important;
          align-items: center !important;
        }
        
        .sidebar-native-outlet-wrapper .admin-info-row div[style*="grid-template-columns"],
        .sidebar-native-outlet-wrapper .admin-info-row div[style*="gridTemplateColumns"] {
          gap: 4px !important;
        }
        .sidebar-native-outlet-wrapper .admin-info-row div[style*="grid-template-columns"] div,
        .sidebar-native-outlet-wrapper .admin-info-row div[style*="gridTemplateColumns"] div {
          font-size: 11px !important;
        }
        
        .sidebar-native-outlet-wrapper .admin-info-label {
          font-size: 10px !important;
          margin-right: 6px !important;
        }
 
        .sidebar-native-outlet-wrapper .admin-info-value {
          font-size: 12px !important;
          max-width: 72% !important;
          display: flex !important;
          align-items: center !important;
          justify-content: flex-end !important;
          text-align: right !important;
          min-width: 0 !important;
          word-wrap: break-word !important;
          word-break: break-word !important;
        }
        
        .sidebar-native-outlet-wrapper .admin-card-thumb {
          width: 36px !important;
          height: 36px !important;
          flex-shrink: 0 !important;
        }
        .sidebar-native-outlet-wrapper .admin-card-icon-box {
          width: 32px !important;
          height: 32px !important;
          flex-shrink: 0 !important;
        }
        .sidebar-native-outlet-wrapper .admin-info-row img {
          max-height: 50px !important;
          object-fit: contain !important;
        }
        
        .sidebar-native-outlet-wrapper .admin-info-row > div {
          max-width: 100% !important;
          box-sizing: border-box !important;
        }

        .admin-container.mode-customizer .admin-main {
          margin-left: 380px !important;
          width: calc(100vw - 380px) !important;
          transition: margin-left 0.3s ease;
          height: 100vh !important;
          max-height: 100vh !important;
          min-height: 100vh !important;
          display: flex !important;
          flex-direction: column !important;
          background: var(--bg) !important;
          overflow: hidden !important;
          box-sizing: border-box !important;
        }

        .admin-container.mode-customizer .admin-content-container {
          height: 100% !important;
          max-height: 100% !important;
          min-height: 0 !important;
          flex: 1 !important;
          width: 100% !important;
          display: flex !important;
          background: var(--bg) !important;
          overflow: hidden !important;
          box-sizing: border-box !important;
        }

        .admin-container.mode-customizer .admin-preview-panel.absolute-canvas {
          flex: 1 !important;
          height: 100% !important;
          max-height: 100% !important;
          min-height: 0 !important;
          padding: 0px !important;
          background: var(--bg) !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: center !important;
          box-sizing: border-box !important;
          overflow: hidden !important;
        }

        .admin-container.mode-customizer .admin-preview-panel.absolute-canvas .browser-simulator-card {
          width: 100%;
          max-width: 150% !important;
          height: 100%;
          max-height: 150% !important;
          min-height: 0 !important;
          background: var(--card) !important;
          border-radius: 0px !important;
          box-shadow: none !important;
          border: none !important;
          border-left: 1px solid var(--border) !important;
          display: flex !important;
          flex-direction: column !important;
          overflow: hidden !important;
          flex-shrink: 0 !important;
          box-sizing: border-box !important;
          transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1), height 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }

        .admin-container.mode-customizer .admin-preview-panel.absolute-canvas .browser-simulator-card .preview-header {
          background: var(--card) !important;
          border: none !important;
          border-bottom: 1px solid var(--border) !important;
          border-radius: 0 !important;
          padding: 8px 16px !important;
          color: var(--text) !important;
          box-shadow: 0 1px 3px rgba(0,0,0,0.3);
          display: flex !important;
          justify-content: space-between !important;
          align-items: center !important;
          z-index: 10 !important;
          flex-shrink: 0;
        }

        .admin-container.mode-customizer .admin-preview-panel.absolute-canvas .browser-simulator-card .preview-status {
          color: var(--text) !important;
          font-weight: 800 !important;
          font-size: 13px !important;
          display: flex !important;
          align-items: center !important;
          gap: 8px !important;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-family: var(--ff-sub);
        }
        
        .admin-container.mode-customizer .admin-preview-panel.absolute-canvas .browser-simulator-card .status-dot {
          width: 8px; height: 8px;
          background: #10b981;
          border-radius: 50%;
        }

        .admin-container.mode-customizer .admin-preview-panel.absolute-canvas .browser-simulator-card .refresh-preview-btn {
          background: var(--surface) !important;
          border: 1px solid var(--border) !important;
          color: var(--text3) !important;
          cursor: pointer;
          padding: 6px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          transition: 0.2s;
        }
        .admin-container.mode-customizer .admin-preview-panel.absolute-canvas .browser-simulator-card .refresh-preview-btn:hover {
          background: var(--border) !important;
          color: var(--text) !important;
        }

        .admin-container.mode-customizer .admin-preview-panel.absolute-canvas .browser-simulator-card .preview-device-controls {
          display: flex !important;
          align-items: center !important;
          gap: 16px !important;
          flex-shrink: 0 !important;
        }
        .admin-container.mode-customizer .admin-preview-panel.absolute-canvas .browser-simulator-card .device-btn-group {
          display: flex !important;
          background: var(--surface) !important;
          border-radius: 4px !important;
          padding: 2px !important;
          border: 1px solid var(--border) !important;
        }
        .admin-container.mode-customizer .admin-preview-panel.absolute-canvas .browser-simulator-card .device-toggle-btn {
          background: transparent !important;
          border: none !important;
          color: var(--text3) !important;
          cursor: pointer !important;
          padding: 5px 9px !important;
          border-radius: 4px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          transition: all 0.2s ease !important;
        }
        .admin-container.mode-customizer .admin-preview-panel.absolute-canvas .browser-simulator-card .device-toggle-btn:hover {
          color: var(--text) !important;
          background: var(--border) !important;
        }
        .admin-container.mode-customizer .admin-preview-panel.absolute-canvas .browser-simulator-card .device-toggle-btn.active {
          background: var(--card) !important;
          color: var(--accent) !important;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3) !important;
          border: 1px solid var(--border);
        }

        .admin-container.mode-customizer .admin-preview-panel.absolute-canvas .browser-simulator-card .admin-preview-iframe {
          flex: 1 !important;
          height: 0 !important;
          min-height: 0 !important;
          border: none !important;
          border-radius: 0 !important;
          background: var(--bg) !important;
          box-shadow: none !important;
          width: 100% !important;
          display: block !important;
        }

        @media (max-width: 1024px) {
          .admin-container.mode-customizer {
            flex-direction: column !important;
          }
          .admin-container.mode-customizer .admin-sidebar.editing-active {
            width: 100% !important;
            max-width: 100% !important;
            position: fixed !important;
            top: 0; left: 0; 
            height: 100vh !important;
            z-index: 1000 !important;
            transform: translateX(0);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          }
          .admin-container.mode-customizer .admin-sidebar.editing-active.collapsed-active {
            transform: translateX(-100%) !important;
          }
          .admin-container.mode-customizer .admin-main {
            margin-left: 0 !important;
            width: 100vw !important;
            max-width: 100% !important;
            height: 100vh !important;
          }
          .admin-container.mode-customizer .admin-content-container {
            flex-direction: column !important;
            height: 100vh !important;
          }
          .admin-container.mode-customizer .admin-preview-panel.absolute-canvas {
            display: flex !important;
            width: 100% !important;
            height: 100% !important;
          }
          .admin-container.mode-customizer .admin-preview-panel.absolute-canvas .browser-simulator-card {
            border-left: none !important;
            width: 100% !important;
            height: 100% !important;
          }
        }

        .admin-container {
          display: flex;
          width: 100vw;
          max-width: 100%;
          margin: 0;
          text-align: left;
          min-height: 100vh;
          background: var(--bg);
          font-family: var(--ff);
          box-sizing: border-box;
        }
        .admin-sidebar {
          width: 260px;
          background: var(--card);
          color: var(--text);
          display: flex;
          flex-direction: column;
          transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          z-index: 50;
          box-shadow: 10px 0 30px rgba(0,0,0,0.5);
        }
        .admin-sidebar.closed {
          width: 80px;
        }
        .sidebar-header {
          padding: 24px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 72px;
        }
        .admin-logo-box {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 850;
          font-size: 16px;
          overflow: hidden;
          white-space: nowrap;
        }
        .logo-icon {
          width: 40px;
          height: 40px;
          background: rgba(232, 255, 0, 0.1);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sidebar-toggle-btn {
          background: rgba(255,255,255,0.05);
          border: none;
          color: var(--text3);
          cursor: pointer;
          display: flex;
          padding: 6px;
          border-radius: 4px;
          transition: 0.2s;
        }
        .sidebar-toggle-btn:hover {
          background: rgba(255,255,255,0.1);
          color: white;
        }
        
        .sidebar-nav {
          flex: 1;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          overflow-y: auto;
        }
        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 4px;
          text-decoration: none;
          color: var(--text2);
          transition: all 0.2s ease;
          font-weight: 600;
          font-size: 14px;
        }
        .nav-item:hover {
          background: rgba(255,255,255,0.05);
          color: var(--text);
        }
        .nav-item.active {
          background: var(--accent);
          color: var(--bg);
          box-shadow: 0 4px 12px rgba(232, 255, 0, 0.2);
        }
        .admin-sidebar.closed .nav-item {
          padding: 12px;
          justify-content: center;
        }
        .admin-sidebar.closed .nav-item span {
          display: none;
        }
        
        .sidebar-footer {
          padding: 12px;
          border-top: 1px solid var(--border);
        }
        .logout-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 4px;
          background: transparent;
          color: #f87171;
          border: none;
          cursor: pointer;
          font-weight: 700;
          transition: 0.2s;
        }
        .logout-btn:hover {
          background: rgba(239, 68, 68, 0.1);
        }
        .admin-sidebar.closed .logout-btn {
          padding: 12px;
          justify-content: center;
        }
        
        .admin-main {
          flex: 1;
          margin-left: 260px;
          transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          min-width: 0;
        }
        .admin-sidebar.closed + .admin-main {
          margin-left: 80px;
        }
        
        .admin-header {
          height: 72px;
          background: var(--card);
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
          position: sticky;
          top: 0;
          z-index: 40;
          box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .menu-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text);
        }
        .header-breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
        }
        .breadcrumb-root {
          color: var(--text3);
        }
        .breadcrumb-sep {
          color: var(--border);
        }
        .breadcrumb-current {
          color: var(--text);
        }
        
        .header-user {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 6px 12px;
          border-radius: 4px;
          transition: 0.2s;
          cursor: pointer;
        }
        .header-user:hover {
          background: var(--surface);
        }
        .user-info {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        .user-name {
          font-weight: 800;
          color: var(--text);
          font-size: 13px;
          line-height: 1;
        }
        .user-role {
          font-size: 11px;
          color: var(--accent);
          font-weight: 800;
          text-transform: uppercase;
          margin-top: 4px;
        }
        .user-avatar {
          width: 36px;
          height: 36px;
          background: var(--accent);
          color: var(--bg);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          box-shadow: 0 4px 10px rgba(232, 255, 0, 0.2);
        }

        .admin-content-container {
          display: flex;
          min-height: calc(100vh - 72px);
          width: 100%;
          background: var(--bg);
          overflow: hidden;
        }
        .admin-editor-panel {
          flex: 0 0 380px;
          max-width: 380px;
          padding: 24px;
          background: var(--card);
          border-right: 1px solid var(--border);
          overflow-y: auto;
          height: calc(100vh - 72px);
          box-sizing: border-box;
          box-shadow: 4px 0 15px rgba(0,0,0,0.3);
        }
        .admin-content-container.full-width .admin-editor-panel {
          flex: 1;
          max-width: 100%;
          height: auto;
          overflow-y: visible;
          background: var(--bg);
          border-right: none;
        }
        .admin-preview-panel {
          flex: 1;
          display: flex;
          flex-direction: column;
          height: calc(100vh - 72px);
          background: var(--border);
          position: relative;
        }
        
        .admin-editor-panel table {
          display: block;
          overflow-x: auto;
          max-width: 100%;
        }
        .admin-editor-panel input[type="text"],
        .admin-editor-panel input[type="email"],
        .admin-editor-panel textarea,
        .admin-editor-panel select {
          max-width: 100%;
        }

        /* ===== RESPONSIVE CSS ===== */
        @media (max-width: 1200px) {
          .admin-sidebar {
            width: 80px;
          }
          .admin-sidebar .nav-item span,
          .admin-sidebar .sidebar-footer span,
          .admin-logo-box span {
            display: none;
          }
          .admin-main {
            margin-left: 80px !important;
          }
        }

        @media (max-width: 1024px) {
          .admin-sidebar {
            left: -260px;
            width: 260px !important;
          }
          .admin-sidebar.open {
            left: 0;
          }
          .admin-sidebar .nav-item span,
          .admin-sidebar .sidebar-footer span,
          .admin-logo-box span {
            display: inline-block;
          }
          .admin-main {
            margin-left: 0 !important;
          }
          .menu-toggle {
            display: flex;
          }
          .sidebar-overlay {
            position: fixed;
            inset: 0;
            background: rgba(15, 23, 42, 0.5);
            backdrop-filter: blur(4px);
            z-index: 45;
          }
          .header-breadcrumb {
            display: none;
          }
        }

        @media (max-width: 1280px) {
          .admin-editor-panel {
            flex: 0 0 460px;
            max-width: 460px;
          }
        }
        @media (max-width: 1024px) {
          .admin-content-container {
            flex-direction: column;
          }
          .admin-editor-panel {
            flex: 1;
            max-width: 100%;
            height: auto;
            overflow-y: visible;
            border-right: none;
          }
          .admin-preview-panel {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .admin-editor-panel {
            padding: 16px;
          }
          .admin-header {
            padding: 0 16px;
          }
          .user-info {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;
