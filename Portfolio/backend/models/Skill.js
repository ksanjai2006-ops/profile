const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  icon: { type: String, default: 'bi-code-slash' },
  description: { type: String, default: '' },
  proficiency: { type: Number, default: 85 },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);
