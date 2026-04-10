import { categories } from './data.js';
import { createCarousel } from './components/Carousel.js';
document.querySelectorAll('.footer-links a').forEach(link => {
  const texto = link.textContent;
  link.replaceWith(texto);
});
const dicas = [
    "Sabia que as atividades físicas podem melhorar seu humor? Experimente começar hoje!",
    "Durma bem para melhorar a recuperação muscular.",
    "Coma pelo menos 1 porção de frutas e vegetais todos os dias.",
    "Pequenas caminhadas ajudam seus batimentos cardíacos."
];
function getRandomDica() {
    const indice = Math.floor(Math.random() * dicas.length);
    const mensagem = dicas[indice];
    const paragrafo = document.querySelector('.dica-box p');
    if (paragrafo) {
            paragrafo.textContent = mensagem;
    }
}
// Dark/Light Mode Toggle
const toggleButton = document.getElementById('theme-toggle');
const body = document.body;



// Verifica se existe preferência salva no localStorage
const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);
updateToggleButton(savedTheme);

// Event listener para o botão de toggle
toggleButton.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggleButton(newTheme);
});

// Atualiza o texto/ícone do botão de acordo com o tema
function updateToggleButton(theme) {
    if (theme === 'dark') {
        toggleButton.textContent = '☀️';
    } else {
        toggleButton.textContent = '🌙';
    }
}

// Sincroniza com preferências do sistema (opcional)
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
prefersDark.addEventListener('change', (e) => {
    const newTheme = e.matches ? 'dark' : 'light';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggleButton(newTheme);
});


// Carrega o perfil ativo quando a página carrega
function loadActiveProfile() {
    const profileData = localStorage.getItem('activeProfile');

    if (profileData) {
        try {
            const profile = JSON.parse(profileData);
            console.log('Perfil carregado:', profile);

            // Atualiza o nome
            const nameElement = document.querySelector('.kids-link');
            if (nameElement && profile.name) {
                nameElement.textContent = profile.name;
                console.log('Nome atualizado para:', profile.name);
            }

            // Atualiza a imagem
            const imageElement = document.querySelector('.profile-icon');
            if (imageElement && profile.image) {
                // Converte o caminho relativo para a pasta catalogo
                let imagePath = profile.image;
                if (imagePath.startsWith('assets/')) {
                    imagePath = '../' + imagePath;
                }
                imageElement.src = imagePath;
                console.log('Imagem atualizada para:', imagePath);
            }

        } catch (error) {
            console.error('Erro ao carregar perfil:', error);
        }
    } else {
        console.log('Nenhum perfil ativo encontrado');
    }
}

// Carrega o catálogo
function loadCatalog() {
    const mainContainer = document.getElementById('main-content');
    const topCarrousel = document.querySelector('.carrousel');
    const bottomContainer = document.querySelector('.conteudo-principal');

    if (mainContainer && topCarrousel && bottomContainer) {
        categories.forEach((category, index) => {
            const carousel = createCarousel(category);
            if (category.title === "Você parou aqui!") {
                // Injeta o carrossel especial na top-section
                topCarrousel.appendChild(carousel);
            } else {
                // Injeta os outros carrosséis na parte inferior
                bottomContainer.appendChild(carousel);
            }
        });
    }
}

// Executa quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    getRandomDica();
    loadActiveProfile();
    loadCatalog();
});
