/**
 * Enhanced Error Handling Middleware
 */

const logger = require('../utils/logger');

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Central error handler middleware
 */
const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  // Log error details
  logger.error('Unhandled error', {
    requestId: req.requestId,
    message: err.message,
    statusCode: err.statusCode,
    stack: err.stack,
    path: req.path,
    method: req.method,
    userId: req.user?.id || 'anonymous',
    timestamp: new Date().toISOString(),
  });

  // Wrong MongoDB ID error
  if (err.name === 'CastError') {
    err.message = `Resource not found. Invalid: ${err.path}`;
    err.statusCode = 404;
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    err.message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
    err.statusCode = 409;
  }

  // JWT error
  if (err.name === 'JsonWebTokenError') {
    err.message = 'Invalid token';
    err.statusCode = 401;
  }

  // Token expired
  if (err.name === 'TokenExpiredError') {
    err.message = 'Token expired';
    err.statusCode = 401;
  }

  // Validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    err.message = errors.join(', ');
    err.statusCode = 400;
  }

  // In development, include stack trace
  const isDevelopment = process.env.NODE_ENV === 'development';

  res.status(err.statusCode).json({
    success: false,
    statusCode: err.statusCode,
    message: err.message,
    requestId: req.requestId,
    ...(isDevelopment && { stack: err.stack }),
    timestamp: new Date().toISOString(),
  });
};

/**
 * Async error wrapper for controllers
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Not found handler
 */
const notFound = (req, res, next) => {
  const error = new AppError(`Route ${req.originalUrl} not found`, 404);
  next(error);
};

module.exports = {
  errorHandler,
  asyncHandler,
  notFound,
  AppError,
};
