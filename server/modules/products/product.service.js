const { sequelize, Product } = require('../../models');

const isExistingProductByName = async (productName) => {
  const product = await Product.findOne({ where: { productName } });
  return product;
};

const isExistingProductById = async (productId) => {
  const product = await Product.findOne({ where: { id: productId } });
  return !!product;
};

const createProductService = async (data) => {
  const transaction = await sequelize.transaction();
  try {
    const product = await Product.create(
      {
        productName: data.productName,
        price: data.price,
        description: data.description,
        urlImage: data.urlImage,
      },
      { transaction }
    );

    await transaction.commit();
    return product;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
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
  const transaction = await sequelize.transaction();
  try {
    const [numberOfAffectedRows, affectedRows] = await Product.update(data, {
      where: { id: productId },
      returning: true,
      transaction,
    });

    await transaction.commit();
    if (numberOfAffectedRows > 0) {
      return affectedRows[0];
    }
    return null;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const deleteProductService = async (productId) => {
  const transaction = await sequelize.transaction();
  try {
    const product = await Product.destroy({
      where: { id: productId },
      transaction,
    });

    await transaction.commit();
    return product;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
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
