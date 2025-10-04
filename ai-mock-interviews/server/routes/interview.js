const express = require('express');
const Interview = require('../models/Interview');
const { getAIQuestions, getAIFeedbackAndScores } = require('../utils/openai');
const router = express.Router();

// Generate AI interview questions
router.post('/questions', async (req, res) => {
  const { role, userId } = req.body;
  try {
    const questions = await getAIQuestions(role);
    const interview = await Interview.create({
      user: userId,
      questions,
      answers: [],
      feedback: '',
      score: 0,
      performance: { coding: 0, concepts: 0, communication: 0, emotions: 0 }
    });
    res.json({ questions, interviewId: interview._id });
  } catch (err) {
    res.status(500).json({ error: 'Server error generating questions.' });
  }
});

// Submit answers, get feedback and scores
router.post('/submit', async (req, res) => {
  const { interviewId, answers } = req.body;
  try {
    const { feedback, performance } = await getAIFeedbackAndScores(answers);
    const score = Math.round(
      (performance.coding + performance.concepts + performance.communication + performance.emotions) / 4
    );
    const interview = await Interview.findByIdAndUpdate(
      interviewId,
      { answers, feedback, score, performance },
      { new: true }
    );
    res.json(interview);
  } catch (err) {
    res.status(500).json({ error: 'Server error submitting interview.' });
  }
});

// Receive emotion snapshot (simulated detection)
router.post('/emotion', async (req, res) => {
  const { interviewId, imageData } = req.body;
  // Simulate emotion detection (use ML API in production)
  const detectedEmotion = "happy"; // always "happy" for demo
  await Interview.findByIdAndUpdate(interviewId, {
    $push: { emotionSnapshots: { imageData, detectedEmotion } }
  });
  res.json({ emotion: detectedEmotion });
});

module.exports = router;