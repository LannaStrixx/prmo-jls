
const formulario = document.getElementById('formLogin');
const mensagem = document.getElementById('mensagem');

formulario.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        mensagem.textContent = 'Verificando dados...';

        const resposta = await apiRequest('/usuarios/login', {
            method: 'POST',
            body: JSON.stringify({ email, senha })
        });

        salvarToken(resposta.token);

        localStorage.setItem(
            'usuario',
            JSON.stringify(resposta.usuario)
        );

        mensagem.textContent = resposta.mensagem;
        mensagem.style.color = 'green';

        setTimeout(() => {
            window.location.href = 'catalogo.html';
        }, 1000);

    } catch (erro) {
        mensagem.textContent = erro.message;
        mensagem.style.color = 'red';
    }
});
