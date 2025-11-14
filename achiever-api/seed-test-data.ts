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
        id: 4,
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
                id: "getting-started",
                title: "Getting Started",
                description: "Begin your Year Walk journey. This section covers the initial setup and basic navigation through the first forest area. You'll learn the core mechanics and reach your first major milestone.",
                icon: "bi-play-circle",
                blocks: [
                    {
                        type: "step",
                        text: "Start a new game and choose your difficulty level"
                    },
                    {
                        type: "tip",
                        title: "Pro Tip",
                        content: "Choose \"Normal\" difficulty for your first playthrough. You can always replay on harder difficulties later for additional achievements."
                    },
                    {
                        type: "text",
                        title: "Understanding the World",
                        paragraphs: [
                            "Year Walk is a unique atmospheric adventure game that combines puzzle-solving with Swedish folklore. The game takes place in a mysterious forest where you must navigate through various challenges to complete your year walk ritual. Each area you encounter has its own set of rules and mechanics that you'll need to understand to progress.",
                            "The forest is filled with supernatural creatures and ancient symbols that hold the key to unlocking the mysteries of the year walk. Pay close attention to environmental details, as they often contain important clues for solving puzzles and avoiding dangerous encounters. The game's minimalist approach means that every visual element serves a purpose in the overall narrative.",
                            "As you progress through the forest, you'll encounter various obstacles that test both your observation skills and your understanding of the game's world. Some puzzles require careful timing, while others demand patience and careful exploration. Remember that the year walk is not just about reaching the end, but about understanding the journey itself."
                        ]
                    },
                    {
                        type: "step",
                        text: "Complete the basic tutorial and learn the controls"
                    },
                    {
                        type: "warning",
                        title: "Important",
                        content: "Pay attention to the tutorial! Some mechanics are only explained once and are crucial for later achievements."
                    },
                    {
                        type: "step",
                        text: "Navigate through the first forest area"
                    },
                    {
                        type: "image",
                        url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop",
                        alt: "Forest Area",
                        title: "First Forest Area",
                        caption: "This is what the first forest area looks like. Look for the glowing mushrooms - they indicate the correct path forward."
                    },
                    {
                        type: "step",
                        text: "Interact with the guide character and learn about the world"
                    },
                    {
                        type: "achievement",
                        achievementId: 1
                    }
                ]
            },
            {
                id: "the-choice",
                title: "The Choice",
                description: "⚠️ SAVE POINT: Create a save file here! This is a critical decision point that affects multiple achievements. The guide character will offer you a map - your choice here determines which path you take and which achievements become available.",
                icon: "bi-diagram-2",
                blocks: [
                    {
                        type: "branch",
                        warning: "Create a save file before proceeding!",
                        options: [
                            {
                                id: "accept-map",
                                title: "Option A: Accept the Map",
                                description: "Take the map from the guide. This makes navigation easier but affects certain achievements.",
                                blocks: [
                                    {
                                        type: "step",
                                        text: "Accept the map from the guide character"
                                    },
                                    {
                                        type: "step",
                                        text: "Use the map to navigate through the forest"
                                    },
                                    {
                                        type: "achievement",
                                        achievementId: 3
                                    }
                                ]
                            },
                            {
                                id: "refuse-map",
                                title: "Option B: Refuse the Map",
                                description: "Decline the map and navigate without assistance. This is harder but unlocks different achievements.",
                                blocks: [
                                    {
                                        type: "step",
                                        text: "Politely refuse the map from the guide"
                                    },
                                    {
                                        type: "step",
                                        text: "Navigate through the forest without map assistance"
                                    },
                                    {
                                        type: "achievement",
                                        achievementId: 4
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                id: "forest-navigation-a",
                title: "Forest Navigation (With Map)",
                description: "You've chosen to use the map. This path is more straightforward but limits some achievement options. Follow the marked paths and use the map to navigate efficiently through the forest areas.",
                icon: "bi-eye",
                blocks: [
                    {
                        type: "step",
                        text: "Follow the marked path on your map"
                    },
                    {
                        type: "step",
                        text: "Navigate through the second forest area"
                    },
                    {
                        type: "step",
                        text: "Reach the clearing with the stone circle"
                    },
                    {
                        type: "achievement",
                        achievementId: 3
                    }
                ]
            },
            {
                id: "forest-navigation-b",
                title: "Forest Navigation (Without Map)",
                description: "You've chosen to navigate without the map. This path is more challenging but unlocks different achievements. Pay attention to landmarks and use your memory to find your way through the forest.",
                icon: "bi-eye-slash",
                blocks: [
                    {
                        type: "step",
                        text: "Navigate using landmarks and memory"
                    },
                    {
                        type: "step",
                        text: "Find your way through the second forest area"
                    },
                    {
                        type: "step",
                        text: "Locate the clearing with the stone circle"
                    },
                    {
                        type: "achievement",
                        achievementId: 4
                    }
                ]
            },
            {
                id: "final-approach",
                title: "Final Approach",
                description: "Both paths converge here at the stone circle. This is where you'll face the final challenge and potentially unlock the speed-run achievement. Focus on efficiency and completing the remaining objectives quickly.",
                icon: "bi-check-circle",
                blocks: [
                    {
                        type: "step",
                        text: "Complete the stone circle ritual"
                    },
                    {
                        type: "step",
                        text: "Navigate to the final area quickly"
                    },
                    {
                        type: "step",
                        text: "Complete the final encounter"
                    },
                    {
                        type: "achievement",
                        achievementId: 5
                    },
                    {
                        type: "achievement",
                        achievementId: 6
                    },
                    {
                        type: "achievement",
                        achievementId: 7
                    }
                ]
            }
        ]
    },
    {
        id: 5,
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
        id: 6,
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