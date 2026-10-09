import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const AdminSidebar: React.FC = () => {
  const { logout, adminEmail } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Overview', icon: 'bi-speedometer2', to: '/admin/dashboard' },
    { label: 'Profile', icon: 'bi-person-badge-fill', to: '/admin/profile' },
    { label: 'Projects', icon: 'bi-folder-fill', to: '/admin/projects' },
    { label: 'Skills', icon: 'bi-cpu-fill', to: '/admin/skills' },
    { label: 'Education', icon: 'bi-mortarboard-fill', to: '/admin/education' },
    { label: 'Certifications', icon: 'bi-patch-check-fill', to: '/admin/certifications' },
    { label: 'Experience', icon: 'bi-briefcase-fill', to: '/admin/experience' },
    { label: 'Messages', icon: 'bi-chat-left-text-fill', to: '/admin/messages' },
    { label: 'Settings', icon: 'bi-gear-fill', to: '/admin/settings' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="admin-sidebar d-none d-lg-flex flex-column p-3">
        <div className="d-flex align-items-center gap-2 mb-4 pb-3 border-bottom border-secondary border-opacity-25 px-2">
          <i className="bi bi-shield-lock-fill text-warning fs-3"></i>
          <div>
            <h6 className="fw-bold mb-0 text-gradient">Admin CMS</h6>
            <span className="text-secondary-custom font-mono extra-small">{adminEmail || 'Admin'}</span>
          </div>
        </div>

        <ul className="nav nav-pills flex-column gap-1 mb-auto">
          {navItems.map((item, idx) => (
            <li key={idx} className="nav-item">
              <NavLink 
                to={item.to} 
                end={item.to === '/admin/dashboard'}
                className={({ isActive }) => `nav-link d-flex align-items-center gap-3 px-3 py-2.5 rounded-3 text-secondary-custom ${isActive ? 'active bg-gradient-brand text-white shadow-sm' : ''}`}
              >
                <i className={`bi ${item.icon} fs-5`}></i>
                <span className="fw-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="pt-3 border-top border-secondary border-opacity-25 mt-auto">
          <a href="http://localhost:5000/api-docs" target="_blank" rel="noopener noreferrer" className="btn btn-outline-cyan btn-sm w-100 mb-2">
            <i className="bi bi-file-earmark-code me-1"></i> Swagger API Docs
          </a>
          <a href="/" target="_blank" rel="noopener noreferrer" className="btn btn-outline-secondary btn-sm w-100 mb-2">
            <i className="bi bi-globe me-1"></i> View Live Site
          </a>
          <button onClick={handleLogout} className="btn btn-outline-danger btn-sm w-100">
            <i className="bi bi-box-arrow-right me-1"></i> Logout
          </button>
        </div>
      </aside>

      {/* Mobile Offcanvas Bar */}
      <div className="d-lg-none bg-surface p-3 border-bottom border-secondary border-opacity-25 d-flex justify-content-between align-items-center sticky-top">
        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-outline-secondary border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#adminOffcanvas">
            <i className="bi bi-list fs-2"></i>
          </button>
          <span className="fw-bold text-gradient">Admin CMS</span>
        </div>
        <button onClick={handleLogout} className="btn btn-sm btn-outline-danger">
          Logout
        </button>
      </div>

      <div className="offcanvas offcanvas-start bg-surface text-primary" tabIndex={-1} id="adminOffcanvas">
        <div className="offcanvas-header border-bottom border-secondary border-opacity-25">
          <h5 className="offcanvas-title fw-bold text-gradient">Admin Navigation</h5>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body d-flex flex-column p-3">
          <ul className="nav nav-pills flex-column gap-1 mb-auto">
            {navItems.map((item, idx) => (
              <li key={idx} className="nav-item" data-bs-dismiss="offcanvas">
                <NavLink 
                  to={item.to} 
                  end={item.to === '/admin/dashboard'}
                  className={({ isActive }) => `nav-link d-flex align-items-center gap-3 px-3 py-2.5 rounded-3 text-secondary-custom ${isActive ? 'active bg-gradient-brand text-white' : ''}`}
                >
                  <i className={`bi ${item.icon} fs-5`}></i>
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
