const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', usuariosController.createUsuario);
router.get('/',  usuariosController.findUsuarios);


router.post('/login', usuariosController.login);

module.exports = router;