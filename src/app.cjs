const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes.cjs');

const app = express();
app.use(bodyParser.json());
app.use(userRoutes);

module.exports = app;
