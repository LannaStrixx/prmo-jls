const favoritoService = require('../services/favoritoService');

async function listar(req, res) {
    try {
        const favoritos = await favoritoService.listar(req.usuario.id);

        return res.status(200).json(favoritos);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            erro: 'Erro ao buscar favoritos.'
        });
    }
}

async function adicionar(req, res) {
    try {
        const { filmeId } = req.body;

        const favorito = await favoritoService.adicionar(
            req.usuario.id,
            filmeId
        );

        return res.status(201).json({
            mensagem: 'Filme adicionado aos favoritos!',
            favorito
        });

    } catch (error) {
        const status = error.message === 'Filme não encontrado.' ? 404 : 400;

        return res.status(status).json({
            erro: error.message
        });
    }
}

async function remover(req, res) {
    try {
        await favoritoService.remover(
            req.usuario.id,
            req.params.filmeId
        );

        return res.status(200).json({
            mensagem: 'Filme removido dos favoritos!'
        });

    } catch (error) {
        const status = error.message.includes('não encontrado') ? 404 : 400;

        return res.status(status).json({
            erro: error.message
        });
    }
}

module.exports = {
    listar,
    adicionar,
    remover
};
