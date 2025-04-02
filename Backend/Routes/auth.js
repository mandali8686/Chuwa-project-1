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
      return res.status(400).json({ msg: 'Please enter both email and password.' });
    }

    // Find user by email
    const user = await User.findOne({ email, password, role });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials.' });
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
    res.json({ token });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ msg: 'Server error.' });
  }
});

module.exports = router;
