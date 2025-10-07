const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

async function seedYearWalkAchievements() {
    try {
        console.log('🎮 Starting Year Walk achievement seeding...\n');

        // Step 1: Fix Year Walk's steamAppId
        console.log('📝 Step 1: Updating Year Walk steamAppId...');
        const yearWalk = await prisma.game.update({
            where: { name: 'Year Walk' },
            data: { steamAppId: 269050 }
        });
        console.log(`✅ Updated Year Walk: steamAppId = ${yearWalk.steamAppId}\n`);

        // Step 2: Fetch achievements from Steam API
        console.log('🌐 Step 2: Fetching achievements from Steam API...');
        const apiKey = process.env.STEAM_API_KEY;
        const appId = 269050;
        const url = `https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?appid=${appId}&key=${apiKey}`;

        const response = await fetch(url);
        const data = await response.json();
        const achievements = data.game.availableGameStats.achievements;
        
        console.log(`✅ Found ${achievements.length} achievements from Steam\n`);

        // Step 3: Insert achievements into database
        console.log('💾 Step 3: Inserting achievements into database...');
        
        let insertedCount = 0;
        let skippedCount = 0;

        for (const achievement of achievements) {
            // Check if achievement already exists
            const existing = await prisma.achievement.findFirst({
                where: {
                    gameId: yearWalk.id,
                    steamAchievementId: achievement.name
                }
            });

            if (existing) {
                console.log(`⏭️  Skipped: "${achievement.displayName}" (already exists)`);
                skippedCount++;
                continue;
            }

            // Insert new achievement
            await prisma.achievement.create({
                data: {
                    gameId: yearWalk.id,
                    name: achievement.displayName,
                    description: achievement.description,
                    steamAchievementId: achievement.name,
                    iconUrl: achievement.icon
                }
            });

            console.log(`✅ Inserted: "${achievement.displayName}"`);
            insertedCount++;
        }

        console.log(`\n🎉 Success!`);
        console.log(`   - ${insertedCount} achievements inserted`);
        console.log(`   - ${skippedCount} achievements skipped (already exist)`);
        console.log(`   - Total: ${achievements.length} achievements\n`);

        // Step 4: Display all achievements
        console.log('📋 Year Walk Achievements:');
        const allAchievements = await prisma.achievement.findMany({
            where: { gameId: yearWalk.id },
            orderBy: { steamAchievementId: 'asc' }
        });

        allAchievements.forEach((ach, index) => {
            console.log(`   ${index + 1}. ${ach.name}`);
            console.log(`      ${ach.description}`);
        });

    } catch (error) {
        console.error('❌ Error seeding achievements:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// Run the seed function
seedYearWalkAchievements();

