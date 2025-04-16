const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  id: String,
  name: String,
  image: String,
  price: Number,
  cartQuantity: Number,
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

module.exports = mongoose.model("Carts", CartSchema);
