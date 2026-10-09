const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  organization: { type: String, required: true },
  date: { type: String, required: true },
  credentialId: { type: String, default: '' },
  certificateUrl: { type: String, default: '' },
  image: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Certification', certificationSchema);
