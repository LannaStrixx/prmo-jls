const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Rotas
const usuarioRoutes = require('./routes/usuarioRoutes');

app.use('/api/usuarios', usuarioRoutes);

// Rota inicial
app.get('/', (req, res) => {
    res.json({
        mensagem: 'API CineMatch funcionando!',
        status: 'online'
    });
});

// Rota de teste
app.get('/api/status', (req, res) => {
    res.json({
        projeto: 'CineMatch',
        mensagem: 'Servidor funcionando corretamente!'
    });
});

// Inicialização
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor CineMatch rodando na porta ${PORT}`);
});
