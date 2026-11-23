const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usuarioRepository = require('../repositories/usuarioRepository');

async function cadastrar(nome, email, senha) {
    if (!nome || !email || !senha) {
        throw new Error('Preencha todos os campos.');
    }

    if (senha.length < 6) {
        throw new Error('A senha deve ter pelo menos 6 caracteres.');
    }

    email = email.trim().toLowerCase();
    nome = nome.trim();

    const usuarioExistente = await usuarioRepository.buscarPorEmail(email);

    if (usuarioExistente) {
        throw new Error('Este email já está cadastrado.');
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario = await usuarioRepository.criar(
        nome,
        email,
        senhaHash
    );

    return usuario;
}

async function login(email, senha) {
    if (!email || !senha) {
        throw new Error('Informe email e senha.');
    }

    email = email.trim().toLowerCase();

    const usuario = await usuarioRepository.buscarPorEmail(email);

    if (!usuario) {
        throw new Error('Email ou senha incorretos.');
    }

    const senhaValida = await bcrypt.compare(
        senha,
        usuario.senha_hash
    );

    if (!senhaValida) {
        throw new Error('Email ou senha incorretos.');
    }

    const token = jwt.sign(
        { id: usuario.id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );

    return {
        usuario: {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        },
        token
    };
}

async function buscarPerfil(id) {
    const usuario = await usuarioRepository.buscarPorId(id);

    if (!usuario) {
        throw new Error('Usuário não encontrado.');
    }

    return usuario;
}

module.exports = {
    cadastrar,
    login,
    buscarPerfil
};
