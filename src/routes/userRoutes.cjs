const express = require('express');
const { getUserById } = require('../controllers/UserController.cjs');

const router = express.Router();

router.get('/v1/user/:id', getUserById);

module.exports = router;
