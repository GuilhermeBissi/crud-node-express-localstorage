let alunos = [];
let idCounter = 1;

// Criar aluno
function criarAluno(dados) {
    const novoAluno = { id: idCounter++, ...dados };
    alunos.push(novoAluno);
    return novoAluno;
}

// Listar todos
function listarAlunos() {
    return alunos;
}

// Buscar por ID
function buscarAluno(id) {
    return alunos.find(a => a.id === parseInt(id));
}

// Atualizar
function atualizarAluno(id, novosDados) {
    const index = alunos.findIndex(a => a.id === parseInt(id));
    if (index !== -1) {
        alunos[index] = { ...alunos[index], ...novosDados };
        return alunos[index];
    }
    return null;
}

// Deletar
function deletarAluno(id) {
    const index = alunos.findIndex(a => a.id === parseInt(id));
    if (index !== -1) {
        return alunos.splice(index, 1)[0];
    }
    return null;
}

module.exports = { criarAluno, listarAlunos, buscarAluno, atualizarAluno, deletarAluno };
