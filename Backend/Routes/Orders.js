const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
  createOrder
} = require('../controllers/Orders');

// /api/orders
router.post('/', auth, createOrder);               // Create a new order for a user

module.exports = router;
