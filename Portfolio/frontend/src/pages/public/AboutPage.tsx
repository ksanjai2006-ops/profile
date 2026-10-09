import React, { useEffect, useState } from 'react';
import { profileService } from '../../services/profileService';
import { projectService } from '../../services/projectService';
import { skillService } from '../../services/skillService';
import { certService } from '../../services/certService';
import { Profile } from '../../types';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export const AboutPage: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [stats, setStats] = useState({ projects: 0, skills: 0, certs: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [pRes, projRes, skillRes, certRes] = await Promise.all([
          profileService.getProfile(),
          projectService.getProjects(),
          skillService.getSkills(),
          certService.getCertifications()
        ]);
        if (pRes.success) setProfile(pRes.data);
        setStats({
          projects: projRes.data?.length || 0,
          skills: skillRes.data?.length || 0,
          certs: certRes.data?.length || 0
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <LoadingSpinner message="Loading About details..." />;

  return (
    <div className="container py-5 mt-5">
      <div className="row gy-5 align-items-center">
        <div className="col-lg-5 text-center">
          <img 
            src={profile?.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600'} 
            alt={profile?.name} 
            className="img-fluid rounded-4 shadow border border-secondary"
            style={{ maxHeight: '420px', objectFit: 'cover' }}
          />
        </div>
        <div className="col-lg-7">
          <span className="badge bg-secondary bg-opacity-25 text-violet font-mono px-3 py-2 mb-2">Biography</span>
          <h1 className="display-5 fw-bold text-gradient mb-3">About {profile?.name}</h1>
          <h5 className="text-cyan mb-4 font-mono">{profile?.title}</h5>
          <p className="lead text-secondary-custom mb-4">{profile?.about}</p>
          <p className="text-secondary-custom mb-4">{profile?.bio}</p>

          <div className="row g-3 text-center mb-4">
            <div className="col-4">
              <div className="glass-card p-3">
                <h3 className="fw-bold text-cyan mb-0">{stats.projects}</h3>
                <span className="small text-secondary-custom">Projects</span>
              </div>
            </div>
            <div className="col-4">
              <div className="glass-card p-3">
                <h3 className="fw-bold text-violet mb-0">{stats.skills}</h3>
                <span className="small text-secondary-custom">Skills</span>
              </div>
            </div>
            <div className="col-4">
              <div className="glass-card p-3">
                <h3 className="fw-bold text-warning mb-0">{stats.certs}</h3>
                <span className="small text-secondary-custom">Certifications</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
