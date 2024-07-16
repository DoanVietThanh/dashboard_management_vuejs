const express = require('express');
const {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} = require('./product.ctrl');
const {
  checkCreateProductRequest,
  checkUpdateProductRequest,
} = require('./product.validation');

const productRouter = express.Router();

productRouter.post('/', checkCreateProductRequest, createProduct);
productRouter.get('/', getAllProducts);
productRouter.get('/:productId', getProduct);
productRouter.put('/:productId', checkUpdateProductRequest, updateProduct);
productRouter.delete('/:productId', deleteProduct);

module.exports = productRouter;
