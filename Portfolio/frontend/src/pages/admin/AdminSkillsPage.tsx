import React, { useEffect, useState } from 'react';
import { skillService } from '../../services/skillService';
import { Skill } from '../../types';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export const AdminSkillsPage: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Frontend Development',
    icon: 'bi-code-slash',
    description: '',
    proficiency: 85,
    order: 0
  });

  const fetchSkills = async () => {
    try {
      const res = await skillService.getSkills();
      if (res.success) setSkills(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleOpenModal = (skill?: Skill) => {
    if (skill) {
      setEditingSkill(skill);
      setFormData({
        name: skill.name,
        category: skill.category,
        icon: skill.icon || 'bi-code-slash',
        description: skill.description || '',
        proficiency: skill.proficiency || 80,
        order: skill.order || 0
      });
    } else {
      setEditingSkill(null);
      setFormData({
        name: '',
        category: 'Frontend Development',
        icon: 'bi-code-slash',
        description: '',
        proficiency: 85,
        order: skills.length
      });
    }
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingSkill?._id) {
        await skillService.updateSkill(editingSkill._id, formData);
      } else {
        await skillService.createSkill(formData);
      }
      setShowModal(false);
      fetchSkills();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete skill entry?')) {
      try {
        await skillService.deleteSkill(id);
        fetchSkills();
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) return <LoadingSpinner message="Loading skills..." />;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-gradient mb-1">Skills Management</h2>
          <p className="text-secondary-custom mb-0">Manage technical stack categories and proficiency ratings.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn btn-brand">
          <i className="bi bi-plus-lg me-1"></i> Add Skill
        </button>
      </div>

      <div className="glass-card p-4">
        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle bg-transparent mb-0">
            <thead>
              <tr className="border-secondary">
                <th>Skill Name</th>
                <th>Category</th>
                <th>Icon</th>
                <th>Proficiency</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((s) => (
                <tr key={s._id}>
                  <td className="fw-bold text-primary">{s.name}</td>
                  <td><span className="badge bg-secondary bg-opacity-25 text-violet">{s.category}</span></td>
                  <td><i className={`bi ${s.icon} text-cyan fs-5`}></i> <span className="extra-small text-secondary-custom ms-1 font-mono">{s.icon}</span></td>
                  <td>
                    <div className="d-flex align-items-center gap-2" style={{ maxWidth: '160px' }}>
                      <div className="progress flex-grow-1 bg-secondary bg-opacity-25" style={{ height: '6px' }}>
                        <div className="progress-bar bg-cyan" style={{ width: `${s.proficiency}%` }}></div>
                      </div>
                      <span className="extra-small font-mono text-cyan">{s.proficiency}%</span>
                    </div>
                  </td>
                  <td className="text-end">
                    <button onClick={() => handleOpenModal(s)} className="btn btn-sm btn-outline-info me-2">
                      <i className="bi bi-pencil-fill"></i>
                    </button>
                    <button onClick={() => handleDelete(s._id!)} className="btn btn-sm btn-outline-danger">
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
                    {editingSkill ? 'Edit Skill' : 'Add New Skill'}
                  </h5>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body p-4">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label text-secondary-custom small">Skill Name *</label>
                      <input 
                        type="text" 
                        className="form-control bg-dark text-primary border-secondary" 
                        value={formData.name} 
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                        required 
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-secondary-custom small">Category *</label>
                      <input 
                        type="text" 
                        className="form-control bg-dark text-primary border-secondary" 
                        placeholder="Frontend Development"
                        value={formData.category} 
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })} 
                        required 
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label text-secondary-custom small">Bootstrap Icon Class</label>
                      <input 
                        type="text" 
                        className="form-control bg-dark text-primary border-secondary font-mono" 
                        placeholder="bi-code-slash" 
                        value={formData.icon} 
                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })} 
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label text-secondary-custom small">Proficiency Percentage ({formData.proficiency}%)</label>
                      <input 
                        type="range" 
                        className="form-range" 
                        min="10" 
                        max="100" 
                        value={formData.proficiency} 
                        onChange={(e) => setFormData({ ...formData, proficiency: Number(e.target.value) })} 
                      />
                    </div>

                    <div className="col-md-12">
                      <label className="form-label text-secondary-custom small">Description</label>
                      <textarea 
                        rows={2} 
                        className="form-control bg-dark text-primary border-secondary" 
                        value={formData.description} 
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="modal-footer border-secondary">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-brand">Save Skill</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
