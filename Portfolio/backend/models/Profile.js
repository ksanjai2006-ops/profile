const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true, default: 'Sanjai K' },
  title: { type: String, required: true, default: 'Information Technology Student | Software Developer | Tech Enthusiast' },
  bio: { type: String, required: true, default: 'Aspiring software developer with a passion for building full-stack applications, scalable REST APIs, and dynamic user interfaces.' },
  about: { type: String, required: true, default: 'Currently pursuing Information Technology. Highly driven problem solver experienced in React, Express, Node.js, and MongoDB.' },
  profileImage: { type: String, default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600' },
  resume: { type: String, default: '/Sanjai_K_Resume.pdf' },
  email: { type: String, required: true, default: 'sanjaik@example.com' },
  location: { type: String, default: 'Tamil Nadu, India' },
  socialLinks: {
    github: { type: String, default: 'https://github.com/sanjaik' },
    linkedin: { type: String, default: 'https://linkedin.com/in/sanjaik' },
    instagram: { type: String, default: 'https://instagram.com/sanjaik' }
  }
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
