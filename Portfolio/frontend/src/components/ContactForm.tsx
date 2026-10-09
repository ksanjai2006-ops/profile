import React, { useState } from 'react';
import { messageService } from '../services/messageService';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'danger'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await messageService.sendMessage(formData);
      if (res.success) {
        setStatus({ type: 'success', text: 'Thank you! Your message has been sent successfully.' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ type: 'danger', text: res.message || 'Failed to send message. Please try again.' });
      }
    } catch (err: any) {
      setStatus({ type: 'danger', text: err.response?.data?.message || 'Server error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card p-4 p-md-5 border-warm-terracotta">
      <h3 className="fw-bold text-warm-dark mb-1">Send a Message</h3>
      <p className="text-secondary-custom small mb-4">Fill out the form below to reach Sanjai K directly.</p>

      {status && (
        <div className={`alert alert-${status.type} bg-opacity-25 border-${status.type} mb-4`} role="alert">
          {status.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label text-secondary-custom small">Your Name *</label>
            <input 
              type="text" 
              className="form-control bg-light text-warm-dark border-secondary"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required 
            />
          </div>

          <div className="col-md-6">
            <label className="form-label text-secondary-custom small">Your Email *</label>
            <input 
              type="email" 
              className="form-control bg-light text-warm-dark border-secondary"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required 
            />
          </div>

          <div className="col-md-12">
            <label className="form-label text-secondary-custom small">Subject *</label>
            <input 
              type="text" 
              className="form-control bg-light text-warm-dark border-secondary"
              placeholder="Project Collaboration / Job Opportunity"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required 
            />
          </div>

          <div className="col-md-12">
            <label className="form-label text-secondary-custom small">Message *</label>
            <textarea 
              rows={4} 
              className="form-control bg-light text-warm-dark border-secondary"
              placeholder="Hello Sanjai, I'd like to discuss..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
            ></textarea>
          </div>

          <div className="col-md-12">
            <button type="submit" disabled={loading} className="btn btn-warm-terracotta w-100">
              {loading ? (
                <span><span className="spinner-border spinner-border-sm me-2" role="status"></span> Sending...</span>
              ) : (
                <span><i className="bi bi-send-fill me-2"></i> SEND MESSAGE</span>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
