const express = require('express');
const {
  loginUser,
  registerUser,
  deleteUser,
  getUser,
  getAllUsers,
  updateUser,
} = require('./user.ctrl');

const userRouter = express.Router();

userRouter.post('/login', loginUser);
userRouter.post('/register', registerUser);
userRouter.get('/', getAllUsers);

userRouter.get('/:userId', getUser);
userRouter.put('/:userId', updateUser);
userRouter.delete('/:userId', deleteUser);

module.exports = userRouter;
