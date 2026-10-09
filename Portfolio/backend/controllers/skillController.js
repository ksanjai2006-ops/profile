const Skill = require('../models/Skill');

const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ order: 1, createdAt: -1 });
    res.json({
      success: true,
      message: 'Skills retrieved successfully',
      data: skills
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, error: 'SERVER_ERROR' });
  }
};

const createSkill = async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json({ success: true, message: 'Skill created successfully', data: skill });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, error: 'SERVER_ERROR' });
  }
};

const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!skill) return res.status(404).json({ success: false, message: 'Skill not found', error: 'SKILL_NOT_FOUND' });
    res.json({ success: true, message: 'Skill updated successfully', data: skill });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, error: 'SERVER_ERROR' });
  }
};

const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) return res.status(404).json({ success: false, message: 'Skill not found', error: 'SKILL_NOT_FOUND' });
    res.json({ success: true, message: 'Skill deleted successfully', data: { id: req.params.id } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, error: 'SERVER_ERROR' });
  }
};

module.exports = { getSkills, createSkill, updateSkill, deleteSkill };
