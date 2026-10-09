import React, { useEffect, useState } from 'react';
import { projectService } from '../../services/projectService';
import { Project } from '../../types';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export const AdminProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    problem: '',
    solution: '',
    features: '',
    image: '',
    technologies: '',
    category: 'Full Stack',
    githubUrl: '',
    liveUrl: '',
    featured: false
  });

  const fetchProjects = async () => {
    try {
      const res = await projectService.getProjects();
      if (res.success) setProjects(res.data);
    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        description: project.description,
        problem: project.problem || '',
        solution: project.solution || '',
        features: (project.features || []).join('\n'),
        image: project.image || '',
        technologies: (project.technologies || []).join(', '),
        category: project.category || 'Full Stack',
        githubUrl: project.githubUrl || '',
        liveUrl: project.liveUrl || '',
        featured: project.featured || false
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: '',
        description: '',
        problem: '',
        solution: '',
        features: '',
        image: '',
        technologies: '',
        category: 'Full Stack',
        githubUrl: '',
        liveUrl: '',
        featured: false
      });
    }
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean),
      features: formData.features.split('\n').map(f => f.trim()).filter(Boolean)
    };

    try {
      if (editingProject?._id) {
        await projectService.updateProject(editingProject._id, payload);
      } else {
        await projectService.createProject(payload);
      }
      setShowModal(false);
      fetchProjects();
    } catch (err) {
      console.error('Error saving project:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectService.deleteProject(id);
        fetchProjects();
      } catch (err) {
        console.error('Error deleting project:', err);
      }
    }
  };

  if (loading) return <LoadingSpinner message="Fetching projects..." />;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-gradient mb-1">Project Management</h2>
          <p className="text-secondary-custom mb-0">Create, edit, or remove portfolio projects.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn btn-brand">
          <i className="bi bi-plus-lg me-1"></i> Add New Project
        </button>
      </div>

      <div className="glass-card p-4">
        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle bg-transparent mb-0">
            <thead>
              <tr className="border-secondary">
                <th>Title</th>
                <th>Category</th>
                <th>Technologies</th>
                <th>Featured</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p._id}>
                  <td className="fw-bold text-primary">{p.title}</td>
                  <td><span className="badge bg-secondary bg-opacity-25 text-cyan">{p.category}</span></td>
                  <td>
                    <div className="d-flex flex-wrap gap-1">
                      {p.technologies.slice(0, 3).map((t, idx) => (
                        <span key={idx} className="badge bg-dark text-secondary-custom extra-small">{t}</span>
                      ))}
                    </div>
                  </td>
                  <td>
                    {p.featured ? (
                      <span className="badge bg-warning text-dark"><i className="bi bi-star-fill me-1"></i>Yes</span>
                    ) : (
                      <span className="text-secondary-custom extra-small">No</span>
                    )}
                  </td>
                  <td className="text-end">
                    <button onClick={() => handleOpenModal(p)} className="btn btn-sm btn-outline-info me-2">
                      <i className="bi bi-pencil-fill"></i>
                    </button>
                    <button onClick={() => handleDelete(p._id!)} className="btn btn-sm btn-outline-danger">
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal fade show d-block backdrop-blur" style={{ backgroundColor: 'rgba(0,0,0,0.75)' }} tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content glass-card text-primary border-secondary">
              <form onSubmit={handleSave}>
                <div className="modal-header border-secondary">
                  <h5 className="modal-title fw-bold text-gradient">
                    {editingProject ? 'Edit Project' : 'Create New Project'}
                  </h5>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body p-4">
                  <div className="row g-3">
                    <div className="col-md-8">
                      <label className="form-label text-secondary-custom small">Project Title *</label>
                      <input 
                        type="text" 
                        className="form-control bg-dark text-primary border-secondary" 
                        value={formData.title} 
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
                        required 
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label text-secondary-custom small">Category *</label>
                      <select 
                        className="form-select bg-dark text-primary border-secondary"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      >
                        <option value="Full Stack">Full Stack</option>
                        <option value="Web Development">Web Development</option>
                        <option value="AI/ML">AI/ML</option>
                        <option value="IoT">IoT</option>
                        <option value="Cloud">Cloud</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="col-md-12">
                      <label className="form-label text-secondary-custom small">Short Description *</label>
                      <textarea 
                        rows={2} 
                        className="form-control bg-dark text-primary border-secondary" 
                        value={formData.description} 
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                        required 
                      ></textarea>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label text-secondary-custom small">Problem Addressed</label>
                      <textarea 
                        rows={2} 
                        className="form-control bg-dark text-primary border-secondary" 
                        value={formData.problem} 
                        onChange={(e) => setFormData({ ...formData, problem: e.target.value })} 
                      ></textarea>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label text-secondary-custom small">Solution Implemented</label>
                      <textarea 
                        rows={2} 
                        className="form-control bg-dark text-primary border-secondary" 
                        value={formData.solution} 
                        onChange={(e) => setFormData({ ...formData, solution: e.target.value })} 
                      ></textarea>
                    </div>

                    <div className="col-md-12">
                      <label className="form-label text-secondary-custom small">Features (One per line)</label>
                      <textarea 
                        rows={3} 
                        className="form-control bg-dark text-primary border-secondary" 
                        value={formData.features} 
                        onChange={(e) => setFormData({ ...formData, features: e.target.value })} 
                      ></textarea>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label text-secondary-custom small">Technologies (Comma separated)</label>
                      <input 
                        type="text" 
                        className="form-control bg-dark text-primary border-secondary" 
                        placeholder="React, Express, MongoDB" 
                        value={formData.technologies} 
                        onChange={(e) => setFormData({ ...formData, technologies: e.target.value })} 
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label text-secondary-custom small">Image URL</label>
                      <input 
                        type="text" 
                        className="form-control bg-dark text-primary border-secondary" 
                        value={formData.image} 
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })} 
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label text-secondary-custom small">GitHub URL</label>
                      <input 
                        type="text" 
                        className="form-control bg-dark text-primary border-secondary" 
                        value={formData.githubUrl} 
                        onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })} 
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label text-secondary-custom small">Live Demo URL</label>
                      <input 
                        type="text" 
                        className="form-control bg-dark text-primary border-secondary" 
                        value={formData.liveUrl} 
                        onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })} 
                      />
                    </div>

                    <div className="col-md-12">
                      <div className="form-check form-switch">
                        <input 
                          className="form-check-input" 
                          type="checkbox" 
                          id="featuredCheck"
                          checked={formData.featured}
                          onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        />
                        <label className="form-check-label text-primary" htmlFor="featuredCheck">
                          Show in Homepage Featured Projects
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-footer border-secondary">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-brand">Save Project</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
