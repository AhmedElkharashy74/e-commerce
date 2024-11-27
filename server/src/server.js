const http = require("http");
const app = require("./index");
const logger = require("./config/logger");

// Environment Variables
const PORT = process.env.PORT || 3000;

// Create HTTP Server
const server = http.createServer(app);

// Start Server
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

// Handle Uncaught Exceptions and Rejections
process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception:", err.message);
  process.exit(1); // Exit process after logging
});

process.on("unhandledRejection", (reason) => {
  logger.error("Unhandled Rejection:", reason);
  server.close(() => process.exit(1)); // Graceful Shutdown
});
