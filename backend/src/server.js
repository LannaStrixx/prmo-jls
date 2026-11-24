const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Configuração de CORS
app.use((req, res, next) => {
    res.header(
        'Access-Control-Allow-Origin',
        'https://cinematch-web-bice.vercel.app'
    );

    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS'
    );

    res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization'
    );

    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }

    next();
});

app.use(express.json());


const usuarioRoutes = require('./routes/usuarioRoutes');
const filmeRoutes = require('./routes/filmeRoutes');
const favoritoRoutes = require('./routes/favoritoRoutes');
const avaliacaoRoutes = require('./routes/avaliacaoRoutes');


app.use('/api/usuarios', usuarioRoutes);
app.use('/api/filmes', filmeRoutes);
app.use('/api/favoritos', favoritoRoutes);
app.use('/api/avaliacoes', avaliacaoRoutes);


app.get('/', (req, res) => {
    res.json({
        mensagem: 'API CineMatch funcionando!',
        status: 'online'
    });
});


app.get('/api/status', (req, res) => {
    res.json({
        projeto: 'CineMatch',
        mensagem: 'Servidor funcionando corretamente!'
    });
});

const PORT = process.env.PORT || 3000;


if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Servidor CineMatch rodando na porta ${PORT}`);
    });
}

module.exports = app;