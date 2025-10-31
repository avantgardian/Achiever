const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

const guides = [
    {
        gameId: 1, // Year Walk
        title: "Story Walkthrough",
        description: "Complete the main story and unlock all story-related achievements. Perfect for first-time players.",
        difficulty: "EASY",
        estimatedTime: "2-3 hours",
        category: "Main Story",
        icon: "bi-lightning-charge-fill",
        published: true,
        sections: [
            {
                title: "Getting Started",
                steps: [
                    "Start a new game",
                    "Follow the main path",
                    "Complete Chapter 1"
                ]
            }
        ]
    },
    {
        gameId: 1, // Year Walk
        title: "New Game+",
        description: "Master the game with advanced techniques and unlock hidden achievements.",
        difficulty: "MEDIUM",
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
        gameId: 1, // Year Walk
        title: "100% Completion",
        description: "Unlock every achievement in the game. Includes collectibles, hidden secrets, and challenge achievements.",
        difficulty: "HARD",
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

async function seedGuides() {
    try {
        for (const guide of guides) {
            const existingGuide = await prisma.guide.findFirst({
                where: { 
                    title: guide.title,
                    gameId: guide.gameId 
                }
            });

            if (existingGuide) {
                console.log(`Guide already exists: ${guide.title}`);
                continue; 
            }

            await prisma.guide.create({
                data: guide
            });
            console.log(`Created guide: ${guide.title}`);
        }
    } catch (error) {
        console.error('Error seeding guides:', error);
    }
}

seedGuides();

export {};