import { PrismaClient, Difficulty } from '@prisma/client';
import 'dotenv/config';

const prisma = new PrismaClient();

const guides = [
    {
        gameId: 10,
        title: "Divinity: Original Sin Enhanced Edition 100% Achievement Guide",
        description: "100% completion requires a minimum of one playthrough, though it demands extreme attention to detail to secure the **28 missable achievements**. This process will take well over **100 hours**.",
        difficulty: "HARD" as Difficulty,
        estimatedTime: "100 hours",
        category: "100%",
        icon: "bi-play-circle",
        published: true,
        sections: [
            {
                "title": "I. Pre-Game Preparation & Game-Long Missables (Level 1)",
                "description": "",
                "icon": "bi-play-circle",
                "blocks": [
                    {
                        "type": "text",
                        "title": "Overview and Requirements",
                        "paragraphs": [
                            "Achieving 100% completion requires a minimum of one playthrough, though it demands extreme attention to detail to secure the **28 missable achievements**. This process will take well over **100 hours**.",
                            "You should start on **Honour Mode** (the hardest difficulty), as the trophies 'Kill With Power' (ID 649) and 'Never Say Die' (ID 648) stack. Honour Mode limits you to one save file, which is deleted upon a full party wipe."
                        ]
                    },
                    {
                        "type": "warning",
                        "title": "Crucial Game-Long Requirements",
                        "content": "Ensure you lock in the following binary traits for your main characters through dialogue, as they are crucial for companion quests:\n•   **Forgiving** (Required for Sister of Mercy, ID 658).\n•   **Independent** (Required for Father Lucifer, ID 657).\nEnsure one main character has the **Pet Pal** talent (required for You and me, ID 621, and Baaaah., ID 638). Plan to **save at least one Talent Point** (usually from level 19) until the absolute end of the game for Wolfpack (ID 654)."
                    },
                    {
                        "type": "step",
                        "text": "Start a New Game on Honour Difficulty"
                    }
                ]
            },
            {
                "title": "II. Cyseal: Inner City & Immediate Periphery (Level 1-4)",
                "description": "",
                "icon": "bi-lightning",
                "blocks": [
                    {
                        type: "text",
                        title: "Ishmashell",
                        paragraphs: [
                            "Detour to the beach to meet and talk to Ishmashell (x=456,y=73)."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 606
                    },
                    {
                        type: "text",
                        title: "Legionaries at the Bridge",
                        paragraphs: [
                            "Split your two main characters. Have one initiate conversation with the drunken legionaries, Junius and Bibius (x=357,y=87), while the other walks past them to be 'caught'."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 609
                    },
                    {
                        type: "text",
                        title: "Companions",
                        paragraphs: [
                            "Recruit all four companions, starting with Madora (King Crab Inn) for early missable 'Sister of Mercy' dialogues."
                        ]
                    },
                    {
                        type: "text",
                        title: "The Shipless Sailors",
                        paragraphs: [
                            "Complete the 'The Shipless Sailors' quest (x=266,y=4). Save your game (Step 1). Tell the sailors about the Fabulous Five."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 610
                    },
                    {
                        type: "text",
                        title: "Captain Jack",
                        paragraphs: [
                            "Reload Save (Step 1). Tell the sailors about Captain Jack."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 643
                    },
                    {
                        type: "text",
                        title: "Nemris' Riddle",
                        paragraphs: [
                            "Go to the Graveyard (x=221,y=248). Dig up Nemris' tombstone and answer his three questions correctly (1: Of course not.; 2: Not entirely, no.; 3: Your salvation.)."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 614
                    },
                    {
                        type: "text",
                        title: "Teleporter Pyramids",
                        paragraphs: [
                            "Enter the murder crime scene (King Crab Tavern) to be teleported to Homestead. Upon return, Arhu gives you the red Teleporter Pyramid."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 608
                    },
                    {
                        type: "text",
                        title: "Smelly Panties",
                        paragraphs: [
                            "Go to Esmeralda's Shop. Find the chest upstairs and loot the Smelly Panties."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 659
                    },
                    {
                        type: "text",
                        title: "The Bloody Dagger",
                        paragraphs: [
                            "Collect the Bloody Dagger from the Secret Storage room in Esmeralda’s cellar (behind hanging Ham). Confront Esmeralda and ask *only* about the Bloody Dagger."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 612
                    },
                    {
                        type: "text",
                        title: "Legionnaire's Will",
                        paragraphs: [
                            "Locate the Legionnaire's Will from Blossius near the ruined watermill and ensure it is delivered unaltered (setup for ID 644)."
                        ]
                    }
                ]
            },
            {
                "title": "III. Cyseal: Outer Wilderness & Black Cove (Level 4-9)",
                "description": "",
                "icon": "bi-eye",
                "blocks": [
                    {
                        "type": "text",
                        "title": "Outer Cyseal Exploration (Level 4+)",
                        "paragraphs": [
                            "You should be around level 4 before leaving the city gates."
                        ]
                    },
                    {
                        type: "text",
                        title: "The Twin Dungeons",
                        paragraphs: [
                            "Head to the two trapdoors in West Cyseal (x=160,y=290). Solve The Twin Dungeons puzzle by placing the Square and Round Pendants on the pedestals."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 620
                    },
                    {
                        "type": "warning",
                        "title": "The Mirror Inside Glitch",
                        "content": "This trophy can become unobtainable if Patch 1.04 was installed mid-game. It is confirmed to work if a New Game is started with the patch applied, or sometimes by using Telekinesis."
                    },
                    {
                        type: "text",
                        title: "Fabulous Five & SparkMaster",
                        paragraphs: [
                            "Enlist with the Fabulous Five. Defeat the SparkMaster 5000 (x=278,y=356). Report back to Mayor Cecil (x=271,y=198)."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 645
                    },
                    {
                        type: "text",
                        title: "Talking Statues",
                        paragraphs: [
                            "Defeat the four elemental demons at the Talking Statues (x=36,y=400) by activating them with matching elemental damage."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 607
                    },
                    {
                        type: "text",
                        title: "Evelyn & Zombie Jake",
                        paragraphs: [
                            "Defeat Evelyn and complete the conversation with Zombie Jake."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 613
                    },
                    {
                        type: "text",
                        title: "Freeing Esmeralda",
                        paragraphs: [
                            "After defeating Evelyn, return to Aureus and instruct him to release Esmeralda from prison."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 611
                    },
                    {
                        type: "text",
                        title: "Black Cove Switches",
                        paragraphs: [
                            "Enter Black Cove (x=55,y=48). In the switch puzzle room, press the **Unlocked Switch** (or any switch other than the Blood-Stained Switch)."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 641
                    },
                    {
                        type: "text",
                        title: "Pontius Pirate",
                        paragraphs: [
                            "Press the Blood-Stained Switch (x=473,y=143) to continue. Defeat Pontius Pirate."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 619
                    },
                    {
                        type: "text",
                        title: "Headless Nick",
                        paragraphs: [
                            "Retrieve the Talking Head (by winning the Intimidate/Charm/Reason conversation against Gallagher, x=333,y=137). Give it to Headless Nick on the ship in Derelict Harbour (x=126,y=163)."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 650
                    },
                    {
                        type: "text",
                        title: "Kitty Love",
                        paragraphs: [
                            "Complete the 'Kitty Love' quest (requires Pet Pal). Retrieve Sam's Collar from the Source Nightmare boss (x=191,y=103) and give it to Unsinkable Sam."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 621
                    },
                    {
                        type: "text",
                        title: "Braccus Rex",
                        paragraphs: [
                            "Enter the Abandoned Church (x=441,y=346). Defeat Braccus Rex and his summoned bosses. Report results to Lieutenant Selenia (x=320,y=216)."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 615
                    },]
            },
            {
                "title": "IV. Luculla Forest & Hiberheim (Level 9-15)",
                "description": "",
                "icon": "bi-gem",
                "blocks": [
                    {
                        type: "text",
                        title: "Blossius' Will",
                        paragraphs: [
                            "In Silverglen, find Marisa the barmaid (x=73,y=136) and deliver Blossius' will without altering it."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 644
                    },
                    {
                        type: "text",
                        title: "Bicky the Bomber",
                        paragraphs: [
                            "Save Bonnie from Bicky the Bomber on the top floor of The Pickaxe Tavern (x=78,y=126)."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 617
                    },
                    {
                        type: "text",
                        title: "Mushroom Icari",
                        paragraphs: [
                            "Find the White Witch's cabin barrier. Talk to the Mushroom Icari and answer the three brain teasers correctly (1: An ear of corn, 2: A stone, 3: A butterfly) to receive the Barrier Removal spell."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 627
                    },
                    {
                        type: "text",
                        title: "Meeting Leandra",
                        paragraphs: [
                            "Enter Hiberheim (Level 11+). Reach the Elemental Forge (x=354,y=470) to encounter Leandra."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 624
                    },
                    {
                        type: "text",
                        title: "Elemental Staff",
                        paragraphs: [
                            "Defeat King Boreas (x=286,y=230). Use The Elemental Staff on the Elemental Forge (x=355,y=480)."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 625
                    },
                    {
                        type: "text",
                        title: "Freeing the White Witch",
                        paragraphs: [
                            "Use the Fire Rune (from Sua, the fire elemental) on the frozen White Witch in Hiberheim prison."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 623
                    },
                    {
                        type: "text",
                        title: "Luculla Mines",
                        paragraphs: [
                            "Enter Luculla Mines (x=85,y=207). Proceed to the end until you use the Astarte Mirror to exit the Crypt and Entrance Hall."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 616
                    },
                    {
                        type: "text",
                        title: "Leandra's Spell & Blood",
                        paragraphs: [
                            "Locate Leandra's Spell in the Mine Office and acquire a Vial of Leandra's Blood from the Immaculate Cathedral. Combine them using the Crafting interface (requires 0 Crafting skill)."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 640
                    },
                    {
                        type: "text",
                        title: "The Troll's Bounty",
                        paragraphs: [
                            "Talk to Brandon in Silverglen (Level 12+) to start 'The Troll's Bounty'. Acquire Tenebrium ore (only 1 piece needed in inventory). Save your game. Tell Brandon you are keeping the ore. Reload save."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 646
                    },
                    {
                        type: "text",
                        title: "Tenebrium Skill",
                        paragraphs: [
                            "Reload save. Give Brandon the ore."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 647
                    },
                    {
                        type: "text",
                        title: "Mangoth",
                        paragraphs: [
                            "Enter the Immaculate Cathedral (x=208,y=458) and light all 4 Coal Baskets. Proceed to the center to interrupt the sacrifice and meet Mangoth."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 639
                    },
                    {
                        type: "text",
                        title: "The Forgotten Gods",
                        paragraphs: [
                            "Speak with Icara at Homestead for the third time (after obtaining Leandra's Spell/Blood) and ask specifically about The Forgotten Gods."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 628
                    },
                    {
                        type: "text",
                        title: "Void Temple",
                        paragraphs: [
                            "Travel to the Void Temple area (x=96,y=354). Destroy the large Blood Stone (x=98,y=484) using a Tenebrium damage weapon."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 626
                    },
                    {
                        type: "text",
                        title: "King Grungir",
                        paragraphs: [
                            "Defeat King Grungir in the Troll Cave (x=340,y=192) using Maradino's Secret Files. Speak with Archibald (x=289,y=242) afterwards, informing him of the king's demise."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 618
                    },
                    {
                        type: "text",
                        title: "Jareth & Bairdotr",
                        paragraphs: [
                            "Travel to Sacred Stone. Locate Jareth behind the waterfall (x=302,y=507) with Bairdotr (requires Independent trait on talking character). Choose the Independent response."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 657
                    },
                    {
                        type: "tip",
                        title: "Master of Skills",
                        content: "If Level 12+, acquire 12 skills (6 Novice, 4 Adept, 2 Master) in one skill tree (must reach level 5 in the skill tree)."

                    },
                    {
                        type: "achievement",
                        achievementId: 653
                    },
                    {
                        type: "warning",
                        title: "Wolgraff's Voice Setup",
                        content: "Before leaving, ensure Wolgraff is in your party and talk to the mute rabbit near the area transfer to Luculla Forest (setup for That Voice Again)."

                    }
                ]
            },
            {
                "title": "V. Phantom Forest: Hunter's Edge & Branching Paths (Level 16-19)",
                "description": "",
                "icon": "bi-star-fill",
                "blocks": [
                    {
                        type: "text",
                        title: "Hunter's Edge",
                        paragraphs: [
                            "Enter Hunter's Edge (x=283,y=51)."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 634
                    },
                    {
                        type: "text",
                        title: "Distill My Heart",
                        paragraphs: [
                            "Complete 'Distill My Heart' for Hershel (x=407,y=87) by aging the Spirit into Whiskey using Zixzax at the End of Time."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 622
                    },
                    {
                        type: "text",
                        title: "Norok & Madora",
                        paragraphs: [
                            "With Madora in your party (and both main characters Forgiving), have the final conversation with Norok (upper floor of tavern in Hunter's Edge)."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 658
                    },
                    {
                        type: "text",
                        title: "Toxic Fumes",
                        paragraphs: [
                            "Acquire the Phantom Protection Amulet (Zandalor's house). Use it to walk through the toxic fumes (x=82,y=70)."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 631
                    },
                    {
                        type: "text",
                        title: "The Weresheep",
                        paragraphs: [
                            "With Pet Pal, drop a Stardust Herb specifically at map location x=110,y=302 to summon the Weresheep and converse with it."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 638
                    },
                    {
                        "type": "warning",
                        "title": "Cassandra/Arhu Branching Achievements",
                        "content": "Save your game BEFORE choosing how to handle Cassandra's bones/Arhu's fate, as this choice affects three missable trophies. You must follow Path 3 to obtain the required item for The Glimmer Twins later."
                    },
                    {
                        type: "text",
                        title: "Path 1: Arhu",
                        paragraphs: [
                            "Path 1 (Reload Save): Give the Statis Fern (from Shearah) to Arhu (x=49,y=270)."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 655
                    },
                    {
                        type: "text",
                        title: "Path 2: Cassandra",
                        paragraphs: [
                            "Path 2 (Reload Save): Give the Statis Fern to Cassandra (x=47,y=278)."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 629
                    },
                    {
                        type: "text",
                        title: "Path 3: Soulforge Repair",
                        paragraphs: [
                            "Path 3 (Keep): Go to the Temple of the Dead (x=106,y=169). Burn Cassandra's Skeleton (x=126,y=195). Defeat Cassandra and grab the **Soulforge Repair Ritual**."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 630
                    },
                    {
                        type: "text",
                        title: "The King's Dark Deal",
                        paragraphs: [
                            "Find the Abandoned House (x=169,y=104). Ensure Jahan is in your party before entering the cellar. Defeat Balberith to complete 'The King's Dark Deal'."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 633
                    },
                    {
                        type: "text",
                        title: "Wolgraff's Voice",
                        paragraphs: [
                            "Retrieve the Bottled Voice (Temple of the Dead, Alchemist Lab, x=208,y=161) and Voxwood (from Imal the Squealer near x=95,y=339). Combine them to create a Vocalisation Potion and give it to Wolgraff."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 656
                    },
                    {
                        type: "text",
                        title: "Bellegar's Maze",
                        paragraphs: [
                            "Interact with the Glimmering Pile of Gold (x=374,y=142) in Phantom Forest (Level 16+). Solve Bellegar's Maze."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 635
                    },]
            },
            {
                "title": "VI. Source Temple & End Game (Level 19+)",
                "description": "",
                "icon": "bi-check-circle",
                "blocks": [
                    {
                        "type": "text",
                        "title": "Entering the Source Temple",
                        "paragraphs": [
                            "Ensure you have gathered 12+ Star Stones/Blood Stones and unlocked all 12 rooms in Homestead before entering. Use the Magic Rune Stone (from The Deal quest) to enter the Source Temple."
                        ]
                    },
                    {
                        type: "text",
                        title: "Source Temple Entrance",
                        paragraphs: [
                            "Enter the Source Temple at x=212,y=286."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 636
                    },
                    {
                        type: "text",
                        title: "Trial of Ascension",
                        paragraphs: [
                            "Complete the Trial of Ascension by destroying the statues corresponding to the opposite trait of the character used (e.g., Spiritual character destroys Materialistic statue). Then, solve the Candles puzzle (light perimeter, then middle, then any 3)."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 637
                    },
                    {
                        type: "text",
                        title: "Zandalor",
                        paragraphs: [
                            "Follow the pathway to Zandalor (x=19,y=221) and conclude the conversation."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 632
                    },
                    {
                        "type": "warning",
                        "title": "Point of No Return",
                        "content": "Ensure all other missable achievements are acquired before proceeding past this point, as you are entering the final sequence."
                    },
                    {
                        type: "text",
                        title: "First Garden",
                        paragraphs: [
                            "Use the portal in Homestead to enter the realm named Whispers of the Void and walk through the front door of the blighted King Crab Tavern."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 652
                    },
                    {
                        type: "text",
                        title: "Trife & Leandra",
                        paragraphs: [
                            "Defeat Trife and Leandra. Choose the response allowing Icara to make her choice and confirm their union ('In facing and defeating the Void, Leandra might--at least in part--be redeemed. Join us.')."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 651
                    },
                    {
                        type: "text",
                        title: "The Void Dragon",
                        paragraphs: [
                            "Defeat the Void Dragon. Before the conclusion of the final epilogue conversation (after the congratulatory praise), use your unspent talent point to acquire the Lone Wolf talent on one character."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 654
                    },
                    {
                        type: "text",
                        title: "The End",
                        paragraphs: [
                            "Watch the credits until the final conversation ends."
                        ]
                    },
                    {
                        type: "achievement",
                        achievementId: 642
                    },
                    {
                        "type": "tip",
                        "title": "Difficulty Achievement Stacking",
                        "content": "Since you started and finished the game on Honour Mode, both difficulty trophies will unlock simultaneously."
                    },
                    {
                        type: "achievement",
                        achievementId: 649
                    },
                    {
                        type: "achievement",
                        achievementId: 648
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
                console.log(`Updating existing guide: ${guide.title}`);
                await prisma.guide.update({
                    where: { id: existingGuide.id },
                    data: guide
                });
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

export { };