const express = require('express');
const router = express.Router();
const compraController = require('../controllers/comprasController'); 

router.post('/', compraController.realizarCompra);
router.get('/:userId', compraController.getComprasUsuario); 

module.exports = router;
