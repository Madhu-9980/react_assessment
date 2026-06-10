import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ClipboardList, AlertCircle } from 'lucide-react';

const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    
    if (!validate()) return;

    const result = await login(username, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setApiError(result.message);
      setPassword('');
      setUsername('');
    }
  };

  return (
    <div className="login-page-wrapper animate-fade-in">
      {/* Left Sidebar Info panel */}
      <div className="login-sidebar">
        <div className="sidebar-brand-large">
          <div className="brand-logo-large">
            <ClipboardList size={32} />
          </div>
          <h2>Task Manager</h2>
          <p className="brand-tagline">Sign in to open your project dashboard.</p>
        </div>

        <ul className="sidebar-features-list">
          <li>
            <span className="feature-dot"></span>
            <span>Plan work across To Do, In Progress, and Done</span>
          </li>
          <li>
            <span className="feature-dot"></span>
            <span>Track priorities and deadlines in one place</span>
          </li>
          <li>
            <span className="feature-dot"></span>
            <span>Your board is saved in this browser</span>
          </li>
        </ul>
      </div>

      {/* Right Content area */}
      <div className="login-content-area">
        <div className="login-form-card">
          <h3 className="form-card-title">Welcome back</h3>
          <p className="form-card-subtitle">Use your account email and password to continue.</p>

          {apiError && (
            <div className="api-error-alert">
              <AlertCircle size={18} />
              <span>{apiError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username" className="login-label">EMAIL</label>
              <input
                id="username"
                type="text"
                placeholder="you@example.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`form-input login-input ${errors.username ? 'input-error' : ''}`}
                disabled={loading}
              />
              {errors.username && <span className="error-text">{errors.username}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="login-label">PASSWORD</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`form-input login-input ${errors.password ? 'input-error' : ''}`}
                disabled={loading}
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <button type="submit" className="btn btn-login" disabled={loading}>
              {loading ? (
                <span className="spinner"></span>
              ) : (
                'Sign in'
              )}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .login-page-wrapper {
          display: flex;
          min-height: 100vh;
          width: 100vw;
          overflow: hidden;
        }

        .login-sidebar {
          width: 360px;
          background-color: var(--color-sidebar);
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 3.5rem;
          flex-shrink: 0;
        }

        .sidebar-brand-large {
          margin-bottom: 3.5rem;
        }

        .brand-logo-large {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          border-radius: var(--radius-md);
          background-color: white;
          color: var(--todo-color);
          margin-bottom: 1.5rem;
        }

        .sidebar-brand-large h2 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .brand-tagline {
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .sidebar-features-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .sidebar-features-list li {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
          font-size: 0.85rem;
          color: #cbd5e1;
          line-height: 1.4;
        }

        .feature-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--todo-color);
          margin-top: 0.4rem;
          flex-shrink: 0;
          box-shadow: 0 0 6px var(--todo-color);
        }

        .login-content-area {
          flex: 1;
          background-color: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .login-form-card {
          background: white;
          border-radius: var(--radius-lg);
          padding: 3rem 2.5rem;
          width: 100%;
          max-width: 440px;
          box-shadow: var(--shadow-md);
          border: 1px solid var(--border-color);
        }

        .form-card-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 0.35rem;
        }

        .form-card-subtitle {
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .login-label {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--text-secondary);
          letter-spacing: 0.05em;
        }

        .login-input {
          height: 42px;
          background-color: #f8fafc;
        }

        .btn-login {
          background-color: var(--primary);
          color: white;
          height: 42px;
          font-weight: 600;
          font-size: 0.95rem;
          margin-top: 0.5rem;
          transition: background-color 0.2s;
        }

        .btn-login:hover {
          background-color: var(--primary-hover);
        }

        .api-error-alert {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          background-color: #fef2f2;
          border: 1px solid #fee2e2;
          border-radius: var(--radius-sm);
          color: #ef4444;
          font-size: 0.85rem;
          margin-bottom: 1.25rem;
        }

        .demo-credentials-box {
          margin-top: 2rem;
          padding: 1rem;
          background-color: #f8fafc;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          font-size: 0.78rem;
          color: var(--text-secondary);
          text-align: center;
        }

        .demo-credentials-box p {
          margin-bottom: 0.25rem;
        }

        .demo-credentials-box p:last-child {
          margin-bottom: 0;
        }

        .demo-credentials-box code {
          background-color: #e2e8f0;
          padding: 0.1rem 0.35rem;
          border-radius: 4px;
          color: #0f172a;
          font-weight: 500;
        }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .login-page-wrapper {
            flex-direction: column;
          }
          .login-sidebar {
            width: 100%;
            padding: 2.5rem;
            align-items: center;
            text-align: center;
          }
          .sidebar-brand-large {
            margin-bottom: 1.5rem;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .brand-logo-large {
            margin-bottom: 0.75rem;
          }
          .sidebar-features-list {
            display: none; /* Hide sidebar feature list on mobile */
          }
          .login-content-area {
            padding: 2.5rem 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
