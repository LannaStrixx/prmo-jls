const express = require('express');
const router = express.Router();

const favoritoController = require('../controllers/favoritoController');
const autenticar = require('../middlewares/autenticacao');

router.use(autenticar);

// Listar favoritos do usuário
router.get('/', favoritoController.listar);

// Adicionar favorito
router.post('/', favoritoController.adicionar);

// Remover favorito
router.delete('/:filmeId', favoritoController.remover);

module.exports = router;
