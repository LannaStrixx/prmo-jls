const usuarioService = require('../services/usuarioService');

async function cadastrar(req, res) {
    try {
        const { nome, email, senha } = req.body;

        const usuario = await usuarioService.cadastrar(
            nome,
            email,
            senha
        );

        return res.status(201).json({
            mensagem: 'Usuário cadastrado com sucesso!',
            usuario
        });

    } catch (error) {
        const status = error.message.includes('já está cadastrado') ? 409 : 400;

        return res.status(status).json({
            erro: error.message
        });
    }
}

async function login(req, res) {
    try {
        const { email, senha } = req.body;

        const resultado = await usuarioService.login(email, senha);

        return res.status(200).json({
            mensagem: 'Login realizado com sucesso!',
            ...resultado
        });

    } catch (error) {
        return res.status(401).json({
            erro: error.message
        });
    }
}

async function perfil(req, res) {
    try {
        const usuario = await usuarioService.buscarPerfil(req.usuario.id);

        return res.status(200).json(usuario);

    } catch (error) {
        return res.status(404).json({
            erro: error.message
        });
    }
}


async function atualizarPerfil(req, res) {
    try {
        const { nome, email } = req.body;

        const usuario = await usuarioService.atualizarPerfil(
            req.usuario.id,
            nome,
            email
        );

        return res.status(200).json({
            mensagem: 'Perfil atualizado com sucesso!',
            usuario
        });

    } catch (error) {
        const status = error.message === 'Este email já está cadastrado.' ? 409 : 400;

        return res.status(status).json({
            erro: error.message
        });
    }
}


module.exports = {
    cadastrar,
    login,
    perfil,
    atualizarPerfil
};