const express = require('express');
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require('../controller/product.ctrl');

const productRouter = express.Router();

productRouter.get('/', getProducts);
productRouter.get('/:productId', getProduct);
productRouter.post('/', createProduct);
productRouter.put('/:productId', updateProduct);
productRouter.delete('/:productId', deleteProduct);

module.exports = productRouter;
