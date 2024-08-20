const express = require('express');
const { getProducts, getProductById, createProduct, updateProduct } = require('../controllers/ProductController');
const { authToken } = require('../middleware/authToken');
const { authAdmin } = require('../middleware/authAdmin');

const router = express.Router();

router.get('/v1/product/search', getProducts);
router.get('/v1/product/:id', getProductById);
router.post('/v1/product', authToken, authAdmin, createProduct);
router.put('/v1/product/:id', authToken, authAdmin, updateProduct);

module.exports = router;