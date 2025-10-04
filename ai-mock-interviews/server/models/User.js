const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  interviewHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Interview' }]
});

module.exports = mongoose.model('User', userSchema);