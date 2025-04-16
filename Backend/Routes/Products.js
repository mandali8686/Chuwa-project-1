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


router.get('/', getAllProducts);
router.get('/:id', auth, getProduct);
router.post('/', auth,createProduct);
router.put('/:id', auth, updateProduct);
router.delete('/:id', auth, deleteProduct);


module.exports = router;
