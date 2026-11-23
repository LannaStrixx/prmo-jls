
const formulario = document.getElementById('formPerfil');
const mensagem = document.getElementById('mensagem');

const campoNome = document.getElementById('nome');
const campoEmail = document.getElementById('email');

// Carrega os dados do usuário
async function carregarPerfil() {
    try {
        if (!estaAutenticado()) {
            window.location.href = 'login.html';
            return;
        }

        const usuario = await apiRequest('/usuarios/perfil');

        campoNome.value = usuario.nome;
        campoEmail.value = usuario.email;

    } catch (erro) {
        mensagem.textContent = erro.message;
        mensagem.style.color = '#f87171';
    }
}

// Atualiza os dados do usuário
formulario.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = campoNome.value.trim();
    const email = campoEmail.value.trim();

    try {
        mensagem.textContent = 'Salvando alterações...';
        mensagem.style.color = '#aaaab3';

        const resposta = await apiRequest('/usuarios/perfil', {
            method: 'PUT',
            body: JSON.stringify({ nome, email })
        });

        // Atualiza os dados salvos no navegador
        localStorage.setItem(
            'usuario',
            JSON.stringify(resposta.usuario)
        );

        mensagem.textContent = resposta.mensagem;
        mensagem.style.color = '#4ade80';

    } catch (erro) {
        mensagem.textContent = erro.message;
        mensagem.style.color = '#f87171';
    }
});

// Encerra a sessão
document.getElementById('botaoSair').addEventListener('click', () => {
    removerToken();
    localStorage.removeItem('usuario');

    window.location.href = 'login.html';
});

// Inicialização
carregarPerfil();
