const { Product } = require('../models');
const createProduct = async (req, res) => {
  try {
    const { productName, price, description, brand } = req.body;
    if (!productName || !price || !description || !brand) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const existingProduct = await Product.findOne({
      where: { productName },
    });
    if (existingProduct) {
      return res.status(409).json({ message: 'Product already exists' });
    }
    const product = await Product.create({
      productName,
      price,
      description,
      brand,
    });
    return res.status(201).json({
      data: product,
      message: 'Product created successfully',
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    return res.status(200).json({
      data: products,
      message: 'Get All Products successfully',
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

const getProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findOne({ where: { id: productId } });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json({
      data: product,
      message: 'Get Product successfully',
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findOne({ where: { id: productId } });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await product.destroy();
    return res.status(200).json({
      data: product,
      message: 'Product deleted successfully',
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { productName, price, description, brand } = req.body;

    if (!productName || !price || !brand || !description) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const product = await Product.findOne({ where: { id: productId } });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    product.productName = productName;
    product.price = price;
    product.brand = brand;
    product.description = description;
    await product.save();
    return res.status(200).json({
      data: product,
      message: 'Product updated successfully',
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
