import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const prisma = new PrismaClient();

interface SteamGameData {
    [appId: string]: {
        data: {
            name: string;
            short_description: string;
            header_image: string;
            steam_appid: number;
            release_date: {
                coming_soon: boolean;
                date: string;
            };
        };
    };
}

const GAMES_TO_SEED = [
    { name: 'Snowrunner', steamAppId: 1465360 },
    { name: 'RoadCraft', steamAppId: 2104890 },
    { name: 'Car Mechanic Simulator 21', steamAppId: 1190000 },
    { name: 'Deconstructor Simulator', steamAppId: 2487150 },
    { name: 'Ship Graveyard Simulator 2', steamAppId: 2201940 },
    { name: 'Deep Rock Galactic Sutvivors', steamAppId: 2321470 },
    { name: 'Tormented Souls 2', steamAppId: 2464280 },
    { name: 'Red Dead Redemption 2', steamAppId: 1174180 }
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
        const storeData: SteamGameData = await storeResponse.json();

        const gameInfo = storeData[item.steamAppId].data;

        // Parse release date if available
        let releaseDate = null;
        if (gameInfo.release_date && !gameInfo.release_date.coming_soon && gameInfo.release_date.date) {
            releaseDate = new Date(gameInfo.release_date.date);
        }

        const newGame = await prisma.game.create({
            data: {
                name: gameInfo.name,
                description: gameInfo.short_description,
                imageUrl: gameInfo.header_image,
                steamAppId: gameInfo.steam_appid,
                releaseDate: releaseDate,
                published: true
            }
        });

        console.log(`✅ Created game: ${newGame.name} (ID: ${newGame.id})\n`);
    }

    await prisma.$disconnect();
}

seedGames();

export {};