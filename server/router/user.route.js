const express = require('express');
const { createUser, getUsers } = require('../controller/user.ctrl');

const userRouter = express.Router();

userRouter.post('/', createUser);
userRouter.get('/', getUsers);

module.exports = userRouter;
