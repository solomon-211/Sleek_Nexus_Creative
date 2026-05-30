/**
 * Projects Routes
 * GET  /api/projects        — public
 * GET  /api/projects/:slug  — public
 * POST /api/projects        — admin/editor
 * PUT  /api/projects/:id    — admin/editor
 * DELETE /api/projects/:id  — admin
 */

const express  = require('express')
const router   = express.Router()
const { body, param, query } = require('express-validator')
const { Project } = require('../../database/models/index')
const { protect, restrictTo } = require('../middleware/auth')
const { handleValidationErrors } = require('../middleware/validation')
const { asyncHandler } = require('../middleware/errorHandler')

/* ── Validation ── */
const projectValidation = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 200 }),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('category')
    .isIn(['web', 'mobile', 'training', 'infrastructure', 'consulting'])
    .withMessage('Invalid category'),
  body('status')
    .optional()
    .isIn(['ongoing', 'completed', 'planned'])
    .withMessage('Invalid status'),
  handleValidationErrors,
]

/* ── GET / — public list ── */
router.get(
  '/',
  [
    query('category').optional().isIn(['web', 'mobile', 'training', 'infrastructure', 'consulting', 'all']),
    query('featured').optional().isBoolean(),
    query('status').optional().isIn(['ongoing', 'completed', 'planned']),
    query('page').optional().isInt({ min: 1 }).toInt(),
    query('limit').optional().isInt({ min: 1, max: 50 }).toInt(),
    handleValidationErrors,
  ],
  asyncHandler(async (req, res) => {
    const { category, featured, status = 'completed' } = req.query
    const page  = req.query.page  || 1
    const limit = req.query.limit || 12
    const skip  = (page - 1) * limit

    const filter = {}
    if (status && status !== 'all') filter.status = status
    if (category && category !== 'all') filter.category = category
    if (featured === 'true') filter.featured = true

    const [projects, total] = await Promise.all([
      Project.find(filter)
        .sort({ featured: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Project.countDocuments(filter),
    ])

    res.json({
      success: true,
      data: projects,
      pagination: { total, page, pages: Math.ceil(total / limit), limit },
    })
  })
)

/* ── GET /:slug — public single ── */
router.get(
  '/:slug',
  param('slug').trim().notEmpty(),
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    /* Support both slug and MongoDB ObjectId */
    const isId = /^[a-f\d]{24}$/i.test(req.params.slug)
    const project = isId
      ? await Project.findById(req.params.slug)
      : await Project.findOne({ slug: req.params.slug })

    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found.' })
    }

    res.json({ success: true, data: project })
  })
)

/* ── POST / — admin/editor ── */
router.post(
  '/',
  protect,
  restrictTo('admin', 'editor'),
  projectValidation,
  asyncHandler(async (req, res) => {
    const project = await Project.create(req.body)
    res.status(201).json({ success: true, data: project })
  })
)

/* ── PUT /:id — admin/editor ── */
router.put(
  '/:id',
  protect,
  restrictTo('admin', 'editor'),
  param('id').isMongoId().withMessage('Invalid project ID'),
  projectValidation,
  asyncHandler(async (req, res) => {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found.' })
    }
    res.json({ success: true, data: project })
  })
)

/* ── DELETE /:id — admin only ── */
router.delete(
  '/:id',
  protect,
  restrictTo('admin'),
  param('id').isMongoId().withMessage('Invalid project ID'),
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const project = await Project.findByIdAndDelete(req.params.id)
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found.' })
    }
    res.json({ success: true, message: 'Project deleted successfully.' })
  })
)

module.exports = router
