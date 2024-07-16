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

const isValidLoginRequest = [
  body('email')
    .notEmpty()
    .withMessage('Email is mandatory')
    .isEmail()
    .withMessage('Format Email should be abc@gmail.com'),
  body('password')
    .notEmpty()
    .withMessage('Password is mandatory')
    .isLength({ min: 8 })
    .withMessage('Length of password should be more than 8 characters'),
  handleValidationErrors,
];

const isValidUserFormRequest = [
  body('email')
    .notEmpty()
    .withMessage('Email is mandatory')
    .isEmail()
    .withMessage('Format Email should be abc@gmail.com'),
  body('password')
    .notEmpty()
    .withMessage('Password is mandatory')
    .isLength({ min: 8 })
    .withMessage('Length of password should be more than 8 characters'),
  body('userName')
    .notEmpty()
    .withMessage('Please input your user name!')
    .isLength({ min: 4 })
    .withMessage('Length of user name is more than 4'),
  body('role')
    .notEmpty()
    .withMessage('Please select your role!')
    .isIn(['user', 'admin', 'userAdmin', 'productAdmin'])
    .withMessage('Invalid role selected'),
  body('address')
    .notEmpty()
    .withMessage('Please input your address!')
    .isLength({ min: 8 })
    .withMessage('Length of address is more than 8'),
  body('phoneNumber')
    .notEmpty()
    .withMessage('Phone number is mandatory')
    .isLength({ min: 10 })
    .withMessage('Length of phone number should be more than 10')
    .matches(/^0[1-9][0-9]{8}$/)
    .withMessage('Invalid phone number format!'),
  handleValidationErrors,
];

module.exports = {
  isValidLoginRequest,
  isValidUserFormRequest,
};
