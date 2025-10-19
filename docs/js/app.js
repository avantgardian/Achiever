let allGames = [];
let searchTimeout; // timer ID

function renderGames(games) {
    const gamesGrid = document.getElementById('gamesGrid');

    gamesGrid.innerHTML = '';

    if (games.length === 0) {
        gamesGrid.innerHTML = `
            <div class="empty-state">
                <i class="bi bi-search"></i>
                <h3>No games found</h3>
                <p>Try a different search term</p>
            </div>
        `;
        return;
    }

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

    gamesGrid.innerHTML = allGameCards;

    // Initialize tooltips for the newly rendered cards
    initializeTooltips();
}

function initializeTooltips() {
    const tooltipTriggerList = [...document.querySelectorAll('[data-bs-toggle="tooltip"]')];

    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

function filterGames(searchQuery) {
    if (!searchQuery) {
        return allGames;
    }
    const query = searchQuery.toLowerCase();

    return allGames.filter(game => game.name.toLowerCase().includes(query));
}

async function fetchGames() {
    const response = await fetch(`${window.API_URL}/api/games`);
    const games = await response.json();
    allGames = games; // will use this for the search functionality
    console.log('Fetched Games: ', games);
    renderGames(games);
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('We loaded in this!');
    fetchGames();
    
    const searchInput = document.getElementById('gameSearch');
    searchInput.addEventListener('input', (event) => {
        clearTimeout(searchTimeout);

        searchTimeout = setTimeout(() => {
            renderGames(filterGames(event.target.value));
        }, 300);
    });
})