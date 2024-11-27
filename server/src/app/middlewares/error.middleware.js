// src/app/middlewares/error.middleware.js
const logger = require("../../config/logger");

// Generic Error Handler Middleware
const errorHandler = (err, req, res, next) => {
  // Log the error (stack trace and message) using the logger
  logger.error(err.stack || err.message);

  // Set the default status code (500 - Internal Server Error)
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong, please try again later.";

  // Send the error response to the client
  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }), // Include stack trace only in development
  });
};

// Custom Error Class for different types of errors
class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 400;  // Default to 400 if not provided
    this.name = this.constructor.name;
  }
}

// Utility function to create custom errors
const createError = (message, statusCode) => {
  return new CustomError(message, statusCode);
};

// Export the middleware and utility functions
module.exports = { errorHandler, createError };
