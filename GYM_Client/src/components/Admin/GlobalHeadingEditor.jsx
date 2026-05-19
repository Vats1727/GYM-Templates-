import React, { useState, useEffect } from 'react';
import { Settings, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { crudService } from '../../services/crud';
import { useToast } from './ToastContext';

const GlobalHeadingEditor = ({ slug, defaultText = '', defaultTag = '', centered = false, fieldMap = {} }) => {
  const { showToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [id, setId] = useState(null);
  const [tag, setTag] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [status, setStatus] = useState('Active');

  const isAdmin = !!localStorage.getItem('admin_token') && window.location.pathname.includes('/admin');
  const isPublicPath = !window.location.pathname.includes('/admin');

  // Configure safety-first configuration mapping
  const effectiveFieldMap = {
    tag: 'tag',
    title: 'title',
    desc: 'desc',
    ...fieldMap
  };

  const loadData = async () => {
    try {
      const result = await crudService.getAll(`admin/${slug}`);
      const rows = Array.isArray(result) ? result : [];
      const activeItem = rows.find(r => r.status === 'Active') || rows[0];
      
      if (activeItem) {
        setId(activeItem.id);
        setTag(activeItem[effectiveFieldMap.tag] || '');
        setTitle(activeItem[effectiveFieldMap.title] || '');
        setDesc(activeItem[effectiveFieldMap.desc] || '');
        setStatus(activeItem.status || 'Active');
      } else {
        setId(null);
        setTag('');
        setTitle('');
        setDesc('');
        setStatus('Active');
      }
    } catch (error) {
      console.error(`Failed to load global heading data for slug: ${slug}`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const handleUpdate = () => loadData();
    window.addEventListener('api-data-updated', handleUpdate);
    return () => window.removeEventListener('api-data-updated', handleUpdate);
  }, [slug]);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const payload = {
      [effectiveFieldMap.tag]: tag,
      [effectiveFieldMap.title]: title,
      [effectiveFieldMap.desc]: desc,
      status: status
    };

    try {
      if (id) {
        await crudService.update(`admin/${slug}`, id, payload);
        showToast('Global heading details saved successfully');
      } else {
        await crudService.create(`admin/${slug}`, payload);
        showToast('New global heading record initialized successfully');
      }
      setIsOpen(false);
      // Broadcast updates to immediately refresh both dashboards and active components
      window.dispatchEvent(new CustomEvent('api-data-updated'));
    } catch (error) {
      console.error('Failed to commit global heading changes:', error);
      showToast('Failed to save heading details', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  // Render dynamic header elements
  const headingTag = tag || defaultTag;
  const headingTitle = title || defaultText;

  return (
    <div 
      className="global-heading-display-and-editor" 
      style={{ 
        width: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: centered ? 'center' : 'flex-start',
        textAlign: centered ? 'center' : 'left'
      }}
    >
      {/* 1. Dynamic Tag / Badge */}
      {isPublicPath && headingTag && (
        <div className="section-label" style={{ marginBottom: '8px', justifyContent: centered ? 'center' : 'flex-start' }}>
          {headingTag}
        </div>
      )}

      {/* 2. Dynamic Main Title */}
      {isPublicPath && headingTitle && (
        <h2 className="section-title" style={{ marginTop: '4px', marginBottom: '8px', textAlign: centered ? 'center' : 'left' }}>
          {headingTitle}
        </h2>
      )}

      {/* 3. Dynamic Subtitle / Description */}
      {isPublicPath && desc && (
        <p 
          className="section-desc" 
          style={{ 
            marginTop: '8px', 
            maxWidth: '700px',
            marginLeft: centered ? 'auto' : '0',
            marginRight: centered ? 'auto' : '0',
            marginBottom: '16px',
            textAlign: centered ? 'center' : 'left'
          }}
        >
          {desc}
        </p>
      )}

      {/* 4. Admin Settings Button (Only visible to logged-in admins) */}
      {isAdmin && (
        <div style={{ marginTop: '12px', marginBottom: '16px', display: 'inline-block' }}>
          <button 
            type="button" 
            className={`admin-btn ${isOpen ? 'admin-btn-primary' : 'admin-btn-secondary'}`}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              padding: '6px 14px',
              fontSize: '11px',
              borderRadius: '4px',
              transition: 'all 0.2s',
              cursor: 'pointer'
            }}
            onClick={() => setIsOpen(!isOpen)}
          >
            <Settings size={13} className={isOpen ? 'animate-spin' : ''} style={{ animationDuration: '4s' }} />
            <span>Global Heading Settings</span>
            {isOpen ? <ChevronUp size={11} style={{ marginLeft: '4px' }} /> : <ChevronDown size={11} style={{ marginLeft: '4px' }} />}
          </button>
        </div>
      )}

      {/* 5. Admin Settings Panel dropdown */}
      {isOpen && isAdmin && (
        <div 
          className="admin-card" 
          style={{ 
            marginTop: '8px', 
            padding: '24px',
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            width: '100%',
            maxWidth: '650px',
            textAlign: 'left',
            zIndex: 10
          }}
        >
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '30px', gap: '10px', color: 'var(--text3)' }}>
              <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
              <span style={{ fontSize: '14px', fontWeight: '500' }}>Fetching dynamic header records...</span>
            </div>
          ) : (
            <form onSubmit={handleSave}>
              <h4 style={{ margin: '0 0 18px 0', color: 'var(--text)', fontFamily: 'var(--ff-sub)', fontWeight: 800, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                <span style={{ background: 'rgba(232,255,0,0.1)', color: 'var(--accent)', width: '24px', height: '24px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✎</span>
                Modify Global Intro Text & Section Context
              </h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
                <div className="admin-form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '0px' }}>
                  <label className="admin-label">Section Tag / Badge Text</label>
                  <input 
                    type="text" 
                    className="admin-input" 
                    placeholder="e.g., OUR SERVICES or CLIENT STORIES" 
                    value={tag} 
                    onChange={e => setTag(e.target.value)} 
                  />
                </div>
                <div className="admin-form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '0px' }}>
                  <label className="admin-label">Main Heading Title</label>
                  <input 
                    type="text" 
                    className="admin-input" 
                    placeholder="Enter the prominent title..." 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                    required 
                  />
                </div>
                <div className="admin-form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '0px' }}>
                  <label className="admin-label">Supporting Description</label>
                  <textarea 
                    className="admin-input" 
                    placeholder="Write a compelling introductory paragraph to set the context..." 
                    value={desc} 
                    onChange={e => setDesc(e.target.value)} 
                    rows={3}
                  />
                </div>
                <div className="admin-form-group" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px', marginBottom: '0px' }}>
                  <label className="admin-label">Section Active Status</label>
                  <div className="status-toggle-premium" onClick={() => setStatus(status === 'Active' ? 'Inactive' : 'Active')}>
                    <div className={`toggle-track ${status === 'Active' ? 'active' : ''}`}>
                      <div className="toggle-thumb"></div>
                    </div>
                    <span className="status-label">{status}</span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'flex-end', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                <button 
                  type="button" 
                  className="admin-btn admin-btn-secondary" 
                  onClick={() => setIsOpen(false)}
                >
                  Dismiss
                </button>
                <button 
                  type="submit" 
                  className="admin-btn admin-btn-primary" 
                  disabled={isSaving}
                >
                  {isSaving ? 'Synchronizing...' : 'Save Header Info'}
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalHeadingEditor;
