const form = document.getElementById('form-contato');
const tabelaContatos = document.querySelector('tbody');
let linhas = '';
const contatos = {
    nomes: [],
    telefones: []
};

// Configurar validações
document.getElementById('contato').addEventListener('input', limparErros);
document.getElementById('telefone').addEventListener('input', limparErros);

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validarContato()) {
        adicionarContato();
        atualizarTabela();
        form.reset();
    }
});

function limparErros() {
    this.classList.remove('input-invalido');
    document.getElementById(`erro-${this.id.split('-')[0]}`).classList.remove('mostrar');
}

function validarContato() {
    const nome = document.getElementById('contato');
    const telefone = document.getElementById('telefone');
    const erroNome = document.getElementById('erro-nome');
    const erroTelefone = document.getElementById('erro-telefone');
    let valido = true;

    // Resetar erros
    [erroNome, erroTelefone].forEach(erro => erro.classList.remove('mostrar'));
    [nome, telefone].forEach(campo => campo.classList.remove('input-invalido'));

    // Validar nome
    if (contatos.nomes.includes(nome.value)) {
        nome.classList.add('input-invalido');
        erroNome.textContent = 'Este nome já está cadastrado!';
        erroNome.classList.add('mostrar');
        valido = false;
    }

    // Validar telefone
    if (contatos.telefones.includes(telefone.value)) {
        telefone.classList.add('input-invalido');
        erroTelefone.textContent = 'Este telefone já está cadastrado!';
        erroTelefone.classList.add('mostrar');
        valido = false;
    }

    return valido;
}

function adicionarContato() {
    const nome = document.getElementById('contato').value;
    const telefone = document.getElementById('telefone').value;

    contatos.nomes.push(nome);
    contatos.telefones.push(telefone);

    linhas += `
        <tr>
            <td>${nome}</td>
            <td>${telefone}</td>
        </tr>
    `;
}

function atualizarTabela() {
    tabelaContatos.innerHTML = linhas;
}