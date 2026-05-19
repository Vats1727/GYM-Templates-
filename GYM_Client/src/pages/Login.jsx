import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn, Dumbbell } from 'lucide-react';
import api from '../services/api';
import { useToast } from '../components/Admin/ToastContext.jsx';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const showToast = (msg, type) => {
    if (toast && typeof toast.showToast === 'function') {
      toast.showToast(msg, type);
    } else {
      console.error('Toast system not initialized:', msg);
      alert(msg);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data.success) {
        localStorage.setItem('admin_token', res.data.token);
        localStorage.setItem('admin_user', JSON.stringify(res.data.user));
        showToast('Login successful!', 'success');
        setTimeout(() => navigate('/admin'), 500);
      } else {
        showToast(res.data.error || 'Invalid credentials', 'error');
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorMsg = error.response?.data?.error || 'Login failed. Please try again.';
      showToast(errorMsg, 'error');
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
          <h1>MARCUS<span style={{ color: 'var(--accent)' }}>/REID</span></h1>
          <p>Secure login to manage your gym portfolio</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
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
                  pointerEvents: 'auto',
                  position: 'relative',
                  zIndex: 2,
                }}
              />
            </div>
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ margin: 0 }}>Password</label>
              <Link to="/forgot-password" style={{ fontSize: '12px', color: 'var(--accent)', textDecoration: 'none', fontWeight: '700' }}>
                Forgot Password?
              </Link>
            </div>
            <div className="input-wrapper">
              <Lock className="input-icon" size={18} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 48px',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  fontSize: '14px',
                  color: 'var(--text)',
                  pointerEvents: 'auto',
                  position: 'relative',
                  zIndex: 2,
                }}
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword(!showPassword)}
                style={{ zIndex: 3 }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Authenticating...' : (
              <>
                <span>Login to Dashboard</span>
                <LogIn size={18} />
              </>
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>© {new Date().getFullYear()} Marcus Reid Admin Panel </p>
        </div>
      </div>

      <style>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg);
          padding: 20px;
          font-family: var(--ff-body);
          pointer-events: auto !important;
          position: relative;
          z-index: 10001 !important;
        }
        .login-card {
          width: 100%;
          max-width: 420px;
          background: var(--card);
          border-radius: 12px;
          box-shadow: 0 16px 40px var(--shadow2);
          padding: 40px;
          border: 1px solid var(--border);
          position: relative;
          z-index: 10002 !important;
          pointer-events: auto !important;
        }
        .login-header {
          text-align: center;
          margin-bottom: 32px;
        }
        .login-logo {
          width: 72px;
          height: 72px;
          background: rgba(232, 255, 0, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
        }
        .login-header h1 {
          font-family: var(--ff-head);
          font-size: 24px;
          color: var(--text);
          margin-bottom: 8px;
          letter-spacing: 0.05em;
        }
        .login-header p {
          color: var(--text3);
          font-size: 14px;
        }
        .login-form .form-group {
          margin-bottom: 20px;
        }
        .login-form label {
          display: block;
          font-family: var(--ff-sub);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 8px;
        }
        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        .input-icon {
          position: absolute;
          left: 16px;
          color: var(--text3);
          z-index: 3;
        }
        .eye-btn {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          color: var(--text3);
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .login-btn {
          width: 100%;
          padding: 14px;
          background: var(--accent);
          color: var(--bg);
          border: none;
          border-radius: 6px;
          font-family: var(--ff-sub);
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: 0.2s;
          margin-top: 12px;
        }
        .login-btn:hover {
          opacity: 0.85;
          transform: translateY(-1px);
        }
        .login-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .login-footer {
          margin-top: 32px;
          text-align: center;
          border-top: 1px solid var(--border);
          padding-top: 24px;
        }
        .login-footer p {
          font-size: 12px;
          color: var(--text3);
        }
      `}</style>
    </div>
  );
};

export default Login;
