const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middlewares globais
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas da API
const alunosRoutes = require('./rotas/alunosRoutes');
app.use('/api/alunos', alunosRoutes);

// Servir frontend da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Rota padrão (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start servidor
app.listen(PORT, () => {
    console.log(` Servidor rodando em http://localhost:${PORT}`);
});
