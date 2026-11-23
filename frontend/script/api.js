
const API_URL = 'http://localhost:3000/api';

// Recupera o token salvo no navegador
function obterToken() {
    return localStorage.getItem('token');
}

// Salva o token de autenticação
function salvarToken(token) {
    localStorage.setItem('token', token);
}

// Remove o token ao sair da conta
function removerToken() {
    localStorage.removeItem('token');
}

// Verifica se existe uma sessão
function estaAutenticado() {
    return Boolean(obterToken());
}

// Função principal para realizar requisições à API
async function apiRequest(endpoint, options = {}) {
    const token = obterToken();

    const headers = {
        ...options.headers
    };

    if (options.body) {
        headers['Content-Type'] = 'application/json';
    }

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const resposta = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers
        });

        const dados = await resposta.json().catch(() => ({}));

        if (!resposta.ok) {
            throw new Error(
                dados.erro || dados.mensagem || 'Erro na comunicação com o servidor.'
            );
        }

        return dados;

    } catch (erro) {
        console.error('Erro na API:', erro);
        throw erro;
    }
}
