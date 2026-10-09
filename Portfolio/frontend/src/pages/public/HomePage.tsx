import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { profileService } from '../../services/profileService';
import { projectService } from '../../services/projectService';
import { skillService } from '../../services/skillService';
import { educationService } from '../../services/educationService';
import { certService } from '../../services/certService';
import { expService } from '../../services/expService';
import { Profile, Project, Skill, Education, Certification, Experience } from '../../types';
import { ProjectCard } from '../../components/ProjectCard';
import { SkillCard } from '../../components/SkillCard';
import { CertificationCard } from '../../components/CertificationCard';
import { EducationTimeline } from '../../components/EducationTimeline';
import { ContactForm } from '../../components/ContactForm';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export const HomePage: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [certs, setCerts] = useState<Certification[]>([]);
  const [exp, setExp] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profRes, projRes, skillRes, eduRes, certRes, expRes] = await Promise.all([
          profileService.getProfile(),
          projectService.getProjects(),
          skillService.getSkills(),
          educationService.getEducation(),
          certService.getCertifications(),
          expService.getExperience()
        ]);

        if (profRes.success) setProfile(profRes.data);
        if (projRes.success) setProjects(projRes.data.filter((p: Project) => p.featured));
        if (skillRes.success) setSkills(skillRes.data);
        if (eduRes.success) setEducation(eduRes.data);
        if (certRes.success) setCerts(certRes.data);
        if (expRes.success) setExp(expRes.data);
      } catch (err) {
        console.error('Error loading homepage data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingSpinner message="Loading Minimal Yet Warm Portfolio..." />;

  return (
    <div className="pb-5">
      {/* Minimal Yet Warm (EXTETA / Gusto) Hero Banner Section */}
      <section className="py-4 py-lg-5">
        <div className="container-fluid max-w-7xl px-3 px-md-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="warm-hero-container mb-5"
          >
            <div className="d-flex flex-column flex-lg-row align-items-stretch">
              
              {/* Main Warm Linen Canvas */}
              <div className="warm-canvas flex-grow-1 position-relative">
                
                {/* Radial Compass / Dial Ring Artwork */}
                <div className="radial-dial-wrapper">
                  <div className="radial-dial-inner"></div>
                </div>

                {/* Top Minimal Pill Navigation Bar */}
                <div className="d-flex justify-content-between align-items-center position-relative z-1 mb-4">
                  <div className="d-flex gap-2">
                    <Link to="/about" className="btn btn-warm-pill-outline btn-sm extra-small font-mono uppercase">ABOUT US</Link>
                    <Link to="/contact" className="btn btn-warm-pill-outline btn-sm extra-small font-mono uppercase">CONTACTS</Link>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <span className="badge bg-warm-terracotta text-white font-mono px-2 py-1">19</span>
                    <span className="fw-bold text-warm-dark font-mono extra-small tracking-wider">SANJAI K / EXTETA EDITION</span>
                  </div>
                </div>

                {/* Main Hero Headline Typography */}
                <div className="position-relative z-1 my-auto py-5 text-center">
                  <div className="text-warm-terracotta font-serif fs-2 fw-normal opacity-75 mb-1" style={{ letterSpacing: '4px' }}>
                    1964
                  </div>
                  <h1 className="display-1 fw-extrabold text-warm-dark text-uppercase tracking-wider mb-2 font-sans" style={{ letterSpacing: '6px' }}>
                    {profile?.name || 'SANJAI K'}
                  </h1>
                  <div className="extra-small font-mono text-warm-taupe uppercase tracking-widest mb-4">
                    {profile?.title ? profile.title.toUpperCase() : 'LOCUS SOLUS, GAE AULENTI 1964 / BY EXTETA'}
                  </div>

                  <p className="lead text-secondary-custom max-w-lg mx-auto mb-4 opacity-90 fs-6">
                    {profile?.bio || 'Eggshell white, dark vanilla, and taupe gray with jelly bean terracotta red highlights come together in this minimalist yet warm and inviting full-stack developer portfolio.'}
                  </p>

                  <div className="d-flex justify-content-center align-items-center gap-3">
                    <Link to="/projects" className="btn btn-warm-terracotta">
                      EXPLORE PROJECTS <span className="ms-2 fs-5">→</span>
                    </Link>
                    <a href="#contact-section" className="btn btn-warm-coral">
                      GET IN TOUCH
                    </a>
                  </div>
                </div>

                {/* Bottom Minimal Footer Strip */}
                <div className="d-flex justify-content-between align-items-center position-relative z-1 pt-3 border-top border-secondary border-opacity-25 mt-3 extra-small font-mono text-warm-taupe">
                  <span>This website uses <u className="text-warm-dark cursor-pointer">cookies</u></span>
                  <div className="d-flex gap-3">
                    <span className="text-warm-terracotta fw-bold">FACEBOOK</span>
                    <span>•</span>
                    <span className="text-warm-coral fw-bold">IT / EN</span>
                  </div>
                </div>
              </div>

              {/* Color Code Block Strip (Right Side: #EAE7DC, #D8C3A5, #8E8D8A, #E98074, #E85A4F) */}
              <div className="warm-palette-strip">
                <div className="warm-color-block bg-warm-eggshell">#EAE7DC</div>
                <div className="warm-color-block bg-warm-vanilla">#D8C3A5</div>
                <div className="warm-color-block bg-warm-taupe">#8E8D8A</div>
                <div className="warm-color-block bg-warm-coral">#E98074</div>
                <div className="warm-color-block bg-warm-terracotta">#E85A4F</div>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-5 bg-surface bg-opacity-25">
        <div className="container-fluid max-w-7xl px-3 px-md-4">
          <div className="d-flex flex-wrap justify-content-between align-items-end mb-4 gap-3">
            <div>
              <span className="badge bg-warm-terracotta text-white uppercase font-mono px-3 py-2 me-2">CURATED WORKS</span>
              <h2 className="display-5 fw-bold text-warm-dark mt-2 mb-0">Featured Projects</h2>
            </div>
            <Link to="/projects" className="btn btn-warm-pill-outline btn-sm">
              View All Projects ({projects.length}) <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>

          <div className="row g-4">
            {projects.slice(0, 3).map((project) => (
              <div key={project._id} className="col-md-6 col-lg-4">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Matrix Section */}
      <section className="py-5">
        <div className="container-fluid max-w-7xl px-3 px-md-4">
          <div className="text-center max-w-lg mx-auto mb-5">
            <span className="badge bg-warm-coral text-white uppercase font-mono px-3 py-2 mb-2">TECHNICAL KNOWLEDGE</span>
            <h2 className="display-5 fw-bold text-warm-dark mb-2">Skills & Expertise</h2>
            <p className="text-secondary-custom">Eggshell white and taupe gray minimal design showcasing full-stack React, Express, and MongoDB skills.</p>
          </div>

          <div className="row g-4">
            {skills.map((skill) => (
              <div key={skill._id} className="col-md-6 col-lg-3">
                <SkillCard skill={skill} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      {certs.length > 0 && (
        <section className="py-5 bg-surface bg-opacity-25">
          <div className="container-fluid max-w-7xl px-3 px-md-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <span className="badge bg-warm-taupe text-white uppercase font-mono px-3 py-2 me-2">ACCREDITATION</span>
                <h2 className="display-5 fw-bold text-warm-dark mt-2 mb-0">Certifications</h2>
              </div>
            </div>

            <div className="row g-4">
              {certs.map((cert) => (
                <div key={cert._id} className="col-md-6 col-lg-4">
                  <CertificationCard cert={cert} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Education & Experience Section */}
      <section className="py-5">
        <div className="container-fluid max-w-7xl px-3 px-md-4">
          <div className="row g-5">
            <div className="col-lg-6">
              <div className="d-flex align-items-center gap-2 mb-4">
                <i className="bi bi-mortarboard-fill text-warm-terracotta fs-3"></i>
                <h3 className="fw-bold mb-0 text-warm-dark">Education Journey</h3>
              </div>
              <EducationTimeline educationList={education} />
            </div>

            <div className="col-lg-6">
              <div className="d-flex align-items-center gap-2 mb-4">
                <i className="bi bi-briefcase-fill text-warm-coral fs-3"></i>
                <h3 className="fw-bold mb-0 text-warm-dark">Work Experience</h3>
              </div>
              <div className="d-flex flex-column gap-3">
                {exp.map((item) => (
                  <div key={item._id} className="glass-card p-4">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <h5 className="fw-bold text-warm-dark mb-0">{item.position}</h5>
                        <span className="text-warm-terracotta fw-semibold small">{item.organization}</span>
                      </div>
                      <span className="badge bg-warm-vanilla text-warm-dark border border-secondary font-mono">{item.startDate} - {item.endDate}</span>
                    </div>
                    {item.description && <p className="text-secondary-custom small mb-3">{item.description}</p>}
                    <div className="d-flex flex-wrap gap-1">
                      {item.technologies?.map((tech, idx) => (
                        <span key={idx} className="badge bg-light text-warm-terracotta border border-secondary extra-small font-mono">{tech}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-5 bg-surface bg-opacity-25" id="contact-section">
        <div className="container-fluid max-w-7xl px-3 px-md-4">
          <div className="row align-items-center g-5">
            <div className="col-lg-5">
              <span className="badge bg-warm-terracotta text-white uppercase font-mono px-3 py-2 mb-3">GET IN TOUCH</span>
              <h2 className="display-4 fw-bold text-warm-dark mb-3">Let's Connect & Collaborate</h2>
              <p className="text-secondary-custom mb-4">
                Interested in working together, hiring for software development roles, or discussing full-stack projects? Drop a message!
              </p>

              <div className="d-flex flex-column gap-3">
                {profile?.email && (
                  <div className="d-flex align-items-center gap-3">
                    <div className="rounded-3 p-3 bg-warm-terracotta text-white fs-4"><i className="bi bi-envelope-at-fill"></i></div>
                    <div>
                      <div className="extra-small text-warm-taupe text-uppercase">Email</div>
                      <a href={`mailto:${profile.email}`} className="fw-bold text-warm-dark text-decoration-none">{profile.email}</a>
                    </div>
                  </div>
                )}
                {profile?.location && (
                  <div className="d-flex align-items-center gap-3">
                    <div className="rounded-3 p-3 bg-warm-coral text-white fs-4"><i className="bi bi-geo-alt-fill"></i></div>
                    <div>
                      <div className="extra-small text-warm-taupe text-uppercase">Location</div>
                      <div className="fw-bold text-warm-dark">{profile.location}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="col-lg-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
