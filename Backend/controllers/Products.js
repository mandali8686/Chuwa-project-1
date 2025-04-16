const Product = require('../models/Products');
const User = require('../models/Users');

const createProduct = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if(user.role !== 'admin') {
      return res.status(403).json({ message: 'Permission denied' });
    }

    if (!req.body.name || !req.body.price || !req.body.category) {
      return res.status(400).json({
        success: false,
        message: 'Name, price, and category are required'
      });
    }

    const product = new Product({
      name: req.body.name,
      description: req.body.description || '',
      price: req.body.price,
      category: req.body.category,
      stock: req.body.stock || 0,
      imageUrl: req.body.imageUrl || '',
      outOfStock: req.body.stock ? req.body.stock <= 0 : true
    });

    const savedProduct = await product.save();

    res.status(201).json({
      success: true,
      data: savedProduct
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: err.message
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if(user.role !== 'admin') {
      return res.status(403).json({ message: 'Permission denied' });
    }

    const { id } = req.params;
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const updateData = {
      name: req.body.name || existingProduct.name,
      description: req.body.description || existingProduct.description,
      price: req.body.price || existingProduct.price,
      category: req.body.category || existingProduct.category,
      stock: req.body.stock !== undefined ? req.body.stock : existingProduct.stock,
      imageUrl: req.body.imageUrl !== undefined ? req.body.imageUrl : existingProduct.imageUrl,
      updatedAt: Date.now()
    };

    updateData.outOfStock = updateData.stock <= 0;
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: updatedProduct
    });
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: err.message
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if(user.role !== 'admin') {
      return res.status(403).json({ message: 'Permission denied' });
    }
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: err.message
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: err.message
    });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: err.message
    });
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
};
