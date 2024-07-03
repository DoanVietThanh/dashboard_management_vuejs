const { Product } = require('../../models');

const isExistingProductByName = async (productName) => {
  const product = await Product.findOne({ where: { productName } });
  return product;
};

const isExistingProductById = async (productId) => {
  const product = await Product.findOne({ where: { id: productId } });
  return !!product;
};

const createProductService = async (data) => {
  const product = await Product.create({
    productName: data.productName,
    price: data.price,
    description: data.description,
    urlImage: data.urlImage,
  });
  return product;
};

const getAllProductsService = async () => {
  const products = await Product.findAll();
  return products;
};

const getProductService = async (productId) => {
  const product = await Product.findOne({ where: { id: productId } });
  return product;
};

const updateProductService = async (productId, data) => {
  const [numberOfAffectedRows, affectedRows] = await Product.update(data, {
    where: { id: productId },
    returning: true,
  });
  if (numberOfAffectedRows > 0) {
    return affectedRows[0];
  }
  return null;
};

const deleteProductService = async (productId) => {
  const product = await Product.destroy({ where: { id: productId } });
  return product;
};

module.exports = {
  isExistingProductByName,
  isExistingProductById,
  createProductService,
  getAllProductsService,
  getProductService,
  updateProductService,
  deleteProductService,
};
