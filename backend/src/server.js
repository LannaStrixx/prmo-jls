const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Importação das rotas
const usuarioRoutes = require('./routes/usuarioRoutes');
const filmeRoutes = require('./routes/filmeRoutes');

// Rotas da API
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/filmes', filmeRoutes);

// Rota inicial
app.get('/', (req, res) => {
    res.json({
        mensagem: 'API CineMatch funcionando!',
        status: 'online'
    });
});

// Rota de status
app.get('/api/status', (req, res) => {
    res.json({
        projeto: 'CineMatch',
        mensagem: 'Servidor funcionando corretamente!'
    });
});

// Inicialização do servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor CineMatch rodando na porta ${PORT}`);
});
