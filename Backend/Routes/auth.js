const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Users'); // Adjust the path as necessary

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Please enter both email and password.' });
    }

    // Find user by email
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }


    
    // Create payload
    const payload = {
      user: {
        email,
        password
      },
    };

    // Generate JWT
    const token = jwt.sign(payload, 'ffffffffffff', { expiresIn: '30d' });

    // Send response
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
