const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor CineMatch rodando na porta ${PORT}`);
});
