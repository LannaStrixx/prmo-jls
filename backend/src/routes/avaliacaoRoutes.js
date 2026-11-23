const express = require('express');
const router = express.Router();

const avaliacaoController = require('../controllers/avaliacaoController');
const autenticar = require('../middlewares/autenticacao');

// Consultar avaliações de um filme
router.get('/filme/:filmeId', avaliacaoController.listar);

// Rotas que exigem autenticação
router.post('/', autenticar, avaliacaoController.avaliar);
router.delete('/:filmeId', autenticar, avaliacaoController.remover);

module.exports = router;
