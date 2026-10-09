const Project = require('../models/Project');

// @desc    Get all projects (with optional search and category filter)
// @route   GET /api/projects
const getProjects = async (req, res) => {
  try {
    const { category, search, featured } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (featured === 'true') {
      query.featured = true;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { technologies: { $regex: search, $options: 'i' } }
      ];
    }

    const projects = await Project.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      message: 'Projects retrieved successfully',
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: 'SERVER_ERROR'
    });
  }
};

// @desc    Get project by slug
// @route   GET /api/projects/:slug
const getProjectBySlug = async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
        error: 'PROJECT_NOT_FOUND'
      });
    }

    res.json({
      success: true,
      message: 'Project retrieved successfully',
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: 'SERVER_ERROR'
    });
  }
};

// @desc    Create project
// @route   POST /api/projects
const createProject = async (req, res) => {
  try {
    const { title, description, slug } = req.body;
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title and description are required',
        error: 'INVALID_INPUT'
      });
    }

    const projectSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const project = await Project.create({
      ...req.body,
      slug: projectSlug
    });

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: 'SERVER_ERROR'
    });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
        error: 'PROJECT_NOT_FOUND'
      });
    }

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: 'SERVER_ERROR'
    });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
        error: 'PROJECT_NOT_FOUND'
      });
    }

    res.json({
      success: true,
      message: 'Project deleted successfully',
      data: { id: req.params.id }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: 'SERVER_ERROR'
    });
  }
};

module.exports = {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject
};
