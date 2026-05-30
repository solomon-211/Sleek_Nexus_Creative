/**
 * Authentication Routes
 */

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { User } = require('../../database/models/index');
const { protect, adminOnly } = require('../middleware/auth');
const { sendEmail } = require('../config/email');
const { validateLogin } = require('../middleware/validation');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

// Register (admin-only action, no public registration)
router.post('/register', protect, adminOnly, async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await User.create({ name, email, password, role: role || 'viewer' });
    user.password = undefined;

    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Login
router.post('/login',
  validateLogin,
  async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
      }

      const user = await User.findOne({ email }).select('+password');
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      if (user.isActive === false) {
        return res.status(401).json({ error: 'Account deactivated. Contact admin.' });
      }

      // Update last login
      user.lastLogin = new Date();
      await user.save({ validateBeforeSave: false });

      const token = signToken(user._id);
      user.password = undefined;

      res.json({
        success: true,
        token,
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
        },
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

// Get current user
router.get('/me', protect, async (req, res) => {
  res.json({ success: true, data: req.user });
});

// Forgot password
router.post('/forgot-password', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      // Don't reveal if email exists
      return res.json({ success: true, message: 'If that email exists, a reset link was sent.' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save({ validateBeforeSave: false });

    const resetURL = `${process.env.FRONTEND_URL}/reset-password.html?token=${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: 'CodeBridge Bootcamp - Password Reset',
      html: `
        <h2>Password Reset Request</h2>
        <p>Click the link below to reset your password. It expires in 10 minutes.</p>
        <a href="${resetURL}" style="background:#c41e3a;color:white;padding:12px 24px;text-decoration:none;border-radius:4px;">Reset Password</a>
        <p>If you did not request this, please ignore this email.</p>
      `,
    });

    res.json({ success: true, message: 'If that email exists, a reset link was sent.' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Could not send reset email.' });
  }
});

// Reset password
router.patch('/reset-password/:token', async (req, res) => {
  try {
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired token.' });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.passwordChangedAt = new Date();
    await user.save();

    const token = signToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;