const jwt = require('jsonwebtoken');

function autenticar(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            erro: 'Token de autenticação não informado.'
        });
    }

    const [tipo, token] = authHeader.split(' ');

    if (tipo !== 'Bearer' || !token) {
        return res.status(401).json({
            erro: 'Formato de token inválido.'
        });
    }

    try {
        const dados = jwt.verify(token, process.env.JWT_SECRET);

        req.usuario = {
            id: dados.id
        };

        next();

    } catch (error) {
        return res.status(401).json({
            erro: 'Token inválido ou expirado.'
        });
    }
}

module.exports = autenticar;
