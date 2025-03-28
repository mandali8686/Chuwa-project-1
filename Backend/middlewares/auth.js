// Backend/middleware/auth.js
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  // Expect header format: "Bearer <token>"
  const token = authHeader && authHeader.split(" ")[1]; // split to get token string
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }
  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    // Attach user info to request (you can attach entire decoded payload or specific fields)
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next(); // token is valid, proceed to the next handler
  } catch (err) {
    return res.status(401).json({ message: "Invalid token." });
  }
}

module.exports = authMiddleware;
