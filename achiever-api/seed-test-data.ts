import { PrismaClient, Difficulty } from '@prisma/client';

const prisma = new PrismaClient();

const TEST_GAMES = [
    {
        name: 'Year Walk',
        steamAppId: 269050,
        description: 'Experience the ancient Swedish phenomena of year walking through a different kind of first person adventure.',
        imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/269050/header.jpg',
        releaseDate: new Date('2014-02-27'),
        published: true,
        achievements: [
            {
                name: 'The End',
                description: 'Complete Year Walk',
                steamAchievementId: 'YEAR_WALK_COMPLETE',
                iconUrl: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/269050/achievement_01.jpg'
            },
            {
                name: 'The Beginning',
                description: 'Start Year Walk',
                steamAchievementId: 'YEAR_WALK_START',
                iconUrl: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/269050/achievement_02.jpg'
            },
            {
                name: 'The Night Walk',
                description: 'Walk through the night',
                steamAchievementId: 'NIGHT_WALK',
                iconUrl: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/269050/achievement_03.jpg'
            },
            {
                name: 'The Forest',
                description: 'Enter the dark forest',
                steamAchievementId: 'ENTER_FOREST',
                iconUrl: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/269050/achievement_04.jpg'
            },
            {
                name: 'The Stream',
                description: 'Cross the frozen stream',
                steamAchievementId: 'CROSS_STREAM',
                iconUrl: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/269050/achievement_05.jpg'
            },
            {
                name: 'The Church',
                description: 'Find the old church',
                steamAchievementId: 'FIND_CHURCH',
                iconUrl: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/269050/achievement_06.jpg'
            },
            {
                name: 'The Mill',
                description: 'Discover the abandoned mill',
                steamAchievementId: 'FIND_MILL',
                iconUrl: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/269050/achievement_07.jpg'
            },
            {
                name: 'The Vision',
                description: 'Experience the vision',
                steamAchievementId: 'SEE_VISION',
                iconUrl: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/269050/achievement_08.jpg'
            },
            {
                name: 'The Mystery',
                description: 'Uncover the mystery',
                steamAchievementId: 'SOLVE_MYSTERY',
                iconUrl: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/269050/achievement_09.jpg'
            },
            {
                name: 'The Truth',
                description: 'Learn the truth',
                steamAchievementId: 'LEARN_TRUTH',
                iconUrl: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/269050/achievement_10.jpg'
            }
        ]
    },
    {
        name: 'SnowRunner',
        steamAppId: 1465360,
        description: 'Get ready for the next-generation off-road experience!',
        imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1465360/header.jpg',
        releaseDate: new Date('2020-04-28'),
        published: true,
        achievements: [
            {
                name: 'First Steps',
                description: 'Complete your first mission',
                steamAchievementId: 'SNOWRUNNER_FIRST_MISSION',
                iconUrl: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/1465360/achievement_01.jpg'
            }
        ]
    },
    {
        name: 'RoadCraft',
        steamAppId: 2104890,
        description: 'The road is your canvas.',
        imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2104890/header.jpg',
        releaseDate: new Date('2022-11-18'),
        published: true,
        achievements: []
    }
];

const TEST_GUIDES = [
    {
        gameId: 1, // Year Walk
        title: "Story Walkthrough",
        description: "Complete the main story and unlock all story-related achievements. Perfect for first-time players.",
        difficulty: "EASY" as Difficulty,
        estimatedTime: "2-3 hours",
        category: "Main Story",
        icon: "bi-lightning-charge-fill",
        published: true,
        sections: [
            {
                title: "Getting Started",
                steps: [
                    "Start a new game",
                    "Follow the main path",
                    "Complete Chapter 1"
                ]
            }
        ]
    },
    {
        gameId: 1, // Year Walk
        title: "New Game+",
        description: "Master the game with advanced techniques and unlock hidden achievements.",
        difficulty: "MEDIUM" as Difficulty,
        estimatedTime: "2 hours",
        category: "Advanced",
        icon: "bi-star-fill",
        published: true,
        sections: [
            {
                title: "Advanced Techniques",
                steps: [
                    "Complete the game once",
                    "Start New Game+",
                    "Use advanced strategies"
                ]
            }
        ]
    },
    {
        gameId: 1, // Year Walk
        title: "100% Completion",
        description: "Unlock every achievement in the game. Includes collectibles, hidden secrets, and challenge achievements.",
        difficulty: "HARD" as Difficulty,
        estimatedTime: "4-5 hours",
        category: "100%",
        icon: "bi-gem",
        published: true,
        sections: [
            {
                title: "Complete Walkthrough",
                steps: [
                    "Find all collectibles",
                    "Complete all challenges",
                    "Unlock hidden achievements"
                ]
            }
        ]
    }
];

async function seedTestData() {
    console.log('🌱 Seeding test data for CI...');

    for (const gameData of TEST_GAMES) {
        const existingGame = await prisma.game.findFirst({
            where: { steamAppId: gameData.steamAppId }
        });

        if (existingGame) {
            console.log(`✓ Game "${gameData.name}" already exists, skipping...`);
            continue;
        }

        // Extract achievements from gameData
        const { achievements, ...gameInfo } = gameData;

        // Create game with achievements
        const newGame = await prisma.game.create({
            data: {
                ...gameInfo,
                achievements: {
                    create: achievements
                }
            },
            include: {
                achievements: true
            }
        });

        console.log(`✅ Created "${newGame.name}" with ${newGame.achievements.length} achievements`);
    }

    for (const guideData of TEST_GUIDES) {
        const existingGuide = await prisma.guide.findFirst({
            where: {
                title: guideData.title,
                gameId: guideData.gameId
            }
        });

        if (existingGuide) {
            console.log(`✓ Guide "${guideData.title}" already exists, skipping...`);
            continue;
        }

        await prisma.guide.create({
            data: guideData
        });

        console.log(`✅ Created guide: "${guideData.title}"`);
    }

    await prisma.$disconnect();
    console.log('✨ Test data seeding complete!');
}

seedTestData()
    .catch((error) => {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    });

export {};