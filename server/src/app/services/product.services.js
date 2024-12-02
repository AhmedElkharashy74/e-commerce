const Product = require("../entities/product.entity");

// Service to create a new product
exports.createProduct = async (productData) => {
    try {
      const product = new Product(productData);
      return await product.save();
    } catch (error) {
      throw new Error("Error creating product: " + error.message);
    }
  };

// Service to fetch all products with pagination
exports.getAllProducts = async (filters, page, limit) => {
    try {
      const query = { isDeleted: false, ...filters };
      const products = await Product.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .select("name price category isFeatured stock")
        .lean();
      const total = await Product.countDocuments(query);
      return { products, total };
    } catch (error) {
      throw new Error("Error fetching products: " + error.message);
    }
  };
  

// Service to fetch a single product by ID
exports.getProductById = async (id) => {
  return await Product.findById(id);
};

// Service to update a product
exports.updateProduct = async (id, productData) => {
  return await Product.findByIdAndUpdate(id, productData, {
    new: true,
    runValidators: true,
  });
};

// Service to delete a product
exports.deleteProduct = async (id) => {
    try {
      return await Product.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
      );
    } catch (error) {
      throw new Error("Error deleting product: " + error.message);
    }
  };
