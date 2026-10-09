const Education = require('../models/Education');

const getEducation = async (req, res) => {
  try {
    const education = await Education.find().sort({ startDate: -1 });
    res.json({ success: true, message: 'Education records retrieved', data: education });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, error: 'SERVER_ERROR' });
  }
};

const createEducation = async (req, res) => {
  try {
    const item = await Education.create(req.body);
    res.status(201).json({ success: true, message: 'Education added successfully', data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, error: 'SERVER_ERROR' });
  }
};

const updateEducation = async (req, res) => {
  try {
    const item = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ success: false, message: 'Education not found', error: 'NOT_FOUND' });
    res.json({ success: true, message: 'Education updated successfully', data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, error: 'SERVER_ERROR' });
  }
};

const deleteEducation = async (req, res) => {
  try {
    const item = await Education.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Education not found', error: 'NOT_FOUND' });
    res.json({ success: true, message: 'Education deleted successfully', data: { id: req.params.id } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, error: 'SERVER_ERROR' });
  }
};

module.exports = { getEducation, createEducation, updateEducation, deleteEducation };
