const { sequelize } = require('./models');
const express = require('express');
const bodyParser = require('body-parser');
const appRouter = require('./app.router');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', appRouter);

app.listen(PORT, async () => {
  console.log(`Server started on port ${PORT}`);
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
});
