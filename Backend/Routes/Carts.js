const express = require("express");
const router = express.Router();
const cartController = require("../controllers/Carts");

router.get("/:userId", cartController.getCart);
router.post("/add", cartController.addCartItem);
router.post("/remove", cartController.removeCartItem);
router.post("/clear-item", cartController.clearCartItem);
router.post("/clear/:userId", cartController.clearCart);

module.exports = router;
