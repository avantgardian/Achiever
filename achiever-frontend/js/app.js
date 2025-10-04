function renderGames(games) {
    const gamesGrid = document.getElementById('gamesGrid');
    gamesGrid.innerHTML = '';
    
    let allGameCards = '';

    games.forEach(game => {
        const cardHTML = `
            <div class="col">
                <div class="card h-100 game-card">
                    <img src="${game.imageUrl || 'https://via.placeholder.com/300x200'}" 
                        class="card-img-top" 
                        alt="${game.name}">
                    <div class="card-body">
                        <h5 class="card-title">${game.name}</h5>
                        <div class="stats-row">
                            <span class="stat-item" data-bs-toggle="tooltip" title="Number of Achievements">
                                <i class="bi bi-trophy-fill"></i> 0
                            </span>
                            <span class="stat-item" data-bs-toggle="tooltip" title="Number of Guides">
                                <i class="bi bi-book-fill"></i> 0
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
}

async function fetchGames() {
    const response = await fetch('http://localhost:3000/api/games');
    const games = await response.json();
    console.log('Fetched Games: ', games);
    renderGames(games);
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('We loaded in this!');
    fetchGames();
})