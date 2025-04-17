const Cart = require("../models/Carts");

// Fetch current user's cart
exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the cart for the user
    const cart = await Cart.findOne({ userId }).populate("items.product");

    if (!cart) {
      return res.json({ items: [] });
    }

    res.json(cart);
  } catch (err) {
    console.error("Error fetching cart:", err.message);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};
// Add item or increment quantity
exports.addCartItem = async (req, res) => {
  const { userId, id, name, image, price } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.product.toString() === id);

    if (existingItem) {
      existingItem.cartQuantity += 1;
    } else {
      cart.items.push({ product: id, cartQuantity: 1 });
    }

    await cart.save();
    const populatedCart = await Cart.findById(cart._id).populate("items.product");
    res.status(200).json(populatedCart);
  } catch (err) {
    res.status(500).json({ error: "Failed to add cart item" });
  }
};

// Remove item or decrement quantity
exports.removeCartItem = async (req, res) => {
  const { userId, id } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const item = cart.items.find(item => item.product.toString() === id);
    if (!item) return res.status(404).json({ error: "Item not found" });

    if (item.cartQuantity > 1) {
      item.cartQuantity -= 1;
    } else {
      cart.items = cart.items.filter(item => item.product.toString() !== id);
    }

    await cart.save();
    const populatedCart = await Cart.findById(cart._id).populate("items.product");
    res.status(200).json(populatedCart);
  } catch (err) {
    res.status(500).json({ error: "Failed to remove item" });
  }
};

// Clear specific item from cart
exports.clearCartItem = async (req, res) => {
  const { userId, id } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.items = cart.items.filter(item => item.product.toString() !== id);
    await cart.save();
    const populatedCart = await Cart.findById(cart._id).populate("items.product");
    res.status(200).json(populatedCart);
  } catch (err) {
    res.status(500).json({ error: "Failed to clear item" });
  }
};

// Clear all cart items
exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (cart) {
      cart.items = [];
      await cart.save();
    }

    res.status(200).json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ error: "Failed to clear cart" });
  }
};
