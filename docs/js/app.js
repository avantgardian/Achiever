function renderGames(games) {
    const gamesGrid = document.getElementById('gamesGrid');
    
    // Remove all skeleton cards
    const skeletonCards = document.querySelectorAll('.skeleton-card');
    skeletonCards.forEach(card => card.remove());
    
    let allGameCards = '';

    games.forEach(game => {
        const cardHTML = `
            <div class="col" onclick="window.location.href='game.html?id=${game.id}'">
                <div class="card h-100 game-card">
                    <img src="${game.imageUrl || 'https://via.placeholder.com/300x200'}" 
                        class="card-img-top" 
                        alt="${game.name}">
                    <div class="card-body">
                        <h5 class="card-title">${game.name}</h5>
                        <div class="stats-row">
                            <span class="stat-item" data-bs-toggle="tooltip" title="Number of Achievements">
                                <i class="bi bi-trophy-fill"></i> ${game._count.achievements}
                            </span>
                            <span class="stat-item" data-bs-toggle="tooltip" title="Number of Guides">
                                <i class="bi bi-book-fill"></i> ${game._count.guides}
                            </span>
                            <span class="stat-item" data-bs-toggle="tooltip" title="Number of Views">
                                <i class="bi bi-eye-fill"></i> 0
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        allGameCards += cardHTML;
    });

    gamesGrid.innerHTML += allGameCards;

    // Initialize tooltips for the newly rendered cards
    initializeTooltips();
}

function initializeTooltips() {
    const tooltipTriggerList = [...document.querySelectorAll('[data-bs-toggle="tooltip"]')];

    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

async function fetchGames() {
    const response = await fetch(`${window.API_URL}/api/games`);
    const games = await response.json();
    console.log('Fetched Games: ', games);
    renderGames(games);
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('We loaded in this!');
    fetchGames();
})