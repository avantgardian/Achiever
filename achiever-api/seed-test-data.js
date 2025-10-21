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

