const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  cartQuantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  items: [CartItemSchema],
}, { timestamps: true });

module.exports = mongoose.model("Cart", CartSchema);
