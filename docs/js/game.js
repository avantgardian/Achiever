// Game Detail Page JavaScript
import { calculateProgress } from "./helpers.js";

async function fetchGameData(gameId) {
    try {
        const response = await fetch(`${window.API_URL}/api/games/${gameId}`);
        const game = await response.json();

        const achievements = await fetchAchievements(gameId);
        const guides = await fetchGuides(gameId);

        renderGameHeader(game);
        renderAchievements(achievements);
        renderGuides(guides);
        updateProgressBar(achievements);
    } catch (error) {
        console.error('Error loading game:', error);
        const grid = document.getElementById('achievementsGrid');
        grid.innerHTML = '<p class="text-center loading-text">Failed to load achievements. Please try again.</p>';
    }
}

async function fetchAchievements(gameId) {
    const response = await fetch(`${window.API_URL}/api/games/${gameId}/achievements`);

    return await response.json();
}

async function fetchGuides(gameId) {
    const response = await fetch(`${window.API_URL}/api/games/${gameId}/guides`);

    return await response.json();
}

function countGuideAchievementBlocks(sections = []) {
    if (!Array.isArray(sections)) {
        return 0;
    }

    let total = 0;

    sections.forEach((section) => {
        total += countAchievementBlocks(section.blocks || []);
    });

    return total;
}

function countAchievementBlocks(blocks = []) {
    if (!Array.isArray(blocks)) {
        return 0;
    }

    let total = 0;

    blocks.forEach((block) => {
        if (block.type === 'achievement') {
            total += 1;
        } else if (block.type === 'branch' && Array.isArray(block.options)) {
            block.options.forEach((option) => {
                total += countAchievementBlocks(option.blocks || []);
            });
        }
    });

    return total;
}

function renderGameHeader(game) {
    // Page Title
    document.title = game.name + ' - Achiever';

    // Title & Description
    const title = document.querySelector('.game-title');
    title.textContent = game.name;
    title.classList.remove('skeleton-text');
    
    const description = document.querySelector('.game-description');
    description.textContent = game.description;
    description.classList.remove('skeleton-text');

    // Image
    const image = document.querySelector('.game-image');
    image.src = game.imageUrl;
    image.alt = game.name;
    image.classList.remove('skeleton-image');

    // Stats
    const statValues = document.querySelectorAll('.stat-value');
    statValues[0].textContent = game._count.achievements;
    statValues[0].classList.remove('skeleton');
    
    statValues[1].textContent = game._count.guides;
    statValues[1].classList.remove('skeleton');
    
    // Handle null release date
    statValues[2].textContent = game.releaseDate 
        ? new Date(game.releaseDate).getFullYear() 
        : 'TBA';
    statValues[2].classList.remove('skeleton');
}

function renderAchievements(achievements) {
    const achievementsGrid = document.getElementById('achievementsGrid');
    
    // Remove all skeleton cards
    const skeletonCards = document.querySelectorAll('.skeleton-card');
    skeletonCards.forEach(card => card.remove());

    if (!achievements || achievements.length === 0) {
        achievementsGrid.innerHTML = '<p class="text-center loading-text">No achievements found.</p>';
        return;
    }
    
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

function updateProgressBar(achievements) {
    const total = achievements.length;

    // For now, no user logged in, so completed = 0
    const completed = 0;
    
    // Use YOUR function!
    const percentage = calculateProgress(completed, total);
    
    document.querySelector('.progress-text').textContent = `${completed} / ${total} Unlocked`;
    const progressBar = document.querySelector('.progress-bar-fill');
    progressBar.style.width = percentage +'%';
}

function renderGuides(guides) {
    const guidesGrid = document.querySelector('.guides-grid');
    
    // Remove all skeleton cards
    const skeletonCards = document.querySelectorAll('.skeleton-card');
    skeletonCards.forEach(card => card.remove());

    // Update guides count
    const guidesCount = document.querySelector('.count-text');
    guidesCount.textContent = `${guides.length} Guides Available`;
    guidesCount.classList.remove('skeleton');

    if (!guides || guides.length === 0) {
        guidesGrid.innerHTML = '<p class="text-center loading-text">No guides found.</p>';
        return;
    }

    let allGuidesCards = '';

    guides.forEach(guide => {
        const achievementCount = countGuideAchievementBlocks(guide.sections);
        const cardHTML = `
            <div class="guide-card" onclick="window.location.href='guide.html?id=${guide.id}'">
                    <div class="guide-header">
                        <div class="guide-icon">
                            <i class="bi ${guide.icon}"></i>
                        </div>
                        <div class="guide-meta">
                            <span class="guide-badge">${guide.category}</span>
                            <span class="guide-difficulty ${guide.difficulty.toLowerCase()}">${guide.difficulty}</span>
                        </div>
                    </div>
                    <div class="guide-content">
                        <h3 class="guide-title">${guide.title}</h3>
                        <p class="guide-description">${guide.description}</p>
                        <div class="guide-stats">
                            <div class="guide-stat">
                                <i class="bi bi-trophy"></i>
                                <span>${achievementCount} Achievements</span>
                            </div>
                            <div class="guide-stat">
                                <i class="bi bi-clock"></i>
                                <span>${guide.estimatedTime}</span>
                            </div>
                        </div>
                    </div>
                    <div class="guide-footer">
                        <button class="guide-btn">
                            View Guide
                            <i class="bi bi-arrow-right"></i>
                        </button>
                    </div>
                </div>
        `;
        allGuidesCards += cardHTML;
    });

    guidesGrid.innerHTML = allGuidesCards;
}

async function incrementGameViews(gameId) {
    const alreadyViewed = sessionStorage.getItem(`viewed_game_${gameId}`);
    if (alreadyViewed) {
        return;
    }

    await fetch(`${window.API_URL}/api/games/${gameId}/view`, { method: 'POST' });
    sessionStorage.setItem(`viewed_game_${gameId}`, 'true');
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('id');

    incrementGameViews(gameId);
    fetchGameData(gameId);
})