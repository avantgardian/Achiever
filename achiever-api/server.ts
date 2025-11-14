import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import dotenv from 'dotenv';
import { validateId } from './helpers';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const prisma = new PrismaClient();

app.get('/api/games', async (req: Request, res: Response) => {
    const gameList = await prisma.game.findMany({
        where: { published: true },
        include: {
            _count: {
                select: {
                    achievements: true,
                    guides: true
                }
            }
        },
        orderBy: { id: 'asc' }
    });
    res.json(gameList);
});

app.post('/api/games/:gameId/view', async (req: Request, res: Response) => {
    try {
        const gameId = validateId(req.params.gameId);
        if (gameId === null) {
            return res.status(400).json({ error: 'gameId must be an integer' });
        }
        const game = await prisma.game.update({
            where: { id: gameId },
            data: {
                views: {
                    increment: 1
                }
            }
        });

        res.json(game);
    } catch {
        res.status(500).json({ error: 'Unable to access data' });
    }
});

app.get('/api/games/:gameId', async (req: Request, res: Response) => {
    try {
        const gameId = validateId(req.params.gameId);
        if (gameId === null) {
            return res.status(400).json({ error: 'gameId must be an integer' });
        }

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
    } catch {
        res.status(500).json({ error: 'Failed to fetch game' });
    }
});

app.get('/api/guides', (req: Request, res: Response) => {
    res.send({'message': 'Guides API is running'});
});

// Get all achievements for a specific game
app.get('/api/games/:gameId/achievements', async (req: Request, res: Response) => {
    try {
        const gameId = validateId(req.params.gameId);
        if (gameId === null) {
            return res.status(400).json({ error: 'gameId must be an integer' });
        }
        
        const achievements = await prisma.achievement.findMany({
            where: { gameId },
            orderBy: { steamAchievementId: 'asc' }
        });
        
        res.json(achievements);
    } catch {
        res.status(500).json({ error: 'Failed to fetch achievements' });
    }
});

// Test with Game info
app.get('/api/achievements/:id', async (req: Request, res: Response) => {
    try {
        const id = validateId(req.params.id);
        if (id === null) {
            return res.status(400).json({ error: 'id must be an integer' });
        }

        const achievement = await prisma.achievement.findUnique({
            where: { id },
            include: { game: true }
        });

        res.json(achievement);
    } catch {
        res.status(500).json({ error: 'Failed to fetch achievements' });
    }
});

// Get all guides for a specific game
app.get('/api/games/:gameId/guides', async (req: Request, res: Response) => {
    try {
        const gameId = validateId(req.params.gameId);
        if (gameId === null) {
            return res.status(400).json({ error: 'gameId must be an integer' });
        }
        
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
            },
            orderBy: {
                id: 'asc'
            }
        });
        
        res.json(guides);
    } catch {
        res.status(500).json({ error: 'Failed to fetch guides' });
    }
});

app.post('/api/guides/:guideId/view', async (req: Request, res: Response) => {
    try {
        const guideId = validateId(req.params.guideId);
        if (guideId === null) {
            return res.status(400).json({ error: 'guideId must be an integer' });
        }
        const guide = await prisma.guide.update({
            where: { id: guideId },
            data: {
                views: {
                    increment: 1
                }
            }
        });

        res.json(guide);
    } catch {
        res.status(500).json({ error: 'Unable to access data' });
    }
});

app.get('/api/guides/:guideId', async (req: Request, res: Response) => {
    try {
        const guideId = validateId(req.params.guideId);
        if (guideId === null) {
            return res.status(400).json({ error: 'guideId must be an integer' });
        }

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

app.get('/health', (req: Request, res: Response) => res.json({ status: 'ok' }));

const port = process.env.PORT ? Number(process.env.PORT) : 3000;
app.listen(port, () => console.log(`Listening on ${port}`));