const {
  isExistingProductByName,
  createProductService,
  isExistingProductById,
  deleteProductService,
  getAllProductsService,
  getProductService,
  updateProductService,
} = require('./product.service');
const createProduct = async (req, res) => {
  const { productName, price, description, urlImage } = req.body;
  if (!productName || !price || !description || !urlImage) {
    return res
      .status(400)
      .json({ data: null, error: 'Missing required fields', status: 400 });
  }
  const existingProduct = await isExistingProductByName(productName);
  if (existingProduct) {
    return res
      .status(400)
      .json({ data: null, message: 'Product already exists', status: 400 });
  }
  const product = await createProductService(req.body);
  return res.json({
    data: product,
    message: 'Product created successfully',
    status: 200,
  });
};

const getAllProducts = async (req, res) => {
  const products = await getAllProductsService();
  return res.json({
    data: products,
    message: 'Get all products successfully',
    status: 200,
  });
};

const getProduct = async (req, res) => {
  const { productId } = req.params;
  if (!productId) {
    return res
      .status(400)
      .json({ data: null, message: 'Invalid product', status: 400 });
  }
  const existingProduct = await isExistingProductById(productId);
  if (!existingProduct) {
    return res
      .status(400)
      .json({ data: null, message: 'Product not found', status: 400 });
  }
  const product = await getProductService(productId);
  return res.json({
    data: product,
    message: 'Get product successfully',
    status: 200,
  });
};

const updateProduct = async (req, res) => {
  const { productId } = req.params;
  if (!productId) {
    return res
      .status(400)
      .json({ data: null, message: 'Invalid product', status: 400 });
  }
  const { productName, price, description, urlImage } = req.body;
  if (!productName || !price || !description || !urlImage) {
    return res
      .status(400)
      .json({ data: null, error: 'Missing required fields', status: 400 });
  }
  const existingProduct = await isExistingProductById(productId);
  if (!existingProduct) {
    return res
      .status(400)
      .json({ data: null, message: 'Product not found', status: 400 });
  }
  const product = await updateProductService(productId, req.body);
  return res.json({
    data: product,
    message: 'Product updated successfully',
    status: 200,
  });
};

const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  if (!productId) {
    return res
      .status(400)
      .json({ data: null, message: 'Invalid product', status: 400 });
  }
  const existingProduct = await isExistingProductById(productId);
  if (!existingProduct) {
    return res
      .status(400)
      .json({ data: null, message: 'Product not found', status: 400 });
  }
  await deleteProductService(productId);
  return res.json({
    data: null,
    message: 'Product deleted successfully',
    status: 200,
  });
};

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
