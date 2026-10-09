const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  organization: { type: String, required: true },
  position: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  description: { type: String, default: '' },
  technologies: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Experience', experienceSchema);
