const Profile = require('../models/Profile');

// @desc    Get profile details
// @route   GET /api/profile
const getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({});
    }
    res.json({
      success: true,
      message: 'Profile retrieved successfully',
      data: profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: 'SERVER_ERROR'
    });
  }
};

// @desc    Update profile details
// @route   PUT /api/profile
const updateProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile(req.body);
    } else {
      Object.assign(profile, req.body);
    }
    await profile.save();
    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: 'SERVER_ERROR'
    });
  }
};

module.exports = { getProfile, updateProfile };
