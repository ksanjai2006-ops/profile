const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  problem: { type: String, default: '' },
  solution: { type: String, default: '' },
  features: [{ type: String }],
  image: { type: String, default: '' },
  technologies: [{ type: String }],
  category: { type: String, default: 'Full Stack' },
  githubUrl: { type: String, default: '' },
  liveUrl: { type: String, default: '' },
  featured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
