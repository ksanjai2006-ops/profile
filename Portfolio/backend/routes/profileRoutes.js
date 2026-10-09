const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/profileController');
const { protect } = require('../middleware/auth');

/**
 * @openapi
 * /api/profile:
 *   get:
 *     summary: Retrieve developer profile information
 *     tags: [Profile]
 *     responses:
 *       200:
 *         description: Profile data retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *   put:
 *     summary: Update profile details (Admin)
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Profile'
 *     responses:
 *       200:
 *         description: Profile updated
 *       401:
 *         description: Unauthorized
 */
router.get('/', getProfile);
router.put('/', protect, updateProfile);

module.exports = router;
