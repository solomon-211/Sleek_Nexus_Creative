'use strict';

/**
 * Alumni Model
 * Represents an SNC graduate / alumni member in the directory.
 * Supports soft-delete so removed members are not permanently lost.
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

const AlumniSchema = new Schema(
  {
    // ── Identity ──────────────────────────────────────────────────────────────
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      maxlength: [60, 'First name cannot exceed 60 characters'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      maxlength: [60, 'Last name cannot exceed 60 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email'],
    },
    phone: {
      type: String,
      trim: true,
      maxlength: [25, 'Phone number cannot exceed 25 characters'],
    },

    // ── Profile ───────────────────────────────────────────────────────────────
    graduationYear: {
      type: Number,
      min: [2019, 'Year cannot be before SNC was founded'],
      max: [new Date().getFullYear() + 1, 'Year cannot be in the future'],
    },
    course: {
      type: String,
      trim: true,
      maxlength: [120, 'Course name cannot exceed 120 characters'],
    },
    currentRole: {
      type: String,
      trim: true,
      maxlength: [120, 'Role cannot exceed 120 characters'],
    },
    company: {
      type: String,
      trim: true,
      maxlength: [120, 'Company name cannot exceed 120 characters'],
    },
    location: {
      type: String,
      trim: true,
      maxlength: [120, 'Location cannot exceed 120 characters'],
    },
    bio: {
      type: String,
      trim: true,
      maxlength: [500, 'Bio cannot exceed 500 characters'],
    },
    skills: {
      type: [String],
      default: [],
      validate: {
        validator: (arr) => arr.length <= 15,
        message: 'Cannot list more than 15 skills',
      },
    },

    // ── Social links ──────────────────────────────────────────────────────────
    linkedin:  { type: String, trim: true, maxlength: 200 },
    github:    { type: String, trim: true, maxlength: 200 },
    portfolio: { type: String, trim: true, maxlength: 200 },

    // ── Visibility ────────────────────────────────────────────────────────────
    /** Whether the member has opted into the public directory */
    isPublic: { type: Boolean, default: true },

    // ── Soft-delete ───────────────────────────────────────────────────────────
    /** Soft-delete: when set the record is hidden from all queries */
    deletedAt: { type: Date, default: null },

    // ── Admin ─────────────────────────────────────────────────────────────────
    isApproved: { type: Boolean, default: false },
    approvedAt: { type: Date },
  },
  {
    timestamps: true,    // createdAt, updatedAt
    toJSON:  { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ── Virtual: full name ────────────────────────────────────────────────────────
AlumniSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// ── Text index for fast full-text search ──────────────────────────────────────
// Covers name, role, company, location, course, skills
AlumniSchema.index(
  {
    firstName:   'text',
    lastName:    'text',
    currentRole: 'text',
    company:     'text',
    location:    'text',
    course:      'text',
    skills:      'text',
  },
  {
    name:    'alumni_text_search',
    weights: {
      firstName:   10,  // name matches score highest
      lastName:    10,
      currentRole: 6,
      company:     5,
      course:      5,
      location:    3,
      skills:      4,
    },
  }
);

// ── Compound index for directory listing ──────────────────────────────────────
AlumniSchema.index({ deletedAt: 1, isApproved: 1, isPublic: 1, createdAt: -1 });

// ── Pre-query middleware: always exclude soft-deleted records ─────────────────
// Override individual find* methods so soft-deleted docs are automatically hidden
function excludeDeleted(next) {
  if (!this.getQuery().deletedAt) {
    this.where({ deletedAt: null });
  }
  next();
}

AlumniSchema.pre('find',      excludeDeleted);
AlumniSchema.pre('findOne',   excludeDeleted);
AlumniSchema.pre('countDocuments', excludeDeleted);

// ── Instance method: soft-delete ─────────────────────────────────────────────
AlumniSchema.methods.softDelete = function () {
  this.deletedAt = new Date();
  return this.save();
};

// ── Instance method: restore ─────────────────────────────────────────────────
AlumniSchema.methods.restore = function () {
  this.deletedAt = null;
  return this.save();
};

module.exports = mongoose.model('Alumni', AlumniSchema);
