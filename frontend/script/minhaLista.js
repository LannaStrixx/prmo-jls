
const listaFilmes = document.getElementById('listaFilmes');
const botaoSair = document.getElementById('botaoSair');

// Carrega os filmes salvos pelo usuário
async function carregarMinhaLista() {
    if (!estaAutenticado()) {
        window.location.href = 'login.html';
        return;
    }

    try {
        const filmes = await apiRequest('/favoritos');

        listaFilmes.innerHTML = '';

        if (!Array.isArray(filmes) || filmes.length === 0) {
            listaFilmes.innerHTML = `
                <p class="mensagem-vazia">
                    Você ainda não adicionou filmes à sua lista.
                </p>
            `;
            return;
        }

        filmes.forEach(filme => {
            const filmeId = filme.filme_id || filme.id;

            const card = document.createElement('article');
            card.className = 'card-filme';

            const imagem = filme.poster_url || '';

            card.innerHTML = `
                <img
                    src="${imagem}"
                    alt="Poster de ${filme.titulo}"
                    onerror="this.style.display='none'"
                >

                <div class="info-filme">
                    <h3>${filme.titulo}</h3>

                    <a href="detalhes.html?id=${filmeId}">
                        Ver detalhes
                    </a>

                    <button class="botao-remover">
                        Remover da lista
                    </button>
                </div>
            `;

            const botaoRemover = card.querySelector('.botao-remover');

            botaoRemover.addEventListener('click', () => {
                removerDaLista(filmeId);
            });

            listaFilmes.appendChild(card);
        });

    } catch (erro) {
        listaFilmes.innerHTML = `
            <p class="mensagem-vazia">
                Não foi possível carregar sua lista.
            </p>
        `;
        console.error(erro);
    }
}

// Remove um filme da lista
async function removerDaLista(filmeId) {
    try {
        await apiRequest(`/favoritos/${filmeId}`, {
            method: 'DELETE'
        });

        carregarMinhaLista();

    } catch (erro) {
        alert(erro.message);
    }
}

// Encerra a sessão
botaoSair.addEventListener('click', () => {
    removerToken();
    localStorage.removeItem('usuario');

    window.location.href = 'login.html';
});

// Inicializa a página
carregarMinhaLista();
