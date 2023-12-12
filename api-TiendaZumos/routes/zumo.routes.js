// zumo.route.js

const express = require('express');
const router = express.Router();
const verificarToken = require('../middleware/verificarToken');
const zumoController = require('../controllers/zumo.controller');

router.post('/', verificarToken, zumoController.createZumo);
router.get('/lista', verificarToken, zumoController.getZumosLista);
router.get('/:id', verificarToken, zumoController.getZumoById);
router.put('/:id', verificarToken, zumoController.updateZumo);
router.delete('/:id', verificarToken, zumoController.deleteZumo);

module.exports = router;
