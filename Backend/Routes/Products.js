const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/Products');

// /api/products
router.get('/', getAllProducts);                  // Get all products
router.get('/:id', getProductById);              // Get a specific product by ID
router.post('/', auth, createProduct);            // Admin only: Create a new product
router.put('/:id', auth, updateProduct);         // Admin only: Update product by ID
router.delete('/:id', auth, deleteProduct);      // Admin only: Delete product by ID

module.exports = router;
