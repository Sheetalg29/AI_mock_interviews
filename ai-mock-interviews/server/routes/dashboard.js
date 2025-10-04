const express = require('express');
const Interview = require('../models/Interview');
const router = express.Router();

router.get('/:userId', async (req, res) => {
  try {
    const interviews = await Interview.find({ user: req.params.userId }).sort({ date: -1 });
    res.json({
      interviews: interviews.map(iv => ({
        date: iv.date,
        performance: iv.performance,
        score: iv.score,
        feedback: iv.feedback,
        emotionSnapshots: iv.emotionSnapshots
      }))
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching dashboard.' });
  }
});

module.exports = router;