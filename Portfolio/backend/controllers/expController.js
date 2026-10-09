const Experience = require('../models/Experience');

const getExperience = async (req, res) => {
  try {
    const exp = await Experience.find().sort({ startDate: -1 });
    res.json({ success: true, message: 'Experience records retrieved successfully', data: exp });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, error: 'SERVER_ERROR' });
  }
};

const createExperience = async (req, res) => {
  try {
    const item = await Experience.create(req.body);
    res.status(201).json({ success: true, message: 'Experience record created', data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, error: 'SERVER_ERROR' });
  }
};

const updateExperience = async (req, res) => {
  try {
    const item = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ success: false, message: 'Experience not found', error: 'NOT_FOUND' });
    res.json({ success: true, message: 'Experience record updated', data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, error: 'SERVER_ERROR' });
  }
};

const deleteExperience = async (req, res) => {
  try {
    const item = await Experience.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Experience not found', error: 'NOT_FOUND' });
    res.json({ success: true, message: 'Experience record deleted', data: { id: req.params.id } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, error: 'SERVER_ERROR' });
  }
};

module.exports = { getExperience, createExperience, updateExperience, deleteExperience };
