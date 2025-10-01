function renderGames(games) {
    const gamesGrid = document.getElementById('gamesGrid');
    // clear any loading message
    gamesGrid.innerHTML = '';
    console.log('Rendering', games.length, 'games');

}

async function fetchGames() {
    const response = await fetch('http://localhost:3000/api/games');
    const games = await response.json();
    console.log('Fetched Games: ' + games);
    renderGames(games);
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('We loaded in this!');
    fetchGames();
})