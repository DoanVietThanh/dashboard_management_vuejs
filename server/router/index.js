const express = require('express');
const productRouter = require('./product.route');
const userRouter = require('./user.route');

const appRouter = express.Router();

appRouter.use('/users', userRouter);
appRouter.use('/products', productRouter);

module.exports = appRouter;
