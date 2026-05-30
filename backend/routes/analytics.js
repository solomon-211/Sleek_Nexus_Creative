/**
 * Analytics Routes
 * Tracks events and provides dashboard statistics
 */

const express = require('express');
const router = express.Router();
const { Contact, Newsletter, JobApplication } = require('../../database/models');
const { protect, restrictTo } = require('../middleware/auth');
const crypto = require('crypto');

function buildDateSeries(days) {
  const now = new Date();
  const labels = [];

  for (let i = days - 1; i >= 0; i -= 1) {
    const d = new Date(now);
    d.setHours(0, 0, 0, 0);
    d.setDate(now.getDate() - i);
    labels.push(d);
  }

  return labels;
}

function toDateKey(date) {
  return date.toISOString().slice(0, 10);
}

function countPerDay(records, dateField, labels) {
  const map = new Map(labels.map((d) => [toDateKey(d), 0]));

  records.forEach((record) => {
    const sourceDate = record[dateField] || record.createdAt || record.appliedAt;
    if (!sourceDate) return;
    const key = toDateKey(new Date(sourceDate));
    if (!map.has(key)) return;
    map.set(key, map.get(key) + 1);
  });

  return labels.map((d) => ({
    date: toDateKey(d),
    count: map.get(toDateKey(d)) || 0,
  }));
}

function calcChangePercent(current, previous) {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Number((((current - previous) / previous) * 100).toFixed(1));
}

// Track an event (public, lightweight)
router.post('/track', async (req, res) => {
  try {
    const { event, page, metadata } = req.body;
    
    // Hash IP for privacy
    const ip = req.ip || req.connection.remoteAddress;
    const ipHash = crypto.createHash('sha256').update(ip).digest('hex').substring(0, 16);
    
    // Log analytics event (you can create Analytics model if needed)
    console.log(`[INFO] Analytics: ${event} on ${page} from ${ipHash}`);
    
    res.status(201).json({ success: true });
  } catch (error) {
    // Don't fail silently - but don't disrupt user experience
    res.status(200).json({ success: true });
  }
});

// GET dashboard stats (admin only)
router.get('/dashboard', protect, restrictTo('admin', 'editor'), async (req, res) => {
  try {
    const requestedDays = parseInt(req.query.days, 10);
    const days = Number.isFinite(requestedDays) && requestedDays > 1 && requestedDays <= 90
      ? requestedDays
      : 30;

    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const previousWindowStart = new Date(thirtyDaysAgo.getTime() - days * 24 * 60 * 60 * 1000);

    const labels = buildDateSeries(days);

    const [
      totalContacts,
      newContacts,
      pendingContacts,
      totalSubscribers,
      activeSubscribers,
      newSubscribers,
      totalApplications,
      recentApplications,
      contactsByStatus,
      contactsByService,
      contactsInWindow,
      subscribersInWindow,
      applicationsInWindow,
      previousContacts,
      previousSubscribers,
      previousApplications,
    ] = await Promise.all([
      Contact.countDocuments(),
      Contact.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
      Contact.countDocuments({ status: 'new' }),
      Newsletter.countDocuments(),
      Newsletter.countDocuments({ subscribed: true }),
      Newsletter.countDocuments({ subscribedAt: { $gte: thirtyDaysAgo } }),
      JobApplication.countDocuments(),
      JobApplication.countDocuments({ appliedAt: { $gte: sevenDaysAgo } }),
      Contact.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
      Contact.aggregate([
        { $group: { _id: '$service', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      Contact.find({ createdAt: { $gte: thirtyDaysAgo } }).select('createdAt').lean(),
      Newsletter.find({ subscribedAt: { $gte: thirtyDaysAgo } }).select('subscribedAt').lean(),
      JobApplication.find({ appliedAt: { $gte: thirtyDaysAgo } }).select('appliedAt createdAt').lean(),
      Contact.countDocuments({ createdAt: { $gte: previousWindowStart, $lt: thirtyDaysAgo } }),
      Newsletter.countDocuments({ subscribedAt: { $gte: previousWindowStart, $lt: thirtyDaysAgo } }),
      JobApplication.countDocuments({ appliedAt: { $gte: previousWindowStart, $lt: thirtyDaysAgo } }),
    ]);

    const contactSeries = countPerDay(contactsInWindow, 'createdAt', labels);
    const subscriberSeries = countPerDay(subscribersInWindow, 'subscribedAt', labels);
    const applicationSeries = countPerDay(applicationsInWindow, 'appliedAt', labels);

    const leadToSubscriberRate = newContacts > 0
      ? Number(((newSubscribers / newContacts) * 100).toFixed(1))
      : 0;

    const applicationToLeadRate = newContacts > 0
      ? Number(((recentApplications / newContacts) * 100).toFixed(1))
      : 0;

    res.json({
      success: true,
      data: {
        window: { days },
        contacts: { total: totalContacts, new30d: newContacts, pending: pendingContacts },
        newsletter: { total: totalSubscribers, active: activeSubscribers, new30d: newSubscribers },
        applications: { total: totalApplications, recent7d: recentApplications },
        conversion: {
          leadToSubscriberRate,
          applicationToLeadRate,
        },
        deltas: {
          contacts: calcChangePercent(newContacts, previousContacts),
          subscribers: calcChangePercent(newSubscribers, previousSubscribers),
          applications: calcChangePercent(recentApplications, previousApplications),
        },
        charts: {
          contactsByStatus,
          contactsByService,
          contactsDaily: contactSeries,
          subscribersDaily: subscriberSeries,
          applicationsDaily: applicationSeries,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
