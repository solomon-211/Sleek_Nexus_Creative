/**
 * Contact Form Routes
 */

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { Contact } = require('../../database/models/index');
const { sendContactNotification, sendContactAutoReply } = require('../config/email');
const { protect, restrictTo } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validation');

const { verifyRecaptcha } = require('../middleware/recaptcha');

const contactValidation = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('phone').optional().trim().isLength({ max: 20 }),
  body('company').optional().trim().isLength({ max: 100 }),
  body('service').optional().isIn(['software-dev', 'web-mobile', 'edtech', 'consulting', 'other']),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ min: 10, max: 2000 }),
  handleValidationErrors,
];

// Submit contact form (public)
router.post('/', verifyRecaptcha, contactValidation, async (req, res) => {
  try {
    const { name, email, phone, company, service, message } = req.body;

    const contact = await Contact.create({
      name, email, phone, company,
      service: service || 'other',
      message,
      ipAddress: req.ip,
    });

    // Send emails (don't fail the request if email fails)
    Promise.all([
      sendContactNotification(contact),
      sendContactAutoReply(contact),
    ]).catch(err => console.error('Email error:', err.message));

    res.status(201).json({
      success: true,
      message: 'Your message has been received. We will contact you within 24-48 hours.',
      id: contact._id,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Could not submit form. Please try again.' });
  }
});

// GET all contacts (admin)
router.get('/', protect, restrictTo('admin', 'editor'), async (req, res) => {
  try {
    const { status, page = 1, limit = 20, search } = req.query;
    const query = {};
    const parsedPage = Math.max(1, parseInt(page, 10) || 1);
    const parsedLimit = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));
    
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
      ];
    }

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(parsedLimit)
      .skip((parsedPage - 1) * parsedLimit)
      .populate('assignedTo', 'name email');

    const total = await Contact.countDocuments(query);

    res.json({
      success: true,
      data: contacts,
      pagination: { total, page: parsedPage, pages: Math.ceil(total / parsedLimit) },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// UPDATE contact status (admin)
router.patch('/:id', protect, restrictTo('admin', 'editor'), async (req, res) => {
  try {
    const { status, notes, assignedTo } = req.body;
    const update = {};
    
    if (status) update.status = status;
    if (notes) update.notes = notes;
    if (assignedTo) update.assignedTo = assignedTo;
    if (status === 'resolved') update.respondedAt = new Date();

    const contact = await Contact.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!contact) return res.status(404).json({ error: 'Contact not found' });

    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;