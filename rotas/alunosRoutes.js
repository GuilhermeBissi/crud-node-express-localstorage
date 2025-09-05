const express = require('express');
const router = express.Router();
const { validarAluno } = require('../middleware/validacao');
const alunosController = require('../dados/alunosController');

/**
 * ROTAS DA API PARA GERENCIAMENTO DE ALUNOS
 * 
 * GET    /api/alunos     - Listar todos os alunos
 * POST   /api/alunos     - Criar novo aluno
 * PUT    /api/alunos/:id - Atualizar aluno existente
 * DELETE /api/alunos/:id - Deletar aluno
 */

// Listar
router.get('/', (req, res) => {
    res.json({ sucesso: true, dados: alunosController.listarAlunos() });
});

// Buscar por ID
router.get('/:id', (req, res) => {
    const aluno = alunosController.buscarAluno(req.params.id);
    if (!aluno) return res.status(404).json({ sucesso: false, mensagem: 'Aluno não encontrado' });
    res.json({ sucesso: true, dados: aluno });
});

// Criar
router.post('/', validarAluno, (req, res) => {
    const novoAluno = alunosController.criarAluno(req.body);
    res.status(201).json({ sucesso: true, dados: novoAluno });
});

// Atualizar
router.put('/:id', validarAluno, (req, res) => {
    const atualizado = alunosController.atualizarAluno(req.params.id, req.body);
    if (!atualizado) return res.status(404).json({ sucesso: false, mensagem: 'Aluno não encontrado' });
    res.json({ sucesso: true, dados: atualizado });
});

// Deletar
router.delete('/:id', (req, res) => {
    const deletado = alunosController.deletarAluno(req.params.id);
    if (!deletado) return res.status(404).json({ sucesso: false, mensagem: 'Aluno não encontrado' });
    res.json({ sucesso: true, dados: deletado });
});

module.exports = router;
