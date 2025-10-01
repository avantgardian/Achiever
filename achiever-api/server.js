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
        where: {
            published: true
        }
    });
    res.json(gameList);
});

app.get('/api/guides', (req, res) => {
    res.send({'message': 'Guides API is running'});
});

app.get('/api/achievements', (req, res) => {
    res.send({'message': 'Achievements API is running'});
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Start the server