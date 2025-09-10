// Controller responsável por gerenciar os dados dos alunos
// Utiliza um arquivo JSON para persistência simples em disco

const fs = require('fs');
const path = require('path');

// Caminho do arquivo de persistência
const caminhoArquivo = path.join(__dirname, 'alunos.json');

// Garante que o arquivo exista
if (!fs.existsSync(caminhoArquivo)) {
    fs.writeFileSync(caminhoArquivo, JSON.stringify([]));
}

// Função auxiliar para ler os dados do arquivo
function lerArquivo() {
    const dados = fs.readFileSync(caminhoArquivo, 'utf8');
    return JSON.parse(dados || '[]');
}

// Função auxiliar para salvar os dados no arquivo
function salvarArquivo(alunos) {
    fs.writeFileSync(caminhoArquivo, JSON.stringify(alunos, null, 2));
}

// Criar aluno
function criarAluno(dados) {
    const alunos = lerArquivo();
    const id = alunos.length > 0 ? alunos[alunos.length - 1].id + 1 : 1;
    const novoAluno = { id, ...dados };
    alunos.push(novoAluno);
    salvarArquivo(alunos);
    return novoAluno;
}

// Listar todos
function listarAlunos() {
    return lerArquivo();
}

// Buscar por ID
function buscarAluno(id) {
    const alunos = lerArquivo();
    return alunos.find(a => a.id === parseInt(id, 10)) || null;
}

// Atualizar aluno
function atualizarAluno(id, novosDados) {
    const alunos = lerArquivo();
    const index = alunos.findIndex(a => a.id === parseInt(id, 10));
    if (index === -1) return null;
    alunos[index] = { ...alunos[index], ...novosDados, id: alunos[index].id };
    salvarArquivo(alunos);
    return alunos[index];
}

// Deletar aluno
function deletarAluno(id) {
    let alunos = lerArquivo();
    const index = alunos.findIndex(a => a.id === parseInt(id, 10));
    if (index === -1) return null;
    const [removido] = alunos.splice(index, 1);
    salvarArquivo(alunos);
    return removido;
}

module.exports = { criarAluno, listarAlunos, buscarAluno, atualizarAluno, deletarAluno };
