const express = require('express');
const Report = require('../models/Report');
const router = express.Router();

// Create report
router.post('/', async (req, res) => {
  try {
    const report = new Report(req.body);
    await report.save();
    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all reports
router.get('/', async (req, res) => {
  try {
    const reports = await Report.find().populate('userId', 'name email');
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get reports by user
router.get('/user/:userId', async (req, res) => {
  try {
    const reports = await Report.find({ userId: req.params.userId });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update report status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const report = await Report.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(report);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
