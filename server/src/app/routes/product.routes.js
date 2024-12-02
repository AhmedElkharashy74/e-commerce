const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const { authenticateUser, authorize } = require("../middlewares/auth.middleware");
const { validateProduct } = require("../validations/product.validation");

const router = express.Router();

// Add a new product (Admin only)
router.post("/", authenticateUser, authorize("admin"), validateProduct, createProduct);

// Get all products with pagination
router.get("/", getAllProducts);

// Get a single product by ID
router.get("/:id", getProductById);

// Update a product (Admin only)
router.patch("/:id", authenticateUser, authorize("admin"), validateProduct, updateProduct);

// Delete a product (Admin only)
router.delete("/:id", authenticateUser, authorize("admin"), deleteProduct);

module.exports = router;
