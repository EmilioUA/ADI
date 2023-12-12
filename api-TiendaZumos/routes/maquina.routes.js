// maquina.route.js

const express = require('express');
const router = express.Router();
const verificarToken = require('../middleware/verificarToken');
const maquinaController = require('../controllers/maquina.controller');

router.post('/', verificarToken, maquinaController.createMaquina);
router.get('/lista', verificarToken, maquinaController.getMaquinasLista);
router.get('/:id', verificarToken, maquinaController.getMaquinaById);
router.put('/:id', verificarToken, maquinaController.updateMaquina);
router.patch('/reparaciones/:id', verificarToken, maquinaController.toggleAveriada);
router.patch('/rellenado/:id', verificarToken, maquinaController.rellenarMaquina);
router.delete('/:id', verificarToken, maquinaController.deleteMaquina);

module.exports = router;
