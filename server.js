// Importações principais
const express = require('express');
const path = require('path');
const alunosRoutes = require('./rotas/alunosRoutes');

const app = express();
const PORT = 3000;

// Middleware para interpretar JSON
app.use(express.json());

// Servir arquivos estáticos do frontend (pasta public)
app.use(express.static(path.join(__dirname, 'public')));

// Rotas da API (CRUD de alunos)
app.use('/api/alunos', alunosRoutes);

// Rota raiz para servir o index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(` Servidor rodando em http://localhost:${PORT}`);
});
