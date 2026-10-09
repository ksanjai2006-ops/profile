const express = require('express');
const router = express.Router();
const {
  createMessage,
  getMessages,
  markMessageRead,
  deleteMessage
} = require('../controllers/messageController');
const { protect } = require('../middleware/auth');

/**
 * @openapi
 * /api/messages:
 *   post:
 *     summary: Send contact message (Public)
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MessageInput'
 *     responses:
 *       201:
 *         description: Message submitted
 *   get:
 *     summary: Get all contact messages (Admin)
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of messages
 *
 * /api/messages/{id}/read:
 *   put:
 *     summary: Mark message as read (Admin)
 *     tags: [Messages]
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
 *         description: Message updated to read
 *
 * /api/messages/{id}:
 *   delete:
 *     summary: Delete message (Admin)
 *     tags: [Messages]
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
 *         description: Message deleted
 */
router.post('/', createMessage);
router.get('/', protect, getMessages);
router.put('/:id/read', protect, markMessageRead);
router.delete('/:id', protect, deleteMessage);

module.exports = router;
