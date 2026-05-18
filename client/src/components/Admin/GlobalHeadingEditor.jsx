import React, { useState, useEffect } from 'react';
import { Settings, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { crudService } from '../../services/crud';
import { useToast } from './ToastContext';

const GlobalHeadingEditor = ({ slug, fieldMap = {} }) => {
  const { showToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [id, setId] = useState(null);
  const [tag, setTag] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [status, setStatus] = useState('Active');

  // Configure safety-first configuration mapping
  const effectiveFieldMap = {
    tag: 'tag',
    title: 'title',
    desc: 'desc',
    ...fieldMap
  };

  const loadData = async () => {
    setLoading(true);
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
    if (isOpen) {
      loadData();
    }
  }, [isOpen, slug]);

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

  return (
    <div className="global-heading-editor-wrapper" style={{ marginBottom: '24px', width: '100%' }}>
      <button 
        type="button" 
        className={`admin-btn ${isOpen ? 'admin-btn-primary' : 'admin-btn-secondary'}`}
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          fontWeight: '700',
          padding: '10px 20px',
          borderRadius: '8px',
          boxShadow: isOpen ? '0 4px 12px rgba(79, 70, 229, 0.2)' : '0 2px 4px rgba(0,0,0,0.03)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer',
          border: isOpen ? '1px solid transparent' : '1px solid #e2e8f0'
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Settings size={16} className={isOpen ? 'animate-spin' : ''} style={{ animationDuration: '4s' }} />
        <span>Global Heading</span>
        {isOpen ? <ChevronUp size={14} style={{ marginLeft: '4px' }} /> : <ChevronDown size={14} style={{ marginLeft: '4px' }} />}
      </button>

      {isOpen && (
        <div 
          className="admin-card" 
          style={{ 
            marginTop: '14px', 
            padding: '20px',
            background: '#ffffff',
            border: '1.5px solid #e2e8f0',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.04)'
          }}
        >
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '30px', gap: '10px', color: '#64748b' }}>
              <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
              <span style={{ fontSize: '14px', fontWeight: '500' }}>Fetching dynamic header records...</span>
            </div>
          ) : (
            <form onSubmit={handleSave}>
              <h4 style={{ margin: '0 0 18px 0', color: '#0f172a', fontWeight: 800, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                <span style={{ background: '#e0e7ff', color: '#4f46e5', width: '24px', height: '24px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✎</span>
                Modify Global Intro Text & Section Context
              </h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
                <div className="admin-form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label className="admin-label" style={{ fontSize: '12px', fontWeight: '600', color: '#475569' }}>Section Tag / Badge Text</label>
                  <input 
                    type="text" 
                    className="admin-input" 
                    style={{ padding: '10px 14px', fontSize: '13px', height: '42px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                    placeholder="e.g., OUR EXPERTS or WHY CHOOSE US" 
                    value={tag} 
                    onChange={e => setTag(e.target.value)} 
                  />
                </div>
                <div className="admin-form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label className="admin-label" style={{ fontSize: '12px', fontWeight: '600', color: '#475569' }}>Main Heading Title</label>
                  <input 
                    type="text" 
                    className="admin-input" 
                    style={{ padding: '10px 14px', fontSize: '13px', height: '42px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                    placeholder="Enter the prominent title..." 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                    required 
                  />
                </div>
                <div className="admin-form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label className="admin-label" style={{ fontSize: '12px', fontWeight: '600', color: '#475569' }}>Supporting Description</label>
                  <textarea 
                    className="admin-input" 
                    style={{ padding: '10px 14px', fontSize: '13px', minHeight: '75px', maxHeight: '150px', resize: 'vertical', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                    placeholder="Write a compelling introductory paragraph to set the context..." 
                    value={desc} 
                    onChange={e => setDesc(e.target.value)} 
                    rows={3}
                  />
                </div>
                <div className="admin-form-group" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                  <label className="admin-label" style={{ fontSize: '12px', fontWeight: '600', color: '#475569' }}>Section Active Status</label>
                  <div className="status-toggle-premium" onClick={() => setStatus(status === 'Active' ? 'Inactive' : 'Active')}>
                    <div className={`toggle-track ${status === 'Active' ? 'active' : ''}`}>
                      <div className="toggle-thumb"></div>
                    </div>
                    <span className="status-label">{status}</span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'flex-end', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                <button 
                  type="button" 
                  className="admin-btn admin-btn-secondary" 
                  style={{ padding: '8px 16px', fontSize: '12px', border: '1px solid #e2e8f0', borderRadius: '6px', background: '#fff', cursor: 'pointer' }}
                  onClick={() => setIsOpen(false)}
                >
                  Dismiss
                </button>
                <button 
                  type="submit" 
                  className="admin-btn admin-btn-primary" 
                  style={{ padding: '8px 18px', fontSize: '12px', borderRadius: '6px', background: '#4f46e5', color: '#fff', border: 'none', cursor: 'pointer' }}
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
