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

// Função para criar um novo aluno
function criarAluno(dados) {
    // Lê os alunos já cadastrados
    const alunos = lerArquivo();

    // Define o ID do novo aluno
    // Se houver alunos, pega o último ID e adiciona 1, caso contrário começa em 1
    let id = 1;
    if (alunos.length > 0) {
        id = alunos[alunos.length - 1].id + 1;
    }

    // Cria o objeto do novo aluno combinando o ID com os dados recebidos
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
