const filmeRepository = require('../repositories/filmeRepository');

async function listarFilmes(busca, genero) {
    return await filmeRepository.listar(busca, genero);
}

async function buscarFilme(id) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
        throw new Error('ID de filme inválido.');
    }

    const filme = await filmeRepository.buscarPorId(Number(id));

    if (!filme) {
        throw new Error('Filme não encontrado.');
    }

    return filme;
}

async function listarDestaques() {
    return await filmeRepository.buscarDestaques();
}

async function listarGeneros() {
    return await filmeRepository.listarGeneros();
}

module.exports = {
    listarFilmes,
    buscarFilme,
    listarDestaques,
    listarGeneros
};
