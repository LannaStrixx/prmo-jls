const filmeService = require('../services/filmeService');

async function listar(req, res) {
    try {
        const { busca, genero } = req.query;

        const filmes = await filmeService.listarFilmes(busca, genero);

        return res.status(200).json(filmes);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            erro: 'Erro ao listar filmes.'
        });
    }
}

async function buscarPorId(req, res) {
    try {
        const filme = await filmeService.buscarFilme(req.params.id);

        return res.status(200).json(filme);

    } catch (error) {
        const status = error.message === 'Filme não encontrado.' ? 404 : 400;

        return res.status(status).json({
            erro: error.message
        });
    }
}

async function destaques(req, res) {
    try {
        const filmes = await filmeService.listarDestaques();

        return res.status(200).json(filmes);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            erro: 'Erro ao buscar filmes em destaque.'
        });
    }
}

async function generos(req, res) {
    try {
        const lista = await filmeService.listarGeneros();

        return res.status(200).json(lista);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            erro: 'Erro ao listar gêneros.'
        });
    }
}

module.exports = {
    listar,
    buscarPorId,
    destaques,
    generos
};
