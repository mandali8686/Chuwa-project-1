const Product = require('../models/Products');  // Assuming you have a Product model'

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  try {
    if(req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Permission denied' });
    }

    const { name, description, price, category, stock, outOfStock } = req.body;

    // Validate required fields
    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(400).json({ message: 'Product with this name already exists' });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      outOfStock
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update a product by ID
const updateProduct = async (req, res) => {
  try {
    if(req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Permission denied' });
    }

    const { name, description, price, category, stock, outOfStock } = req.body;
    const updateFields = {};

    if (name) updateFields.name = name;
    if (description) updateFields.description = description;
    if (price) updateFields.price = price;
    if (category) updateFields.category = category;
    if (stock) updateFields.stock = stock;
    if (outOfStock) updateFields.outOfStock = outOfStock;

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateFields, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};


// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    if(req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Permission denied' });
    }

    // Check if the product is referenced in any order
    const orders = await Order.find({ 'items.productId': req.params.id });
    if (orders.length > 0) {
      return res.status(400).json({ message: 'Cannot delete product, it is in active orders' });
    }

    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(204).json({ message: 'Product deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
