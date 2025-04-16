const express = require("express");
const router = express.Router();
const {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
  } = require('../controllers/Products');
const auth = require('../middlewares/auth'); // Uncomment this when ready for auth

// Create product (disable auth temporarily for testing)
// router.post("/", productController.createProduct);
// <-- use `auth,` here when ready

// Update product
// router.put("/:id", productController.updateProduct); // <-- add auth if needed

// Delete product
// router.delete("/:id", productController.deleteProduct); // <-- add auth if needed

// Get all products
// router.get("/", productController.getAllProducts);

// Get single product by ID
// router.get("/:id", productController.getProduct);

router.get('/', auth, getAllProducts);
router.get('/:id', auth, getProduct);
router.post('/', auth,createProduct);
router.put('/:id', auth, updateProduct);
router.delete('/:id', auth, deleteProduct);
// router.get('/:id/orders', auth, getUserOrders);

module.exports = router;
