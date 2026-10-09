import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectService } from '../../services/projectService';
import { Project } from '../../types';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      if (!slug) return;
      try {
        const res = await projectService.getProjectBySlug(slug);
        if (res.success) {
          setProject(res.data);
        } else {
          setError(res.message || 'Project not found');
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Error loading project details');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  if (loading) return <LoadingSpinner message="Fetching project details..." />;

  if (error || !project) {
    return (
      <div className="container py-5 mt-5">
        <div className="alert alert-danger p-4 text-center">
          <i className="bi bi-exclamation-triangle-fill fs-2 d-block mb-2"></i>
          <h4>Project Not Found</h4>
          <p>{error || "The project you are looking for doesn't exist."}</p>
          <Link to="/projects" className="btn btn-brand mt-3">
            Back to All Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5 mt-5">
      {/* Breadcrumb Navigation */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb font-mono small">
          <li className="breadcrumb-item"><Link to="/" className="text-secondary-custom">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/projects" className="text-secondary-custom">Projects</Link></li>
          <li className="breadcrumb-item active text-cyan" aria-current="page">{project.title}</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div>
          <span className="badge bg-secondary bg-opacity-25 text-cyan font-mono px-3 py-2 mb-2">
            {project.category}
          </span>
          <h1 className="display-5 fw-extrabold text-gradient mb-0">{project.title}</h1>
        </div>

        <div className="d-flex gap-2">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-secondary">
              <i className="bi bi-github me-1"></i> GitHub Repo
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-brand">
              <i className="bi bi-box-arrow-up-right me-1"></i> Live Demo
            </a>
          )}
        </div>
      </div>

      {/* Main Image */}
      {project.image && (
        <div className="mb-5 rounded-4 overflow-hidden shadow-lg border border-secondary">
          <img src={project.image} alt={project.title} className="w-100 object-fit-cover" style={{ maxHeight: '480px' }} />
        </div>
      )}

      {/* Content Grid */}
      <div className="row gy-4">
        <div className="col-lg-8">
          <div className="glass-card p-4 p-md-5 mb-4">
            <h4 className="fw-bold text-violet mb-3">Project Description</h4>
            <p className="lead text-secondary-custom">{project.description}</p>

            {project.problem && (
              <div className="mt-4 pt-4 border-top border-secondary border-opacity-25">
                <h5 className="fw-bold text-danger mb-2">
                  <i className="bi bi-exclamation-circle me-2"></i> The Problem
                </h5>
                <p className="text-secondary-custom mb-0">{project.problem}</p>
              </div>
            )}

            {project.solution && (
              <div className="mt-4 pt-4 border-top border-secondary border-opacity-25">
                <h5 className="fw-bold text-success mb-2">
                  <i className="bi bi-check-circle me-2"></i> The Solution
                </h5>
                <p className="text-secondary-custom mb-0">{project.solution}</p>
              </div>
            )}
          </div>

          {project.features && project.features.length > 0 && (
            <div className="glass-card p-4 p-md-5">
              <h4 className="fw-bold text-cyan mb-4">Key Features</h4>
              <ul className="list-unstyled mb-0">
                {project.features.map((feat, idx) => (
                  <li key={idx} className="d-flex align-items-start mb-3 text-secondary-custom">
                    <i className="bi bi-patch-check-fill text-violet fs-5 me-3 mt-1"></i>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="col-lg-4">
          <div className="glass-card p-4 mb-4">
            <h5 className="fw-bold text-primary mb-3">Technologies Used</h5>
            <div className="d-flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span key={idx} className="badge bg-secondary bg-opacity-25 text-cyan font-mono p-2">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="glass-card p-4 text-center">
            <h5 className="fw-bold text-gradient mb-3">Interested in this project?</h5>
            <p className="text-secondary-custom small mb-4">Feel free to reach out for architectural walkthroughs or code questions.</p>
            <Link to="/contact" className="btn btn-outline-brand w-100">
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
