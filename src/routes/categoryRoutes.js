const express = require('express');
const { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require('../controllers/CategoryController');
const { authToken } = require('../middleware/authToken');
const { authAdmin } = require('../middleware/authAdmin');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Gerenciamento de categorias
 */

/**
 * @swagger
 * /v1/category/search:
 *   get:
 *     summary: Retorna uma lista de categorias
 *     tags: [Categories]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Número de categorias por página.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Página dos resultados
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: Campos a serem retornados
 *       - in: query
 *         name: use_in_menu
 *         schema:
 *           type: string
 *         description: Filtra as categorias que estão ou não no menu.
 *     responses:
 *       200:
 *         description: Lista de categorias retornada com sucesso.
 *       400:
 *         description: Parâmetros inválidos.
 *       500:
 *         description: Erro interno do servidor.
 */
router.get('/v1/category/search', getCategories);

/**
 * @swagger
 * /v1/category/{id}:
 *   get:
 *     summary: Retorna uma categoria pelo ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da categoria
 *     responses:
 *       200:
 *         description: Categoria encontrada
 *       404:
 *         description: Categoria não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/v1/category/:id', getCategoryById);

/**
 * @swagger
 * /v1/category:
 *   post:
 *     summary: Cria uma nova categoria.
 *     tags: [Category]
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
 *               - use_in_menu
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome da categoria.
 *               slug:
 *                 type: string
 *                 description: Slug da categoria.
 *               use_in_menu:
 *                 type: boolean
 *                 description: Define se a categoria é usada no menu.
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso.
 *       400:
 *         description: Dados inválidos.
 *       401:
 *         description: Token de autorização necessário.
 *       500:
 *         description: Erro interno do servidor.
 */
router.post('/v1/category', authToken, authAdmin, createCategory);

/**
 * @swagger
 * /v1/category/{id}:
 *   put:
 *     summary: Atualiza uma categoria existente.
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da categoria a ser atualizada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome da categoria.
 *               slug:
 *                 type: string
 *                 description: Slug da categoria.
 *               use_in_menu:
 *                 type: boolean
 *                 description: Define se a categoria é usada no menu.
 *     responses:
 *       204:
 *         description: Categoria atualizada com sucesso.
 *       400:
 *         description: Dados inválidos.
 *       401:
 *         description: Token de autorização necessário.
 *       404:
 *         description: Categoria não encontrada.
 *       500:
 *         description: Erro interno do servidor.
 */
router.put('/v1/category/:id', authToken, authAdmin, updateCategory);

/**
 * @swagger
 * /v1/category/{id}:
 *   delete:
 *     summary: Deleta uma categoria existente.
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da categoria a ser deletada.
 *     responses:
 *       204:
 *         description: Categoria deletada com sucesso.
 *       401:
 *         description: Token de autorização necessário.
 *       404:
 *         description: Categoria não encontrada.
 *       500:
 *         description: Erro interno do servidor.
 */
router.delete('/v1/category/:id', authToken, authAdmin, deleteCategory);

module.exports = router;
