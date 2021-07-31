const express = require('express');
const controller = require('./user.controller');

const router = express.Router();

router.post('/register', controller.register);
router.post('/login', controller.login);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);

module.exports = router;