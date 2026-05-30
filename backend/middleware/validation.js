/**
 * Advanced Request Validation Middleware
 * Implements express-validator with custom rules
 */

const { body, query, param, validationResult } = require('express-validator');

/**
 * Handle validation errors
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.path || err.param,
        message: err.msg,
      })),
    });
  }
  next();
};

/**
 * Email validation rule
 */
const validateEmail = () =>
  body('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Invalid email address');

/**
 * Password validation rule
 * Password must contain: 8+ chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
 */
const validatePassword = (field = 'password') =>
  body(field)
    .isLength({ min: 8 })
    .withMessage(`${field} must be at least 8 characters`)
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage(
      `${field} must contain uppercase, lowercase, number, and special character`
    );

/**
 * URL validation rule
 */
const validateUrl = (field = 'url') =>
  body(field)
    .trim()
    .isURL()
    .withMessage(`Invalid ${field} format`);

/**
 * Phone validation rule
 */
const validatePhone = (field = 'phone') =>
  body(field)
    .trim()
    .isMobilePhone('any')
    .withMessage('Invalid phone number');

/**
 * Contact form validation
 */
const validateContactForm = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  validateEmail(),
  body('subject')
    .trim()
    .notEmpty()
    .withMessage('Subject is required')
    .isLength({ min: 5, max: 200 })
    .withMessage('Subject must be between 5 and 200 characters'),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10, max: 5000 })
    .withMessage('Message must be between 10 and 5000 characters'),
  handleValidationErrors,
];

/**
 * Login validation
 */
const validateLogin = [
  validateEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors,
];

/**
 * Register validation
 */
const validateRegister = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  validateEmail(),
  validatePassword(),
  body('passwordConfirm')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords do not match'),
  handleValidationErrors,
];

/**
 * Blog post validation
 */
const validateBlogPost = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 5, max: 300 })
    .withMessage('Title must be between 5 and 300 characters'),
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required')
    .isLength({ min: 100 })
    .withMessage('Content must be at least 100 characters'),
  body('slug')
    .trim()
    .matches(/^[a-z0-9-]+$/)
    .withMessage('Slug can only contain lowercase letters, numbers, and hyphens'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required'),
  handleValidationErrors,
];

/**
 * Pagination validation
 */
const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  handleValidationErrors,
];

/**
 * ID validation (MongoDB ObjectId)
 */
const validateId = [
  param('id')
    .isMongoId()
    .withMessage('Invalid ID format'),
  handleValidationErrors,
];

module.exports = {
  validateEmail,
  validatePassword,
  validateUrl,
  validatePhone,
  validateContactForm,
  validateLogin,
  validateRegister,
  validateBlogPost,
  validatePagination,
  validateId,
  handleValidationErrors,
};
