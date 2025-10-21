const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Hardcoded test data - no external API calls needed!
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

async function seedTestData() {
  console.log('🌱 Seeding test data for CI...');

  for (const gameData of TEST_GAMES) {
    // Check if game already exists
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

  await prisma.$disconnect();
  console.log('✨ Test data seeding complete!');
}

seedTestData()
  .catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  });

