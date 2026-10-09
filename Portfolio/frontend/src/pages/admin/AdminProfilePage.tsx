import React, { useEffect, useState } from 'react';
import { profileService } from '../../services/profileService';
import { Profile } from '../../types';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export const AdminProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<Profile>({
    name: '',
    title: '',
    bio: '',
    about: '',
    profileImage: '',
    resume: '',
    email: '',
    location: '',
    socialLinks: { github: '', linkedin: '', instagram: '' }
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await profileService.getProfile();
        if (res.success && res.data) {
          setProfile(res.data);
        }
      } catch (err) {
        console.error('Failed to load profile:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('social_')) {
      const field = name.replace('social_', '');
      setProfile({
        ...profile,
        socialLinks: { ...profile.socialLinks, [field]: value }
      });
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setAlert(null);

    try {
      const res = await profileService.updateProfile(profile);
      if (res.success) {
        setAlert({ type: 'success', msg: 'Profile updated in MongoDB! Public portfolio will auto-reflect changes.' });
        if (res.data) setProfile(res.data);
      } else {
        setAlert({ type: 'error', msg: res.message || 'Update failed.' });
      }
    } catch (err: any) {
      setAlert({ type: 'error', msg: err.response?.data?.message || 'Server error.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner message="Fetching profile from database..." />;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-gradient mb-1">Profile Management</h2>
          <p className="text-secondary-custom mb-0">Updates here immediately sync to public portfolio views.</p>
        </div>
      </div>

      {alert && (
        <div className={`alert ${alert.type === 'success' ? 'alert-success' : 'alert-danger'} alert-dismissible fade show border-0 mb-4`} role="alert">
          <i className={`bi ${alert.type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'} me-2`}></i>
          {alert.msg}
          <button type="button" className="btn-close" onClick={() => setAlert(null)}></button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="glass-card p-4 p-md-5">
        <h5 className="fw-bold text-cyan mb-4"><i className="bi bi-person-fill me-2"></i> Basic Information</h5>

        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <label className="form-label text-secondary-custom small fw-semibold">Full Name</label>
            <input 
              type="text" 
              name="name" 
              className="form-control bg-dark bg-opacity-50 text-primary border-secondary" 
              value={profile.name} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="col-md-6">
            <label className="form-label text-secondary-custom small fw-semibold">Email Address</label>
            <input 
              type="email" 
              name="email" 
              className="form-control bg-dark bg-opacity-50 text-primary border-secondary" 
              value={profile.email} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="col-md-12">
            <label className="form-label text-secondary-custom small fw-semibold">Professional Headline / Subtitle</label>
            <input 
              type="text" 
              name="title" 
              className="form-control bg-dark bg-opacity-50 text-primary border-secondary" 
              value={profile.title} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="col-md-6">
            <label className="form-label text-secondary-custom small fw-semibold">Profile Image URL</label>
            <input 
              type="text" 
              name="profileImage" 
              className="form-control bg-dark bg-opacity-50 text-primary border-secondary" 
              value={profile.profileImage} 
              onChange={handleChange} 
            />
          </div>

          <div className="col-md-6">
            <label className="form-label text-secondary-custom small fw-semibold">Location</label>
            <input 
              type="text" 
              name="location" 
              className="form-control bg-dark bg-opacity-50 text-primary border-secondary" 
              value={profile.location} 
              onChange={handleChange} 
            />
          </div>

          <div className="col-md-12">
            <label className="form-label text-secondary-custom small fw-semibold">Hero Short Bio</label>
            <textarea 
              name="bio" 
              rows={3} 
              className="form-control bg-dark bg-opacity-50 text-primary border-secondary" 
              value={profile.bio} 
              onChange={handleChange} 
              required
            ></textarea>
          </div>

          <div className="col-md-12">
            <label className="form-label text-secondary-custom small fw-semibold">Detailed About Section</label>
            <textarea 
              name="about" 
              rows={4} 
              className="form-control bg-dark bg-opacity-50 text-primary border-secondary" 
              value={profile.about} 
              onChange={handleChange} 
              required
            ></textarea>
          </div>
        </div>

        <h5 className="fw-bold text-violet mb-4 pt-3 border-top border-secondary border-opacity-25"><i className="bi bi-link-45deg me-2"></i> Links & Social Media</h5>

        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <label className="form-label text-secondary-custom small fw-semibold">GitHub Profile URL</label>
            <input 
              type="text" 
              name="social_github" 
              className="form-control bg-dark bg-opacity-50 text-primary border-secondary" 
              value={profile.socialLinks?.github || ''} 
              onChange={handleChange} 
            />
          </div>

          <div className="col-md-4">
            <label className="form-label text-secondary-custom small fw-semibold">LinkedIn Profile URL</label>
            <input 
              type="text" 
              name="social_linkedin" 
              className="form-control bg-dark bg-opacity-50 text-primary border-secondary" 
              value={profile.socialLinks?.linkedin || ''} 
              onChange={handleChange} 
            />
          </div>

          <div className="col-md-4">
            <label className="form-label text-secondary-custom small fw-semibold">Instagram URL</label>
            <input 
              type="text" 
              name="social_instagram" 
              className="form-control bg-dark bg-opacity-50 text-primary border-secondary" 
              value={profile.socialLinks?.instagram || ''} 
              onChange={handleChange} 
            />
          </div>

          <div className="col-md-12">
            <label className="form-label text-secondary-custom small fw-semibold">Resume PDF Link</label>
            <input 
              type="text" 
              name="resume" 
              className="form-control bg-dark bg-opacity-50 text-primary border-secondary" 
              value={profile.resume} 
              onChange={handleChange} 
            />
          </div>
        </div>

        <button type="submit" className="btn btn-brand py-2.5 px-4 fw-bold" disabled={saving}>
          {saving ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span> Saving Profile...
            </>
          ) : (
            <>
              Save Profile Changes <i className="bi bi-check2-circle ms-1 fs-5"></i>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
