const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  getUserOrders,
  sendResetEmail
} = require('../controllers/Users');

// /api/users
router.get('/', auth, getAllUsers);
router.get('/:id', auth, getOneUser);
router.post('/', createUser);
router.post('/reset-password', sendResetEmail);
router.put('/:id', auth, updateUser);
router.delete('/:id', auth, deleteUser);
router.get('/:id/orders', auth, getUserOrders);

module.exports = router;
