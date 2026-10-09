import React, { useEffect, useState } from 'react';
import { certService } from '../../services/certService';
import { Certification } from '../../types';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export const AdminCertificationsPage: React.FC = () => {
  const [certs, setCerts] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCert, setEditingCert] = useState<Certification | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    organization: '',
    date: '',
    credentialId: '',
    certificateUrl: '',
    image: ''
  });

  const fetchCerts = async () => {
    try {
      const res = await certService.getCertifications();
      if (res.success) setCerts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCerts();
  }, []);

  const handleOpenModal = (cert?: Certification) => {
    if (cert) {
      setEditingCert(cert);
      setFormData({
        title: cert.title,
        organization: cert.organization,
        date: cert.date,
        credentialId: cert.credentialId || '',
        certificateUrl: cert.certificateUrl || '',
        image: cert.image || ''
      });
    } else {
      setEditingCert(null);
      setFormData({
        title: '',
        organization: '',
        date: '2024',
        credentialId: '',
        certificateUrl: '',
        image: ''
      });
    }
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCert?._id) {
        await certService.updateCertification(editingCert._id, formData);
      } else {
        await certService.createCertification(formData);
      }
      setShowModal(false);
      fetchCerts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete certification entry?')) {
      try {
        await certService.deleteCertification(id);
        fetchCerts();
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) return <LoadingSpinner message="Fetching certifications..." />;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-gradient mb-1">Certifications Management</h2>
          <p className="text-secondary-custom mb-0">Manage professional certificates, credential IDs, and verification links.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn btn-brand">
          <i className="bi bi-plus-lg me-1"></i> Add Certification
        </button>
      </div>

      <div className="glass-card p-4">
        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle bg-transparent mb-0">
            <thead>
              <tr className="border-secondary">
                <th>Title</th>
                <th>Organization</th>
                <th>Date</th>
                <th>Credential ID</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {certs.map((c) => (
                <tr key={c._id}>
                  <td className="fw-bold text-primary">{c.title}</td>
                  <td className="text-cyan">{c.organization}</td>
                  <td className="font-mono small">{c.date}</td>
                  <td className="font-mono small text-secondary-custom">{c.credentialId || 'N/A'}</td>
                  <td className="text-end">
                    <button onClick={() => handleOpenModal(c)} className="btn btn-sm btn-outline-info me-2">
                      <i className="bi bi-pencil-fill"></i>
                    </button>
                    <button onClick={() => handleDelete(c._id!)} className="btn btn-sm btn-outline-danger">
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal fade show d-block backdrop-blur" style={{ backgroundColor: 'rgba(0,0,0,0.75)' }} tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content glass-card text-primary border-secondary">
              <form onSubmit={handleSave}>
                <div className="modal-header border-secondary">
                  <h5 className="modal-title fw-bold text-gradient">
                    {editingCert ? 'Edit Certification' : 'Add New Certification'}
                  </h5>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body p-4">
                  <div className="row g-3">
                    <div className="col-md-12">
                      <label className="form-label text-secondary-custom small">Certification Title *</label>
                      <input 
                        type="text" 
                        className="form-control bg-dark text-primary border-secondary" 
                        value={formData.title} 
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
                        required 
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label text-secondary-custom small">Organization *</label>
                      <input 
                        type="text" 
                        className="form-control bg-dark text-primary border-secondary" 
                        placeholder="Meta, AWS, Google"
                        value={formData.organization} 
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })} 
                        required 
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label text-secondary-custom small">Issue Date *</label>
                      <input 
                        type="text" 
                        className="form-control bg-dark text-primary border-secondary font-mono" 
                        placeholder="2024"
                        value={formData.date} 
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })} 
                        required 
                      />
                    </div>

                    <div className="col-md-12">
                      <label className="form-label text-secondary-custom small">Credential ID</label>
                      <input 
                        type="text" 
                        className="form-control bg-dark text-primary border-secondary font-mono" 
                        value={formData.credentialId} 
                        onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })} 
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label text-secondary-custom small">Certificate URL</label>
                      <input 
                        type="text" 
                        className="form-control bg-dark text-primary border-secondary" 
                        value={formData.certificateUrl} 
                        onChange={(e) => setFormData({ ...formData, certificateUrl: e.target.value })} 
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label text-secondary-custom small">Preview Image URL</label>
                      <input 
                        type="text" 
                        className="form-control bg-dark text-primary border-secondary" 
                        value={formData.image} 
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })} 
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer border-secondary">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-brand">Save Certificate</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
