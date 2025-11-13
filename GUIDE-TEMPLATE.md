# Guide Content Templates

*Gitignored - Copy/paste templates for authoring guide content*

---

## Quick Reference

All guides are stored in the `sections` field as JSON in the database. Each section contains an array of `blocks`, and each block has a `type` field that determines how it renders.

**Available Block Types:**
- `step` - Checklist item with checkbox
- `tip` - Blue info callout with lightbulb icon
- `warning` - Orange alert with warning icon
- `text` - Rich text content with multiple paragraphs
- `image` - Image with caption
- `achievement` - Achievement milestone (references achievement by ID)
- `branch` - Decision point with multiple paths (NOT YET IMPLEMENTED - stub only)

---

## Complete Guide Template

```json
{
    "gameId": 1,
    "title": "Your Guide Title",
    "description": "Brief description of what this guide covers",
    "difficulty": "EASY",
    "estimatedTime": "2-3 hours",
    "category": "Main Story",
    "icon": "bi-lightning-charge-fill",
    "published": true,
    "sections": [
        {
            "id": "section-slug",
            "title": "Section Title",
            "description": "What this section covers",
            "icon": "bi-play-circle",
            "blocks": [
                // Blocks go here - see templates below
            ]
        }
    ]
}
```

---

## Section Template

```json
{
    "id": "unique-section-id",
    "title": "Section Title",
    "description": "Brief description of this section",
    "icon": "bi-play-circle",
    "blocks": [
        // Add block objects here
    ]
}
```

**Common Bootstrap Icons for Sections:**
- `bi-play-circle` - Getting started
- `bi-lightning` - Action/fast-paced
- `bi-star-fill` - Special/featured
- `bi-gem` - Collectibles/100%
- `bi-trophy` - Achievements
- `bi-diagram-2` - Branches/choices
- `bi-eye` - Exploration
- `bi-check-circle` - Completion

---

## Block Templates

### Step Block

Simple checklist item. Users can check these off (when progress tracking is implemented).

```json
{
    "type": "step",
    "text": "Complete this action in the game"
}
```

**Example:**
```json
{
    "type": "step",
    "text": "Start a new game and choose your difficulty level"
}
```

---

### Tip Block

Blue info callout with lightbulb icon. Use for helpful hints and pro tips.

```json
{
    "type": "tip",
    "title": "Tip Title",
    "content": "Your helpful tip goes here"
}
```

**Example:**
```json
{
    "type": "tip",
    "title": "Pro Tip",
    "content": "Choose \"Normal\" difficulty for your first playthrough. You can always replay on harder difficulties later for additional achievements."
}
```

---

### Warning Block

Orange alert with warning icon. Use for important information players shouldn't miss.

```json
{
    "type": "warning",
    "title": "Warning Title",
    "content": "Important information here"
}
```

**Example:**
```json
{
    "type": "warning",
    "title": "Important",
    "content": "Pay attention to the tutorial! Some mechanics are only explained once and are crucial for later achievements."
}
```

---

### Text Block

Rich text content with a title and multiple paragraphs. Use for longer explanations.

```json
{
    "type": "text",
    "title": "Section Heading",
    "paragraphs": [
        "First paragraph of content goes here.",
        "Second paragraph goes here.",
        "Third paragraph goes here."
    ]
}
```

**Example:**
```json
{
    "type": "text",
    "title": "Understanding the World",
    "paragraphs": [
        "Year Walk is a unique atmospheric adventure game that combines puzzle-solving with Swedish folklore. The game takes place in a mysterious forest where you must navigate through various challenges.",
        "The forest is filled with supernatural creatures and ancient symbols that hold the key to unlocking the mysteries. Pay close attention to environmental details.",
        "As you progress through the forest, you'll encounter various obstacles that test both your observation skills and understanding of the game's world."
    ]
}
```

---

### Image Block

Display an image with a title and caption.

```json
{
    "type": "image",
    "url": "https://example.com/image.jpg",
    "alt": "Alt text for accessibility",
    "title": "Image Title",
    "caption": "Caption explaining what the image shows"
}
```

**Example:**
```json
{
    "type": "image",
    "url": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop",
    "alt": "Forest Area",
    "title": "First Forest Area",
    "caption": "This is what the first forest area looks like. Look for the glowing mushrooms - they indicate the correct path forward."
}
```

**Image Sources:**
- Use Unsplash for placeholder images: `https://images.unsplash.com/`
- Use Steam CDN for game screenshots
- Host custom images on a CDN

---

### Achievement Block

Reference an achievement by its database ID. The achievement data (name, description, icon) will be fetched automatically.

```json
{
    "type": "achievement",
    "achievementId": 1
}
```

**Example:**
```json
{
    "type": "achievement",
    "achievementId": 1
}
```

**How to find Achievement IDs:**
1. Check the database directly using Prisma Studio: `npx prisma studio`
2. Query the API: `GET /api/games/:gameId/achievements`
3. Look at the `id` field in the achievement data

---

### Branch Block (NOT YET IMPLEMENTED)

⚠️ **Currently returns empty string - stub for future implementation**

Decision points with multiple paths. Each path can have its own blocks.

```json
{
    "type": "branch",
    "warning": "Save your game before this choice!",
    "options": [
        {
            "id": "option-a",
            "title": "Option A: Choice Title",
            "description": "What happens if you choose this",
            "blocks": [
                // Blocks for this path
            ]
        },
        {
            "id": "option-b",
            "title": "Option B: Alternative Choice",
            "description": "What happens if you choose this instead",
            "blocks": [
                // Blocks for this path
            ]
        }
    ]
}
```

---

## Common Patterns

### Section with Steps and Tips

```json
{
    "id": "getting-started",
    "title": "Getting Started",
    "description": "Begin your journey",
    "icon": "bi-play-circle",
    "blocks": [
        {
            "type": "step",
            "text": "Start a new game"
        },
        {
            "type": "tip",
            "title": "Pro Tip",
            "content": "Save often!"
        },
        {
            "type": "step",
            "text": "Complete the tutorial"
        },
        {
            "type": "achievement",
            "achievementId": 1
        }
    ]
}
```

### Section with Explanation and Warning

```json
{
    "id": "important-mechanics",
    "title": "Important Mechanics",
    "description": "Key systems you need to understand",
    "icon": "bi-info-circle",
    "blocks": [
        {
            "type": "text",
            "title": "Combat System",
            "paragraphs": [
                "The combat system is based on timing and positioning.",
                "Each weapon has different attack patterns and speeds."
            ]
        },
        {
            "type": "warning",
            "title": "Point of No Return",
            "content": "After this section, you cannot return to previous areas. Make sure you've collected everything!"
        }
    ]
}
```

---

## Difficulty Levels

Must be one of these exact values (case-sensitive):
- `EASY`
- `MEDIUM`
- `HARD`

---

## Categories (Examples)

Common category names (you can use any string):
- `Main Story`
- `Advanced`
- `100%`
- `Speedrun`
- `New Game+`
- `Collectibles`
- `Side Quests`

---

## Adding Guides to Database

1. Edit `achiever-api/seed-guides.ts`
2. Add your guide object to the `guides` array
3. Compile and run:
   ```bash
   cd achiever-api
   npm run build
   node dist/seed-guides.js
   ```

---

## Future: Visual Editor (Editor.js)

This JSON structure is compatible with Editor.js, a visual block editor. Future features:
- Drag-and-drop block ordering
- Visual editing of content
- Custom block types for achievements and branches
- No migration needed - same JSON structure!

---

## Tips for Writing Guides

1. **Start with steps** - Break down tasks into clear, actionable steps
2. **Add tips liberally** - Help players avoid common mistakes
3. **Use warnings for critical info** - Point of no return, missables, etc.
4. **Include images** - Visual references help players navigate
5. **Link achievements** - Show which achievements are earned in each section
6. **Test the flow** - Play through following your own guide

---

## Need Help?

- Check existing guides in `seed-guides.ts` for examples
- All block types are rendered in `docs/js/guide.js`
- View live guides at: `http://localhost:8080/guide.html?id=1`

