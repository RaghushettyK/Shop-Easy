const Product = require("../models/productModel");

// Helper function to standardize category names
const standardizeCategory = (category) => {
  const categories = {
    electronics: "electronics",
    jewelery: "jewelery",
    "men's clothing": "men's clothing",
    "women's clothing": "women's clothing",
    men: "men's clothing",
    women: "women's clothing",
    jewelry: "jewelery",
    electronic: "electronics"
  };
  
  return categories[category.toLowerCase()] || category.toLowerCase();
};

// Get all products (with optional category filtering via query parameter)
exports.getProducts = async (req, res) => {
  try {
    // Build query based on category if provided
    const query = {};
    if (req.query.category) {
      const standardizedCategory = standardizeCategory(req.query.category);
      query.category = standardizedCategory;
    }
    const products = await Product.find(query);  
    res.status(200).json(
        products
    );
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch products',
      error: err.message
    });
  }
};

// Get products by specific category
exports.getProductsByCategory = async (req, res) => {
  try {
    const standardizedCategory = standardizeCategory(req.params.category);
    
    const products = await Product.find({ category: standardizedCategory });
    
    if (products.length === 0) {
      return res.status(404).json({
        status: 'fail',
        message: 'No products found in this category'
      });
    }
    
    res.status(200).json(
        products
    );
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch products by category',
      error: err.message
    });
  }
};

// Get list of all available categories
exports.getProductCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category"); // Get unique categories from the database
    
    res.status(200).json(
        categories
    );
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch categories',
      error: err.message
    });
  }
};

// Get single product by ID
exports.getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        status: 'fail',
        message: 'Product not found'
      });
    }

    res.status(200).json(
        product
    );
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch product by ID',
      error: err.message
    });
  }
};

// Create new product
exports.createProduct = async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(
       savedProduct
    );
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to create product',
      error: err.message
    });
  }
};

// Update existing product
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({
        status: 'fail',
        message: 'Product not found'
      });
    }

    res.status(200).json(
       updatedProduct
      
    );
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to update product',
      error: err.message
    });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        status: 'fail',
        message: 'Product not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Product deleted successfully'
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete product',
      error: err.message
    });
  }
};
