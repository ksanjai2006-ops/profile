import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="glass-card h-100 d-flex flex-column overflow-hidden border-secondary border-opacity-25">
      {project.image && (
        <div className="position-relative overflow-hidden" style={{ height: '200px' }}>
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-100 h-100 object-fit-cover transition-scale"
          />
          <div className="position-absolute top-0 end-0 p-2">
            <span className="badge bg-warm-vanilla text-warm-dark font-mono extra-small">
              {project.category}
            </span>
          </div>
          {project.featured && (
            <div className="position-absolute top-0 start-0 p-2">
              <span className="badge bg-warm-terracotta text-white font-mono extra-small">
                FEATURED
              </span>
            </div>
          )}
        </div>
      )}

      <div className="p-4 d-flex flex-column flex-grow-1">
        <h4 className="fw-bold text-warm-dark mb-2">{project.title}</h4>
        <p className="text-secondary-custom small line-clamp-2 mb-3 flex-grow-1">
          {project.description}
        </p>

        <div className="d-flex flex-wrap gap-1 mb-4">
          {project.technologies.slice(0, 4).map((tech, idx) => (
            <span key={idx} className="badge bg-light text-warm-terracotta border border-secondary font-mono extra-small">
              {tech}
            </span>
          ))}
        </div>

        <div className="d-flex justify-content-between align-items-center pt-3 border-top border-secondary border-opacity-25">
          <Link to={`/projects/${project.slug}`} className="btn btn-sm btn-warm-terracotta">
            Details <i className="bi bi-arrow-right ms-1"></i>
          </Link>
          <div className="d-flex gap-2">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-secondary text-warm-dark" title="GitHub Source">
                <i className="bi bi-github"></i>
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-danger text-warm-terracotta" title="Live Demo">
                <i className="bi bi-box-arrow-up-right"></i>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
