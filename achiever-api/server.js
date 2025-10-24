const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/games', async (req, res) => {
    const gameList = await prisma.game.findMany({
        where: { published: true },
        include: {
            _count: {
                select: {
                    achievements: true,
                    guides: true
                }
            }
        }
    });
    res.json(gameList);
});

app.get('/api/games/:gameId', async (req, res) => {
    try {
        const gameId = parseInt(req.params.gameId);

        const game = await prisma.game.findUnique({
            where: { id: gameId },
            include: {
                _count: {
                    select: {
                        achievements: true,
                        guides: true
                    }
                }
            }
        })

        res.json(game);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch game' });
    }
});

app.get('/api/guides', (req, res) => {
    res.send({'message': 'Guides API is running'});
});

// Get all achievements for a specific game
app.get('/api/games/:gameId/achievements', async (req, res) => {
    try {
        const gameId = parseInt(req.params.gameId);
        
        const achievements = await prisma.achievement.findMany({
            where: { gameId },
            orderBy: { steamAchievementId: 'asc' }
        });
        
        res.json(achievements);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch achievements' });
    }
});

// Test with Game info
app.get('/api/achievements/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const achievement = await prisma.achievement.findUnique({
            where: { id },
            include: { game: true }
        });

        res.json(achievement);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch achievements' });
    }
});

// Get all guides for a specific game
app.get('/api/games/:gameId/guides', async (req, res) => {
    try {
        const gameId = parseInt(req.params.gameId);
        
        const guides = await prisma.guide.findMany({
            where: { 
                gameId,
                published: true 
            },
            include: {
                _count: {
                    select: {
                        guideAchievements: true
                    }
                }
            }
        });
        
        res.json(guides);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch guides' });
    }
});

app.get('/api/guides/:guideId', async (req, res) => {
    try {
        const guideId = parseInt(req.params.guideId);

        const guide = await prisma.guide.findUnique({
            where: {
                id: guideId,
                published: true
            },
            include: {
                game: true,
                guideAchievements: {
                    include: {
                        achievement: true
                    }
                }
            }
        });

        res.json(guide);
    } catch {
        res.status(500).json({ error: 'Failed to fetch guide' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Start the server