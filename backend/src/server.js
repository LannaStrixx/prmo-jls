const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
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

app.listen(PORT, () => {
    console.log(`Servidor CineMatch rodando na porta ${PORT}`);
});
