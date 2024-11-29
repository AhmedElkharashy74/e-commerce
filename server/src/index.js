const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("./app/middlewares/rateLimit.middleware");
// const routes = require("./app/routes"); // Main routes
const { connectDatabase } = require("./config/database");
const logger = require("./config/logger");
const {errorHandler} = require('./app/middlewares/error.middleware')
const app = express();

// Middleware
app.use(express.json()); // Body Parser
app.use(cors()); // Cross-Origin Resource Sharing
app.use(helmet()); // Security Headers
app.use(compression()); // GZIP Compression
app.use(rateLimit); // Rate Limiting

// Database Connection
connectDatabase();

// API Routes
// app.use("/api", routes);

// Error Handling Middleware
app.use(errorHandler);

// Export App Instance
module.exports = app;
