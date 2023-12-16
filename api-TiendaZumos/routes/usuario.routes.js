// usuario.route.js
const express = require('express');
const router = express.Router();
const verificarToken = require('../middleware/verificarToken');
const usuarioController = require('../controllers/usuario.controller');

router.post('/', usuarioController.createUser);
router.get('/lista', verificarToken, usuarioController.getUsersList);
router.get('/:id', verificarToken, usuarioController.getUserById);
router.put('/:id', verificarToken, usuarioController.updateUser);
router.delete('/:id', verificarToken, usuarioController.deleteUser);

module.exports = router;
