import { getYouTubeId, getRandomMatchScore, getRandomDuration, getRandomAgeBadge } from '../utils.js';

// Função para gerar tags (usa as do item se disponíveis, senão padrão)
function generateTags(item) {
    let tags = item.tags || [
        ["Movimento", "Cardio", "Foco"],
        ["Força", "Flexibilidade"],
        ["Saúde Mental", "Motivação"]
    ];

    // Garante que tags seja um array de arrays
    if (!Array.isArray(tags[0])) {
        tags = [tags]; // Se for um array simples, coloca em uma linha
    }

    const tagsHTML = (tags[0] || []).map(tag => `<span>${tag}</span>`).join('');
    const tags2HTML = (tags[1] || []).map(tag => `<span>${tag}</span>`).join('');
    const tags3HTML = (tags[2] || []).map(tag => `<span>${tag}</span>`).join('');

    return { tagsHTML, tags2HTML, tags3HTML };
}

export function createCard(item) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    if (item.progress) {
        card.classList.add('has-progress');
    }

    const img = document.createElement('img');
    img.src = item.img;
    img.alt = `Foto do profissional`;

    // Se o item não tiver link de vídeo, marcamos como 'no-link' para não mostrar iframe e hover de vídeo.
    const hasVideo = Boolean(item.youtube && item.youtube.trim());
    if (!hasVideo) {
        card.classList.add('no-link');
    }

    let iframe;
    let videoId;
    if (hasVideo) {
        // Criamos iframe apenas quando o item tem vídeo, para evitar carregamento desnecessário.
        iframe = document.createElement('iframe');
        iframe.frameBorder = "0";
        iframe.allow = "autoplay; encrypted-media";

        videoId = getYouTubeId(item.youtube);

        card.appendChild(iframe);
    }

    card.appendChild(img);
    if (hasVideo) {
        // Informação extra só para cards com vídeo: classificações, tags, botões de ação.
        const ageBadge = getRandomAgeBadge();

        // Gerar tags dinâmicas
        const { tagsHTML, tags2HTML, tags3HTML } = generateTags(item);

        const details = document.createElement('div');
        details.className = 'card-details';
        details.innerHTML = `
            <div class="details-buttons">
                <div class="left-buttons">
                    <button class="btn-icon btn-play-icon"><i class="fas fa-play" style="margin-left:2px;"></i></button>
                    ${item.progress ? '<button class="btn-icon"><i class="fas fa-check"></i></button>' : '<button class="btn-icon"><i class="fas fa-plus"></i></button>'}
                    <button class="btn-icon"><i class="fas fa-thumbs-up"></i></button>
                </div>
                <div class="right-buttons">
                    <button class="btn-icon"><i class="fas fa-chevron-down"></i></button>
                </div>
            </div>
            <div class="details-info">
                <span class="match-score">${getRandomMatchScore()}% relevante</span>
                <span class="age-badge ${ageBadge.class}">${ageBadge.text}</span>
                <span class="duration">${getRandomDuration(item.progress)}</span>
                <span class="resolution">HD</span>
            </div>
            <div class="details-tags">
                <div class="details-tags">${tagsHTML}</div>
                <div class="details-tags">${tags2HTML}</div>
                <div class="details-tags">${tags3HTML}</div>
            </div>
        `;
        card.appendChild(details);
    }

    if (item.progress) {
        const pbContainer = document.createElement('div');
        pbContainer.className = 'progress-bar-container';
        const pbValue = document.createElement('div');
        pbValue.className = 'progress-value';
        pbValue.style.width = `${item.progress}%`;
        pbContainer.appendChild(pbValue);
        card.appendChild(pbContainer);
    }

    if (hasVideo) {
        let playTimeout;
        card.addEventListener('mouseenter', () => {
            const rect = card.getBoundingClientRect();
            const windowWidth = window.innerWidth;
            
            if (rect.left < 100) {
                card.classList.add('origin-left');
            } else if (rect.right > windowWidth - 100) {
                card.classList.add('origin-right');
            }

            playTimeout = setTimeout(() => {
                iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${videoId}`;
                iframe.classList.add('playing');
                img.classList.add('playing-video');
            }, 600);
        });

        card.addEventListener('mouseleave', () => {
            clearTimeout(playTimeout);
            iframe.classList.remove('playing');
            img.classList.remove('playing-video');
            iframe.src = "";
            card.classList.remove('origin-left');
            card.classList.remove('origin-right');
        });
    }

    return card;
}

export function createProfessionalCard(item) {
    const card = document.createElement('div');
    card.className = 'movie-card professional-card';

    const img = document.createElement('img');
    img.src = item.img;
    img.alt = `Foto do profissional`;
    card.appendChild(img);

    return card;
}

