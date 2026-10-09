const express = require('express');
const router = express.Router();
const { loginAdmin } = require('../controllers/authController');

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Authenticate admin user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthLoginInput'
 *     responses:
 *       200:
 *         description: JWT token generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseSuccess'
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseError'
 */
router.post('/login', loginAdmin);

module.exports = router;
