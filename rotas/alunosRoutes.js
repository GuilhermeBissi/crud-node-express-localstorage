const express = require("express");
const router = express.Router();
const controller = require("../controller/alunosController");

// Listar todos
router.get("/", (req, res) => {
    try {
        const alunos = controller.listarAlunos();
        res.json({ sucesso: true, dados: alunos });
    } catch (err) {
        res.json({ sucesso: false, mensagem: err.message });
    }
});

// Buscar por ID
router.get("/:id", (req, res) => {
    try {
        const aluno = controller.buscarAluno(req.params.id);
        if (aluno) {
            res.json({ sucesso: true, dados: aluno });
        } else {
            res.json({ sucesso: false, mensagem: "Aluno não encontrado" });
        }
    } catch (err) {
        res.json({ sucesso: false, mensagem: err.message });
    }
});

// Criar
router.post("/", (req, res) => {
    try {
        const novo = controller.criarAluno(req.body);
        res.json({ sucesso: true, dados: novo });
    } catch (err) {
        res.json({ sucesso: false, mensagem: err.message });
    }
});

// Atualizar
router.put("/:id", (req, res) => {
    try {
        const atualizado = controller.atualizarAluno(req.params.id, req.body);
        if (atualizado) {
            res.json({ sucesso: true, dados: atualizado });
        } else {
            res.json({ sucesso: false, mensagem: "Aluno não encontrado" });
        }
    } catch (err) {
        res.json({ sucesso: false, mensagem: err.message });
    }
});

// Deletar
router.delete("/:id", (req, res) => {
    try {
        const deletado = controller.deletarAluno(req.params.id);
        if (deletado) {
            res.json({ sucesso: true, dados: deletado });
        } else {
            res.json({ sucesso: false, mensagem: "Aluno não encontrado" });
        }
    } catch (err) {
        res.json({ sucesso: false, mensagem: err.message });
    }
});

module.exports = router;
