const express = require('express');
const userRouter = require('./modules/users/user.route');
const productRouter = require('./modules/products/product.route');

const appRouter = express.Router();

appRouter.use('/users', userRouter);
appRouter.use('/products', productRouter);

module.exports = appRouter;
