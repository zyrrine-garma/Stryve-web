const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization denied" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password"); // attach user to request, exclude password

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next(); // proceed to the protected route
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;
    