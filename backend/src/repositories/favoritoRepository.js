const db = require('../config/database');

async function listarPorUsuario(usuarioId) {
    const resultado = await db.query(
        `SELECT f.*
         FROM favoritos fav
         INNER JOIN filmes f ON f.id = fav.filme_id
         WHERE fav.usuario_id = $1
         ORDER BY fav.created_at DESC`,
        [usuarioId]
    );

    return resultado.rows;
}

async function adicionar(usuarioId, filmeId) {
    const resultado = await db.query(
        `INSERT INTO favoritos (usuario_id, filme_id)
         VALUES ($1, $2)
         ON CONFLICT (usuario_id, filme_id) DO NOTHING
         RETURNING *`,
        [usuarioId, filmeId]
    );

    return resultado.rows[0];
}

async function remover(usuarioId, filmeId) {
    const resultado = await db.query(
        `DELETE FROM favoritos
         WHERE usuario_id = $1 AND filme_id = $2
         RETURNING *`,
        [usuarioId, filmeId]
    );

    return resultado.rows[0];
}

module.exports = {
    listarPorUsuario,
    adicionar,
    remover
};
