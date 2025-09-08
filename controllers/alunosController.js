const fs = require('fs');
const path = require('path');

// Caminho para o arquivo JSON onde vamos salvar os alunos
const arquivoDados = path.join(__dirname, '../dados/alunos.json');

// Função auxiliar: carregar alunos do arquivo
function carregarAlunos() {
    if (!fs.existsSync(arquivoDados)) {
        fs.writeFileSync(arquivoDados, JSON.stringify([])); // cria arquivo vazio se não existir
    }
    const dados = fs.readFileSync(arquivoDados, 'utf-8');
    return JSON.parse(dados);
}

// Função auxiliar: salvar alunos no arquivo
function salvarAlunos(alunos) {
    fs.writeFileSync(arquivoDados, JSON.stringify(alunos, null, 2));
}

// Criar aluno
function criarAluno(aluno) {
    const alunos = carregarAlunos();

    // Gerar ID único
    aluno.id = Date.now();

    alunos.push(aluno);
    salvarAlunos(alunos);
    return aluno;
}

// Listar todos
function listarAlunos() {
    return carregarAlunos();
}

// Buscar por ID
function buscarAluno(id) {
    const alunos = carregarAlunos();
    return alunos.find(a => a.id === parseInt(id));
}

// Atualizar
function atualizarAluno(id, novosDados) {
    const alunos = carregarAlunos();
    const index = alunos.findIndex(a => a.id === parseInt(id));
    if (index !== -1) {
        alunos[index] = { ...alunos[index], ...novosDados };
        salvarAlunos(alunos);
        return alunos[index];
    }
    return null;
}

// Deletar
function deletarAluno(id) {
    const alunos = carregarAlunos();
    const index = alunos.findIndex(a => a.id === parseInt(id));
    if (index !== -1) {
        const removido = alunos.splice(index, 1)[0];
        salvarAlunos(alunos);
        return removido;
    }
    return null;
}

module.exports = { criarAluno, listarAlunos, buscarAluno, atualizarAluno, deletarAluno };
