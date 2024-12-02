const jwt = require("jsonwebtoken");
const logger = require("../../config/logger");

/**
 * Middleware to authenticate user using JWT
 */
const authenticateUser = (req, res, next) => {
  try {
    // Extract token from Authorization header (format: "Bearer <token>")
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      logger.warn("Unauthorized access attempt - Missing or malformed token", {
        ip: req.ip,
        endpoint: req.originalUrl,
      });
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1]; // Extract token

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data (decoded token payload) to the request

    logger.info("User authenticated successfully", {
      userId: decoded.userId,
      ip: req.ip,
      endpoint: req.originalUrl,
    });

    next(); // Allow request to proceed
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      logger.warn("Token expired", {
        ip: req.ip,
        endpoint: req.originalUrl,
        error: error.message,
      });
      return res.status(401).json({ message: "Token expired. Please login again." });
    } else if (error.name === "JsonWebTokenError") {
      logger.error("Invalid token", {
        ip: req.ip,
        endpoint: req.originalUrl,
        error: error.message,
      });
      return res.status(400).json({ message: "Invalid token." });
    } else {
      logger.error("Authentication error", {
        ip: req.ip,
        endpoint: req.originalUrl,
        error: error.message,
      });
      return res.status(500).json({ message: "An error occurred during authentication." });
    }
  }
};



const authorize = (roles = []) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        logger.warn("Unauthorized access attempt", {
          userId: req.user.userId,
          role: req.user.role,
          endpoint: req.originalUrl,
        });
        return res.status(403).json({ message: "Forbidden: Access denied." });
      }
      next();
    };
  };

module.exports = { authenticateUser , authorize};
