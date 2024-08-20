const express = require('express');
const { getUserById, createUser, updateUser, deleteUser } = require('../controllers/UserController');
const { getToken } = require('../controllers/AuthController');
const { authToken } = require('../middleware/authToken');

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and authentication
 */

/**
 * @swagger
 * /v1/user/token:
 *   post:
 *     summary: Generate a JWT token for user authentication
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Token generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */
router.post('/v1/user/token', getToken);

/**
 * @swagger
 * /v1/user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.get('/v1/user/:id', getUserById);

/**
 * @swagger
 * /v1/user/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               surname:
 *                 type: string
 *               email:
 *                 type: string
 *             required:
 *               - firstname
 *               - surname
 *               - email
 *     responses:
 *       204:
 *         description: User updated successfully
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized, token missing or invalid
 *       404:
 *         description: User not found
 */
router.put('/v1/user/:id', authToken, updateUser);

/**
 * @swagger
 * /v1/user:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               surname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *             required:
 *               - firstname
 *               - surname
 *               - email
 *               - password
 *               - confirmPassword
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid request body or email already exists
 *       500:
 *         description: Internal server error
 */
router.post('/v1/user', createUser);

/**
 * @swagger
 * /v1/user:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               surname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *             required:
 *               - firstname
 *               - surname
 *               - email
 *               - password
 *               - confirmPassword
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid request body or email already exists
 *       500:
 *         description: Internal server error
 */
router.post('/v1/user', createUser);

/**
 * @swagger
 * /v1/user/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       400:
 *         description: User ID is required
 *       401:
 *         description: Unauthorized, token missing or invalid
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.delete('/v1/user/:id', authToken, deleteUser);

module.exports = router;
