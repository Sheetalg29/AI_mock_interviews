const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now },
  questions: [String],
  answers: [String],
  feedback: String,
  score: Number,
  performance: {
    coding: Number,
    concepts: Number,
    communication: Number,
    emotions: Number
  },
  emotionSnapshots: [{
    imageData: String,
    detectedEmotion: String
  }]
});

module.exports = mongoose.model('Interview', interviewSchema);