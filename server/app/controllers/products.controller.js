const Product = require("../models/product.model");

// Controller function to get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to add a new product
exports.addProduct = async (req, res) => {
  console.log('hi');
  try {
    // get the last product id from the database
    const lastProduct = await Product.findOne({}, {}, { sort: { 'productId': -1 } });
    const newProductId = lastProduct ? lastProduct.productId + 1 : 1;

    // add the new product with the generated productId
    const newProduct = await Product.create({ ...req.body, productId: newProductId });
    res.status(201).json({ success: true, message: "Product added successfully", data: newProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Controller function to update an existing product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to get all products by Scrum Master name
exports.getProductsByScrumMaster = async (req, res) => {
  try {
    const { name } = req.params;
    const products = await Product.find({ scrumMasterName: name });
    const totalProducts = products.length;
    res.json({ products, totalProducts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to search products by developer name
exports.searchProductsByDeveloper = async (req, res) => {
  try {
    const developerName = req.params.developerName;
    const products = await Product.find({ developers: developerName });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
