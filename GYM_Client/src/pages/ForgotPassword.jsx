import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, ArrowLeft, Dumbbell } from 'lucide-react';
import api from '../services/api';
import { useToast } from '../components/Admin/ToastContext.jsx';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const showToast = (msg, type) => {
    if (toast && typeof toast.showToast === 'function') {
      toast.showToast(msg, type);
    } else {
      alert(msg);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post('/auth/forgot-password', { email });
      if (res.data.success) {
        showToast('OTP sent to your email!', 'success');
        setTimeout(() => navigate('/recover-password', { state: { email } }), 1000);
      } else {
        showToast(res.data.error || 'Failed to send reset OTP', 'error');
      }
    } catch (error) {
      const msg = error.response?.data?.error || 'Network error. Please try again.';
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <Dumbbell size={36} color="var(--accent)" />
          </div>
          <h1>Reset Password</h1>
          <p>Enter your email to receive a password reset OTP</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={18} />
              <input
                type="email"
                placeholder="admin@marcusreid.fit"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 48px',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  fontSize: '14px',
                  color: 'var(--text)',
                }}
              />
            </div>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Sending...' : 'Send Recovery OTP'}
          </button>
        </form>

        <div className="login-footer">
          <Link to="/login" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--accent)', textDecoration: 'none', fontWeight: '800', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <ArrowLeft size={16} /> Back to Login
          </Link>
        </div>
      </div>

      <style>{`
        .login-container { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--bg); padding: 20px; font-family: var(--ff-body); }
        .login-card { width: 100%; max-width: 420px; background: var(--card); border-radius: 12px; box-shadow: 0 16px 40px var(--shadow2); padding: 40px; border: 1px solid var(--border); }
        .login-header { text-align: center; margin-bottom: 32px; }
        .login-logo { width: 72px; height: 72px; background: rgba(232,255,0,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; }
        .login-header h1 { font-family: var(--ff-head); font-size: 24px; color: var(--text); margin-bottom: 8px; }
        .login-header p { color: var(--text3); font-size: 14px; }
        .login-form .form-group { margin-bottom: 20px; }
        .login-form label { display: block; font-family: var(--ff-sub); font-size: 11px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: var(--accent); margin-bottom: 8px; }
        .input-wrapper { position: relative; display: flex; align-items: center; }
        .input-icon { position: absolute; left: 16px; color: var(--text3); }
        .login-btn { width: 100%; padding: 14px; background: var(--accent); color: var(--bg); border: none; border-radius: 6px; font-family: var(--ff-sub); font-size: 14px; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; cursor: pointer; transition: 0.2s; margin-top: 12px; }
        .login-btn:hover { opacity: 0.85; transform: translateY(-1px); }
        .login-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .login-footer { margin-top: 32px; text-align: center; border-top: 1px solid var(--border); padding-top: 24px; }
      `}</style>
    </div>
  );
};

export default ForgotPassword;
