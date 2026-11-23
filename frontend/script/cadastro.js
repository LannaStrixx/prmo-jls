
const formulario = document.getElementById('formCadastro');
const mensagem = document.getElementById('mensagem');

formulario.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        mensagem.textContent = 'Realizando cadastro...';

        const resposta = await apiRequest('/usuarios/cadastro', {
            method: 'POST',
            body: JSON.stringify({ nome, email, senha })
        });

        mensagem.textContent = resposta.mensagem;
        mensagem.style.color = 'green';

        formulario.reset();

        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);

    } catch (erro) {
        mensagem.textContent = erro.message;
        mensagem.style.color = 'red';
    }
});
