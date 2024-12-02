const { body } = require("express-validator");

exports.validateProduct = [
  body("name").notEmpty().withMessage("Product name is required"),
  body("price").isNumeric().withMessage("Price must be a number"),
  body("category").notEmpty().withMessage("Category is required"),
  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be a positive integer"),
];
