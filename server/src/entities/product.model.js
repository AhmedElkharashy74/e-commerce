const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true, // Index for faster search
    },
    price: {
      type: Number,
      required: true,
      index: true, // Useful for filtering and sorting
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      index: true, // Useful for category-based filtering
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    images: {
      type: [String], // Array of image URLs
      validate: {
        validator: (v) => Array.isArray(v) && v.every((url) => typeof url === "string"),
        message: "Images must be an array of strings.",
      },
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true, // Allows quick filtering of featured products
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for common queries (e.g., featured products within a category)
productSchema.index({ category: 1, isFeatured: -1 });

module.exports = mongoose.model("Product", productSchema);
