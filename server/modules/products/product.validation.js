const { body, validationResult } = require('express-validator');

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

const isValidProductFormRequest = [
  body('name')
    .notEmpty()
    .withMessage('Please input product name!')
    .isLength({ min: 4 })
    .withMessage('Length of name is more than 4'),
  body('price').notEmpty().withMessage('Please input product price!'),
  body('description')
    .notEmpty()
    .withMessage('Please input product description!')
    .isLength({ min: 4 })
    .withMessage('Length of description is more than 4'),
  body('urlImage').notEmpty().withMessage('Please input product image URL!'),
  handleValidationErrors,
];

module.exports = { isValidProductFormRequest };
