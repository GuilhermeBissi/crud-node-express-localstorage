const express = require('express');
const router = express.Router();

// Importar as funções do controller
const { 
    criarAluno, 
    listarAlunos, 
    buscarAluno, 
    atualizarAluno, 
    deletarAluno 
} = require('../controllers/alunosController');

// Definir as rotas
router.get('/', listarAlunos);           // GET /api/alunos
router.get('/:id', buscarAluno);         // GET /api/alunos/:id
router.post('/', criarAluno);            // POST /api/alunos
router.put('/:id', atualizarAluno);      // PUT /api/alunos/:id
router.delete('/:id', deletarAluno);     // DELETE /api/alunos/:id

module.exports = router;