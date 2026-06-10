'use strict';

/**
 * Alumni Routes — SNC Member Directory
 *
 * Public:
 *   GET  /api/alumni          — list approved public members (paginated)
 *   GET  /api/alumni/search   — instant fuzzy search (debounced on client)
 *   POST /api/alumni/register — submit a new alumni registration
 *
 * Admin (protected):
 *   GET    /api/alumni/admin        — all members including unapproved
 *   PATCH  /api/alumni/:id/approve  — approve a pending member
 *   DELETE /api/alumni/:id          — soft-delete a member
 *   PATCH  /api/alumni/:id/restore  — restore a soft-deleted member
 */

const express   = require('express');
const router    = express.Router();
const { body, query } = require('express-validator');
const Alumni    = require('../models/Alumni');
const { protect, restrictTo } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validation');
const { asyncHandler } = require('../middleware/errorHandler');

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Build a case-insensitive regex from a search term for a single field */
function fuzzyRegex(term) {
  // Escape special regex chars, then allow any chars between each letter
  // e.g. "jon" matches "John", "Jonathan", "Joanie"
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(escaped, 'i');
}

/** Highlight matched substring in a string */
// (used server-side only for the search snippet — frontend also highlights)
function highlight(text, term) {
  if (!text || !term) return text;
  const re = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(re, '<mark>$1</mark>');
}

// ── Validation schemas ────────────────────────────────────────────────────────

const registerValidation = [
  body('firstName').trim().notEmpty().withMessage('First name is required').isLength({ max: 60 }),
  body('lastName').trim().notEmpty().withMessage('Last name is required').isLength({ max: 60 }),
  body('email').trim().isEmail().normalizeEmail().withMessage('Valid email required'),
  body('phone').optional().trim().isLength({ max: 25 }),
  body('graduationYear').optional().isInt({ min: 2019, max: new Date().getFullYear() + 1 }),
  body('course').optional().trim().isLength({ max: 120 }),
  body('currentRole').optional().trim().isLength({ max: 120 }),
  body('company').optional().trim().isLength({ max: 120 }),
  body('location').optional().trim().isLength({ max: 120 }),
  body('bio').optional().trim().isLength({ max: 500 }),
  body('skills').optional().isArray({ max: 15 }),
  body('linkedin').optional().trim().isURL().isLength({ max: 200 }),
  body('github').optional().trim().isURL().isLength({ max: 200 }),
  body('portfolio').optional().trim().isURL().isLength({ max: 200 }),
  body('isPublic').optional().isBoolean(),
  handleValidationErrors,
];

const searchValidation = [
  query('q').trim().isLength({ min: 1, max: 100 }).withMessage('Search query required (1–100 chars)'),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 }),
  handleValidationErrors,
];

// ── Public routes ─────────────────────────────────────────────────────────────

/**
 * GET /api/alumni
 * List all approved, public, non-deleted members.
 * Paginated — default 12 per page.
 */
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const page  = Math.max(1, parseInt(req.query.page)  || 1);
    const limit = Math.min(50, parseInt(req.query.limit) || 12);
    const skip  = (page - 1) * limit;

    const filter = { isApproved: true, isPublic: true };

    const [members, total] = await Promise.all([
      Alumni.find(filter)
        .select('-email -phone -__v')
        .sort({ graduationYear: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Alumni.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: members,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    });
  })
);

/**
 * GET /api/alumni/search?q=<term>&page=1&limit=12
 *
 * Instant fuzzy search against name, role, company, location, course, skills.
 * Uses MongoDB text index for fast scoring + regex fallback for single-char queries.
 * Target: < 100ms for most queries.
 */
router.get(
  '/search',
  searchValidation,
  asyncHandler(async (req, res) => {
    const term  = req.query.q.trim();
    const page  = Math.max(1, parseInt(req.query.page)  || 1);
    const limit = Math.min(50, parseInt(req.query.limit) || 12);
    const skip  = (page - 1) * limit;

    const baseFilter = { isApproved: true, isPublic: true };

    let members = [];
    let total   = 0;

    if (term.length >= 2) {
      // ── Primary: MongoDB full-text index search (fast, ranked by relevance)
      const textFilter = {
        ...baseFilter,
        $text: { $search: term },
      };

      const [textResults, textTotal] = await Promise.all([
        Alumni.find(textFilter, { score: { $meta: 'textScore' } })
          .select('-email -phone -__v')
          .sort({ score: { $meta: 'textScore' } })
          .skip(skip)
          .limit(limit)
          .lean(),
        Alumni.countDocuments(textFilter),
      ]);

      if (textResults.length > 0) {
        members = textResults;
        total   = textTotal;
      } else {
        // ── Fallback: regex fuzzy match on multiple fields
        // Handles partial matches the text index misses (e.g. "Jon" → "John")
        const re = fuzzyRegex(term);
        const regexFilter = {
          ...baseFilter,
          $or: [
            { firstName:   re },
            { lastName:    re },
            { currentRole: re },
            { company:     re },
            { location:    re },
            { course:      re },
            { skills:      re },
          ],
        };

        [members, total] = await Promise.all([
          Alumni.find(regexFilter)
            .select('-email -phone -__v')
            .sort({ graduationYear: -1, createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),
          Alumni.countDocuments(regexFilter),
        ]);
      }
    } else {
      // Single character — pure regex (text index needs ≥2 chars)
      const re = fuzzyRegex(term);
      const regexFilter = {
        ...baseFilter,
        $or: [
          { firstName: re },
          { lastName:  re },
        ],
      };

      [members, total] = await Promise.all([
        Alumni.find(regexFilter)
          .select('-email -phone -__v')
          .sort({ lastName: 1 })
          .skip(skip)
          .limit(limit)
          .lean(),
        Alumni.countDocuments(regexFilter),
      ]);
    }

    // Add highlight hints to name fields so the frontend can highlight matches
    const highlighted = members.map((m) => ({
      ...m,
      _hl: {
        firstName:   highlight(m.firstName,   term),
        lastName:    highlight(m.lastName,    term),
        currentRole: highlight(m.currentRole, term),
        company:     highlight(m.company,     term),
        course:      highlight(m.course,      term),
      },
    }));

    res.json({
      success: true,
      query: term,
      data: highlighted,
      pagination: {
        page, limit, total,
        pages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    });
  })
);

/**
 * POST /api/alumni/register
 * Public registration — creates record pending admin approval.
 */
router.post(
  '/register',
  registerValidation,
  asyncHandler(async (req, res) => {
    const {
      firstName, lastName, email, phone,
      graduationYear, course, currentRole, company,
      location, bio, skills, linkedin, github, portfolio, isPublic,
    } = req.body;

    // Prevent duplicate registrations
    const existing = await Alumni.findOne({ email });
    if (existing) {
      return res.status(409).json({
        success: false,
        error:   'An account with this email already exists in the alumni directory.',
      });
    }

    const member = await Alumni.create({
      firstName, lastName, email, phone,
      graduationYear, course, currentRole, company,
      location, bio,
      skills: Array.isArray(skills) ? skills.slice(0, 15) : [],
      linkedin, github, portfolio,
      isPublic: isPublic !== false,
      isApproved: false,  // pending admin approval
    });

    res.status(201).json({
      success: true,
      message: 'Registration received! Your profile will appear in the directory once approved by our team (usually within 24 hours).',
      data: {
        id:        member._id,
        firstName: member.firstName,
        lastName:  member.lastName,
      },
    });
  })
);

// ── Admin routes (protected) ──────────────────────────────────────────────────

/**
 * GET /api/alumni/admin
 * All members (approved + pending + soft-deleted visible via override).
 */
router.get(
  '/admin',
  protect,
  restrictTo('admin'),
  asyncHandler(async (req, res) => {
    const page  = Math.max(1, parseInt(req.query.page)  || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 20);
    const skip  = (page - 1) * limit;

    // Bypass the pre-query hook to see soft-deleted records
    const members = await Alumni.findWithDeleted
      ? Alumni.findWithDeleted({})
          .sort({ createdAt: -1 }).skip(skip).limit(limit).lean()
      : Alumni.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit).lean();

    const total = await Alumni.countDocuments({});

    res.json({
      success: true,
      data: members,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  })
);

/**
 * PATCH /api/alumni/:id/approve
 * Approve a pending member — makes them visible in the public directory.
 */
router.patch(
  '/:id/approve',
  protect,
  restrictTo('admin'),
  asyncHandler(async (req, res) => {
    const member = await Alumni.findById(req.params.id);
    if (!member) return res.status(404).json({ success: false, error: 'Member not found' });

    member.isApproved = true;
    member.approvedAt = new Date();
    await member.save();

    res.json({ success: true, message: 'Member approved and visible in directory.', data: member });
  })
);

/**
 * DELETE /api/alumni/:id
 * Soft-delete — sets deletedAt timestamp, removes from public view.
 */
router.delete(
  '/:id',
  protect,
  restrictTo('admin'),
  asyncHandler(async (req, res) => {
    const member = await Alumni.findById(req.params.id);
    if (!member) return res.status(404).json({ success: false, error: 'Member not found' });

    await member.softDelete();

    res.json({
      success: true,
      message: 'Member soft-deleted. They can be restored at any time.',
    });
  })
);

/**
 * PATCH /api/alumni/:id/restore
 * Restore a soft-deleted member.
 */
router.patch(
  '/:id/restore',
  protect,
  restrictTo('admin'),
  asyncHandler(async (req, res) => {
    // Bypass soft-delete hook with direct findOne on the raw model
    const member = await Alumni.findOne({ _id: req.params.id, deletedAt: { $ne: null } });
    if (!member) return res.status(404).json({ success: false, error: 'Deleted member not found' });

    await member.restore();

    res.json({ success: true, message: 'Member restored to the directory.', data: member });
  })
);

module.exports = router;
