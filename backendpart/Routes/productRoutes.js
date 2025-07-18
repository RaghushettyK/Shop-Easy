const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");

// Get all products (with optional category filtering via query parameter)
// Example: /api/products?category=electronics
router.get("/", productController.getProducts);

// Get products by specific category
// Example: /api/products/category/electronics
router.get("/category/:category", productController.getProductsByCategory);

// Get list of all available categories
// Example: /api/products/categories
router.get("/categories", productController.getProductCategories);

// Get single product by ID
// Example: /api/products/:id
router.get("/:id", productController.getProductById);

// Create new product
router.post("/", productController.createProduct);

// Update existing product
router.put("/:id", productController.updateProduct);

// Delete product
router.delete("/:id", productController.deleteProduct);

module.exports = router;
