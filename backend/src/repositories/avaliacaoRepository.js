const db = require('../config/database');

async function listarPorFilme(filmeId) {
    const resultado = await db.query(
        `SELECT
            a.id,
            a.nota,
            a.comentario,
            a.created_at,
            u.nome AS usuario
         FROM avaliacoes a
         INNER JOIN usuarios u ON u.id = a.usuario_id
         WHERE a.filme_id = $1
         ORDER BY a.created_at DESC`,
        [filmeId]
    );

    return resultado.rows;
}

async function criar(usuarioId, filmeId, nota, comentario) {
    const resultado = await db.query(
        `INSERT INTO avaliacoes
            (usuario_id, filme_id, nota, comentario)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (usuario_id, filme_id)
         DO UPDATE SET
            nota = EXCLUDED.nota,
            comentario = EXCLUDED.comentario,
            created_at = CURRENT_TIMESTAMP
         RETURNING *`,
        [usuarioId, filmeId, nota, comentario]
    );

    return resultado.rows[0];
}

async function remover(usuarioId, filmeId) {
    const resultado = await db.query(
        `DELETE FROM avaliacoes
         WHERE usuario_id = $1 AND filme_id = $2
         RETURNING *`,
        [usuarioId, filmeId]
    );

    return resultado.rows[0];
}

module.exports = {
    listarPorFilme,
    criar,
    remover
};
