const db = require('../config/database');

async function listar(busca, genero) {
    let sql = 'SELECT * FROM filmes WHERE 1=1';
    const parametros = [];

    if (busca) {
        parametros.push(`%${busca}%`);
        sql += ` AND titulo ILIKE $${parametros.length}`;
    }

    if (genero) {
        parametros.push(genero);
        sql += ` AND genero ILIKE $${parametros.length}`;
    }

    sql += ' ORDER BY titulo ASC';

    const resultado = await db.query(sql, parametros);

    return resultado.rows;
}

async function buscarPorId(id) {
    const resultado = await db.query(
        'SELECT * FROM filmes WHERE id = $1',
        [id]
    );

    return resultado.rows[0];
}

async function buscarDestaques() {
    const resultado = await db.query(
        'SELECT * FROM filmes WHERE destaque = TRUE ORDER BY titulo ASC'
    );

    return resultado.rows;
}

async function listarGeneros() {
    const resultado = await db.query(
        `SELECT DISTINCT genero
         FROM filmes
         WHERE genero IS NOT NULL AND genero <> ''
         ORDER BY genero ASC`
    );

    return resultado.rows.map(item => item.genero);
}

module.exports = {
    listar,
    buscarPorId,
    buscarDestaques,
    listarGeneros
};
