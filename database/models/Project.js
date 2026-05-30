const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['web', 'mobile', 'edtech', 'enterprise', 'all']
  },
  tags: [String],
  images: [String],
  client: String,
  year: Number,
  duration: String,
  technologies: [String],
  challenge: String,
  solution: String,
  results: [String],
  featured: {
    type: Boolean,
    default: false
  },
  published: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.models.Project || mongoose.model('Project', projectSchema);
