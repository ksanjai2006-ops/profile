import React from 'react';
import { Skill } from '../types';

interface SkillCardProps {
  skill: Skill;
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  return (
    <div className="glass-card p-4 h-100 d-flex flex-column justify-content-between">
      <div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="rounded-3 p-3 bg-warm-vanilla text-warm-terracotta fs-4 border border-secondary border-opacity-25">
            <i className={`bi ${skill.icon || 'bi-code-slash'}`}></i>
          </div>
          <span className="badge bg-warm-coral text-white font-mono extra-small">
            {skill.category}
          </span>
        </div>

        <h5 className="fw-bold text-warm-dark mb-1">{skill.name}</h5>
        {skill.description && (
          <p className="text-secondary-custom extra-small mb-3">{skill.description}</p>
        )}
      </div>

      <div>
        <div className="d-flex justify-content-between align-items-center mb-1">
          <span className="extra-small text-secondary-custom font-mono">Proficiency</span>
          <span className="extra-small text-warm-terracotta fw-bold font-mono">{skill.proficiency}%</span>
        </div>
        <div className="progress bg-light" style={{ height: '6px' }}>
          <div 
            className="progress-bar bg-warm-terracotta" 
            style={{ width: `${skill.proficiency}%` }} 
            role="progressbar" 
            aria-valuenow={skill.proficiency} 
            aria-valuemin={0} 
            aria-valuemax={100}
          ></div>
        </div>
      </div>
    </div>
  );
};
