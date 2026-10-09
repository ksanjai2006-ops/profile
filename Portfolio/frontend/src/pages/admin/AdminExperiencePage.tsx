import React, { useEffect, useState } from 'react';
import { expService } from '../../services/expService';
import { Experience } from '../../types';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export const AdminExperiencePage: React.FC = () => {
  const [expList, setExpList] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [formData, setFormData] = useState({
    organization: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
    technologies: ''
  });

  const fetchExp = async () => {
    try {
      const res = await expService.getExperience();
      if (res.success) setExpList(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExp();
  }, []);

  const handleOpenModal = (exp?: Experience) => {
    if (exp) {
      setEditingExp(exp);
      setFormData({
        organization: exp.organization,
        position: exp.position,
        startDate: exp.startDate,
        endDate: exp.endDate,
        description: exp.description || '',
        technologies: (exp.technologies || []).join(', ')
      });
    } else {
      setEditingExp(null);
      setFormData({
        organization: '',
        position: '',
        startDate: '2023',
        endDate: 'Present',
        description: '',
        technologies: ''
      });
    }
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean)
    };

    try {
      if (editingExp?._id) {
        await expService.updateExperience(editingExp._id, payload);
      } else {
        await expService.createExperience(payload);
      }
      setShowModal(false);
      fetchExp();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete work experience entry?')) {
      try {
        await expService.deleteExperience(id);
        fetchExp();
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) return <LoadingSpinner message="Fetching work experience records..." />;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-gradient mb-1">Work Experience Management</h2>
          <p className="text-secondary-custom mb-0">Manage work history, positions, timelines, and technology stacks.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn btn-brand">
          <i className="bi bi-plus-lg me-1"></i> Add Experience
        </button>
      </div>

      <div className="glass-card p-4">
        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle bg-transparent mb-0">
            <thead>
              <tr className="border-secondary">
                <th>Position</th>
                <th>Organization</th>
                <th>Period</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {expList.map((item) => (
                <tr key={item._id}>
                  <td className="fw-bold text-primary">{item.position}</td>
                  <td className="text-violet">{item.organization}</td>
                  <td><span className="badge bg-secondary bg-opacity-25 text-cyan font-mono">{item.startDate} - {item.endDate}</span></td>
                  <td className="text-end">
                    <button onClick={() => handleOpenModal(item)} className="btn btn-sm btn-outline-info me-2">
                      <i className="bi bi-pencil-fill"></i>
                    </button>
                    <button onClick={() => handleDelete(item._id!)} className="btn btn-sm btn-outline-danger">
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
                    {editingExp ? 'Edit Work Experience' : 'Add Work Experience'}
                  </h5>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body p-4">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label text-secondary-custom small">Position / Title *</label>
                      <input 
                        type="text" 
                        className="form-control bg-dark text-primary border-secondary" 
                        value={formData.position} 
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })} 
                        required 
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-secondary-custom small">Organization / Company *</label>
                      <input 
                        type="text" 
                        className="form-control bg-dark text-primary border-secondary" 
                        value={formData.organization} 
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })} 
                        required 
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label text-secondary-custom small">Start Date *</label>
                      <input 
                        type="text" 
                        className="form-control bg-dark text-primary border-secondary font-mono" 
                        value={formData.startDate} 
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} 
                        required 
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label text-secondary-custom small">End Date *</label>
                      <input 
                        type="text" 
                        className="form-control bg-dark text-primary border-secondary font-mono" 
                        value={formData.endDate} 
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} 
                        required 
                      />
                    </div>

                    <div className="col-md-12">
                      <label className="form-label text-secondary-custom small">Technologies (Comma separated)</label>
                      <input 
                        type="text" 
                        className="form-control bg-dark text-primary border-secondary" 
                        value={formData.technologies} 
                        onChange={(e) => setFormData({ ...formData, technologies: e.target.value })} 
                      />
                    </div>

                    <div className="col-md-12">
                      <label className="form-label text-secondary-custom small">Description</label>
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
                  <button type="submit" className="btn btn-brand">Save Entry</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
