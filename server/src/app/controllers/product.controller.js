const productService = require("../services/products.service");
const logger = require("../config/logger"); // Integrate logger
const { validationResult } = require("express-validator");

// Add a new product
exports.createProduct = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }
  
      const product = await productService.createProduct(req.body);
      logger.info("Product created successfully", { product });
      res.status(201).json({ success: true, data: product });
    } catch (error) {
      logger.error("Error creating product", { error });
      next(error);
    }
  };
  

// Get all products with pagination
exports.getAllProducts = async (req, res, next) => {
    try {
      const { page = 1, limit = 10, category, isFeatured } = req.query;
      const filters = {};
      if (category) filters.category = category;
      if (isFeatured) filters.isFeatured = isFeatured === "true";
  
      const { products, total } = await productService.getAllProducts(
        filters,
        parseInt(page),
        parseInt(limit)
      );
  
      res.status(200).json({
        success: true,
        data: products,
        meta: { total, page: parseInt(page), limit: parseInt(limit) },
      });
    } catch (error) {
      logger.error("Error fetching products", { error });
      next(error);
    }
  };
  

// Get a single product by ID
exports.getProductById = async (req, res, next) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    logger.error("Error fetching product by ID", { error });
    next(error);
  }
};

// Update a product
exports.updateProduct = async (req, res, next) => {
    try {
      const product = await productService.updateProduct(req.params.id, req.body);
      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
      res.status(200).json({ success: true, data: product });
    } catch (error) {
      logger.error("Error updating product", { error });
      next(error);
    }
  };
  

// Delete a product
exports.deleteProduct = async (req, res, next) => {
    try {
      const product = await productService.deleteProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
      res.status(200).json({ success: true, message: "Product marked as deleted" });
    } catch (error) {
      logger.error("Error deleting product", { error });
      next(error);
    }
  };
  
