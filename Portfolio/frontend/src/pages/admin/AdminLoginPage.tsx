import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('admin@sanjaik.dev');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await authService.login(email, password);
      if (res.success && res.data?.token) {
        login(res.data.token, res.data.email);
        navigate('/admin/dashboard');
      } else {
        setError(res.message || 'Login failed.');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials or connection error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-3">
      <div className="glass-card p-4 p-md-5 max-w-md w-100" style={{ maxWidth: '450px' }}>
        <div className="text-center mb-4">
          <div className="rounded-circle bg-warning bg-opacity-25 text-warning p-3 d-inline-flex mb-3">
            <i className="bi bi-shield-lock-fill fs-2"></i>
          </div>
          <h3 className="fw-extrabold text-gradient mb-1">Admin Portal</h3>
          <p className="text-secondary-custom small">Enter admin credentials to manage portfolio CMS</p>
        </div>

        {error && (
          <div className="alert alert-danger border-0 small mb-3">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>{error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-secondary-custom small fw-semibold">Email Address</label>
            <input 
              type="email" 
              className="form-control bg-dark bg-opacity-50 text-primary border-secondary"
              placeholder="admin@sanjaik.dev"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label text-secondary-custom small fw-semibold">Password</label>
            <input 
              type="password" 
              className="form-control bg-dark bg-opacity-50 text-primary border-secondary"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-brand w-100 py-2.5 fw-bold mb-3" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span> Authenticating...
              </>
            ) : (
              <>
                Login to Dashboard <i className="bi bi-arrow-right-short ms-1 fs-5"></i>
              </>
            )}
          </button>
        </form>

        <div className="p-3 bg-secondary bg-opacity-10 rounded-3 border border-secondary border-opacity-25 small font-mono">
          <span className="text-warning fw-bold d-block mb-1"><i className="bi bi-key-fill me-1"></i> Seed Credentials:</span>
          <div className="text-secondary-custom">Email: admin@sanjaik.dev</div>
          <div className="text-secondary-custom">Password: admin123</div>
        </div>
      </div>
    </div>
  );
};
