const express = require('express');
const { getUserById, createUser, updateUser, deleteUser } = require('../controllers/UserController');
const { getToken } = require('../controllers/AuthController');
const { authToken } = require('../middleware/authToken');

const router = express.Router();

router.post('/v1/user/token', getToken);
router.get('/v1/user/:id', getUserById);
router.put('/v1/user/:id', authToken, updateUser);
router.post('/v1/user', createUser);
router.delete('/v1/user/:id', authToken, deleteUser);

module.exports = router;
