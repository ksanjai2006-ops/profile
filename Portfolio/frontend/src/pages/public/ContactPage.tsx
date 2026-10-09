import React from 'react';
import { ContactForm } from '../../components/ContactForm';

export const ContactPage: React.FC = () => {
  return (
    <div className="container py-5 mt-5">
      <div className="text-center mb-5">
        <span className="badge bg-secondary bg-opacity-25 text-cyan font-mono px-3 py-2 mb-2">Connect</span>
        <h1 className="display-5 fw-bold text-gradient mb-3">Contact Sanjai K</h1>
        <p className="text-secondary-custom">Feel free to send a message regarding projects, collaborations, or inquiries.</p>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};
