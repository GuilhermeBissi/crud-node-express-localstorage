// Exemplo correto do alunosRoutes.js
const express = require('express');
const router = express.Router();
const { criarAluno, listarAlunos, buscarAluno, atualizarAluno, deletarAluno } = require('../controllers/alunosController');

// Suas rotas aqui
router.get('/', listarAlunos);
router.get('/:id', buscarAluno);
router.post('/', criarAluno);
router.put('/:id', atualizarAluno);
router.delete('/:id', deletarAluno);

module.exports = router;