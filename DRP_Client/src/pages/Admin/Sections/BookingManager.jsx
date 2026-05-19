import React, { useState, useEffect } from 'react';
import { crudService } from '../../../services/crud';
import { useToast } from '../../../components/Admin/ToastContext';
import { Search, Calendar, User, Clock, Trash2, ShieldAlert, Sparkles, Filter, CheckCircle, XCircle } from 'lucide-react';

export default function BookingManager() {
  const { showToast } = useToast();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    loadBookings();
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const res = await crudService.getAll('admin/bookings');
      setBookings(Array.isArray(res) ? res : []);
    } catch (err) {
      console.error(err);
      showToast('Failed to retrieve patient bookings database', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await crudService.update('admin/bookings', id, { status: newStatus });
      showToast(`Appointment status updated to ${newStatus}`);
      loadBookings();
      window.dispatchEvent(new CustomEvent('api-data-updated'));
    } catch (err) {
      console.error(err);
      showToast('Failed to update status', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this booking record?')) return;
    try {
      await crudService.delete('admin/bookings', id);
      showToast('Booking record cleared successfully');
      loadBookings();
      window.dispatchEvent(new CustomEvent('api-data-updated'));
    } catch (err) {
      console.error(err);
      showToast('Failed to delete booking', 'error');
    }
  };

  // Filter logic
  const filteredBookings = bookings.filter(b => {
    const matchesSearch = 
      (b.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.phone || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.service || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.stylist || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    if (statusFilter === 'All') return matchesSearch;
    return matchesSearch && (b.status || 'Pending') === statusFilter;
  });

  // Calculate metrics
  const total = bookings.length;
  const pending = bookings.filter(b => (b.status || 'Pending') === 'Pending').length;
  const confirmed = bookings.filter(b => b.status === 'Confirmed').length;
  const completed = bookings.filter(b => b.status === 'Completed').length;
  const isMobile = width <= 1024;

  return (
    <div style={{ padding: '32px', color: '#1e293b', width: '100%', boxSizing: 'border-box' }}>
      {/* 1. Header Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', letterSpacing: '-0.75px', margin: 0 }}>Consultations & Bookings</h1>
          <p style={{ fontSize: '14px', color: '#64748b', marginTop: '6px' }}>
            View, verify, and manage patient consultation requests and schedule appointments.
          </p>
        </div>
        <button 
          onClick={loadBookings} 
          style={{
            background: 'white', border: '1px solid #cbd5e1', color: '#475569',
            padding: '10px 18px', borderRadius: '10px', fontSize: '13px', fontWeight: '700',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
          }}
        >
          Refresh Feed
        </button>
      </div>

      {/* 2. Metrics Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.01)' }}>
          <span style={{ fontSize: '12px', fontWeight: '750', color: '#64748b', textTransform: 'uppercase' }}>Total Requests</span>
          <h3 style={{ fontSize: '28px', fontWeight: '800', margin: '8px 0 0 0', color: '#0f172a' }}>{total}</h3>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.01)' }}>
          <span style={{ fontSize: '12px', fontWeight: '750', color: '#b45309', textTransform: 'uppercase' }}>Pending Requests</span>
          <h3 style={{ fontSize: '28px', fontWeight: '800', margin: '8px 0 0 0', color: '#b45309' }}>{pending}</h3>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.01)' }}>
          <span style={{ fontSize: '12px', fontWeight: '750', color: '#2e6b5e', textTransform: 'uppercase' }}>Confirmed Bookings</span>
          <h3 style={{ fontSize: '28px', fontWeight: '800', margin: '8px 0 0 0', color: '#2e6b5e' }}>{confirmed}</h3>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.01)' }}>
          <span style={{ fontSize: '12px', fontWeight: '750', color: '#16a34a', textTransform: 'uppercase' }}>Completed Sessions</span>
          <h3 style={{ fontSize: '28px', fontWeight: '800', margin: '8px 0 0 0', color: '#16a34a' }}>{completed}</h3>
        </div>
      </div>

      {/* 3. Search & Filter Bar */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div className="admin-search-box-premium" style={{ flex: 1, minWidth: '300px' }}>
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search by patient name, consultation method, treatment, or email..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%', padding: '14px 18px 14px 44px', border: '2px solid #e2e8f0',
              background: '#fff', borderRadius: '12px', fontSize: '14px', outline: 'none',
              fontFamily: 'inherit'
            }}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', background: 'white', padding: '4px', borderRadius: '12px', border: '2px solid #e2e8f0' }}>
          {['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'].map(opt => (
            <button
              key={opt}
              onClick={() => setStatusFilter(opt)}
              style={{
                border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '700',
                cursor: 'pointer', transition: 'all 0.2s',
                background: statusFilter === opt ? '#2e6b5e' : 'transparent',
                color: statusFilter === opt ? 'white' : '#64748b'
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Table / Grid */}
      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '80px', textAlign: 'center', color: '#64748b' }}>
            <div style={{ fontSize: '15px', fontWeight: '600' }}>Accessing bookings log database...</div>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div style={{ padding: '80px', textAlign: 'center', color: '#94a3b8' }}>
            <ShieldAlert size={40} style={{ margin: '0 auto 16px', color: '#cbd5e1' }} />
            <div style={{ fontSize: '15px', fontWeight: '600' }}>No booking records match your filter criteria</div>
          </div>
        ) : isMobile ? (
          /* Mobile Card Layout */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', padding: '20px', background: '#f8fafc' }}>
            {filteredBookings.map((b) => {
              const status = b.status || 'Pending';
              
              let badgeStyle = { background: '#fef3c7', color: '#d97706' };
              if (status === 'Confirmed') badgeStyle = { background: '#e2f5ec', color: '#2e6b5e' };
              if (status === 'Completed') badgeStyle = { background: '#dcfce7', color: '#166534' };
              if (status === 'Cancelled') badgeStyle = { background: '#fee2e2', color: '#991b1b' };

              return (
                <div key={b.id} style={{ 
                  background: 'white', 
                  borderRadius: '16px', 
                  border: '1px solid #e2e8f0', 
                  padding: '20px', 
                  boxShadow: '0 4px 6px rgba(0,0,0,0.015)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  position: 'relative'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontWeight: '800', color: '#0f172a', fontSize: '15.5px' }}>{b.name || 'Anonymous Patient'}</div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px', wordBreak: 'break-all' }}>{b.phone || '-'} • {b.email || '-'}</div>
                    </div>
                    
                    <button 
                      onClick={() => handleDelete(b.id)}
                      style={{
                        background: 'transparent', border: 'none', color: '#ef4444',
                        cursor: 'pointer', padding: '6px', borderRadius: '8px',
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        transition: '0.2s', flexShrink: 0
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#fef2f2'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      title="Delete record permanently"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#64748b', fontWeight: '500' }}>Method / Mode</span>
                      <span style={{ fontWeight: '600', color: '#334155' }}>{b.stylist || 'Online Video Call'}</span>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#64748b', fontWeight: '500' }}>Treatment Type</span>
                      <span style={{ background: '#f1f5f9', color: '#475569', padding: '2px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '600' }}>
                        {b.service || 'Holistic Consultation'}
                      </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#64748b', fontWeight: '500' }}>Schedule</span>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: '700', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                          <Calendar size={12} style={{ color: '#2e6b5e' }} />
                          {b.date || 'TBD'}
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                          <Clock size={11} />
                          {b.time || '-'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {b.note && (
                    <div style={{ 
                      fontSize: '11px', 
                      color: '#64748b', 
                      background: '#f8fafc', 
                      border: '1px solid #e2e8f0',
                      padding: '8px 12px', 
                      borderRadius: '8px', 
                      wordBreak: 'break-word',
                      lineHeight: '1.4'
                    }}>
                      <strong>Medical Notes / Symptoms:</strong> {b.note}
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '12px', marginTop: 'auto' }}>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>Status</span>
                    <select 
                      value={status} 
                      onChange={(e) => handleUpdateStatus(b.id, e.target.value)}
                      style={{
                        background: badgeStyle.background,
                        color: badgeStyle.color,
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '11.5px',
                        fontWeight: '800',
                        cursor: 'pointer',
                        outline: 'none',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                      }}
                    >
                      <option value="Pending">Pending Approval</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Desktop Layout - Classic Table */
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #cbd5e1' }}>
                <th style={{ padding: '12px 16px', fontSize: '10.5px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Patient Details</th>
                <th style={{ padding: '12px 16px', fontSize: '10.5px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Method / Mode</th>
                <th style={{ padding: '12px 16px', fontSize: '10.5px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Treatment</th>
                <th style={{ padding: '12px 16px', fontSize: '10.5px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date & Schedule</th>
                <th style={{ padding: '12px 16px', fontSize: '10.5px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Verification Status</th>
                <th style={{ padding: '12px 16px', fontSize: '10.5px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((b) => {
                const status = b.status || 'Pending';
                
                let badgeStyle = { background: '#fef3c7', color: '#d97706' };
                if (status === 'Confirmed') badgeStyle = { background: '#e2f5ec', color: '#2e6b5e' };
                if (status === 'Completed') badgeStyle = { background: '#dcfce7', color: '#166534' };
                if (status === 'Cancelled') badgeStyle = { background: '#fee2e2', color: '#991b1b' };

                return (
                  <tr key={b.id} style={{ borderBottom: '1px solid #f1f5f9', transition: '0.2s' }}>
                    <td style={{ padding: '10px 16px' }}>
                      <div style={{ fontWeight: '800', color: '#0f172a', fontSize: '13.5px' }}>{b.name || 'Anonymous Patient'}</div>
                      <div style={{ fontSize: '11px', color: '#64748b', marginTop: '1.5px' }}>{b.phone || '-'} • {b.email || '-'}</div>
                      {b.note && (
                        <div style={{ 
                          fontSize: '10px', 
                          color: '#64748b', 
                          background: '#f8fafc', 
                          border: '1px solid #e2e8f0',
                          padding: '3px 6px', 
                          borderRadius: '4px', 
                          marginTop: '4px', 
                          display: 'inline-block',
                          maxWidth: '280px',
                          wordBreak: 'break-word',
                          lineHeight: '1.3'
                        }}>
                          <strong>Notes:</strong> {b.note}
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '10px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#e2f5ec', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9.5px', color: '#2e6b5e', fontWeight: '800' }}>
                          {b.stylist ? b.stylist.substring(0, 2).toUpperCase() : 'ON'}
                        </div>
                        <span style={{ fontWeight: '600', color: '#334155', fontSize: '12.5px' }}>{b.stylist || 'Online Video Call'}</span>
                      </div>
                    </td>
                    <td style={{ padding: '10px 16px' }}>
                      <span style={{ background: '#f1f5f9', color: '#475569', padding: '3px 6px', borderRadius: '5px', fontSize: '11.5px', fontWeight: '600' }}>
                        {b.service || 'Holistic Consultation'}
                      </span>
                    </td>
                    <td style={{ padding: '10px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '750', color: '#0f172a', fontSize: '12.5px' }}>
                        <Calendar size={12} style={{ color: '#2e6b5e' }} />
                        {b.date || 'TBD'}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#64748b', marginTop: '2.5px' }}>
                        <Clock size={11} />
                        {b.time || '-'}
                      </div>
                    </td>
                    <td style={{ padding: '10px 16px' }}>
                      <select 
                        value={status} 
                        onChange={(e) => handleUpdateStatus(b.id, e.target.value)}
                        style={{
                          background: badgeStyle.background,
                          color: badgeStyle.color,
                          border: 'none',
                          padding: '4px 10px',
                          borderRadius: '20px',
                          fontSize: '11px',
                          fontWeight: '800',
                          cursor: 'pointer',
                          outline: 'none',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                        }}
                      >
                        <option value="Pending">Pending Approval</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td style={{ padding: '10px 16px', textAlign: 'right' }}>
                      <button 
                        onClick={() => handleDelete(b.id)}
                        style={{
                          background: 'transparent', border: 'none', color: '#ef4444',
                          cursor: 'pointer', padding: '4px', borderRadius: '6px',
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                          transition: '0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#fef2f2'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        title="Delete record permanently"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
