const express = require('express');
const { getUserById, createUser } = require('../controllers/UserController.cjs');

const router = express.Router();

router.get('/v1/user/:id', getUserById);
router.post('/v1/user', createUser);

module.exports = router;
