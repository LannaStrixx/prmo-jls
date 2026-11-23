
const listaFavoritos = document.getElementById('listaFavoritos');

// Carrega os favoritos do usuário
async function carregarFavoritos() {
    try {
        listaFavoritos.innerHTML = '<p>Carregando favoritos...</p>';

        const favoritos = await apiRequest('/favoritos');

        exibirFavoritos(favoritos);

    } catch (erro) {
        listaFavoritos.innerHTML =
            `<p class="mensagem-vazia">${erro.message}</p>`;
    }
}

// Exibe os filmes favoritos
function exibirFavoritos(favoritos) {
    listaFavoritos.innerHTML = '';

    if (!Array.isArray(favoritos) || favoritos.length === 0) {
        listaFavoritos.innerHTML =
            '<p class="mensagem-vazia">Você ainda não adicionou filmes aos favoritos.</p>';
        return;
    }

    favoritos.forEach((filme) => {
        const card = document.createElement('article');
        card.className = 'filme';

        const imagem = document.createElement('img');

        imagem.src = filme.poster_url ||
            'https://placehold.co/300x450/202029/ffffff?text=Sem+Poster';

        imagem.alt = `Cartaz de ${filme.titulo}`;

        imagem.addEventListener('click', () => {
            window.location.href = `detalhes.html?id=${filme.filme_id || filme.id}`;
        });

        const informacoes = document.createElement('div');
        informacoes.className = 'filme-info';

        const titulo = document.createElement('h3');
        titulo.textContent = filme.titulo;

        const ano = document.createElement('p');
        ano.textContent =
            `${filme.ano || 'Ano desconhecido'} • ${filme.genero || 'Sem gênero'}`;

        const botaoRemover = document.createElement('button');
        botaoRemover.className = 'botao-remover';
        botaoRemover.textContent = 'Remover dos favoritos';

        botaoRemover.addEventListener('click', async () => {
            await removerFavorito(filme.filme_id || filme.id);
        });

        informacoes.append(titulo, ano, botaoRemover);
        card.append(imagem, informacoes);

        listaFavoritos.appendChild(card);
    });
}

// Remove um filme dos favoritos
async function removerFavorito(filmeId) {
    try {
        await apiRequest(`/favoritos/${filmeId}`, {
            method: 'DELETE'
        });

        await carregarFavoritos();

    } catch (erro) {
        alert(erro.message);
    }
}

// Botão de sair
document.getElementById('botaoSair').addEventListener('click', () => {
    removerToken();
    localStorage.removeItem('usuario');

    window.location.href = 'login.html';
});

// Inicialização
carregarFavoritos();
