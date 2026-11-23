const avaliacaoService = require('../services/avaliacaoService');

async function listar(req, res) {
    try {
        const avaliacoes = await avaliacaoService.listar(req.params.filmeId);

        return res.status(200).json(avaliacoes);

    } catch (error) {
        const status = error.message === 'Filme não encontrado.' ? 404 : 400;

        return res.status(status).json({
            erro: error.message
        });
    }
}

async function avaliar(req, res) {
    try {
        const { filmeId, nota, comentario } = req.body;

        const avaliacao = await avaliacaoService.avaliar(
            req.usuario.id,
            filmeId,
            nota,
            comentario
        );

        return res.status(200).json({
            mensagem: 'Avaliação registrada com sucesso!',
            avaliacao
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
        await avaliacaoService.remover(
            req.usuario.id,
            req.params.filmeId
        );

        return res.status(200).json({
            mensagem: 'Avaliação removida com sucesso!'
        });

    } catch (error) {
        const status = error.message === 'Avaliação não encontrada.' ? 404 : 400;

        return res.status(status).json({
            erro: error.message
        });
    }
}

module.exports = {
    listar,
    avaliar,
    remover
};
