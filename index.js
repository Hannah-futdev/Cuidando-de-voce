const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function applyTheme(theme) {
    body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    if (theme === 'dark') {
        themeToggle.textContent = '☀️ Modo Claro';
        themeToggle.setAttribute('aria-pressed', 'true');
    } else {
        themeToggle.textContent = '🌙 Modo Escuro';
        themeToggle.setAttribute('aria-pressed', 'false');
    }
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const theme = savedTheme === 'dark' ? 'dark' : 'light';
    applyTheme(theme);
}

function setupThemeToggle() {
    if (!themeToggle) return;

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });
}

function setupProfiles() {
    const profiles = document.querySelectorAll('.profile');
    profiles.forEach(profile => {
        profile.style.cursor = 'pointer';

        profile.addEventListener('click', () => {
            const nameElement = profile.querySelector('h4');
            const imgElement = profile.querySelector('img');

            if (!nameElement || !imgElement) return;

            const profileData = {
                name: nameElement.textContent.trim(),
                image: imgElement.getAttribute('src')
            };

            localStorage.setItem('activeProfile', JSON.stringify(profileData));
            window.location.href = 'catalogo/catalogo.html';
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    setupThemeToggle();
    setupProfiles();
});
