const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/products.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");
const { validateProduct } = require("../validations/products.validation");

const router = express.Router();

// Add a new product (Admin only)
router.post("/", authenticate, authorize("admin"), validateProduct, createProduct);

// Get all products with pagination
router.get("/", getAllProducts);

// Get a single product by ID
router.get("/:id", getProductById);

// Update a product (Admin only)
router.patch("/:id", authenticate, authorize("admin"), validateProduct, updateProduct);

// Delete a product (Admin only)
router.delete("/:id", authenticate, authorize("admin"), deleteProduct);

module.exports = router;
