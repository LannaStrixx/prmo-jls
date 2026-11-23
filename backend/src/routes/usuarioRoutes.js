const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController');
const autenticar = require('../middlewares/autenticacao');

router.post('/cadastro', usuarioController.cadastrar);

router.post('/login', usuarioController.login);

router.get('/perfil', autenticar, usuarioController.perfil);

router.put('/perfil', autenticar, usuarioController.atualizarPerfil);

module.exports = router;
