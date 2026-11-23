
const parametros = new URLSearchParams(window.location.search);
const filmeId = parametros.get('id');

const detalhesFilme = document.getElementById('detalhesFilme');
const listaAvaliacoes = document.getElementById('listaAvaliacoes');
const formularioAvaliacao = document.getElementById('formAvaliacao');
const mensagemAvaliacao = document.getElementById('mensagemAvaliacao');

// Carrega os detalhes do filme
async function carregarDetalhes() {
    try {
        if (!filmeId || !Number.isInteger(Number(filmeId)) || Number(filmeId) <= 0) {
            throw new Error('Filme não encontrado.');
        }

        const filme = await apiRequest(`/filmes/${filmeId}`);

        const poster = document.createElement('img');
        poster.className = 'poster-detalhes';
        poster.src = filme.poster_url || 'https://placehold.co/300x450/202029/ffffff?text=Sem+Poster';
        poster.alt = `Cartaz de ${filme.titulo}`;

        const informacoes = document.createElement('div');
        informacoes.className = 'informacoes-filme';

        const titulo = document.createElement('h1');
        titulo.textContent = filme.titulo;

        const metadados = document.createElement('div');
        metadados.className = 'metadados';
        metadados.textContent =
            `${filme.ano || 'Ano não informado'} • ${filme.duracao || 'Duração não informada'} min • ${filme.genero || 'Gênero não informado'} • Classificação: ${filme.classificacao || 'Não informada'}`;

        const sinopse = document.createElement('p');
        sinopse.className = 'sinopse';
        sinopse.textContent = filme.sinopse || 'Sinopse não disponível.';

        const botaoFavorito = document.createElement('button');
        botaoFavorito.className = 'botao';
        botaoFavorito.textContent = 'Adicionar aos favoritos';

        botaoFavorito.addEventListener('click', async () => {
            try {
                await apiRequest('/favoritos', {
                    method: 'POST',
                    body: JSON.stringify({ filmeId: filme.id })
                });

                botaoFavorito.textContent = 'Adicionado aos favoritos!';
            } catch (erro) {
                alert(erro.message);
            }
        });

        informacoes.append(titulo, metadados, sinopse, botaoFavorito);

        if (filme.trailer_url) {
            const linkTrailer = document.createElement('a');
            linkTrailer.href = filme.trailer_url;
            linkTrailer.target = '_blank';
            linkTrailer.rel = 'noopener noreferrer';
            linkTrailer.textContent = 'Assistir ao trailer';
            linkTrailer.style.display = 'inline-block';
            linkTrailer.style.marginLeft = '15px';
            linkTrailer.style.color = '#ffffff';

            informacoes.appendChild(linkTrailer);
        }

        detalhesFilme.innerHTML = '';
        const conteudo = document.createElement('div');
        conteudo.className = 'conteudo-filme';
        conteudo.append(poster, informacoes);
        detalhesFilme.appendChild(conteudo);

    } catch (erro) {
        detalhesFilme.textContent = erro.message;
    }
}

// Carrega as avaliações do filme
async function carregarAvaliacoes() {
    try {
        const avaliacoes = await apiRequest(`/avaliacoes/filme/${filmeId}`);

        listaAvaliacoes.innerHTML = '';

        if (!Array.isArray(avaliacoes) || avaliacoes.length === 0) {
            listaAvaliacoes.textContent = 'Ainda não existem avaliações para este filme.';
            return;
        }

        avaliacoes.forEach((item) => {
            const card = document.createElement('article');
            card.className = 'avaliacao';

            const nome = document.createElement('h3');
            nome.textContent = item.nome || 'Usuário';

            const nota = document.createElement('p');
            nota.className = 'nota';
            nota.textContent = `Nota: ${item.nota}/5`;

            const comentario = document.createElement('p');
            comentario.textContent = item.comentario || 'Sem comentário.';

            card.append(nome, nota, comentario);
            listaAvaliacoes.appendChild(card);
        });

    } catch (erro) {
        listaAvaliacoes.textContent = erro.message;
    }
}

// Envia uma avaliação
formularioAvaliacao.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nota = Number(document.getElementById('nota').value);
    const comentario = document.getElementById('comentario').value;

    try {
        mensagemAvaliacao.textContent = 'Enviando avaliação...';

        await apiRequest('/avaliacoes', {
            method: 'POST',
            body: JSON.stringify({
                filmeId: Number(filmeId),
                nota,
                comentario
            })
        });

        mensagemAvaliacao.textContent = 'Avaliação enviada com sucesso!';
        mensagemAvaliacao.style.color = '#4ade80';

        formularioAvaliacao.reset();

        await carregarAvaliacoes();

    } catch (erro) {
        mensagemAvaliacao.textContent = erro.message;
        mensagemAvaliacao.style.color = '#f87171';
    }
});

// Inicialização
if (filmeId) {
    carregarDetalhes();
    carregarAvaliacoes();
} else {
    detalhesFilme.textContent = 'Nenhum filme foi selecionado.';
    listaAvaliacoes.textContent = 'Não foi possível carregar as avaliações.';
}
