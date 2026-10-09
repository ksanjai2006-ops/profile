import React from 'react';
import { Education } from '../types';

interface EducationTimelineProps {
  educationList: Education[];
}

export const EducationTimeline: React.FC<EducationTimelineProps> = ({ educationList }) => {
  if (!educationList || educationList.length === 0) {
    return (
      <div className="alert alert-secondary bg-opacity-25 text-center p-4">
        No education records added yet.
      </div>
    );
  }

  return (
    <div className="timeline">
      {educationList.map((edu, idx) => (
        <div key={edu._id || idx} className="timeline-item">
          <div className="timeline-marker"></div>
          <div className="glass-card p-4">
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-2">
              <h5 className="fw-bold text-primary mb-0">{edu.degree}</h5>
              <span className="badge bg-secondary bg-opacity-25 text-cyan font-mono px-3 py-2">
                <i className="bi bi-calendar3 me-1"></i> {edu.startDate} - {edu.endDate}
              </span>
            </div>
            <p className="text-violet fw-semibold mb-2">{edu.institution}</p>
            {edu.description && (
              <p className="text-secondary-custom small mb-0">{edu.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
