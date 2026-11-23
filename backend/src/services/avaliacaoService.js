const avaliacaoRepository = require('../repositories/avaliacaoRepository');
const filmeRepository = require('../repositories/filmeRepository');

async function listar(filmeId) {
    if (!Number.isInteger(Number(filmeId)) || Number(filmeId) <= 0) {
        throw new Error('ID de filme inválido.');
    }

    const filme = await filmeRepository.buscarPorId(Number(filmeId));

    if (!filme) {
        throw new Error('Filme não encontrado.');
    }

    return await avaliacaoRepository.listarPorFilme(Number(filmeId));
}

async function avaliar(usuarioId, filmeId, nota, comentario) {
    filmeId = Number(filmeId);

    if (!Number.isInteger(filmeId) || filmeId <= 0) {
        throw new Error('ID de filme inválido.');
    }

    if (!Number.isInteger(nota) || nota < 1 || nota > 5) {
        throw new Error('A nota deve ser um número inteiro entre 1 e 5.');
    }

    if (comentario !== undefined && comentario !== null &&
        typeof comentario !== 'string') {
        throw new Error('Comentário inválido.');
    }

    const filme = await filmeRepository.buscarPorId(filmeId);

    if (!filme) {
        throw new Error('Filme não encontrado.');
    }

    return await avaliacaoRepository.criar(
        usuarioId,
        filmeId,
        nota,
        comentario?.trim() || null
    );
}

async function remover(usuarioId, filmeId) {
    filmeId = Number(filmeId);

    if (!Number.isInteger(filmeId) || filmeId <= 0) {
        throw new Error('ID de filme inválido.');
    }

    const avaliacao = await avaliacaoRepository.remover(
        usuarioId,
        filmeId
    );

    if (!avaliacao) {
        throw new Error('Avaliação não encontrada.');
    }

    return avaliacao;
}

module.exports = {
    listar,
    avaliar,
    remover
};
