const express = require('express');
const router = express.Router();
const { getEducation, createEducation, updateEducation, deleteEducation } = require('../controllers/educationController');
const { protect } = require('../middleware/auth');

/**
 * @openapi
 * /api/education:
 *   get:
 *     summary: Retrieve education background
 *     tags: [Education]
 *     responses:
 *       200:
 *         description: Education list
 *   post:
 *     summary: Add education record (Admin)
 *     tags: [Education]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Education'
 *     responses:
 *       201:
 *         description: Education added
 *
 * /api/education/{id}:
 *   put:
 *     summary: Update education record (Admin)
 *     tags: [Education]
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
 *         description: Education updated
 *   delete:
 *     summary: Delete education record (Admin)
 *     tags: [Education]
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
 *         description: Education deleted
 */
router.get('/', getEducation);
router.post('/', protect, createEducation);
router.put('/:id', protect, updateEducation);
router.delete('/:id', protect, deleteEducation);

module.exports = router;
