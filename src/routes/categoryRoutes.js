const express = require('express');
const { getCategories, getCategoryById, createCategory } = require('../controllers/CategoryController');

const router = express.Router();

router.get('/v1/category/search', getCategories);
router.get('/v1/category/:id', getCategoryById);
router.post('/v1/category', createCategory);

module.exports = router;
