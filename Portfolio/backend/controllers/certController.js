const Certification = require('../models/Certification');

const getCertifications = async (req, res) => {
  try {
    const certs = await Certification.find().sort({ date: -1 });
    res.json({ success: true, message: 'Certifications retrieved successfully', data: certs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, error: 'SERVER_ERROR' });
  }
};

const createCertification = async (req, res) => {
  try {
    const item = await Certification.create(req.body);
    res.status(201).json({ success: true, message: 'Certification created successfully', data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, error: 'SERVER_ERROR' });
  }
};

const updateCertification = async (req, res) => {
  try {
    const item = await Certification.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ success: false, message: 'Certification not found', error: 'NOT_FOUND' });
    res.json({ success: true, message: 'Certification updated successfully', data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, error: 'SERVER_ERROR' });
  }
};

const deleteCertification = async (req, res) => {
  try {
    const item = await Certification.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Certification not found', error: 'NOT_FOUND' });
    res.json({ success: true, message: 'Certification deleted successfully', data: { id: req.params.id } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, error: 'SERVER_ERROR' });
  }
};

module.exports = { getCertifications, createCertification, updateCertification, deleteCertification };
