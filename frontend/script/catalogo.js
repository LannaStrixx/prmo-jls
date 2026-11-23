
const listaFilmes = document.getElementById('listaFilmes');
const campoPesquisa = document.getElementById('campoPesquisa');
const filtroGenero = document.getElementById('filtroGenero');

const tituloDestaque = document.getElementById('tituloDestaque');
const sinopseDestaque = document.getElementById('sinopseDestaque');
const areaDestaque = document.getElementById('destaque');
const botaoDetalhes = document.getElementById('botaoDetalhes');

let filmeEmDestaque = null;

// Carrega os filmes
async function carregarFilmes() {
    try {
        listaFilmes.innerHTML = '<p>Carregando filmes...</p>';

        const parametros = new URLSearchParams();

        if (campoPesquisa.value.trim()) {
            parametros.append('busca', campoPesquisa.value.trim());
        }

        if (filtroGenero.value) {
            parametros.append('genero', filtroGenero.value);
        }

        const query = parametros.toString();
        const endpoint = query
            ? `/filmes?${query}`
            : '/filmes';

        const filmes = await apiRequest(endpoint);

        exibirFilmes(filmes);

    } catch (erro) {
        listaFilmes.innerHTML =
            `<p class="sem-filmes">${erro.message}</p>`;
    }
}

// Exibe os filmes na página
function exibirFilmes(filmes) {
    listaFilmes.innerHTML = '';

    if (!Array.isArray(filmes) || filmes.length === 0) {
        listaFilmes.innerHTML =
            '<p class="sem-filmes">Nenhum filme encontrado.</p>';
        return;
    }

    filmes.forEach((filme) => {
        const card = document.createElement('article');
        card.classList.add('filme');

        const imagem = document.createElement('img');
        imagem.src = filme.poster_url || '';
        imagem.alt = `Cartaz de ${filme.titulo}`;

        imagem.onerror = () => {
            imagem.src = 'https://placehold.co/300x450/202029/ffffff?text=Sem+Poster';
        };

        const informacoes = document.createElement('div');
        informacoes.classList.add('filme-info');

        const titulo = document.createElement('h3');
        titulo.textContent = filme.titulo;

        const detalhes = document.createElement('p');
        detalhes.textContent =
            `${filme.ano || 'Ano desconhecido'} • ${filme.genero || 'Sem gênero'}`;

        informacoes.append(titulo, detalhes);
        card.append(imagem, informacoes);

        card.addEventListener('click', () => {
            window.location.href = `detalhes.html?id=${filme.id}`;
        });

        listaFilmes.appendChild(card);
    });
}

// Carrega o filme em destaque
async function carregarDestaque() {
    try {
        const filmes = await apiRequest('/filmes/destaques');

        if (!Array.isArray(filmes) || filmes.length === 0) {
            tituloDestaque.textContent = 'Bem-vindo ao CineMatch!';
            sinopseDestaque.textContent =
                'Explore nosso catálogo e descubra novos filmes.';
            botaoDetalhes.style.display = 'none';
            return;
        }

        filmeEmDestaque = filmes[0];

        tituloDestaque.textContent = filmeEmDestaque.titulo;
        sinopseDestaque.textContent =
            filmeEmDestaque.sinopse || 'Conheça este filme.';

        if (filmeEmDestaque.backdrop_url) {
            areaDestaque.style.backgroundImage = `
                linear-gradient(90deg, #101014 10%, rgba(16,16,20,0.75) 55%, rgba(16,16,20,0.2)),
                linear-gradient(0deg, #101014, transparent),
                url("${filmeEmDestaque.backdrop_url}")
            `;
        }

    } catch (erro) {
        tituloDestaque.textContent = 'Bem-vindo ao CineMatch!';
        sinopseDestaque.textContent =
            'Não foi possível carregar o destaque.';
        console.error(erro);
    }
}

// Carrega os gêneros disponíveis
async function carregarGeneros() {
    try {
        const generos = await apiRequest('/filmes/generos');

        generos.forEach((item) => {
            const genero = typeof item === 'string'
                ? item
                : item.genero;

            if (!genero) return;

            const opcao = document.createElement('option');
            opcao.value = genero;
            opcao.textContent = genero;

            filtroGenero.appendChild(opcao);
        });

    } catch (erro) {
        console.error('Erro ao carregar gêneros:', erro);
    }
}

// Eventos de pesquisa e filtro
campoPesquisa.addEventListener('input', carregarFilmes);
filtroGenero.addEventListener('change', carregarFilmes);

// Botão de detalhes do destaque
botaoDetalhes.addEventListener('click', () => {
    if (filmeEmDestaque) {
        window.location.href =
            `detalhes.html?id=${filmeEmDestaque.id}`;
    }
});

// Botão para sair da conta
document.getElementById('botaoSair').addEventListener('click', () => {
    removerToken();
    localStorage.removeItem('usuario');
    window.location.href = 'login.html';
});

// Inicialização da página
async function iniciarCatalogo() {
    await Promise.all([
        carregarFilmes(),
        carregarDestaque(),
        carregarGeneros()
    ]);
}

iniciarCatalogo();
