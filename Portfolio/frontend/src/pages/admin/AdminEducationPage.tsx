import React, { useEffect, useState } from 'react';
import { educationService } from '../../services/educationService';
import { Education } from '../../types';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export const AdminEducationPage: React.FC = () => {
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Education | null>(null);
  const [formData, setFormData] = useState({
    degree: '',
    institution: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  const fetchEdu = async () => {
    try {
      const res = await educationService.getEducation();
      if (res.success) setEducation(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEdu();
  }, []);

  const handleOpenModal = (item?: Education) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        degree: item.degree,
        institution: item.institution,
        startDate: item.startDate,
        endDate: item.endDate,
        description: item.description || ''
      });
    } else {
      setEditingItem(null);
      setFormData({
        degree: '',
        institution: '',
        startDate: '2022',
        endDate: 'Present',
        description: ''
      });
    }
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem?._id) {
        await educationService.updateEducation(editingItem._id, formData);
      } else {
        await educationService.createEducation(formData);
      }
      setShowModal(false);
      fetchEdu();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete education record?')) {
      try {
        await educationService.deleteEducation(id);
        fetchEdu();
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) return <LoadingSpinner message="Loading education records..." />;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-gradient mb-1">Education Management</h2>
          <p className="text-secondary-custom mb-0">Manage degree, institution, and academic timelines.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn btn-brand">
          <i className="bi bi-plus-lg me-1"></i> Add Education
        </button>
      </div>

      <div className="glass-card p-4">
        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle bg-transparent mb-0">
            <thead>
              <tr className="border-secondary">
                <th>Degree</th>
                <th>Institution</th>
                <th>Timeline</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {education.map((e) => (
                <tr key={e._id}>
                  <td className="fw-bold text-primary">{e.degree}</td>
                  <td className="text-violet">{e.institution}</td>
                  <td><span className="badge bg-secondary bg-opacity-25 text-cyan font-mono">{e.startDate} - {e.endDate}</span></td>
                  <td className="text-end">
                    <button onClick={() => handleOpenModal(e)} className="btn btn-sm btn-outline-info me-2">
                      <i className="bi bi-pencil-fill"></i>
                    </button>
                    <button onClick={() => handleDelete(e._id!)} className="btn btn-sm btn-outline-danger">
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
                    {editingItem ? 'Edit Education' : 'Add Education Record'}
                  </h5>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body p-4">
                  <div className="row g-3">
                    <div className="col-md-12">
                      <label className="form-label text-secondary-custom small">Degree / Program *</label>
                      <input 
                        type="text" 
                        className="form-control bg-dark text-primary border-secondary" 
                        value={formData.degree} 
                        onChange={(e) => setFormData({ ...formData, degree: e.target.value })} 
                        required 
                      />
                    </div>
                    <div className="col-md-12">
                      <label className="form-label text-secondary-custom small">Institution *</label>
                      <input 
                        type="text" 
                        className="form-control bg-dark text-primary border-secondary" 
                        value={formData.institution} 
                        onChange={(e) => setFormData({ ...formData, institution: e.target.value })} 
                        required 
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label text-secondary-custom small">Start Year *</label>
                      <input 
                        type="text" 
                        className="form-control bg-dark text-primary border-secondary font-mono" 
                        value={formData.startDate} 
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} 
                        required 
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label text-secondary-custom small">End Year *</label>
                      <input 
                        type="text" 
                        className="form-control bg-dark text-primary border-secondary font-mono" 
                        value={formData.endDate} 
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} 
                        required 
                      />
                    </div>

                    <div className="col-md-12">
                      <label className="form-label text-secondary-custom small">Description / Highlights</label>
                      <textarea 
                        rows={3} 
                        className="form-control bg-dark text-primary border-secondary" 
                        value={formData.description} 
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="modal-footer border-secondary">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-brand">Save Record</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
