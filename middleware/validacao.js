function validarAluno(req, res, next) {
    const { nome, cpf, telefone, email, matricula, escola } = req.body;

    if (!nome || !cpf || !telefone || !email || !matricula || !escola) {
        return res.status(400).json({ sucesso: false, mensagem: 'Todos os campos são obrigatórios!' });
    }

    next();
}

module.exports = { validarAluno };
