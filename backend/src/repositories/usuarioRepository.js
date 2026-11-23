const db = require('../config/database');

async function buscarPorEmail(email) {
    const resultado = await db.query(
        'SELECT * FROM usuarios WHERE email = $1',
        [email]
    );

    return resultado.rows[0];
}

async function criar(nome, email, senhaHash) {
    const resultado = await db.query(
        `INSERT INTO usuarios (nome, email, senha_hash)
         VALUES ($1, $2, $3)
         RETURNING id, nome, email, created_at`,
        [nome, email, senhaHash]
    );

    return resultado.rows[0];
}

async function buscarPorId(id) {
    const resultado = await db.query(
        `SELECT id, nome, email, created_at
         FROM usuarios
         WHERE id = $1`,
        [id]
    );

    return resultado.rows[0];
}

async function atualizar(id, nome, email) {
    const resultado = await db.query(
        `UPDATE usuarios
         SET nome = $1, email = $2
         WHERE id = $3
         RETURNING id, nome, email, created_at`,
        [nome, email, id]
    );

    return resultado.rows[0];
}

module.exports = {
    buscarPorEmail,
    criar,
    buscarPorId,
    atualizar
};
