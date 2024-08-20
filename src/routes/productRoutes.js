const express = require('express');
const { getProducts, getProductById, createProduct, updateProduct } = require('../controllers/ProductController');
const { authToken } = require('../middleware/authToken');
const { authAdmin } = require('../middleware/authAdmin');

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Endpoints for managing products
 */

/**
 * @swagger
 * /v1/product/search:
 *   get:
 *     summary: Retrieve a list of products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of products to return
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: Comma-separated list of fields to include in the response
 *       - in: query
 *         name: match
 *         schema:
 *           type: string
 *         description: Search term to match against product names and descriptions
 *       - in: query
 *         name: category_ids
 *         schema:
 *           type: string
 *         description: Comma-separated list of category IDs to filter products by
 *       - in: query
 *         name: price-range
 *         schema:
 *           type: string
 *         description: Price range filter in the format "min-max"
 *       - in: query
 *         name: option[]
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         description: Array of product options to filter by
 *     responses:
 *       200:
 *         description: A list of products
 *       400:
 *         description: Invalid query parameters
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.get('/v1/product/search', getProducts);

/**
 * @swagger
 * /v1/product/{id}:
 *   get:
 *     summary: Retrieve a single product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The product ID
 *     responses:
 *       200:
 *         description: A single product
 *       400:
 *         description: Invalid product ID
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.get('/v1/product/:id', getProductById);

/**
 * @swagger
 * /v1/product:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - slug
 *               - price
 *               - category_ids
 *             properties:
 *               enabled:
 *                 type: boolean
 *                 default: true
 *               name:
 *                 type: string
 *               slug:
 *                 type: string
 *               stock:
 *                 type: integer
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               price_with_discount:
 *                 type: number
 *               category_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Invalid data provided
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/v1/product', authToken, authAdmin, createProduct);

/**
 * @swagger
 * /v1/product/{id}:
 *   put:
 *     summary: Update an existing product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               enabled:
 *                 type: boolean
 *               name:
 *                 type: string
 *               slug:
 *                 type: string
 *               stock:
 *                 type: integer
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               price_with_discount:
 *                 type: number
 *               category_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       204:
 *         description: Product updated successfully
 *       400:
 *         description: Invalid data provided
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.put('/v1/product/:id', authToken, authAdmin, updateProduct);

module.exports = router;