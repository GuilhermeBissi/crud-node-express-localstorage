const API_URL = "http://localhost:3000/api/alunos";

// Mensagens
function mostrarMensagem(texto, tipo = "info") {
    const div = document.getElementById("mensagens");
    div.innerHTML = `<p class="alerta alerta-${tipo}">${texto}</p>`;
    setTimeout(() => div.innerHTML = "", 3000);
}

// Carregar lista
async function carregarAlunos() {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        atualizarTabela(data.dados);
    } catch (err) {
        mostrarMensagem("Erro ao carregar alunos: " + err.message, "erro");
    }
}

// Atualizar tabela
function atualizarTabela(alunos) {
    const tbody = document.getElementById("tabelaAlunos");
    tbody.innerHTML = "";

    alunos.forEach(aluno => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${aluno.id}</td>
            <td>${aluno.nome}</td>
            <td>${aluno.cpf}</td>
            <td>${aluno.telefone}</td>
            <td>${aluno.email}</td>
            <td>${aluno.matricula}</td>
            <td>${aluno.escola}</td>
        `;
        tr.onclick = () => preencherFormulario(aluno);
        tbody.appendChild(tr);
    });
}

// Preencher formulário ao clicar em aluno
function preencherFormulario(aluno) {
    document.getElementById("alunoId").value = aluno.id;
    document.getElementById("nome").value = aluno.nome;
    document.getElementById("cpf").value = aluno.cpf;
    document.getElementById("telefone").value = aluno.telefone;
    document.getElementById("email").value = aluno.email;
    document.getElementById("matricula").value = aluno.matricula;
    document.getElementById("escola").value = aluno.escola;
}

// Obter dados do formulário
function obterDadosFormulario() {
    return {
        nome: document.getElementById("nome").value,
        cpf: document.getElementById("cpf").value,
        telefone: document.getElementById("telefone").value,
        email: document.getElementById("email").value,
        matricula: document.getElementById("matricula").value,
        escola: document.getElementById("escola").value
    };
}

// Criar
async function criarAluno() {
    try {
        const aluno = obterDadosFormulario();
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(aluno)
        });
        const data = await res.json();
        if (data.sucesso) {
            mostrarMensagem("Aluno criado!", "sucesso");
            carregarAlunos();
            limparFormulario();
        } else {
            mostrarMensagem(data.mensagem, "erro");
        }
    } catch (err) {
        mostrarMensagem("Erro: " + err.message, "erro");
    }
}

// Atualizar
async function atualizarAluno() {
    const id = document.getElementById("alunoId").value;
    if (!id) return mostrarMensagem("Selecione um aluno!", "erro");

    try {
        const aluno = obterDadosFormulario();
        const res = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(aluno)
        });
        const data = await res.json();
        if (data.sucesso) {
            mostrarMensagem("Aluno atualizado!", "sucesso");
            carregarAlunos();
            limparFormulario();
        } else {
            mostrarMensagem(data.mensagem, "erro");
        }
    } catch (err) {
        mostrarMensagem("Erro: " + err.message, "erro");
    }
}

// Deletar
async function deletarAluno() {
    const id = document.getElementById("alunoId").value;
    if (!id) return mostrarMensagem("Selecione um aluno!", "erro");

    try {
        const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        const data = await res.json();
        if (data.sucesso) {
            mostrarMensagem("Aluno deletado!", "sucesso");
            carregarAlunos();
            limparFormulario();
        } else {
            mostrarMensagem(data.mensagem, "erro");
        }
    } catch (err) {
        mostrarMensagem("Erro: " + err.message, "erro");
    }
}

// Limpar
function limparFormulario() {
    document.getElementById("formAluno").reset();
    document.getElementById("alunoId").value = "";
}

// Inicializar
document.addEventListener("DOMContentLoaded", carregarAlunos);
