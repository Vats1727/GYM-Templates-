import React, { useState, useEffect } from 'react';
import { crudService } from '../../services/crud';
import { useToast } from './ToastContext';
import * as LucideIcons from 'lucide-react';
import GlobalHeadingEditor from './GlobalHeadingEditor';

export default function GenericManager({ title, tableKey, fields, headingSlug, isSingleRow = false }) {
  const { showToast } = useToast();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  const [imageFiles, setImageFiles] = useState({});
  const [imagePreviews, setImagePreviews] = useState({});

  const isUserChanging = React.useRef(false);
  const updateFormData = (newData) => {
    isUserChanging.current = true;
    setFormData(newData);
  };

  const getImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http') || path.startsWith('blob:')) return path;
    const baseUrl = import.meta.env.VITE_API_URL || '/gym_v1/server/public';
    return `${baseUrl}/${path}`;
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.icon-dropdown-grid') && !e.target.closest('.admin-icon-selector-trigger')) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  useEffect(() => {
    loadData();
  }, [tableKey]);

  const loadData = async () => {
    setLoading(true);
    try {
      const result = await crudService.getAll(`admin/${tableKey}`);
      const list = Array.isArray(result) ? result : [];
      setData(list);
      
      if (isSingleRow) {
        if (list.length > 0) {
          const updatedItem = list.find(x => x.id === selectedItem?.id) || list[0];
          openEdit(updatedItem);
        } else {
          // Automatically provision the record if empty
          await provisionSingleRowRecord();
        }
      } else if (selectedItem) {
        const updatedItem = list.find(x => x.id === selectedItem.id);
        if (updatedItem) {
          openEdit(updatedItem);
        }
      }
    } catch (err) {
      console.error(err);
      showToast(`Failed to load ${title}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const provisionSingleRowRecord = async () => {
    try {
      const initial = {};
      fields.forEach(f => { 
        if (f.type === 'boolean') initial[f.key] = 0;
        else if (f.type === 'repeater') initial[f.key] = [];
        else initial[f.key] = ''; 
      });
      initial.status = 'Active';
      await crudService.create(`admin/${tableKey}`, initial);
      
      // Refetch data
      const result = await crudService.getAll(`admin/${tableKey}`);
      const newList = Array.isArray(result) ? result : [];
      setData(newList);
      if (newList.length > 0) {
        setTimeout(() => openEdit(newList[0]), 50);
      }
    } catch (err) {
      console.error("Failed to auto-provision single-row record", err);
    }
  };

  const openCreate = () => {
    const initial = {};
    fields.forEach(f => { 
      if (f.type === 'boolean') initial[f.key] = 0;
      else if (f.type === 'repeater') initial[f.key] = [];
      else initial[f.key] = ''; 
    });
    initial.status = 'Active';
    setFormData(initial);
    setSelectedItem(null);
    setImageFiles({});
    setImagePreviews({});
    setShowForm(true);
  };

  const openEdit = (item) => {
    const editedData = { ...item };
    fields.forEach(f => {
      if (f.type === 'repeater') {
        let val = editedData[f.key];
        if (typeof val === 'string') {
          try { val = JSON.parse(val); } catch(e) { val = []; }
        }
        editedData[f.key] = Array.isArray(val) ? val : [];
      }
    });
    
    setFormData(editedData);
    setSelectedItem(item);
    setImageFiles({});
    
    // Populate existing image previews
    const previews = {};
    fields.forEach(f => {
      if (f.type === 'image' && item[f.key]) {
        previews[f.key] = getImageUrl(item[f.key]);
      }
    });
    setImagePreviews(previews);
    
    setShowForm(true);
  };

  const handleSave = async (e = null, isAuto = false, overrideFormData = null, overrideImageFiles = null) => {
    if (e) e.preventDefault();
    if (saving && !isAuto) return;
    
    if (!isAuto) setSaving(true);
    try {
      const hasImage = fields.some(f => f.type === 'image');
      const activeFormData = overrideFormData || formData;
      const activeImageFiles = overrideImageFiles || imageFiles;
      
      const processedData = { ...activeFormData };
      // Pre-serialize any real JS arrays into JSON strings before transit
      Object.keys(processedData).forEach(key => {
        if (Array.isArray(processedData[key])) {
          processedData[key] = JSON.stringify(processedData[key]);
        }
      });

      let payload = processedData;
      
      if (hasImage) {
        payload = new FormData();
        // Append all fields from processedData
        Object.keys(processedData).forEach(key => {
          if (processedData[key] !== null && processedData[key] !== undefined) {
            payload.append(key, processedData[key]);
          }
        });
        // Append dynamic file object state overrides
        Object.keys(activeImageFiles).forEach(key => {
          if (activeImageFiles[key]) {
            payload.append(key, activeImageFiles[key]);
          }
        });
      }

      if (selectedItem) {
        await crudService.update(`admin/${tableKey}`, selectedItem.id, payload);
        if (!isAuto) showToast('Updated successfully');
        // Emit sync event to push changes to Live Preview
        window.dispatchEvent(new CustomEvent('api-data-updated'));
      } else {
        await crudService.create(`admin/${tableKey}`, payload);
        if (!isAuto) showToast('Created successfully');
      }
      
      if (!isAuto) {
        setShowForm(false);
      }
      loadData();
    } catch (err) {
      if (!isAuto) {
        console.error(err);
        showToast('Save failed', 'error');
      }
    } finally {
      if (!isAuto) setSaving(false);
    }
  };

  // Premium Heartbeat Real-Time Auto-Save 💓
  useEffect(() => {
    if (!showForm || !selectedItem || !isUserChanging.current) return;
    const timer = setTimeout(() => {
      isUserChanging.current = false;
      handleSave(null, true);
    }, 1000);
    return () => clearTimeout(timer);
  }, [formData, imageFiles]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this?')) return;
    try {
      await crudService.delete(`admin/${tableKey}`, id);
      showToast('Deleted successfully');
      loadData();
    } catch (err) {
      console.error(err);
      showToast('Delete failed', 'error');
    }
  };

  return (
    <div className="admin-card" style={{ color: '#1e293b' }}>
      <div className="admin-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 className="admin-card-title" style={{ margin: 0, fontSize: 20 }}>{title}</h2>
        {!showForm && !isSingleRow && (
          <button className="admin-btn admin-btn-primary" onClick={openCreate} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <LucideIcons.Plus size={16} /> Add New
          </button>
        )}
      </div>

      {showForm ? (
        <form onSubmit={handleSave}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {fields.map(field => (
              <div key={field.key} className="admin-form-group" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label className="admin-label" style={{ fontWeight: 600, fontSize: 13 }}>{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea
                    className="admin-input"
                    value={formData[field.key] || ''}
                    onChange={e => updateFormData({ ...formData, [field.key]: e.target.value })}
                    rows={4}
                    style={{ padding: 10, borderRadius: 6, border: '1px solid #cbd5e1' }}
                  />
                ) : field.type === 'boolean' ? (
                  <select
                    className="admin-input"
                    value={formData[field.key]}
                    onChange={e => updateFormData({ ...formData, [field.key]: parseInt(e.target.value) })}
                    style={{ padding: 10, borderRadius: 6, border: '1px solid #cbd5e1' }}
                  >
                    <option value={0}>No</option>
                    <option value={1}>Yes</option>
                  </select>
                ) : field.type === 'icon' ? (
                  <div style={{ position: 'relative' }}>
                    <div 
                      className="admin-input admin-icon-selector-trigger" 
                      style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', background: '#f8fafc', padding: 10, borderRadius: 6, border: '1px solid #cbd5e1' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveDropdown(activeDropdown === field.key ? null : field.key);
                      }}
                    >
                      <div style={{ padding: '6px', background: '#fff', borderRadius: '6px', border: '1px solid #e2e8f0', display: 'flex' }}>
                        {React.createElement(
                          (formData[field.key] && LucideIcons[formData[field.key]]) ? LucideIcons[formData[field.key]] : LucideIcons.HelpCircle,
                          { size: 16, color: '#6366f1' }
                        )}
                      </div>
                      <span>{formData[field.key] || 'Select Icon'}</span>
                      <LucideIcons.ChevronDown size={14} style={{ marginLeft: 'auto' }} />
                    </div>

                    {activeDropdown === field.key && (
                      <div className="icon-dropdown-grid active" style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '8px', zIndex: 100, background: '#fff', border: '1px solid #cbd5e1', borderRadius: 8, boxShadow: '0 10px 25px rgba(0,0,0,0.1)', padding: 10 }}>
                        <div className="icon-search-bar" style={{ display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 8, borderBottom: '1px solid #f1f5f9', marginBottom: 8 }}>
                          <LucideIcons.Search size={14} color="#64748b" />
                          <input 
                            type="text" 
                            placeholder="Search icons..." 
                            style={{ border: 'none', outline: 'none', fontSize: 13, flex: 1, color: '#000', background: 'transparent' }}
                            onKeyUp={(e) => {
                              const term = e.target.value.toLowerCase();
                              const items = e.target.closest('.icon-dropdown-grid').querySelectorAll('.icon-grid-item');
                              items.forEach(item => {
                                const name = item.getAttribute('data-name').toLowerCase();
                                item.style.display = name.includes(term) ? 'flex' : 'none';
                              });
                            }}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                        <div className="icon-grid-scroll" style={{ maxHeight: '200px', overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
                          {Object.keys(LucideIcons)
                            .filter(key => /^[A-Z]/.test(key) && key !== 'Icon' && key !== 'Lucide' && (typeof LucideIcons[key] === 'function' || typeof LucideIcons[key] === 'object'))
                            .map(iconName => (
                              <div 
                                key={iconName} 
                                className={'icon-grid-item ' + (formData[field.key] === iconName ? 'active' : '')}
                                data-name={iconName}
                                style={{
                                  display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 8, borderRadius: 6, cursor: 'pointer',
                                  background: formData[field.key] === iconName ? '#eef2ff' : 'transparent',
                                  border: formData[field.key] === iconName ? '1px solid #6366f1' : '1px solid transparent'
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateFormData({ ...formData, [field.key]: iconName });
                                  setActiveDropdown(null);
                                }}
                              >
                                {React.createElement(LucideIcons[iconName], { size: 16, color: formData[field.key] === iconName ? '#6366f1' : '#475569' })}
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : field.type === 'image' ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {imagePreviews[field.key] ? (
                      <div style={{ position: 'relative', width: '120px', height: '120px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0', background: '#f8fafc' }}>
                        <img src={imagePreviews[field.key]} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <button 
                          type="button" 
                          onClick={() => {
                            const nextFormData = { ...formData, [field.key]: '' };
                            const nextImageFiles = { ...imageFiles, [field.key]: null };
                            setImageFiles(nextImageFiles);
                            setImagePreviews(prev => ({ ...prev, [field.key]: '' }));
                            updateFormData(nextFormData);
                            
                            setTimeout(() => {
                              isUserChanging.current = false;
                              handleSave(null, true, nextFormData, nextImageFiles);
                            }, 50);
                          }} 
                          style={{ position: 'absolute', top: '4px', right: '4px', width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.9)', color: '#fff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                        >
                          <LucideIcons.X size={14} />
                        </button>
                      </div>
                    ) : (
                      <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, width: '120px', height: '120px', borderRadius: '8px', border: '2px dashed #cbd5e1', background: '#f8fafc', cursor: 'pointer' }}>
                        <LucideIcons.UploadCloud size={24} color="#64748b" />
                        <span style={{ fontSize: 12, color: '#64748b' }}>Upload Image</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          style={{ display: 'none' }} 
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              isUserChanging.current = true;
                              const tempVal = 'pending_upload_' + Date.now();
                              const nextFormData = { ...formData, [field.key]: tempVal };
                              const nextImageFiles = { ...imageFiles, [field.key]: file };
                              
                              setImageFiles(nextImageFiles);
                              setImagePreviews(prev => ({ ...prev, [field.key]: URL.createObjectURL(file) }));
                              updateFormData(nextFormData);
                              
                              setTimeout(() => {
                                isUserChanging.current = false;
                                handleSave(null, true, nextFormData, nextImageFiles);
                              }, 50);
                            }
                          }} 
                        />
                      </label>
                    )}
                  </div>
                ) : field.type === 'stars' ? (
                  <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => updateFormData({ ...formData, [field.key]: star })}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0' }}
                      >
                        <LucideIcons.Star
                          size={ 28 }
                          fill={ star <= (Number(formData[field.key]) || 0) ? '#facc15' : 'transparent' }
                          color={ star <= (Number(formData[field.key]) || 0) ? '#facc15' : '#cbd5e1' }
                          style={{ transition: '0.2s' }}
                        />
                      </button>
                    ))}
                  </div>
                ) : field.type === 'repeater' ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {(Array.isArray(formData[field.key]) ? formData[field.key] : []).map((val, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        {typeof val === 'object' && 'ok' in val && (
                          <button
                            type="button"
                            onClick={() => {
                              const next = [...(formData[field.key] || [])];
                              next[idx] = { ...val, ok: !val.ok };
                              updateFormData({ ...formData, [field.key]: next });
                            }}
                            style={{
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              width: '40px', height: '40px', borderRadius: '8px',
                              background: val.ok ? '#ecfdf5' : '#fef2f2',
                              color: val.ok ? '#10b981' : '#ef4444',
                              border: val.ok ? '1px solid #a7f3d0' : '1px solid #fee2e2',
                              cursor: 'pointer', fontSize: '18px', fontWeight: 'bold'
                            }}
                            title={val.ok ? "Active Feature" : "Inactive Feature"}
                          >
                            {val.ok ? "✓" : "✕"}
                          </button>
                        )}
                        <input 
                          type="text"
                          className="admin-input"
                          value={typeof val === 'object' ? (val.text || '') : (val || '')}
                          onChange={(e) => {
                            const next = [...(formData[field.key] || [])];
                            if (typeof val === 'object') {
                              next[idx] = { ...val, text: e.target.value };
                            } else {
                              next[idx] = e.target.value;
                            }
                            updateFormData({ ...formData, [field.key]: next });
                          }}
                          placeholder={`Enter item ${idx + 1}...`}
                          style={{ flex: 1, padding: 10, borderRadius: 12, border: '1px solid #e2e8f0', background: '#fff', outline: 'none' }}
                        />
                        <button 
                          type="button"
                          onClick={() => {
                            const next = (formData[field.key] || []).filter((_, i) => i !== idx);
                            updateFormData({ ...formData, [field.key]: next });
                          }}
                          style={{ 
                            display: 'flex', alignItems: 'center', justifyContent: 'center', 
                            width: '40px', height: '40px', borderRadius: '8px', 
                            background: '#fef2f2', color: '#ef4444', border: '1px solid #fee2e2', cursor: 'pointer' 
                          }}
                        >
                          <LucideIcons.Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                    <button 
                      type="button" 
                      onClick={() => {
                        const currentArr = Array.isArray(formData[field.key]) ? formData[field.key] : [];
                        const isObj = currentArr.length > 0 && typeof currentArr[0] === 'object';
                        updateFormData({ ...formData, [field.key]: [...currentArr, isObj ? { text: '', ok: true } : ''] });
                      }}
                      style={{ 
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, 
                        padding: '10px', borderRadius: '8px', border: '2px dashed #cbd5e1', 
                        background: '#f8fafc', color: '#64748b', fontSize: 13, fontWeight: 600, cursor: 'pointer' 
                      }}
                    >
                      <LucideIcons.Plus size={14} /> Add {field.label.split(' ')[0].replace(/[\(\)]/g, '').toLowerCase()}
                    </button>
                  </div>
                ) : field.type === 'social_links' ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {(Array.isArray(formData[field.key]) ? formData[field.key] : []).map((val, idx) => {
                      const item = typeof val === 'object' && val !== null ? val : { icon: String(val || 'Facebook'), link: '#' };
                      return (
                        <div key={idx} style={{ display: 'flex', gap: 8, alignItems: 'center', background: '#f8fafc', padding: 8, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                          <select
                            value={item.icon || 'Facebook'}
                            onChange={(e) => {
                              const next = [...(formData[field.key] || [])];
                              next[idx] = { ...item, icon: e.target.value };
                              updateFormData({ ...formData, [field.key]: next });
                            }}
                            className="admin-input"
                            style={{ width: '120px', padding: 8, borderRadius: 8, border: '1px solid #cbd5e1', background: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                          >
                            {['Facebook', 'Twitter', 'Instagram', 'Linkedin', 'Youtube', 'Github', 'Twitch', 'Slack', 'Tiktok', 'Pinterest', 'Snapchat', 'Whatsapp', 'Telegram', 'Reddit', 'Discord'].map(i => (
                              <option key={i} value={i}>{i}</option>
                            ))}
                          </select>
                          
                          <input 
                            type="url"
                            className="admin-input"
                            value={item.link || ''}
                            onChange={(e) => {
                              const next = [...(formData[field.key] || [])];
                              next[idx] = { ...item, link: e.target.value };
                              updateFormData({ ...formData, [field.key]: next });
                            }}
                            placeholder="Social Media Profile URL (https://...)"
                            style={{ flex: 1, padding: 8, borderRadius: 8, border: '1px solid #cbd5e1', background: '#fff', fontSize: '12px' }}
                          />
                          
                          <button 
                            type="button"
                            onClick={() => {
                              const next = (formData[field.key] || []).filter((_, i) => i !== idx);
                              updateFormData({ ...formData, [field.key]: next });
                            }}
                            style={{ 
                              display: 'flex', alignItems: 'center', justifyContent: 'center', 
                              width: '32px', height: '32px', borderRadius: '8px', 
                              background: '#fef2f2', color: '#ef4444', border: '1px solid #fee2e2', cursor: 'pointer' 
                            }}
                          >
                            <LucideIcons.Trash2 size={14} />
                          </button>
                        </div>
                      );
                    })}
                    <button 
                      type="button" 
                      onClick={() => {
                        const currentArr = Array.isArray(formData[field.key]) ? formData[field.key] : [];
                        updateFormData({ ...formData, [field.key]: [...currentArr, { icon: 'Facebook', link: '' }] });
                      }}
                      style={{ 
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, 
                        padding: '10px', borderRadius: '8px', border: '2px dashed #cbd5e1', 
                        background: '#f8fafc', color: '#64748b', fontSize: 13, fontWeight: 600, cursor: 'pointer' 
                      }}
                    >
                      <LucideIcons.Plus size={14} /> Add Social Link
                    </button>
                  </div>
                ) : (
                  <input
                    type="text"
                    className="admin-input"
                    value={formData[field.key] || ''}
                    onChange={e => updateFormData({ ...formData, [field.key]: e.target.value })}
                    style={{ padding: 10, borderRadius: 6, border: '1px solid #cbd5e1' }}
                  />
                )}
              </div>
            ))}
            
            <div className="admin-form-group" style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: '20px' }}>
              <label className="admin-label" style={{ fontWeight: 600, fontSize: 13 }}>Section Active Status</label>
              <div className="status-toggle-premium" onClick={() => {
                const nextStatus = (formData.status || 'Active') === 'Active' ? 'Inactive' : 'Active';
                updateFormData({ ...formData, status: nextStatus });
                if (isSingleRow && selectedItem) {
                  setTimeout(() => {
                    handleSave(null, true, { ...formData, status: nextStatus });
                  }, 50);
                }
              }}>
                <div className={`toggle-track ${(formData.status || 'Active') === 'Active' ? 'active' : ''}`}>
                  <div className="toggle-thumb"></div>
                </div>
                <span className="status-label">{formData.status || 'Active'}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
              <div style={{ display: 'flex', gap: 12, flex: 1 }}>
                {!selectedItem && !isSingleRow && (
                  <button type="submit" className="admin-btn admin-btn-primary" disabled={saving} style={{ flex: 1 }}>
                    {saving ? 'Saving...' : 'Create Record'}
                  </button>
                )}
                {!isSingleRow && (
                  <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setShowForm(false)} style={{ flex: !selectedItem ? 'initial' : 1 }}>
                    {selectedItem ? 'Dismiss Form' : 'Cancel'}
                  </button>
                )}
              </div>
              {selectedItem && (
                <div style={{ fontSize: '12px', color: '#10b981', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px', background: '#ecfdf5', padding: '6px 12px', borderRadius: '20px', border: '1px solid #a7f3d0' }}>
                  <LucideIcons.Sparkles size={14} style={{ animation: 'pulse 2s infinite' }} /> 
                  <span>Auto-save active</span>
                </div>
              )}
            </div>
          </div>
        </form>
      ) : (
        <>
          {headingSlug && <GlobalHeadingEditor slug={headingSlug} />}
          <div style={{ marginTop: 12 }}>
          {loading ? (
            <div style={{ padding: 40, textAlign: 'center', color: '#64748b' }}>Loading data...</div>
          ) : data.length === 0 ? (
            <div style={{ padding: 40, textAlign: 'center', color: '#94a3b8', background: '#fff', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>No records found. Add one to begin.</div>
          ) : (
            <div className="admin-vertical-card-grid">
              {data.map(item => {
                const imageField = fields.find(f => f.type === 'image');
                const iconField = fields.find(f => f.type === 'icon');
                const mainField = fields.find(f => f.type !== 'image' && f.type !== 'icon' && f.type !== 'repeater') || fields[0];
                const subField = fields.find(f => f.key !== mainField.key && f.type !== 'image' && f.type !== 'icon' && f.type !== 'repeater');
                
                return (
                  <div 
                    className="admin-info-card clickable-setup-card" 
                    key={item.id} 
                    onClick={() => openEdit(item)}
                    style={{ cursor: 'pointer', position: 'relative', minHeight: '160px' }}
                  >
                    {/* Sleek Absolute Delete 'X' Icon at Top-Right */}
                    <button 
                      type="button" 
                      onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: 'rgba(255, 255, 255, 0.9)',
                        color: '#64748b',
                        border: '1px solid #e2e8f0',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        zIndex: '10',
                        transition: 'all 0.2s',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#ef4444'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#ef4444'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)'; e.currentTarget.style.color = '#64748b'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
                      title="Delete Record"
                    >
                      <LucideIcons.X size={13} strokeWidth={3} />
                    </button>

                    {/* Header Block */}
                    <div className="admin-info-row" style={{ background: '#f8fafc', margin: '0', padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%', paddingRight: '28px' }}>
                        {imageField && item[imageField.key] ? (
                          <img 
                            src={getImageUrl(item[imageField.key])} 
                            alt="Preview" 
                            style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '50%', border: '2px solid #fff', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} 
                          />
                        ) : iconField && item[iconField.key] ? (
                          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#eef2ff', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                            {React.createElement(
                              (item[iconField.key] && LucideIcons[item[iconField.key]]) ? LucideIcons[item[iconField.key]] : LucideIcons.User,
                              { size: 20, color: '#6366f1' }
                            )}
                          </div>
                        ) : (
                          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#f1f5f9', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                            <LucideIcons.Tag size={20} style={{ color: '#64748b' }} />
                          </div>
                        )}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                            <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {String(item[mainField.key] || 'Unnamed Item')}
                            </h4>
                            <span className={`admin-status-badge admin-status-${item.status?.toLowerCase() === 'active' ? 'active' : 'inactive'}`} style={{ fontSize: '9px', padding: '2px 6px' }}>
                              {item.status || 'Active'}
                            </span>
                          </div>
                          {subField && (
                            <p style={{ margin: 0, fontSize: '12px', color: '#4f46e5', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {String(item[subField.key] || '')}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Meta Rows Grid */}
                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                      {fields.filter(f => f.key !== (imageField?.key) && f.key !== (mainField?.key) && f.key !== (subField?.key)).map(f => {
                        let displayVal = item[f.key];
                        
                        if (f.type === 'repeater') {
                          let arr = [];
                          try {
                            arr = typeof displayVal === 'object' ? displayVal : JSON.parse(displayVal);
                          } catch (e) {
                            if (typeof displayVal === 'string') arr = displayVal.split(',').map(s => s.trim());
                          }
                          if (Array.isArray(arr) && arr.filter(Boolean).length > 0) {
                            return (
                              <div className="admin-info-row" key={f.key} style={{ flexDirection: 'column', alignItems: 'stretch', padding: '12px 20px' }}>
                                <span className="admin-info-label" style={{ marginBottom: '6px' }}>{f.label}</span>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                  {arr.filter(Boolean).map((tag, idx) => (
                                    <span key={idx} style={{ display: 'inline-block', background: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1', padding: '2px 6px', borderRadius: '6px', fontSize: '10px', fontWeight: '600' }}>
                                      • {typeof tag === 'object' ? (tag.text || '') : String(tag)}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            );
                          }
                        }

                        if (f.type === 'social_links') {
                          let arr = [];
                          try {
                            arr = typeof displayVal === 'object' ? displayVal : JSON.parse(displayVal);
                          } catch (e) {
                            if (typeof displayVal === 'string') arr = displayVal.split(',').map(s => s.trim());
                          }
                          if (Array.isArray(arr) && arr.length > 0) {
                            return (
                              <div className="admin-info-row" key={f.key} style={{ flexDirection: 'column', alignItems: 'stretch', padding: '12px 20px' }}>
                                <span className="admin-info-label" style={{ marginBottom: '6px' }}>{f.label}</span>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                  {arr.map((item, idx) => {
                                    const iconName = typeof item === 'object' && item !== null ? item.icon : String(item);
                                    const IconComponent = LucideIcons[iconName] || LucideIcons.Globe;
                                    return (
                                      <span key={idx} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#eef2ff', color: '#4f46e5', border: '1px solid #c7d2fe', padding: '2px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: '700' }}>
                                        <IconComponent size={10} />
                                        {iconName}
                                      </span>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }

                        if (f.type === 'stars') {
                          const starRating = Number(displayVal) || 0;
                          return (
                            <div className="admin-info-row" key={f.key} style={{ padding: '12px 20px' }}>
                              <span className="admin-info-label">{f.label}</span>
                              <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
                                {[1, 2, 3, 4, 5].map((starNum) => (
                                  <LucideIcons.Star 
                                    key={starNum} 
                                    size={13} 
                                    fill={starNum <= starRating ? '#facc15' : 'transparent'} 
                                    color={starNum <= starRating ? '#facc15' : '#cbd5e1'} 
                                  />
                                ))}
                                <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '750', marginLeft: '6px' }}>
                                  {starRating}/5
                                </span>
                              </div>
                            </div>
                          );
                        }
                        
                        if (f.type === 'icon') {
                          return (
                            <div className="admin-info-row" key={f.key} style={{ padding: '12px 20px' }}>
                              <span className="admin-info-label">{f.label}</span>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                {React.createElement(LucideIcons[displayVal] || LucideIcons.HelpCircle, { size: 14, color: '#6366f1' })}
                                <span className="admin-info-value">{displayVal || 'None'}</span>
                              </div>
                            </div>
                          );
                        }

                        if (f.type === 'boolean') {
                          return (
                            <div className="admin-info-row" key={f.key} style={{ padding: '12px 20px' }}>
                              <span className="admin-info-label">{f.label}</span>
                              <span className="admin-info-value">{displayVal ? 'Yes' : 'No'}</span>
                            </div>
                          );
                        }

                        return (
                          <div className="admin-info-row" key={f.key} style={{ padding: '12px 20px' }}>
                            <span className="admin-info-label">{f.label}</span>
                            <span className="admin-info-value" style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '70%' }}>
                              {String(displayVal || '-')}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        </>
      )}
    </div>
  );
}
