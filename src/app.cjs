const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes.cjs');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(bodyParser.json());
app.use(userRoutes);
app.use(categoryRoutes);
app.use(productRoutes);

module.exports = app;
