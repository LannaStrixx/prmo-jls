const express = require('express');
const router = express.Router();

const filmeController = require('../controllers/filmeController');

// Listar todos os filmes
router.get('/', filmeController.listar);

// Listar filmes em destaque
router.get('/destaques', filmeController.destaques);

// Listar gêneros disponíveis
router.get('/generos', filmeController.generos);

// Buscar detalhes de um filme
router.get('/:id', filmeController.buscarPorId);

module.exports = router;
