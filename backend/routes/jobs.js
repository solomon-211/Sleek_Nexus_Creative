/**
 * Job Application Routes
 * POST /api/jobs/apply       — public
 * GET  /api/jobs             — admin/editor
 * GET  /api/jobs/:id         — admin/editor
 * PATCH /api/jobs/:id/status — admin/editor
 * DELETE /api/jobs/:id       — admin
 */

const express  = require('express')
const router   = express.Router()
const { body, param } = require('express-validator')
const { JobApplication } = require('../../database/models/index')
const { protect, restrictTo } = require('../middleware/auth')
const { handleValidationErrors } = require('../middleware/validation')
const { asyncHandler } = require('../middleware/errorHandler')

/* ── Validation ── */
const applicationValidation = [
  body('name').trim().notEmpty().withMessage('Full name is required').isLength({ max: 100 }),
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('A valid email address is required'),
  body('phone').optional().trim().isLength({ max: 20 }),
  body('position').trim().notEmpty().withMessage('Position is required').isLength({ max: 200 }),
  body('coverLetter').optional().trim().isLength({ max: 3000 }),
  body('linkedIn').optional().trim().isURL().withMessage('Invalid LinkedIn URL'),
  body('portfolio').optional().trim().isURL().withMessage('Invalid portfolio URL'),
  handleValidationErrors,
]

const statusValidation = [
  body('status')
    .isIn(['received', 'reviewing', 'shortlisted', 'interviewed', 'offered', 'rejected', 'withdrawn'])
    .withMessage('Invalid status value'),
  handleValidationErrors,
]

/* ── POST /apply — public ── */
router.post(
  '/apply',
  applicationValidation,
  asyncHandler(async (req, res) => {
    const { name, email, phone, position, coverLetter, linkedIn, portfolio } = req.body

    const application = await JobApplication.create({
      name,
      email,
      phone,
      position,
      coverLetter,
      linkedIn,
      portfolio,
      status: 'received',
    })

    res.status(201).json({
      success: true,
      message: 'Your application has been received. We will be in touch within 5 business days.',
      id: application._id,
    })
  })
)

/* ── GET / — admin/editor: list all applications ── */
router.get(
  '/',
  protect,
  restrictTo('admin', 'editor'),
  asyncHandler(async (req, res) => {
    const { status, page = 1, limit = 20, search } = req.query
    const parsedPage  = Math.max(1, parseInt(page, 10) || 1)
    const parsedLimit = Math.min(100, Math.max(1, parseInt(limit, 10) || 20))

    const filter = {}
    if (status) filter.status = status
    if (search) {
      filter.$or = [
        { name:     { $regex: search, $options: 'i' } },
        { email:    { $regex: search, $options: 'i' } },
        { position: { $regex: search, $options: 'i' } },
      ]
    }

    const [applications, total] = await Promise.all([
      JobApplication.find(filter)
        .sort({ createdAt: -1 })
        .skip((parsedPage - 1) * parsedLimit)
        .limit(parsedLimit),
      JobApplication.countDocuments(filter),
    ])

    res.json({
      success: true,
      data: applications,
      pagination: {
        total,
        page: parsedPage,
        pages: Math.ceil(total / parsedLimit),
        limit: parsedLimit,
      },
    })
  })
)

/* ── GET /:id — admin/editor: single application ── */
router.get(
  '/:id',
  protect,
  restrictTo('admin', 'editor'),
  param('id').isMongoId().withMessage('Invalid application ID'),
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const application = await JobApplication.findById(req.params.id)
    if (!application) {
      return res.status(404).json({ success: false, error: 'Application not found.' })
    }
    res.json({ success: true, data: application })
  })
)

/* ── PATCH /:id/status — admin/editor ── */
router.patch(
  '/:id/status',
  protect,
  restrictTo('admin', 'editor'),
  param('id').isMongoId().withMessage('Invalid application ID'),
  statusValidation,
  asyncHandler(async (req, res) => {
    const { status, notes, interviewDate } = req.body

    const update = { status }
    if (notes)         update.notes         = notes
    if (interviewDate) update.interviewDate = interviewDate

    const application = await JobApplication.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true, runValidators: true }
    )

    if (!application) {
      return res.status(404).json({ success: false, error: 'Application not found.' })
    }

    res.json({ success: true, data: application })
  })
)

/* ── DELETE /:id — admin only ── */
router.delete(
  '/:id',
  protect,
  restrictTo('admin'),
  param('id').isMongoId().withMessage('Invalid application ID'),
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const application = await JobApplication.findByIdAndDelete(req.params.id)
    if (!application) {
      return res.status(404).json({ success: false, error: 'Application not found.' })
    }
    res.json({ success: true, message: 'Application deleted.' })
  })
)

module.exports = router
