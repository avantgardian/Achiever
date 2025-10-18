const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

// List of Steam App IDs to seed achievements for
const GAMES_TO_SEED = [
    269050,   // Year Walk
    1465360,  // SnowRunner
    2104890   // RoadCraft
];

async function seedAchievements() {
    console.log('🎮 Starting achievement seeding...\n');

    for (const steamAppId of GAMES_TO_SEED) {
        try {
            console.log(`📦 Processing Steam App ID: ${steamAppId}`);

            // Step 1: Find the game in database
            const game = await prisma.game.findFirst({
                where: { steamAppId: steamAppId }
            });

            if (!game) {
                console.log(`⚠️  Game not found in database. Skipping.\n`);
                continue;
            }

            console.log(`   Found: ${game.name}\n`);

            // Step 2: Fetch achievements from Steam API
            console.log(`🌐 Fetching achievements from Steam API...`);
            const apiKey = process.env.STEAM_API_KEY;
            const url = `https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?appid=${steamAppId}&key=${apiKey}`;

            const response = await fetch(url);
            const data = await response.json();

            // Check if game has achievements
            if (!data.game?.availableGameStats?.achievements) {
                console.log(`⚠️  No achievements found for ${game.name}. Skipping.\n`);
                continue;
            }

            const achievements = data.game.availableGameStats.achievements;
            console.log(`   Found ${achievements.length} achievements\n`);

            // Step 3: Insert achievements into database
            console.log(`💾 Inserting achievements into database...`);

            let insertedCount = 0;
            let skippedCount = 0;

            for (const achievement of achievements) {
                // Check if achievement already exists
                const existing = await prisma.achievement.findFirst({
                    where: {
                        gameId: game.id,
                        steamAchievementId: achievement.name
                    }
                });

                if (existing) {
                    skippedCount++;
                    continue;
                }

                // Insert new achievement
                await prisma.achievement.create({
                    data: {
                        gameId: game.id,
                        name: achievement.displayName,
                        description: achievement.description || '',
                        steamAchievementId: achievement.name,
                        iconUrl: achievement.icon
                    }
                });

                insertedCount++;
            }

            console.log(`✅ ${game.name}: ${insertedCount} inserted, ${skippedCount} skipped\n`);

        } catch (error) {
            console.error(`❌ Error processing Steam App ID ${steamAppId}:`, error.message);
            console.log(''); // Empty line for readability
        }
    }

    console.log('🎉 Achievement seeding complete!\n');
    await prisma.$disconnect();
}

// Run the seed function
seedAchievements();

