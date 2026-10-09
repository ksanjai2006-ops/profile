const express = require('express');
const router = express.Router();
const { getExperience, createExperience, updateExperience, deleteExperience } = require('../controllers/expController');
const { protect } = require('../middleware/auth');

/**
 * @openapi
 * /api/experience:
 *   get:
 *     summary: Retrieve work experience
 *     tags: [Experience]
 *     responses:
 *       200:
 *         description: Experience list
 *   post:
 *     summary: Add work experience (Admin)
 *     tags: [Experience]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Experience'
 *     responses:
 *       201:
 *         description: Experience added
 *
 * /api/experience/{id}:
 *   put:
 *     summary: Update work experience (Admin)
 *     tags: [Experience]
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
 *         description: Experience updated
 *   delete:
 *     summary: Delete work experience (Admin)
 *     tags: [Experience]
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
 *         description: Experience deleted
 */
router.get('/', getExperience);
router.post('/', protect, createExperience);
router.put('/:id', protect, updateExperience);
router.delete('/:id', protect, deleteExperience);

module.exports = router;
