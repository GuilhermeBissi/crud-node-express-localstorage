// Middleware simples para validar os campos de aluno
module.exports = (req, res, next) => {
    const { nome, idade } = req.body;

    if (!nome || typeof nome !== 'string') {
        return res.status(400).json({ erro: 'Nome é obrigatório e deve ser uma string' });
    }

    if (!idade || typeof idade !== 'number') {
        return res.status(400).json({ erro: 'Idade é obrigatória e deve ser um número' });
    }

    next();
};
// Middleware de validação dos campos do aluno
module.exports = (req, res, next) => {
    const { nome, cpf, telefone, email, matricula, escola } = req.body;

    if (!nome || typeof nome !== 'string') {
        return res.status(400).json({ erro: 'Nome é obrigatório e deve ser texto' });
    }
    if (!cpf) {
        return res.status(400).json({ erro: 'CPF é obrigatório' });
    }
    if (!telefone) {
        return res.status(400).json({ erro: 'Telefone é obrigatório' });
    }
    if (!email) {
        return res.status(400).json({ erro: 'E-mail é obrigatório' });
    }
    if (!matricula) {
        return res.status(400).json({ erro: 'Matrícula é obrigatória' });
    }
    if (!escola) {
        return res.status(400).json({ erro: 'Escola é obrigatória' });
    }

    next();
};
