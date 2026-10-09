import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { projectService } from '../../services/projectService';
import { skillService } from '../../services/skillService';
import { certService } from '../../services/certService';
import { expService } from '../../services/expService';
import { messageService } from '../../services/messageService';
import { Project, Message } from '../../types';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    certs: 0,
    exp: 0,
    messages: 0,
    unreadMessages: 0
  });

  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [recentMessages, setRecentMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [projRes, skillRes, certRes, expRes, msgRes] = await Promise.all([
          projectService.getProjects(),
          skillService.getSkills(),
          certService.getCertifications(),
          expService.getExperience(),
          messageService.getMessages()
        ]);

        const msgs = msgRes.data || [];
        setStats({
          projects: projRes.data?.length || 0,
          skills: skillRes.data?.length || 0,
          certs: certRes.data?.length || 0,
          exp: expRes.data?.length || 0,
          messages: msgs.length,
          unreadMessages: msgs.filter(m => !m.read).length
        });

        setRecentProjects((projRes.data || []).slice(0, 4));
        setRecentMessages(msgs.slice(0, 4));
      } catch (err) {
        console.error('Error loading admin dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <LoadingSpinner message="Gathering CMS statistics..." />;

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div>
          <h2 className="fw-bold text-gradient mb-1">Dashboard Overview</h2>
          <p className="text-secondary-custom mb-0">System metrics and recent CMS records.</p>
        </div>
        <a href="http://localhost:5000/api-docs" target="_blank" rel="noopener noreferrer" className="btn btn-brand">
          <i className="bi bi-code-slash me-2"></i> Open Swagger OpenAPI Docs
        </a>
      </div>

      {/* Stats Cards Row */}
      <div className="row g-3 mb-5">
        <div className="col-sm-6 col-lg-4">
          <div className="glass-card p-4 d-flex align-items-center justify-content-between">
            <div>
              <span className="text-secondary-custom small font-mono d-block mb-1">TOTAL PROJECTS</span>
              <h3 className="fw-bold text-cyan mb-0">{stats.projects}</h3>
            </div>
            <div className="rounded-3 p-3 bg-cyan bg-opacity-10 text-cyan fs-3">
              <i className="bi bi-folder-fill"></i>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-lg-4">
          <div className="glass-card p-4 d-flex align-items-center justify-content-between">
            <div>
              <span className="text-secondary-custom small font-mono d-block mb-1">TOTAL SKILLS</span>
              <h3 className="fw-bold text-violet mb-0">{stats.skills}</h3>
            </div>
            <div className="rounded-3 p-3 bg-violet bg-opacity-10 text-violet fs-3">
              <i className="bi bi-cpu-fill"></i>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-lg-4">
          <div className="glass-card p-4 d-flex align-items-center justify-content-between">
            <div>
              <span className="text-secondary-custom small font-mono d-block mb-1">CERTIFICATIONS</span>
              <h3 className="fw-bold text-warning mb-0">{stats.certs}</h3>
            </div>
            <div className="rounded-3 p-3 bg-warning bg-opacity-10 text-warning fs-3">
              <i className="bi bi-patch-check-fill"></i>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-lg-4">
          <div className="glass-card p-4 d-flex align-items-center justify-content-between">
            <div>
              <span className="text-secondary-custom small font-mono d-block mb-1">WORK EXPERIENCE</span>
              <h3 className="fw-bold text-success mb-0">{stats.exp}</h3>
            </div>
            <div className="rounded-3 p-3 bg-success bg-opacity-10 text-success fs-3">
              <i className="bi bi-briefcase-fill"></i>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-lg-4">
          <div className="glass-card p-4 d-flex align-items-center justify-content-between">
            <div>
              <span className="text-secondary-custom small font-mono d-block mb-1">TOTAL MESSAGES</span>
              <h3 className="fw-bold text-primary mb-0">{stats.messages}</h3>
            </div>
            <div className="rounded-3 p-3 bg-primary bg-opacity-10 text-primary fs-3">
              <i className="bi bi-chat-left-text-fill"></i>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-lg-4">
          <div className="glass-card p-4 d-flex align-items-center justify-content-between border-danger border-opacity-50">
            <div>
              <span className="text-secondary-custom small font-mono d-block mb-1">UNREAD MESSAGES</span>
              <h3 className="fw-bold text-danger mb-0">{stats.unreadMessages}</h3>
            </div>
            <div className="rounded-3 p-3 bg-danger bg-opacity-10 text-danger fs-3">
              <i className="bi bi-envelope-exclamation-fill"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Section */}
      <div className="row g-4">
        {/* Recent Projects Table */}
        <div className="col-lg-6">
          <div className="glass-card p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold text-primary mb-0"><i className="bi bi-folder me-2"></i> Recent Projects</h5>
              <Link to="/admin/projects" className="btn btn-sm btn-outline-brand">Manage All</Link>
            </div>
            <div className="table-responsive">
              <table className="table table-dark table-hover align-middle bg-transparent text-secondary-custom mb-0">
                <thead>
                  <tr className="border-secondary">
                    <th>Title</th>
                    <th>Category</th>
                    <th>Featured</th>
                  </tr>
                </thead>
                <tbody>
                  {recentProjects.map((p) => (
                    <tr key={p._id}>
                      <td className="fw-semibold text-primary">{p.title}</td>
                      <td><span className="badge bg-secondary bg-opacity-25 text-cyan">{p.category}</span></td>
                      <td>
                        {p.featured ? (
                          <span className="badge bg-warning text-dark">Featured</span>
                        ) : (
                          <span className="text-secondary-custom extra-small">No</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent Messages */}
        <div className="col-lg-6">
          <div className="glass-card p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold text-primary mb-0"><i className="bi bi-chat-left me-2"></i> Recent Inquiries</h5>
              <Link to="/admin/messages" className="btn btn-sm btn-outline-brand">View All</Link>
            </div>
            <div className="d-flex flex-column gap-3">
              {recentMessages.map((m) => (
                <div key={m._id} className="p-3 bg-dark bg-opacity-50 rounded-3 border border-secondary border-opacity-25">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fw-bold text-primary">{m.name}</span>
                    <span className={`badge ${m.read ? 'bg-secondary' : 'bg-danger'}`}>
                      {m.read ? 'Read' : 'Unread'}
                    </span>
                  </div>
                  <div className="text-cyan small fw-semibold mb-1">{m.subject}</div>
                  <div className="text-secondary-custom extra-small text-truncate">{m.message}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
