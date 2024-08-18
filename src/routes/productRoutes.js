const express = require('express');
const { getProducts } = require('../controllers/ProductController');

const router = express.Router();

router.get('/v1/product/search', getProducts);

module.exports = router;