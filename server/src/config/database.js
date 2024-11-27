const mongoose = require("mongoose");
const logger = require("./logger");

const connectDatabase = async () => {
  try {
    const DB_URI = process.env.DB_URI || "mongodb://localhost:27017/ecommerce"; // MongoDB URI
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    logger.info("Connected to MongoDB successfully!");
  } catch (error) {
    logger.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the process if connection fails
  }
};

module.exports = { connectDatabase };
