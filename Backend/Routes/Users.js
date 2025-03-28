// Backend/Routes/Users.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/Users"); // assuming Users controller file

// Public routes (no auth required)
router.post("/signup", userController.signup);
router.post("/login", userController.login);

// Protected routes (require JWT auth middleware)
router.get("/profile", userController.getProfile); // will secure with middleware
router.put("/update-password", userController.updatePassword); // secure with middleware

module.exports = router;
