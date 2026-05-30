/**
 * File Upload Utilities
 * Multer configuration with type validation, size limits, and safe filenames.
 */

const multer = require('multer')
const path   = require('path')
const fs     = require('fs')
const { v4: uuidv4 } = require('uuid')

/* ── Upload directory ── */
const uploadDir = path.resolve(process.env.UPLOAD_DIR || './uploads')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

/* ── Allowed MIME types ── */
const ALLOWED_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
])

const MIME_TO_EXT = {
  'image/jpeg':       '.jpg',
  'image/png':        '.png',
  'image/gif':        '.gif',
  'image/webp':       '.webp',
  'image/svg+xml':    '.svg',
  'application/pdf':  '.pdf',
  'application/msword': '.doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
}

/* ── Disk storage — flat directory, UUID filenames ── */
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename:    (_req, file, cb) => {
    const ext  = MIME_TO_EXT[file.mimetype] || path.extname(file.originalname).toLowerCase()
    const name = `${uuidv4()}${ext}`
    cb(null, name)
  },
})

/* ── File filter ── */
const fileFilter = (_req, file, cb) => {
  if (ALLOWED_TYPES.has(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', `File type not allowed: ${file.mimetype}`))
  }
}

const MAX_SIZE = parseInt(process.env.MAX_FILE_SIZE, 10) || 5 * 1024 * 1024 // 5 MB

/* ── Single-file upload ── */
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_SIZE, files: 1 },
})

/* ── Multi-file upload (max 10) ── */
const uploadMultiple = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_SIZE, files: 10 },
})

/* ── Delete a file by filename (basename only — no path traversal) ── */
function deleteFile(filename) {
  const safe = path.basename(filename)
  const full = path.join(uploadDir, safe)
  if (!fs.existsSync(full)) return false
  fs.unlinkSync(full)
  return true
}

/* ── Multer error handler middleware ── */
function uploadErrorHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    const messages = {
      LIMIT_FILE_SIZE:       `File too large. Maximum size is ${MAX_SIZE / 1024 / 1024} MB.`,
      LIMIT_FILE_COUNT:      'Too many files uploaded at once.',
      LIMIT_UNEXPECTED_FILE: err.message || 'Unexpected file field.',
    }
    return res.status(400).json({
      success: false,
      error: messages[err.code] || err.message,
    })
  }
  if (err) {
    return res.status(400).json({ success: false, error: err.message })
  }
  next()
}

module.exports = {
  upload,
  uploadMultiple,
  deleteFile,
  uploadErrorHandler,
  uploadDir,
  ALLOWED_TYPES,
  MIME_TO_EXT,
}
