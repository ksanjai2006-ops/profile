const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');
const { protect } = require('../middleware/auth');

/**
 * @openapi
 * /api/projects:
 *   get:
 *     summary: Retrieve all projects
 *     tags: [Projects]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by project category
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by title, description or technology
 *       - in: query
 *         name: featured
 *         schema:
 *           type: boolean
 *         description: Filter featured projects
 *     responses:
 *       200:
 *         description: List of projects
 *   post:
 *     summary: Create a new project (Admin)
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       201:
 *         description: Project created
 *
 * /api/projects/{slug}:
 *   get:
 *     summary: Get single project by slug
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project details
 *       404:
 *         description: Project not found
 *
 * /api/projects/{id}:
 *   put:
 *     summary: Update project by ID (Admin)
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       200:
 *         description: Project updated
 *   delete:
 *     summary: Delete project by ID (Admin)
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project deleted
 */
router.get('/', getProjects);
router.get('/:slug', getProjectBySlug);
router.post('/', protect, createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;
