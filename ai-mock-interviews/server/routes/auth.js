const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if(!email || !password) return res.status(400).json({ error: "Email and password required." });
  const hash = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ name, email, password: hash });
    res.status(201).json({ message: 'Registered!' });
  } catch (err) {
    res.status(400).json({ error: 'Email already exists.' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if(!user) return res.status(400).json({ error: 'Invalid email or password.' });
  const valid = await bcrypt.compare(password, user.password);
  if(!valid) return res.status(400).json({ error: 'Invalid email or password.' });
  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);
  res.json({ token, userId: user._id, name: user.name, email: user.email });
});

module.exports = router;