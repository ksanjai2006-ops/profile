import React, { useEffect, useState } from 'react';
import { projectService } from '../../services/projectService';
import { Project } from '../../types';
import { ProjectCard } from '../../components/ProjectCard';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [category, setCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Full Stack', 'Web Development', 'AI/ML', 'IoT', 'Cloud', 'Other'];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await projectService.getProjects();
        if (res.success) {
          setProjects(res.data);
          setFilteredProjects(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    let result = projects;

    if (category !== 'All') {
      result = result.filter(p => p.category?.toLowerCase() === category.toLowerCase());
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.technologies.some(t => t.toLowerCase().includes(q))
      );
    }

    setFilteredProjects(result);
  }, [category, searchQuery, projects]);

  if (loading) return <LoadingSpinner message="Fetching projects catalog..." />;

  return (
    <div className="container py-5 mt-5">
      <div className="text-center mb-5">
        <span className="badge bg-secondary bg-opacity-25 text-cyan font-mono px-3 py-2 mb-2">Portfolio Directory</span>
        <h1 className="display-5 fw-bold text-gradient mb-3">All Projects</h1>
        <p className="text-secondary-custom">Search and filter dynamic projects from MongoDB.</p>
      </div>

      {/* Controls: Search and Filter Pills */}
      <div className="glass-card p-4 mb-5">
        <div className="row g-3 align-items-center">
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text bg-dark bg-opacity-50 text-secondary border-secondary">
                <i className="bi bi-search"></i>
              </span>
              <input 
                type="text" 
                className="form-control bg-dark bg-opacity-50 text-primary border-secondary" 
                placeholder="Search by title, description or technology..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="btn btn-outline-secondary" onClick={() => setSearchQuery('')}>
                  <i className="bi bi-x"></i>
                </button>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="d-flex flex-wrap gap-2 justify-content-md-end">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-pill ${category === cat ? 'active' : ''}`}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="alert alert-secondary bg-opacity-25 text-center py-5">
          <i className="bi bi-folder-x fs-1 text-secondary d-block mb-3"></i>
          <h5 className="fw-bold">No projects match your filter criteria</h5>
          <p className="text-secondary-custom mb-0">Try clearing your search query or selecting a different category.</p>
        </div>
      ) : (
        <div className="row g-4">
          {filteredProjects.map((project) => (
            <div key={project._id} className="col-md-6 col-lg-4">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
