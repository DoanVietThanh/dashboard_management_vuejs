const { body, validationResult } = require('express-validator');

const productValidationRequest = {
  productName: body('productName')
    .notEmpty()
    .withMessage('Please input product name!')
    .isLength({ min: 4 })
    .withMessage('Length of product name is more than 4'),
  price: body('price').notEmpty().withMessage('Please input product price!'),
  description: body('description')
    .notEmpty()
    .withMessage('Please input product description!')
    .isLength({ min: 4 })
    .withMessage('Length of description is more than 4'),
  urlImage: body('urlImage')
    .notEmpty()
    .withMessage('Please input product image URL!'),
};

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors
      .array()
      .reduce((acc, error) => `${acc} ${error.msg}. `, '');
    return res
      .status(400)
      .json({ data: null, success: false, message: message.trim() });
  }
  next();
};

const checkCreateProductRequest = [
  productValidationRequest.productName,
  productValidationRequest.price,
  productValidationRequest.description,
  productValidationRequest.urlImage,
  handleValidationErrors,
];

const checkUpdateProductRequest = [...checkCreateProductRequest];

module.exports = { checkCreateProductRequest, checkUpdateProductRequest };
