import React from 'react';

export const LoadingSpinner: React.FC<{ message?: string }> = ({ message = 'Loading content...' }) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5">
      <div className="spinner-border text-cyan mb-3" style={{ width: '3rem', height: '3rem' }} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="text-secondary-custom font-mono small">{message}</p>
    </div>
  );
};
