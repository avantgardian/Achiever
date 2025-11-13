async function fetchGuideData(guideId) {
    try {
        const response = await fetch(`${window.API_URL}/api/guides/${guideId}`)
        const guide = await response.json();

        renderGuideHero(guide);
        renderGuideSections(guide.sections, guide.guideAchievements);
    } catch (error) {
        console.error('Error loading guide:', error);
        const grid = document.querySelector('.guide-title-section');
        grid.innerHTML = '<p class="text-center loading-text">Failed to load guide data. Please try again.</p>';
    }
}

function renderGuideHero(guide) {
    document.title = guide.title + ' - ' + guide.game.name + ' - Achiever';

    const categoryBadge = document.querySelector('.guide-badge');
    categoryBadge.textContent = guide.category;

    const title = document.querySelector('.guide-hero-title')
    title.textContent = guide.title;

    const description = document.querySelector('.guide-hero-description')
    description.textContent = guide.description;

    const metaStats = document.querySelectorAll('.meta-stat span');
    metaStats[0].textContent = guide.estimatedTime;
    metaStats[1].textContent = guide._count.guideAchievements + ' Achievements';

    const difficultyBadge = document.querySelector('.meta-stat.difficulty');
    difficultyBadge.classList.remove('easy', 'medium', 'hard');
    difficultyBadge.classList.add(guide.difficulty.toLowerCase());
    difficultyBadge.querySelector('span').textContent = guide.difficulty;
}

async function incrementGuideViews(guideId) {
    const alreadyViewed = sessionStorage.getItem(`viewed_guide_${guideId}`);
    if (alreadyViewed) {
        return;
    }

    await fetch(`${window.API_URL}/api/guides/${guideId}/view`, { method: 'POST' });
    sessionStorage.setItem(`viewed_guide_${guideId}`, 'true');
}


document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const guideId = urlParams.get('id');

    incrementGuideViews(guideId);
    fetchGuideData(guideId);
});