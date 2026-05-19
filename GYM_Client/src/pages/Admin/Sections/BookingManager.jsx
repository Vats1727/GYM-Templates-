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
      showToast('Failed to retrieve client bookings database', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await crudService.update('admin/bookings', id, { status: newStatus });
      showToast(`Booking status updated to ${newStatus}`);
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
      (b.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.note || '').toLowerCase().includes(searchQuery.toLowerCase());
    
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
    <div style={{ padding: '32px', color: 'var(--text)', width: '100%', boxSizing: 'border-box' }}>
      {/* 1. Header Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', letterSpacing: '-0.75px', margin: 0, fontFamily: 'var(--ff-sub)', textTransform: 'uppercase' }}>Bookings & Intake logs</h1>
          <p style={{ fontSize: '14px', color: 'var(--text3)', marginTop: '6px' }}>
            View, verify, and manage client program registration requests and schedule strategy sessions.
          </p>
        </div>
        <button 
          onClick={loadBookings} 
          style={{
            background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--text)',
            padding: '10px 18px', borderRadius: '4px', fontSize: '13px', fontWeight: '700',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)', transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)'; }}
        >
          Refresh Feed
        </button>
      </div>

      {/* 2. Metrics Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <div style={{ background: 'var(--card)', padding: '20px', borderRadius: '4px', border: '1px solid var(--border)', boxShadow: '0 4px 6px rgba(0,0,0,0.2)' }}>
          <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Applications</span>
          <h3 style={{ fontSize: '28px', fontWeight: '800', margin: '8px 0 0 0', color: 'var(--text)' }}>{total}</h3>
        </div>
        <div style={{ background: 'var(--card)', padding: '20px', borderRadius: '4px', border: '1px solid var(--border)', boxShadow: '0 4px 6px rgba(0,0,0,0.2)' }}>
          <span style={{ fontSize: '11px', fontWeight: '800', color: '#eab308', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pending Reviews</span>
          <h3 style={{ fontSize: '28px', fontWeight: '800', margin: '8px 0 0 0', color: '#eab308' }}>{pending}</h3>
        </div>
        <div style={{ background: 'var(--card)', padding: '20px', borderRadius: '4px', border: '1px solid var(--border)', boxShadow: '0 4px 6px rgba(0,0,0,0.2)' }}>
          <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Confirmed Bookings</span>
          <h3 style={{ fontSize: '28px', fontWeight: '800', margin: '8px 0 0 0', color: 'var(--accent)' }}>{confirmed}</h3>
        </div>
        <div style={{ background: 'var(--card)', padding: '20px', borderRadius: '4px', border: '1px solid var(--border)', boxShadow: '0 4px 6px rgba(0,0,0,0.2)' }}>
          <span style={{ fontSize: '11px', fontWeight: '800', color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Active Members</span>
          <h3 style={{ fontSize: '28px', fontWeight: '800', margin: '8px 0 0 0', color: '#10b981' }}>{completed}</h3>
        </div>
      </div>

      {/* 3. Search & Filter Bar */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '300px', position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Search size={18} style={{ position: 'absolute', left: '16px', color: 'var(--text3)' }} />
          <input 
            type="text" 
            placeholder="Search by client name, target program, email, phone or goals note..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%', padding: '14px 18px 14px 48px', border: '1px solid var(--border)',
              background: 'var(--card)', borderRadius: '4px', fontSize: '14px', outline: 'none',
              fontFamily: 'inherit', color: 'var(--text)'
            }}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', background: 'var(--card)', padding: '4px', borderRadius: '4px', border: '1px solid var(--border)' }}>
          {['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'].map(opt => (
            <button
              key={opt}
              onClick={() => setStatusFilter(opt)}
              style={{
                border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '13px', fontWeight: '800',
                cursor: 'pointer', transition: 'all 0.2s', textTransform: 'uppercase', letterSpacing: '0.03em',
                background: statusFilter === opt ? 'var(--accent)' : 'transparent',
                color: statusFilter === opt ? 'var(--bg)' : 'var(--text3)'
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Table / Grid */}
      <div style={{ background: 'var(--card)', borderRadius: '4px', border: '1px solid var(--border)', boxShadow: '0 4px 6px rgba(0,0,0,0.2)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '80px', textAlign: 'center', color: 'var(--text3)' }}>
            <div style={{ fontSize: '15px', fontWeight: '600' }}>Accessing bookings log database...</div>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div style={{ padding: '80px', textAlign: 'center', color: 'var(--text3)' }}>
            <ShieldAlert size={40} style={{ margin: '0 auto 16px', color: 'var(--border)' }} />
            <div style={{ fontSize: '15px', fontWeight: '600' }}>No booking records match your filter criteria</div>
          </div>
        ) : isMobile ? (
          /* Mobile Card Layout */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', padding: '20px', background: 'var(--bg)' }}>
            {filteredBookings.map((b) => {
              const status = b.status || 'Pending';
              
              let badgeStyle = { background: 'rgba(234,179,8,0.1)', color: '#eab308' };
              if (status === 'Confirmed') badgeStyle = { background: 'rgba(232,255,0,0.1)', color: 'var(--accent)' };
              if (status === 'Completed') badgeStyle = { background: 'rgba(16,185,129,0.1)', color: '#10b981' };
              if (status === 'Cancelled') badgeStyle = { background: 'rgba(239,68,68,0.1)', color: '#ef4444' };

              return (
                <div key={b.id} style={{ 
                  background: 'var(--card)', 
                  borderRadius: '4px', 
                  border: '1px solid var(--border)', 
                  padding: '20px', 
                  boxShadow: '0 4px 6px rgba(0,0,0,0.15)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  position: 'relative'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontWeight: '850', color: 'var(--text)', fontSize: '16px', fontFamily: 'var(--ff-sub)', textTransform: 'uppercase' }}>{b.name || 'Anonymous Client'}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text3)', marginTop: '2px', wordBreak: 'break-all' }}>{b.phone || '-'} • {b.email || '-'}</div>
                    </div>
                    
                    <button 
                      onClick={() => handleDelete(b.id)}
                      style={{
                        background: 'transparent', border: 'none', color: '#ef4444',
                        cursor: 'pointer', padding: '6px', borderRadius: '4px',
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        transition: '0.2s', flexShrink: 0
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      title="Delete record permanently"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: 'var(--text3)', fontWeight: '500' }}>Selected Package</span>
                      <span style={{ background: 'var(--surface)', color: 'var(--accent)', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '800', border: '1px solid var(--border)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {b.service || 'Starter'}
                      </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: 'var(--text3)', fontWeight: '500' }}>Strategy Call Date</span>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: '800', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                          <Calendar size={12} style={{ color: 'var(--accent)' }} />
                          {b.date || 'TBD'}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text3)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                          <Clock size={11} />
                          {b.time || '-'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {b.note && (
                    <div style={{ 
                      fontSize: '12px', 
                      color: 'var(--text2)', 
                      background: 'var(--surface)', 
                      border: '1px solid var(--border)',
                      padding: '10px 14px', 
                      borderRadius: '4px', 
                      wordBreak: 'break-word',
                      lineHeight: '1.5'
                    }}>
                      <strong style={{ color: 'var(--text)', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.05em', display: 'block', marginBottom: '4px' }}>Fitness Goals / Medical Notes:</strong> 
                      {b.note}
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: '12px', marginTop: 'auto' }}>
                    <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</span>
                    <select 
                      value={status} 
                      onChange={(e) => handleUpdateStatus(b.id, e.target.value)}
                      style={{
                        background: badgeStyle.background,
                        color: badgeStyle.color,
                        border: '1px solid var(--border)',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: '800',
                        cursor: 'pointer',
                        outline: 'none',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}
                    >
                      <option value="Pending">Pending Review</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Active Member</option>
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
              <tr style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '16px 20px', fontSize: '11px', fontWeight: '800', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Client Details</th>
                <th style={{ padding: '16px 20px', fontSize: '11px', fontWeight: '800', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Target Plan</th>
                <th style={{ padding: '16px 20px', fontSize: '11px', fontWeight: '800', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Consultation Date</th>
                <th style={{ padding: '16px 20px', fontSize: '11px', fontWeight: '800', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Application Status</th>
                <th style={{ padding: '16px 20px', fontSize: '11px', fontWeight: '800', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((b) => {
                const status = b.status || 'Pending';
                
                let badgeStyle = { background: 'rgba(234,179,8,0.1)', color: '#eab308' };
                if (status === 'Confirmed') badgeStyle = { background: 'rgba(232,255,0,0.1)', color: 'var(--accent)' };
                if (status === 'Completed') badgeStyle = { background: 'rgba(16,185,129,0.1)', color: '#10b981' };
                if (status === 'Cancelled') badgeStyle = { background: 'rgba(239,68,68,0.1)', color: '#ef4444' };

                return (
                  <tr key={b.id} style={{ borderBottom: '1px solid var(--border)', transition: '0.2s' }}>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ fontWeight: '850', color: 'var(--text)', fontSize: '14px', fontFamily: 'var(--ff-sub)', textTransform: 'uppercase' }}>{b.name || 'Anonymous Client'}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text3)', marginTop: '2px' }}>{b.phone || '-'} • {b.email || '-'}</div>
                      {b.note && (
                        <div style={{ 
                          fontSize: '11px', 
                          color: 'var(--text2)', 
                          background: 'var(--surface)', 
                          border: '1px solid var(--border)',
                          padding: '6px 10px', 
                          borderRadius: '4px', 
                          marginTop: '6px', 
                          display: 'inline-block',
                          maxWidth: '400px',
                          wordBreak: 'break-word',
                          lineHeight: '1.4'
                        }}>
                          <strong style={{ color: 'var(--text)', fontSize: '9px', textTransform: 'uppercase' }}>Goals:</strong> {b.note}
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <span style={{ background: 'var(--surface)', color: 'var(--accent)', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '800', border: '1px solid var(--border)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {b.service || 'Starter'}
                      </span>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '800', color: 'var(--text)', fontSize: '13px' }}>
                        <Calendar size={12} style={{ color: 'var(--accent)' }} />
                        {b.date || 'TBD'}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--text3)', marginTop: '2.5px' }}>
                        <Clock size={11} />
                        {b.time || '-'}
                      </div>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <select 
                        value={status} 
                        onChange={(e) => handleUpdateStatus(b.id, e.target.value)}
                        style={{
                          background: badgeStyle.background,
                          color: badgeStyle.color,
                          border: '1px solid var(--border)',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: '800',
                          cursor: 'pointer',
                          outline: 'none',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}
                      >
                        <option value="Pending">Pending Review</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Active Member</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                      <button 
                        onClick={() => handleDelete(b.id)}
                        style={{
                          background: 'transparent', border: 'none', color: '#ef4444',
                          cursor: 'pointer', padding: '6px', borderRadius: '4px',
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                          transition: '0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        title="Delete record permanently"
                      >
                        <Trash2 size={15} />
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
