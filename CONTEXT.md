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

### Next Steps 📋

**Database Setup:**
1. **Create Railway PostgreSQL database**
   - Sign up/login to Railway
   - Create new project
   - Add PostgreSQL service
   - Copy the DATABASE_URL connection string

2. **Configure database connection**
   - Add DATABASE_URL to `achiever-api/.env`
   - Format: `postgresql://user:password@host:port/database`

3. **Run Prisma migrations**
   - `npx prisma migrate dev --name init`
   - This creates all tables in PostgreSQL
   - Generates Prisma Client automatically

4. **Install authentication packages**
   - `npm install bcrypt jsonwebtoken`
   - bcrypt: Hash and verify passwords
   - jsonwebtoken: Create and verify JWTs

**API Development:**
5. **Import Prisma Client in Express**
   - Create `prisma` instance
   - Use in routes to query database

6. **Build authentication endpoints**
   - POST /api/auth/register (hash password, create user)
   - POST /api/auth/login (verify password, return JWT)
   - Create JWT middleware for protected routes

7. **Build public endpoints**
   - GET /api/games (with published filter)
   - GET /api/games/:gameId/guides
   - GET /api/guides/:guideId

8. **Build protected endpoints**
   - GET /api/user/progress/:guideId
   - POST /api/user/progress/:guideId/achievement/:achievementId
   - DELETE /api/user/progress/:guideId/achievement/:achievementId

9. **Deploy to Railway**
   - Connect GitHub repo
   - Configure environment variables
   - Deploy backend

10. **Test full API functionality**

### Files Created
- `achiever-api/server.js` - Basic Express server
- `achiever-api/package.json` - Dependencies and scripts
- `achiever-api/.env` - Environment variables (needs DATABASE_URL)
- `achiever-api/prisma/schema.prisma` - Complete database schema

### Ready to Continue Tomorrow 🌅
- Complete database schema designed and ready
- All models and relationships defined
- Architecture decisions made
- Next: Set up Railway PostgreSQL and run migrations