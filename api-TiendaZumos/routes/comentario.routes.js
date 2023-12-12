// comentario.route.js

const express = require('express');
const router = express.Router();
const verificarToken = require('../middleware/verificarToken');
const comentarioController = require('../controllers/comentario.controller');

router.post('/', verificarToken, comentarioController.createComentario);
router.get('/lista', verificarToken, comentarioController.getComentariosLista);
router.get('/:id', verificarToken, comentarioController.getComentarioById);
router.get('/usuario/:id', verificarToken, comentarioController.getComentariosByUsuarioId);
router.get('/zumo/:id', verificarToken, comentarioController.getComentariosByZumoId);
router.patch('/:id', verificarToken, comentarioController.updateComentario);
router.delete('/:id', verificarToken, comentarioController.deleteComentario);

module.exports = router;
