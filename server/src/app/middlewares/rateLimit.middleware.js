const rateLimit = require("express-rate-limit");

// Create the rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later.", // Message when the limit is exceeded
  headers: true, // Add rate limit information to the response headers
});

// Export the middleware to use in the app
module.exports = limiter;
