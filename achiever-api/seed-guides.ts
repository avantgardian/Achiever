import { PrismaClient, Difficulty } from '@prisma/client';
import 'dotenv/config';

const prisma = new PrismaClient();

const guides = [
    {
        gameId: 1,
        title: "Story Walkthrough",
        description: "Complete the main story and unlock all story-related achievements. Perfect for first-time players.",
        difficulty: "EASY" as Difficulty,
        estimatedTime: "2-3 hours",
        category: "Main Story",
        icon: "bi-lightning-charge-fill",
        published: true,
        sections: [
            {
                id: "getting-started",
                title: "Getting Started",
                description: "Begin your Year Walk journey. This section covers the initial setup and basic navigation through the first forest area. You'll learn the core mechanics and reach your first major milestone.",
                icon: "bi-play-circle",
                blocks: [
                    {
                        type: "step",
                        text: "Start a new game and choose your difficulty level"
                    },
                    {
                        type: "tip",
                        title: "Pro Tip",
                        content: "Choose \"Normal\" difficulty for your first playthrough. You can always replay on harder difficulties later for additional achievements."
                    },
                    {
                        type: "text",
                        title: "Understanding the World",
                        paragraphs: [
                            "Year Walk is a unique atmospheric adventure game that combines puzzle-solving with Swedish folklore. The game takes place in a mysterious forest where you must navigate through various challenges to complete your year walk ritual. Each area you encounter has its own set of rules and mechanics that you'll need to understand to progress.",
                            "The forest is filled with supernatural creatures and ancient symbols that hold the key to unlocking the mysteries of the year walk. Pay close attention to environmental details, as they often contain important clues for solving puzzles and avoiding dangerous encounters. The game's minimalist approach means that every visual element serves a purpose in the overall narrative.",
                            "As you progress through the forest, you'll encounter various obstacles that test both your observation skills and your understanding of the game's world. Some puzzles require careful timing, while others demand patience and careful exploration. Remember that the year walk is not just about reaching the end, but about understanding the journey itself."
                        ]
                    },
                    {
                        type: "step",
                        text: "Complete the basic tutorial and learn the controls"
                    },
                    {
                        type: "warning",
                        title: "Important",
                        content: "Pay attention to the tutorial! Some mechanics are only explained once and are crucial for later achievements."
                    },
                    {
                        type: "step",
                        text: "Navigate through the first forest area"
                    },
                    {
                        type: "image",
                        url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop",
                        alt: "Forest Area",
                        title: "First Forest Area",
                        caption: "This is what the first forest area looks like. Look for the glowing mushrooms - they indicate the correct path forward."
                    },
                    {
                        type: "step",
                        text: "Interact with the guide character and learn about the world"
                    },
                    {
                        type: "achievement",
                        achievementId: 1
                    }
                ]
            },
            {
                id: "the-choice",
                title: "The Choice",
                description: "⚠️ SAVE POINT: Create a save file here! This is a critical decision point that affects multiple achievements. The guide character will offer you a map - your choice here determines which path you take and which achievements become available.",
                icon: "bi-diagram-2",
                blocks: [
                    {
                        type: "warning",
                        title: "Decision Point",
                        content: "Create a save file before choosing your path. Each option unlocks different achievements."
                    },
                    {
                        type: "text",
                        title: "Choose Your Path",
                        paragraphs: [
                            "Accepting the map gives you a guided route through the forest at the cost of certain challenge achievements.",
                            "Refusing the map keeps the experience authentic and unlocks exclusive achievements for navigating unaided."
                        ]
                    },
                    {
                        type: "step",
                        text: "Accept the map from the guide character for the assisted route"
                    },
                    {
                        type: "step",
                        text: "Refuse the map to tackle the forest without guidance"
                    },
                    {
                        type: "achievement",
                        achievementId: 3
                    },
                    {
                        type: "achievement",
                        achievementId: 4
                    }
                ]
            },
            {
                id: "forest-navigation-a",
                title: "Forest Navigation (With Map)",
                description: "You've chosen to use the map. This path is more straightforward but limits some achievement options. Follow the marked paths and use the map to navigate efficiently through the forest areas.",
                icon: "bi-eye",
                blocks: [
                    {
                        type: "step",
                        text: "Follow the marked path on your map"
                    },
                    {
                        type: "step",
                        text: "Navigate through the second forest area"
                    },
                    {
                        type: "step",
                        text: "Reach the clearing with the stone circle"
                    },
                    {
                        type: "achievement",
                        achievementId: 3
                    }
                ]
            },
            {
                id: "forest-navigation-b",
                title: "Forest Navigation (Without Map)",
                description: "You've chosen to navigate without the map. This path is more challenging but unlocks different achievements. Pay attention to landmarks and use your memory to find your way through the forest.",
                icon: "bi-eye-slash",
                blocks: [
                    {
                        type: "step",
                        text: "Navigate using landmarks and memory"
                    },
                    {
                        type: "step",
                        text: "Find your way through the second forest area"
                    },
                    {
                        type: "step",
                        text: "Locate the clearing with the stone circle"
                    },
                    {
                        type: "achievement",
                        achievementId: 4
                    }
                ]
            },
            {
                id: "final-approach",
                title: "Final Approach",
                description: "Both paths converge here at the stone circle. This is where you'll face the final challenge and potentially unlock the speed-run achievement. Focus on efficiency and completing the remaining objectives quickly.",
                icon: "bi-check-circle",
                blocks: [
                    {
                        type: "step",
                        text: "Complete the stone circle ritual"
                    },
                    {
                        type: "step",
                        text: "Navigate to the final area quickly"
                    },
                    {
                        type: "step",
                        text: "Complete the final encounter"
                    },
                    {
                        type: "achievement",
                        achievementId: 5
                    },
                    {
                        type: "achievement",
                        achievementId: 6
                    },
                    {
                        type: "achievement",
                        achievementId: 7
                    }
                ]
            }
        ]
    },
    {
        gameId: 1,
        title: "New Game+",
        description: "Master the game with advanced techniques and unlock hidden achievements.",
        difficulty: "MEDIUM" as Difficulty,
        estimatedTime: "2 hours",
        category: "Advanced",
        icon: "bi-star-fill",
        published: true,
        sections: [
            {
                id: "advanced-techniques",
                title: "Advanced Techniques",
                description: "Learn advanced strategies for completing the game more efficiently.",
                icon: "bi-lightning",
                blocks: [
                    {
                        type: "step",
                        text: "Complete the game once on any difficulty"
                    },
                    {
                        type: "step",
                        text: "Start New Game+ from the main menu"
                    },
                    {
                        type: "tip",
                        title: "Speed Running",
                        content: "New Game+ carries over your knowledge and some items, making it perfect for speed runs and challenge achievements."
                    },
                    {
                        type: "step",
                        text: "Use advanced strategies to complete faster"
                    }
                ]
            }
        ]
    },
    {
        gameId: 1,
        title: "100% Completion",
        description: "Unlock every achievement in the game. Includes collectibles, hidden secrets, and challenge achievements.",
        difficulty: "HARD" as Difficulty,
        estimatedTime: "4-5 hours",
        category: "100%",
        icon: "bi-gem",
        published: true,
        sections: [
            {
                id: "complete-walkthrough",
                title: "Complete Walkthrough",
                description: "Comprehensive guide to unlocking all achievements in Year Walk.",
                icon: "bi-trophy",
                blocks: [
                    {
                        type: "step",
                        text: "Find all collectibles throughout the game"
                    },
                    {
                        type: "step",
                        text: "Complete all challenge achievements"
                    },
                    {
                        type: "warning",
                        title: "Multiple Playthroughs Required",
                        content: "Some achievements are mutually exclusive and require multiple playthroughs to unlock them all."
                    },
                    {
                        type: "step",
                        text: "Unlock hidden achievements by exploring secret areas"
                    }
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