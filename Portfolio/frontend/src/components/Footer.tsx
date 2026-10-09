import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-4 border-top border-secondary-subtle bg-surface">
      <div className="container">
        <div className="row gy-4 align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <h5 className="fw-bold text-gradient mb-1">Sanjai K</h5>
            <p className="text-secondary-custom mb-0 small">
              Information Technology Student & Full-Stack Developer
            </p>
          </div>

          <div className="col-md-6 text-center text-md-end">
            <div className="d-flex justify-content-center justify-content-md-end gap-3 mb-2">
              <a href="https://github.com/sanjaik" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-secondary rounded-circle">
                <i className="bi bi-github"></i>
              </a>
              <a href="https://linkedin.com/in/sanjaik" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-secondary rounded-circle">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="https://instagram.com/sanjaik" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-secondary rounded-circle">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="mailto:sanjaik@example.com" className="btn btn-sm btn-outline-secondary rounded-circle">
                <i className="bi bi-envelope-fill"></i>
              </a>
            </div>
            <p className="text-secondary-custom mb-0 small">
              &copy; {new Date().getFullYear()} Sanjai K. Built with React, Express, MongoDB & Bootstrap 5.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
