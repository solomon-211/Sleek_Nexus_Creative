/**
 * CodeBridge Bootcamp - Complete Database Models
 * All Mongoose schemas with validation, indexes, and virtuals
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// ─── USER MODEL ───────────────────────────────────────────────────────────────

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false,
  },
  role: {
    type: String,
    enum: ['admin', 'editor', 'viewer'],
    default: 'viewer',
  },
  avatar: String,
  isActive: { type: Boolean, default: true },
  lastLogin: Date,
  passwordChangedAt: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
}, { timestamps: true });

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

// ─── CONTACT MODEL ────────────────────────────────────────────────────────────

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: 100,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email'],
  },
  phone: { type: String, trim: true },
  company: { type: String, trim: true },
  service: {
    type: String,
    enum: ['web-development', 'mobile-app', 'training', 'consulting', 'other'],
    default: 'other',
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    maxlength: [2000, 'Message cannot exceed 2000 characters'],
  },
  status: {
    type: String,
    enum: ['new', 'in-progress', 'resolved', 'spam'],
    default: 'new',
  },
  ipAddress: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  notes: String,
  respondedAt: Date,
}, { timestamps: true });

contactSchema.index({ status: 1, createdAt: -1 });
contactSchema.index({ email: 1 });

// ─── NEWSLETTER MODEL ─────────────────────────────────────────────────────────

const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email'],
  },
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  language: {
    type: String,
    enum: ['en', 'ar'],
    default: 'en',
  },
  subscribed: { type: Boolean, default: true },
  subscribedAt: { type: Date, default: Date.now },
  unsubscribedAt: Date,
  unsubscribeToken: String,
  tags: [String],
  source: {
    type: String,
    enum: ['homepage', 'blog', 'course', 'footer', 'other'],
    default: 'other',
  },
}, { timestamps: true });

newsletterSchema.virtual('fullName').get(function () {
  return `${this.firstName || ''} ${this.lastName || ''}`.trim();
});

// ─── PROJECT MODEL ────────────────────────────────────────────────────────────

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  titleAr: String,
  slug: { type: String, unique: true, lowercase: true },
  description: { type: String, required: true },
  descriptionAr: String,
  category: {
    type: String,
    enum: ['web', 'mobile', 'training', 'infrastructure', 'consulting'],
    required: true,
  },
  technologies: [String],
  images: [String],
  client: String,
  location: String,
  status: {
    type: String,
    enum: ['ongoing', 'completed', 'planned'],
    default: 'ongoing',
  },
  featured: { type: Boolean, default: false },
  impact: {
    beneficiaries: { type: Number, default: 0 },
    description: String,
    descriptionAr: String,
  },
  startDate: Date,
  completedAt: Date,
  testimonial: {
    quote: String,
    author: String,
    position: String,
  },
}, { timestamps: true });

projectSchema.pre('save', function (next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();
  }
  next();
});

// ─── COURSE MODEL ─────────────────────────────────────────────────────────────

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  titleAr: String,
  slug: { type: String, unique: true },
  description: { type: String, required: true },
  descriptionAr: String,
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  instructorName: String,
  category: {
    type: String,
    enum: ['programming', 'design', 'business', 'digital-literacy', 'leadership'],
    required: true,
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner',
  },
  language: {
    type: String,
    enum: ['en', 'ar', 'both'],
    default: 'en',
  },
  duration: Number, // hours
  modules: [{
    title: String,
    description: String,
    videoUrl: String,
    duration: Number,
    order: Number,
    isPreview: { type: Boolean, default: false },
  }],
  price: { type: Number, default: 0 }, // 0 = free
  currency: { type: String, default: 'USD' },
  thumbnail: String,
  enrollmentCount: { type: Number, default: 0 },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  totalRatings: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: false },
  certificate: { type: Boolean, default: true },
  requirements: [String],
  outcomes: [String],
}, { timestamps: true });

// ─── ENROLLMENT MODEL ─────────────────────────────────────────────────────────

const enrollmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  // For non-registered learners
  name: String,
  email: String,
  phone: String,
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  status: {
    type: String,
    enum: ['enrolled', 'in-progress', 'completed', 'dropped'],
    default: 'enrolled',
  },
  progress: { type: Number, default: 0, min: 0, max: 100 },
  completedModules: [Number],
  startedAt: { type: Date, default: Date.now },
  completedAt: Date,
  certificateIssued: { type: Boolean, default: false },
  certificateUrl: String,
  rating: { type: Number, min: 1, max: 5 },
  review: String,
  paymentStatus: {
    type: String,
    enum: ['free', 'paid', 'pending', 'failed'],
    default: 'free',
  },
}, { timestamps: true });

enrollmentSchema.index({ email: 1, course: 1 }, { unique: true });

// ─── JOB APPLICATION MODEL ────────────────────────────────────────────────────

const jobApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true },
  phone: String,
  position: { type: String, required: true },
  resume: String, // file path
  coverLetter: { type: String, maxlength: 3000 },
  linkedIn: String,
  portfolio: String,
  status: {
    type: String,
    enum: ['received', 'reviewing', 'shortlisted', 'interviewed', 'offered', 'rejected', 'withdrawn'],
    default: 'received',
  },
  notes: String,
  interviewDate: Date,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

// ─── DONOR MODEL ─────────────────────────────────────────────────────────────

const donorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, lowercase: true },
  organization: String,
  type: {
    type: String,
    enum: ['individual', 'corporate', 'ngo', 'government', 'foundation'],
    default: 'individual',
  },
  amount: Number,
  currency: { type: String, default: 'USD' },
  frequency: {
    type: String,
    enum: ['one-time', 'monthly', 'annual'],
    default: 'one-time',
  },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  anonymous: { type: Boolean, default: false },
  message: String,
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'refunded'],
    default: 'pending',
  },
  paymentMethod: String,
  transactionId: String,
  donatedAt: { type: Date, default: Date.now },
  receiptSent: { type: Boolean, default: false },
}, { timestamps: true });

// ─── IMPACT METRICS MODEL ────────────────────────────────────────────────────

const impactSchema = new mongoose.Schema({
  metric: {
    type: String,
    required: true,
    unique: true,
    enum: [
      'youth_trained',
      'projects_completed',
      'communities_reached',
      'jobs_created',
      'courses_delivered',
      'partners',
      'countries_reached',
      'students_enrolled',
    ],
  },
  label: { type: String, required: true },
  labelAr: String,
  value: { type: Number, required: true, default: 0 },
  icon: String,
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  history: [{
    value: Number,
    recordedAt: { type: Date, default: Date.now },
  }],
}, { timestamps: true });

// ─── ANALYTICS EVENT MODEL ────────────────────────────────────────────────────

const analyticsSchema = new mongoose.Schema({
  event: {
    type: String,
    required: true,
    enum: ['page_view', 'form_submit', 'download', 'click', 'enrollment', 'donation'],
  },
  page: String,
  referrer: String,
  userAgent: String,
  ipHash: String, // hashed for privacy
  sessionId: String,
  metadata: mongoose.Schema.Types.Mixed,
}, { timestamps: true });

analyticsSchema.index({ event: 1, createdAt: -1 });
analyticsSchema.index({ page: 1, createdAt: -1 });

// ─── EXPORT ALL MODELS ────────────────────────────────────────────────────────

module.exports = {
  User: mongoose.models.User || mongoose.model('User', userSchema),
  Contact: mongoose.models.Contact || mongoose.model('Contact', contactSchema),
  Newsletter: mongoose.models.Newsletter || mongoose.model('Newsletter', newsletterSchema),
  Project: mongoose.models.Project || mongoose.model('Project', projectSchema),
  Course: mongoose.models.Course || mongoose.model('Course', courseSchema),
  Enrollment: mongoose.models.Enrollment || mongoose.model('Enrollment', enrollmentSchema),
  JobApplication: mongoose.models.JobApplication || mongoose.model('JobApplication', jobApplicationSchema),
  Donor: mongoose.models.Donor || mongoose.model('Donor', donorSchema),
  Impact: mongoose.models.Impact || mongoose.model('Impact', impactSchema),
  Analytics: mongoose.models.Analytics || mongoose.model('Analytics', analyticsSchema),
};
