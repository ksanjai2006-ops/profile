import React, { useState } from 'react';
import { Certification } from '../types';

interface CertificationCardProps {
  cert: Certification;
}

export const CertificationCard: React.FC<CertificationCardProps> = ({ cert }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="glass-card p-4 h-100 d-flex flex-column justify-content-between border-secondary border-opacity-25">
        <div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="badge bg-warm-taupe text-white font-mono extra-small">{cert.date}</span>
            {cert.credentialId && (
              <span className="extra-small text-secondary-custom font-mono">ID: {cert.credentialId}</span>
            )}
          </div>

          <h5 className="fw-bold text-warm-dark mb-1">{cert.title}</h5>
          <div className="text-warm-terracotta fw-semibold small mb-3">{cert.organization}</div>
        </div>

        <div className="d-flex gap-2 pt-3 border-top border-secondary border-opacity-25 mt-3">
          {cert.image && (
            <button onClick={() => setShowModal(true)} className="btn btn-sm btn-warm-pill-outline flex-grow-1">
              Preview <i className="bi bi-eye ms-1"></i>
            </button>
          )}
          {cert.certificateUrl && (
            <a href={cert.certificateUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-warm-terracotta flex-grow-1 text-center">
              Verify <i className="bi bi-box-arrow-up-right ms-1"></i>
            </a>
          )}
        </div>
      </div>

      {showModal && cert.image && (
        <div className="modal fade show d-block backdrop-blur" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }} tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content glass-card text-warm-dark border-secondary">
              <div className="modal-header border-secondary">
                <h5 className="modal-title fw-bold">{cert.title}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body p-0">
                <img src={cert.image} alt={cert.title} className="w-100 h-auto" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
