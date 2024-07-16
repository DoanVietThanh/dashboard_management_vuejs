const { body, validationResult } = require('express-validator');

const userValidationRequest = {
  email: body('email')
    .notEmpty()
    .withMessage('Email is mandatory')
    .isEmail()
    .withMessage('Format Email should be abc@gmail.com'),
  password: body('password')
    .notEmpty()
    .withMessage('Password is mandatory')
    .isLength({ min: 8 })
    .withMessage('Length of password should be more than 8 characters'),
  userName: body('userName')
    .notEmpty()
    .withMessage('Please input your user name!')
    .isLength({ min: 4 })
    .withMessage('Length of user name is more than 4'),
  role: body('role')
    .notEmpty()
    .withMessage('Please select your role!')
    .isIn(['user', 'admin', 'userAdmin', 'productAdmin'])
    .withMessage('Invalid role selected'),
  address: body('address')
    .notEmpty()
    .withMessage('Please input your address!')
    .isLength({ min: 8 })
    .withMessage('Length of address is more than 8'),
  phoneNumber: body('phoneNumber')
    .notEmpty()
    .withMessage('Phone number is mandatory')
    .isLength({ min: 10 })
    .withMessage('Length of phone number should be more than 10')
    .isNumeric()
    .withMessage('Invalid phone number format!'),
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

const checkLoginRequest = [
  userValidationRequest.email,
  userValidationRequest.password,
  handleValidationErrors,
];

const checkRegisterRequest = [
  userValidationRequest.email,
  userValidationRequest.password,
  userValidationRequest.userName,
  userValidationRequest.address,
  userValidationRequest.phoneNumber,
  handleValidationErrors,
];

const checkCreateUserRequest = [
  userValidationRequest.role,
  ...checkRegisterRequest,
];

const checkUpdateUserRequest = [...checkCreateUserRequest];

module.exports = {
  checkLoginRequest,
  checkRegisterRequest,
  checkCreateUserRequest,
  checkUpdateUserRequest,
};
