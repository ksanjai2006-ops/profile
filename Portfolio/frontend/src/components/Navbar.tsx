import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <nav className={`navbar navbar-expand-lg sticky-top navbar-light navbar-custom ${scrolled ? 'scrolled' : ''} py-3`}>
      <div className="container-fluid max-w-7xl px-3 px-md-4">
        {/* Brand Logo */}
        <Link className="navbar-brand d-flex align-items-center gap-2 fw-extrabold fs-4 tracking-tight" to="/">
          <span className="badge bg-warm-terracotta text-white font-mono px-2 py-1">19</span>
          <span className="text-warm-dark font-sans tracking-wider">SANJAI K</span>
          <span className="badge bg-warm-vanilla text-warm-dark border border-secondary font-mono extra-small ms-1">EXTETA</span>
        </Link>

        <button 
          className="navbar-toggler border-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarContent"
          aria-controls="navbarContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-1">
            <li className="nav-item">
              <Link className={`nav-link px-3 fw-semibold ${isActive('/') ? 'text-warm-terracotta fw-bold' : 'text-warm-dark'}`} to="/">
                HOME
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link px-3 fw-semibold ${isActive('/about') ? 'text-warm-terracotta fw-bold' : 'text-warm-dark'}`} to="/about">
                ABOUT
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link px-3 fw-semibold ${isActive('/projects') ? 'text-warm-terracotta fw-bold' : 'text-warm-dark'}`} to="/projects">
                PROJECTS
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link px-3 fw-semibold ${isActive('/contact') ? 'text-warm-terracotta fw-bold' : 'text-warm-dark'}`} to="/contact">
                CONTACT
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme} 
              className="btn btn-sm btn-outline-secondary rounded-circle p-2"
              title={`Switch Theme (Current: ${theme})`}
              aria-label="Toggle theme"
            >
              <i className={`bi ${theme === 'dark' ? 'bi-moon-stars-fill text-warning' : 'bi-sun-fill text-warm-terracotta'} fs-5`}></i>
            </button>

            {/* Admin CTA Link */}
            {isAuthenticated ? (
              <Link to="/admin/dashboard" className="btn btn-warm-terracotta btn-sm">
                <i className="bi bi-speedometer2 me-1"></i> ADMIN DASHBOARD
              </Link>
            ) : (
              <Link to="/admin/login" className="btn btn-warm-coral btn-sm">
                <i className="bi bi-shield-lock-fill me-1"></i> ADMIN LOGIN
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
