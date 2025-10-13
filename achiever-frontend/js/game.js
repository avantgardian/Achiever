// Game Detail Page JavaScript

async function fetchGameData() {
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('id');

    const response = await fetch(`http://localhost:3000/api/games/${gameId}`);
    const game = await response.json();
    console.log('Fetched game:', game);

    const achievements = await fetchAchievements(gameId);
    renderAchievements(achievements);
    console.log('Fetched achievements:', achievements);
}

async function fetchAchievements(gameId) {
    const response = await fetch(`http://localhost:3000/api/games/${gameId}/achievements`);

    return await response.json();
}

function renderAchievements(achievements) {
    const achievementsGrid = document.querySelector('.achievements-grid');
    achievementsGrid.innerHTML = '';
    
    let allAchievementCards = '';

    achievements.forEach(achievement => {
        const cardHTML = `
            <div class="achievement-card">
                <div class="achievement-icon">
                    <img src="${achievement.iconUrl}" 
                             alt="Achievement Icon">
                </div>
                <div class="achievement-content">
                    <h3 class="achievement-name">${achievement.name}</h3>
                    <p class="achievement-desc">${achievement.description}</p>
                </div>
                <div class="achievement-status">
                    <div class="status-badge locked">
                        <i class="bi bi-lock-fill"></i>
                    </div>
                </div>
            </div>
        `;
        allAchievementCards += cardHTML;
    });
    achievementsGrid.innerHTML = allAchievementCards;
}

document.addEventListener('DOMContentLoaded', () => {
    fetchGameData();
})