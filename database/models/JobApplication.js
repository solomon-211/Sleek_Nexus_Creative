const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true
  },
  resume: {
    type: String, // URL or file path
    required: true
  },
  coverLetter: {
    type: String
  },
  experience: {
    type: Number, // years of experience
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'reviewing', 'interview', 'rejected', 'accepted'],
    default: 'pending'
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.models.JobApplication || mongoose.model('JobApplication', jobApplicationSchema);
