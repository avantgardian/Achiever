## Tech Stack
*Frontend:*
- Vanilla JavaScript (GitHub Pages)
- HTML/CSS for UI

*Backend:*
- Express.js (Node.js framework)
- Prisma (Database toolkit)
- Railway (Hosting)

*Database:*
- PostgreSQL (via Railway)

## Frontend Structure
*Public Features:*
- Browse/search games directory (with pagination/lazy loading)
- View any game's guides (main game, DLCs, different completion types)
- See the full achievement tree structure for any guide
- Read guide content and tips
*Private Features (Login Required):*
- Check off achievements as completed (like a to-do app)
- See your progress through the tree
- Personal notes on achievements
- The tree shows your completion status, but doesn't "lock" anything

## Backend API Structure
*Public Endpoints:*
- `GET /api/games` - List all games (with search/pagination)
- `GET /api/games/:gameId/guides` - Get all guides for a game
- `GET /api/guides/:guideId` - Get full achievement tree for a guide
*Private Endpoints (Require Authentication):*
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/user/progress/:guideId` - Get user's progress for a guide
- `POST /api/user/progress/:guideId/achievement/:achievementId` - Mark achievement as complete
- `DELETE /api/user/progress/:guideId/achievement/:achievementId` - Unmark achievement

## Database Structure

### Core Tables:

*Games Table:*
- id, steamAppId (optional), name, description, releaseDate, imageUrl, published, createdAt, updatedAt
- **Has many:** Guides, Achievements
- **Note:** steamAppId is Steam's unique game identifier (e.g., 620 for Portal 2)

*Achievements Table:*
- id, gameId, name, description, steamAchievementId (optional), iconUrl (optional), createdAt, updatedAt
- **Belongs to:** Game
- **Note:** These are the game's full achievement list (pulled from Steam API)

*Guides Table:*
- id, gameId, title, description, published, createdAt, updatedAt
- **Belongs to:** Game
- **Uses many:** Achievements (through GuideAchievement junction table)

### Junction Table (Many-to-Many):

*GuideAchievement Table:*
- id, guideId, achievementId, orderInTree, parentGuideAchievementId (optional), notes (optional), createdAt, updatedAt
- **Purpose:** Connects Achievements to Guides with guide-specific tree structure
- **Note:** The tree structure (order, parent) is specific to each guide
- **parentGuideAchievementId:** References another GuideAchievement (not Achievement), creating the tree within the guide

### User Tables:

*Users Table:*
- id, email, passwordHash, username, createdAt, updatedAt

*UserProgress Table:*
- id, userId, achievementId, completedAt, createdAt, updatedAt
- **Purpose:** Tracks which achievements a user has completed (global to the game)
- **Note:** References Achievement directly - once completed, it shows as done in all guides for that game

### Relationship Flow:
```
Game
  ├─ has many Achievements (the game's full list from Steam)
  └─ has many Guides (different completion paths)
  
Guide
  └─ uses many Achievements through GuideAchievement
      └─ each GuideAchievement defines order & parent for that guide's tree

User
  └─ has many UserProgress entries
      └─ each tracks completion of an Achievement (global, not guide-specific)
```

## Current Progress

### Completed ✅

**Backend Foundation:**
- ✅ Express.js server setup and running
- ✅ Basic API endpoints working
- ✅ Package.json configured
- ✅ Dependencies installed (express, cors, dotenv, prisma, @prisma/client, nodemon)

**Database Design:**
- ✅ Prisma initialized (`npx prisma init`)
- ✅ Complete database schema designed in `prisma/schema.prisma`
- ✅ 6 models created:
  - Game (with Steam App ID support)
  - Achievement (belongs to Game, pulled from Steam API)
  - Guide (belongs to Game, references Achievements)
  - GuideAchievement (junction table with tree structure)
  - User (with email, username, passwordHash)
  - UserProgress (tracks global achievement completion)
- ✅ All relationships properly defined
- ✅ Audit fields (createdAt, updatedAt) on all models
- ✅ Published/draft system for Games and Guides

**Architecture Decisions:**
- ✅ Achievements are global to games (not guide-specific)
- ✅ User progress syncs across all guides for the same game
- ✅ JWT authentication decided (stateless, API-friendly)
- ✅ Password hashing with bcrypt
- ✅ Tree structure via self-referential GuideAchievement model

**Database Connection:**
- ✅ Railway PostgreSQL database created and configured
- ✅ DATABASE_URL added to `.env` file
- ✅ Initial migration run successfully (`20251001104326_init`)
- ✅ All 6 tables created in PostgreSQL
- ✅ Prisma Client generated and integrated

**API Implementation:**
- ✅ Prisma Client imported into Express (`const { PrismaClient }`)
- ✅ `/api/games` endpoint working with database queries
- ✅ Published filter implemented (only shows published games)
- ✅ Tested with real data (Year Walk game)
- ✅ JSON responses working correctly

**Version Control:**
- ✅ Git repository initialized (monorepo structure)
- ✅ Comprehensive `.gitignore` configured
- ✅ Initial commit pushed to GitHub
- ✅ Second commit with database integration pushed

**Frontend Foundation:**
- ✅ Frontend folder structure created (`achiever-frontend/`)
- ✅ Bootstrap 5 integrated via CDN
- ✅ Bootstrap Icons library added
- ✅ Responsive HTML structure with hero + games grid
- ✅ Custom CSS for game cards (hover effects, responsive design)
- ✅ JavaScript basics: DOMContentLoaded, fetch API, async/await
- ✅ Successfully fetching games from backend API
- ✅ renderGames() function skeleton created

### Next Steps 📋

**Frontend Development (Current Focus):**
1. **Complete game card rendering**
   - Loop through games array with forEach/map
   - Create HTML elements dynamically for each game
   - Display image, title, and placeholder stats (0,0,0)
   
2. **Initialize Bootstrap tooltips**
   - Add tooltips to stat icons (on hover show explanation)
   
3. **Implement search functionality**
   - Filter games array as user types
   - Re-render grid with filtered results
   
4. **Error handling & empty states**
   - Show message if API is down
   - Show message if no games match search
   - Loading spinner while fetching

**API Development:**
1. **Add error handling to existing endpoint**
   - Try-catch blocks for database errors
   - Proper HTTP status codes (404, 500, etc.)
   - Meaningful error messages

2. **Build more public endpoints**
   - GET /api/games/:gameId - Get single game with details
   - GET /api/games/:gameId/guides - Get all guides for a game
   - GET /api/guides/:guideId - Get guide with achievement tree
   - GET /api/games/:gameId/achievements - Get all achievements for a game

3. **Install authentication packages**
   - `npm install bcrypt jsonwebtoken`
   - bcrypt: Hash and verify passwords
   - jsonwebtoken: Create and verify JWTs

4. **Build authentication endpoints**
   - POST /api/auth/register (hash password, create user)
   - POST /api/auth/login (verify password, return JWT)
   - Create JWT middleware for protected routes

5. **Build protected endpoints**
   - GET /api/user/progress/:guideId - Get user's progress
   - POST /api/user/progress/achievement/:achievementId - Mark achievement complete
   - DELETE /api/user/progress/achievement/:achievementId - Unmark achievement
   - GET /api/user/profile - Get user info

6. **Deploy to Railway**
   - Connect GitHub repo to Railway
   - Configure environment variables
   - Deploy backend
   - Test production API

7. **Steam API Integration**
   - Research Steam Web API
   - Build endpoint to fetch game data from Steam
   - Build endpoint to fetch achievements from Steam
   - Auto-populate database with Steam data

### Files Created
- `achiever-api/server.js` - Express server with Prisma integration
- `achiever-api/package.json` - Dependencies and scripts
- `achiever-api/.env` - Environment variables with Railway DATABASE_URL (not in git)
- `achiever-api/prisma/schema.prisma` - Complete database schema (6 models)
- `achiever-api/prisma/migrations/20251001104326_init/` - Initial migration SQL
- `.gitignore` - Comprehensive ignore rules for monorepo
- `CONTEXT.md` - Project documentation (this file)

### Current Status 🎯
- **Database**: Live on Railway PostgreSQL with all tables created
- **API**: One working endpoint (`/api/games`) with database integration
- **Testing**: Prisma Studio for manual data management
- **Git**: All progress backed up on GitHub
- **Next**: Build more endpoints and add error handling