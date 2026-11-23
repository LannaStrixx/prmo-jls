const favoritoRepository = require('../repositories/favoritoRepository');
const filmeRepository = require('../repositories/filmeRepository');

async function listar(usuarioId) {
    return await favoritoRepository.listarPorUsuario(usuarioId);
}

async function adicionar(usuarioId, filmeId) {
    if (!Number.isInteger(Number(filmeId)) || Number(filmeId) <= 0) {
        throw new Error('ID de filme inválido.');
    }

    const filme = await filmeRepository.buscarPorId(Number(filmeId));

    if (!filme) {
        throw new Error('Filme não encontrado.');
    }

    const favorito = await favoritoRepository.adicionar(
        usuarioId,
        Number(filmeId)
    );

    if (!favorito) {
        throw new Error('Este filme já está nos favoritos.');
    }

    return favorito;
}

async function remover(usuarioId, filmeId) {
    if (!Number.isInteger(Number(filmeId)) || Number(filmeId) <= 0) {
        throw new Error('ID de filme inválido.');
    }

    const favorito = await favoritoRepository.remover(
        usuarioId,
        Number(filmeId)
    );

    if (!favorito) {
        throw new Error('Filme não encontrado nos favoritos.');
    }

    return favorito;
}

module.exports = {
    listar,
    adicionar,
    remover
};
