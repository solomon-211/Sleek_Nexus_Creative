/**
 * Admin Authentication Routes
 * POST /api/admin/login   — admin login
 * POST /api/admin/logout  — clear session
 * GET  /api/admin/verify  — verify current session
 * POST /api/admin/setup   — one-time first-admin creation
 */

const express   = require('express')
const router    = express.Router()
const jwt       = require('jsonwebtoken')
const mongoose  = require('mongoose')
const { body }  = require('express-validator')
const Admin     = require('../models/Admin')
const { protect, restrictTo } = require('../middleware/auth')
const { handleValidationErrors } = require('../middleware/validation')
const { asyncHandler } = require('../middleware/errorHandler')
const { authLimiter } = require('../utils/security')

/* ── Helpers ── */
const signToken = (id, role) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '8h',
  })

const cookieOptions = () => ({
  httpOnly: true,
  secure:   process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
  maxAge:   8 * 60 * 60 * 1000, // 8 hours
})

/* ── POST /login ── */
router.post(
  '/login',
  authLimiter,
  [
    body('email').trim().isEmail().normalizeEmail().withMessage('Valid email required'),
    body('password').notEmpty().withMessage('Password is required'),
    handleValidationErrors,
  ],
  asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const admin = await Admin.findOne({ email }).select('+password')
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password.',
      })
    }

    const token = signToken(admin._id, admin.role)

    /* Set HTTP-only cookie */
    res.cookie('adminToken', token, cookieOptions())

    /* Update last login without triggering full validation */
    Admin.findByIdAndUpdate(admin._id, { lastLogin: new Date() }).exec()

    res.json({
      success: true,
      token,
      data: {
        id:    admin._id,
        name:  admin.name,
        email: admin.email,
        role:  admin.role,
      },
    })
  })
)

/* ── POST /logout ── */
router.post('/logout', (req, res) => {
  res.clearCookie('adminToken', cookieOptions())
  res.json({ success: true, message: 'Logged out successfully.' })
})

/* ── GET /verify — verify active session ── */
router.get(
  '/verify',
  protect,
  restrictTo('admin', 'super_admin', 'viewer'),
  (req, res) => {
    res.json({
      success: true,
      data: {
        id:    req.user._id,
        name:  req.user.name,
        email: req.user.email,
        role:  req.user.role,
      },
    })
  }
)

/* ── POST /setup — one-time first-admin creation ── */
router.post(
  '/setup',
  [
    body('setupKey').notEmpty().withMessage('Setup key is required'),
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').trim().isEmail().normalizeEmail().withMessage('Valid email required'),
    body('password')
      .isLength({ min: 12 })
      .withMessage('Password must be at least 12 characters')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
      .withMessage('Password must contain uppercase, lowercase, number, and special character'),
    handleValidationErrors,
  ],
  asyncHandler(async (req, res) => {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ success: false, error: 'Database not connected.' })
    }

    const { name, email, password, setupKey } = req.body

    if (!process.env.ADMIN_SETUP_KEY || setupKey !== process.env.ADMIN_SETUP_KEY) {
      return res.status(403).json({ success: false, error: 'Invalid setup key.' })
    }

    const existing = await Admin.countDocuments()
    if (existing > 0) {
      return res.status(409).json({
        success: false,
        error: 'An admin account already exists. Use the login endpoint.',
      })
    }

    const admin = await Admin.create({
      name,
      email,
      password,
      role: 'super_admin',
    })

    res.status(201).json({
      success: true,
      message: 'Admin account created. Please log in and change your password immediately.',
      data: { name: admin.name, email: admin.email, role: admin.role },
    })
  })
)

module.exports = router
