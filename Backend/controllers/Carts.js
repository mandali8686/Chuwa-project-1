const Cart = require("../models/Carts");

// Fetch current user's cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};

// Add item or increment quantity
exports.addCartItem = async (req, res) => {
  console.log("new---------------------")
  const { userId, id, name, image, price } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    console.log("cart: ", cart)
    if (!cart) {
      console.log("cart before create: ", cart)
      cart = new Cart({ userId, items: [] });
      console.log("cart after create: ", cart)
    }

    const existingItem = cart.items.find(item => item.id === id);
    console.log("existingItem ", existingItem)
    if (existingItem) {
      existingItem.cartQuantity += 1;
    } else {
      cart.items.push({ id, name, image, price, cartQuantity: 1 });
    }
    console.log("current cart items: ", cart)
    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    console.error("Add cart item error:", err);
    res.status(500).json({ error: "Failed to add cart item" });
  }
};

// Remove item or decrement quantity
exports.removeCartItem = async (req, res) => {
  const { userId, id } = req.body;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const item = cart.items.find(item => item.id === id);
    if (!item) return res.status(404).json({ error: "Item not found" });

    if (item.cartQuantity > 1) {
      item.cartQuantity -= 1;
    } else {
      cart.items = cart.items.filter(item => item.id !== id);
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: "Failed to remove item" });
  }
};

// Clear specific item
exports.clearCartItem = async (req, res) => {
  const { userId, id } = req.body;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.items = cart.items.filter(item => item.id !== id);
    await cart.save();

    res.status(200).json(cart);
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
