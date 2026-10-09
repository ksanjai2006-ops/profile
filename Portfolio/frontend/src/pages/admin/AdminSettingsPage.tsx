import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export const AdminSettingsPage: React.FC = () => {
  const { adminEmail, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <div className="mb-4">
        <h2 className="fw-bold text-gradient mb-1">System Settings & Documentation</h2>
        <p className="text-secondary-custom mb-0">API configurations, Swagger documentation, and administrative control.</p>
      </div>

      <div className="row g-4">
        {/* Swagger Docs Card */}
        <div className="col-lg-6">
          <div className="glass-card p-4 p-md-5 h-100 border-info border-opacity-50">
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="rounded-3 p-3 bg-info bg-opacity-25 text-cyan fs-3">
                <i className="bi bi-file-earmark-code-fill"></i>
              </div>
              <div>
                <h5 className="fw-bold text-primary mb-1">Swagger OpenAPI Documentation</h5>
                <span className="badge bg-secondary bg-opacity-25 text-cyan font-mono">OpenAPI 3.0.0</span>
              </div>
            </div>
            <p className="text-secondary-custom small mb-4">
              All backend endpoints (Authentication, Profile, Projects, Skills, Education, Certifications, Experience, and Messages) are fully documented with request body schemas and JWT Bearer security.
            </p>
            <a href="http://localhost:5000/api-docs" target="_blank" rel="noopener noreferrer" className="btn btn-cyan w-100 fw-bold">
              Open /api-docs Interactive UI <i className="bi bi-box-arrow-up-right ms-2"></i>
            </a>
          </div>
        </div>

        {/* Theme Preferences */}
        <div className="col-lg-6">
          <div className="glass-card p-4 p-md-5 h-100">
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="rounded-3 p-3 bg-warning bg-opacity-25 text-warning fs-3">
                <i className="bi bi-palette-fill"></i>
              </div>
              <div>
                <h5 className="fw-bold text-primary mb-1">Appearance & Theme Mode</h5>
                <span className="text-secondary-custom small">Toggle global system color mode</span>
              </div>
            </div>

            <div className="d-flex flex-column gap-2 mb-4">
              <button 
                className={`btn d-flex align-items-center justify-content-between p-3 border ${theme === 'dark' ? 'btn-outline-brand active' : 'btn-outline-secondary'}`}
                onClick={() => setTheme('dark')}
              >
                <span><i className="bi bi-moon-stars-fill text-warning me-2"></i> Dark Mode (Futuristic Glassmorphism)</span>
                {theme === 'dark' && <i className="bi bi-check-circle-fill text-cyan"></i>}
              </button>

              <button 
                className={`btn d-flex align-items-center justify-content-between p-3 border ${theme === 'light' ? 'btn-outline-brand active' : 'btn-outline-secondary'}`}
                onClick={() => setTheme('light')}
              >
                <span><i className="bi bi-sun-fill text-warning me-2"></i> Light Mode</span>
                {theme === 'light' && <i className="bi bi-check-circle-fill text-cyan"></i>}
              </button>

              <button 
                className={`btn d-flex align-items-center justify-content-between p-3 border ${theme === 'system' ? 'btn-outline-brand active' : 'btn-outline-secondary'}`}
                onClick={() => setTheme('system')}
              >
                <span><i className="bi bi-display text-cyan me-2"></i> System Preference</span>
                {theme === 'system' && <i className="bi bi-check-circle-fill text-cyan"></i>}
              </button>
            </div>
          </div>
        </div>

        {/* Session & Account */}
        <div className="col-lg-12">
          <div className="glass-card p-4 p-md-5">
            <h5 className="fw-bold text-gradient mb-3"><i className="bi bi-shield-lock me-2"></i> Session Information</h5>
            <p className="text-secondary-custom small mb-4">
              Logged in as <strong className="text-cyan font-mono">{adminEmail || 'admin@sanjaik.dev'}</strong>. JWT session tokens are safely stored in browser localStorage and automatically injected in API authorization headers.
            </p>
            <button onClick={logout} className="btn btn-outline-danger">
              <i className="bi bi-box-arrow-right me-2"></i> Terminate Admin Session & Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
