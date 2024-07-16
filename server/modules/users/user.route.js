const express = require('express');
const {
  loginUser,
  registerUser,
  deleteUser,
  getUser,
  getAllUsers,
  updateUser,
  createUser,
} = require('./user.ctrl');
const {
  checkLoginRequest,
  checkRegisterRequest,
  checkCreateUserRequest,
  checkUpdateUserRequest,
} = require('./user.validation');

const userRouter = express.Router();

userRouter.post('/login', checkLoginRequest, loginUser);
userRouter.post('/register', checkRegisterRequest, registerUser);
userRouter.post('/', checkCreateUserRequest, createUser);
userRouter.get('/', getAllUsers);

userRouter.get('/:userId', getUser);
userRouter.put('/:userId', checkUpdateUserRequest, updateUser);
userRouter.delete('/:userId', deleteUser);

module.exports = userRouter;
