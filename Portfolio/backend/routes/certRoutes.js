const express = require('express');
const router = express.Router();
const { getCertifications, createCertification, updateCertification, deleteCertification } = require('../controllers/certController');
const { protect } = require('../middleware/auth');

/**
 * @openapi
 * /api/certifications:
 *   get:
 *     summary: Get all certifications
 *     tags: [Certifications]
 *     responses:
 *       200:
 *         description: List of certifications
 *   post:
 *     summary: Add new certification (Admin)
 *     tags: [Certifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Certification'
 *     responses:
 *       201:
 *         description: Certification added
 *
 * /api/certifications/{id}:
 *   put:
 *     summary: Update certification by ID (Admin)
 *     tags: [Certifications]
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
 *         description: Certification updated
 *   delete:
 *     summary: Delete certification by ID (Admin)
 *     tags: [Certifications]
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
 *         description: Certification deleted
 */
router.get('/', getCertifications);
router.post('/', protect, createCertification);
router.put('/:id', protect, updateCertification);
router.delete('/:id', protect, deleteCertification);

module.exports = router;
