/**
 * File Upload Routes
 * POST   /api/uploads/single   — upload one file (auth required)
 * POST   /api/uploads/multiple — upload up to 10 files (auth required)
 * DELETE /api/uploads/:filename — delete a file (admin only)
 */

const express = require('express')
const router  = express.Router()
const path    = require('path')
const { protect, restrictTo } = require('../middleware/auth')
const { asyncHandler } = require('../middleware/errorHandler')
const {
  upload,
  uploadMultiple,
  uploadErrorHandler,
  deleteFile,
  uploadDir,
} = require('../utils/fileUpload')
const { uploadLimiter } = require('../utils/security')

/* ── POST /single ── */
router.post(
  '/single',
  protect,
  uploadLimiter,
  upload.single('file'),
  uploadErrorHandler,
  asyncHandler(async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file provided.' })
    }

    /* Build a relative URL path for the client */
    const relativePath = path.relative(uploadDir, req.file.path).replace(/\\/g, '/')

    res.status(201).json({
      success: true,
      data: {
        filename:     req.file.filename,
        originalName: req.file.originalname,
        size:         req.file.size,
        mimetype:     req.file.mimetype,
        url:          `/uploads/${relativePath}`,
        uploadedAt:   new Date().toISOString(),
      },
    })
  })
)

/* ── POST /multiple ── */
router.post(
  '/multiple',
  protect,
  uploadLimiter,
  uploadMultiple.array('files', 10),
  uploadErrorHandler,
  asyncHandler(async (req, res) => {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, error: 'No files provided.' })
    }

    const files = req.files.map((file) => {
      const relativePath = path.relative(uploadDir, file.path).replace(/\\/g, '/')
      return {
        filename:     file.filename,
        originalName: file.originalname,
        size:         file.size,
        mimetype:     file.mimetype,
        url:          `/uploads/${relativePath}`,
      }
    })

    res.status(201).json({
      success: true,
      count: files.length,
      data: files,
    })
  })
)

/* ── DELETE /:filename — admin only ── */
router.delete(
  '/:filename',
  protect,
  restrictTo('admin'),
  asyncHandler(async (req, res) => {
    /* Prevent path traversal */
    const filename = path.basename(req.params.filename)

    const deleted = deleteFile(filename)
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'File not found.' })
    }

    res.json({ success: true, message: 'File deleted successfully.' })
  })
)

module.exports = router
