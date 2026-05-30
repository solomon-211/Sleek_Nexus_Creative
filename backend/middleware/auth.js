/**
 * Authentication Middleware
 */

const jwt = require('jsonwebtoken');
const { User } = require('../../database/models');
const Admin = require('../models/Admin');

/**
 * Protect routes - verify JWT token
 */
exports.protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.adminToken) {
      token = req.cookies.adminToken;
    }

    if (!token) {
      return res.status(401).json({ error: 'Not authorized. Please log in.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    let user = await Admin.findById(decoded.id).select('-password');
    if (!user) {
      user = await User.findById(decoded.id).select('-password');
    }

    if (!user) {
      return res.status(401).json({ error: 'User no longer exists.' });
    }

    if (user.isActive !== undefined && !user.isActive) {
      return res.status(401).json({ error: 'Account deactivated.' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

/**
 * Restrict to specific roles
 */
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'You do not have permission to perform this action.' });
    }
    next();
  };
};

/**
 * Admin only middleware
 */
exports.adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required.' });
  }
  next();
};
