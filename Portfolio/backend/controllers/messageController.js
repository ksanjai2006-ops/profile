const Message = require('../models/Message');

// @desc    Send a message (Public Contact Form)
// @route   POST /api/messages
const createMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields (name, email, subject, message) are required',
        error: 'INVALID_INPUT'
      });
    }

    const newMessage = await Message.create({ name, email, subject, message });

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! Thank you for reaching out.',
      data: newMessage
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, error: 'SERVER_ERROR' });
  }
};

// @desc    Get all messages (Admin)
// @route   GET /api/messages
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      message: 'Messages retrieved successfully',
      data: messages
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, error: 'SERVER_ERROR' });
  }
};

// @desc    Mark message as read (Admin)
// @route   PUT /api/messages/:id/read
const markMessageRead = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    if (!message) return res.status(404).json({ success: false, message: 'Message not found', error: 'NOT_FOUND' });
    res.json({
      success: true,
      message: 'Message marked as read',
      data: message
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, error: 'SERVER_ERROR' });
  }
};

// @desc    Delete message (Admin)
// @route   DELETE /api/messages/:id
const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ success: false, message: 'Message not found', error: 'NOT_FOUND' });
    res.json({
      success: true,
      message: 'Message deleted successfully',
      data: { id: req.params.id }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, error: 'SERVER_ERROR' });
  }
};

module.exports = {
  createMessage,
  getMessages,
  markMessageRead,
  deleteMessage
};
