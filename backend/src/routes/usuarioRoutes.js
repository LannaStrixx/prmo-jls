const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController');
const autenticar = require('../middlewares/autenticacao');

// Cadastro
router.post('/cadastro', usuarioController.cadastrar);

// Login
router.post('/login', usuarioController.login);

// Perfil protegido
router.get('/perfil', autenticar, usuarioController.perfil);

module.exports = router;
