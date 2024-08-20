const express = require('express');
const { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require('../controllers/CategoryController');
const { authToken } = require('../middleware/authToken');
const { authAdmin } = require('../middleware/authAdmin');

const router = express.Router();

router.get('/v1/category/search', getCategories);
router.get('/v1/category/:id', getCategoryById);
router.post('/v1/category', authToken, authAdmin, createCategory);
router.put('/v1/category/:id', authToken, authAdmin, updateCategory);
router.delete('/v1/category/:id', authToken, authAdmin, deleteCategory);

module.exports = router;
