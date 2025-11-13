function createAchievementMap(guideAchievements) {
    const achievementMap = {};
    
    for (const item of guideAchievements) {
        achievementMap[item.achievementId] = item.achievement;
    }

    return achievementMap;
}


async function fetchGuideData(guideId) {
    try {
        const response = await fetch(`${window.API_URL}/api/guides/${guideId}`);
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

    // Update back button to correct game page
    const backButton = document.querySelector('.nav-back');
    backButton.href = `game.html?id=${guide.gameId}`;

    // Update hero icon
    const heroIcon = document.querySelector('.guide-icon-large i');
    heroIcon.className = `bi ${guide.icon}`;

    const categoryBadge = document.querySelector('.guide-badge');
    categoryBadge.textContent = guide.category;
    categoryBadge.classList.remove('skeleton-text');

    const title = document.querySelector('.guide-hero-title')
    title.textContent = guide.title;
    title.classList.remove('skeleton-text');

    const description = document.querySelector('.guide-hero-description')
    description.textContent = guide.description;
    description.classList.remove('skeleton-text');

    const metaStats = document.querySelectorAll('.meta-stat span');
    metaStats[0].textContent = guide.estimatedTime;
    metaStats[0].classList.remove('skeleton-text');
    metaStats[1].textContent = guide.guideAchievements.length + ' Achievements';
    metaStats[1].classList.remove('skeleton-text');

    const difficultyBadge = document.querySelector('.meta-stat.difficulty');
    difficultyBadge.classList.remove('easy', 'medium', 'hard');
    difficultyBadge.classList.add(guide.difficulty.toLowerCase());
    const difficultySpan = difficultyBadge.querySelector('span');
    difficultySpan.textContent = guide.difficulty;
    difficultySpan.classList.remove('skeleton-text');
}

function renderGuideSections(sections, guideAchievements) {
    const achievementMap = createAchievementMap(guideAchievements);
    const guideTree = document.querySelector('.guide-tree');

    let allSectionsHTML = ''

    for(const section of sections) {
        allSectionsHTML += renderSection(section, achievementMap);
    }
    
    guideTree.innerHTML = allSectionsHTML;
}

function renderSection(section, achievementMap) {
    const blocksHTML = renderBlocks(section.blocks, achievementMap);

    return `
        <div class="guide-section" data-section="${section.id}">
            <div class="section-header">
                <div class="section-icon">
                    <i class="bi ${section.icon}"></i>
                </div>
                <div class="section-info">
                    <h2 class="section-title">${section.title}</h2>
                    <p class="section-description">${section.description}</p>
                </div>
            </div>
            <div class="section-content">
                ${blocksHTML}
            </div>
        </div>
    `;
}

function renderBlocks(blocks, achievementMap) {
    let allBlocksHTML = '';

    for (const block of blocks) {
        if (block.type === 'step') {
            allBlocksHTML += renderStepBlock(block);
        } else if (block.type === 'tip') {
            allBlocksHTML += renderTipBlock(block);
        } else if (block.type === 'warning') {
            allBlocksHTML += renderWarningBlock(block);
        } else if (block.type === 'text') {
            allBlocksHTML += renderTextBlock(block);
        } else if (block.type === 'image') {
            allBlocksHTML += renderImageBlock(block);
        } else if (block.type === 'achievement') {
            allBlocksHTML += renderAchievementBlock(block, achievementMap);
        } else if (block.type === 'branch') {
            allBlocksHTML += renderBranchBlock(block, achievementMap);
        }
    }

    return allBlocksHTML;
}


function renderStepBlock(block) {
    return `
        <div class="step-item">
            <div class="step-checkbox"></div>
            <p class="step-text">${block.text}</p>
        </div>
    `;
}

function renderTipBlock(block) {
    return `
        <div class="content-block tip">
            <div class="content-icon">
                <i class="bi bi-lightbulb"></i>
            </div>
            <div class="content-text">
                <h4 class="content-title">${block.title}</h4>
                <p class="content-description">${block.content}</p>
            </div>
        </div>
    `;
}

function renderWarningBlock(block) {
    return `
        <div class="content-block warning">
            <div class="content-icon">
                <i class="bi bi-exclamation-triangle"></i>
            </div>
            <div class="content-text">
                <h4 class="content-title">${block.title}</h4>
                <p class="content-description">${block.content}</p>
            </div>
        </div>
    `;
}

function renderTextBlock(block) {
    const paragraphsHTML = block.paragraphs.map(p => `<p class="content-description">${p}</p>`).join('');

    return `
        <div class="content-block text">
            <div class="content-text">
                <h4 class="content-title">${block.title}</h4>
                ${paragraphsHTML}
            </div>
        </div>
    `;
}

function renderImageBlock(block) {
    return `
        <div class="content-block image">
            <div class="content-image">
                <img src="${block.url}" alt="${block.alt}">
            </div>
            <div class="content-text">
                <h4 class="content-title">${block.title}</h4>
                <p class="content-description">${block.caption}</p>
            </div>
        </div>
    `;
}

function renderAchievementBlock(block, achievementMap) {
    const achievement = achievementMap[block.achievementId];

    return `
        <div class="achievement-milestone">
            <div class="milestone-checkbox"></div>
            <div class="milestone-info">
                <div class="milestone-icon">
                    <img src="${achievement.iconUrl}" alt="${achievement.name}">
                </div>
                <div class="milestone-text">
                    <h4 class="milestone-title">${achievement.name}</h4>
                    <p class="milestone-desc">${achievement.description}</p>
                </div>
            </div>
        </div>
    `;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function renderBranchBlock(block, achievementMap) { // TODO: Implement for MVP v2
    return '';
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