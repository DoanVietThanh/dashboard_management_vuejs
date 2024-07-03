const express = require('express');
const {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} = require('./product.ctrl');

const productRouter = express.Router();

productRouter.post('/', createProduct);
productRouter.get('/', getAllProducts);
productRouter.get('/:productId', getProduct);
productRouter.put('/:productId', updateProduct);
productRouter.delete('/:productId', deleteProduct);

module.exports = productRouter;
