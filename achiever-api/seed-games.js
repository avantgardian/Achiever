const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

const GAMES_TO_SEED = [
    { name: 'Snowrunner', steamAppId: 1465360 },
    { name: 'RoadCraft', steamAppId: 2104890 }
]

async function seedGames() {
    console.log('🎮 Starting game seeding...');

    for (const item of GAMES_TO_SEED) {
        console.log(`📦 Processing: ${item.name} (App ID: ${item.steamAppId})`);

        const existingGame = await prisma.game.findFirst({
            where: { steamAppId: item.steamAppId }
        });

        if (existingGame) {
            console.log('Game already exists in the database ... Skipping!');
            continue;
        }

        const storeUrl = `https://store.steampowered.com/api/appdetails?appids=${item.steamAppId}`;
        const storeResponse = await fetch(storeUrl);
        const storeData = await storeResponse.json();

        //console.log('Steam data:', storeData);

        const gameInfo = storeData[item.steamAppId].data;

        const newGame = await prisma.game.create({
            data: {
                name: gameInfo.name,
                description: gameInfo.short_description,
                imageUrl: gameInfo.header_image,
                steamAppId: gameInfo.steam_appid,
                published: true
            }
        });

        console.log(`✅ Created game: ${newGame.name} (ID: ${newGame.id})\n`);
    }

    await prisma.$disconnect();
}

seedGames();