const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const swaggerSetup = require('./swagger');

const app = express();
app.use(bodyParser.json());
app.use(userRoutes);
app.use(categoryRoutes);
app.use(productRoutes);

// Configura o Swagger
swaggerSetup(app);

module.exports = app;
