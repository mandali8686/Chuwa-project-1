// Backend/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // unique email
    password: { type: String, required: true }, // hashed password will be stored
    role: { type: String, enum: ["user", "admin"], default: "user" },
    cart: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
); // automatically adds createdAt and updatedAt

module.exports = mongoose.model("User", userSchema);
