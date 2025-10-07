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

*Testing:*
- Playwright (End-to-end testing)
- http-server (Local frontend serving for tests)

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
- ✅ Third commit with dynamic game card rendering pushed
- ✅ Fourth commit: Dark gamer theme redesign (18fc83b)
- ✅ Fifth commit: Browser compatibility fixes (5951436)
- ✅ Sixth commit: Frontend styles and HTML structure update (91fbafa)

**Frontend Foundation:**
- ✅ Frontend folder structure created (`achiever-frontend/`)
- ✅ Bootstrap 5 integrated via CDN
- ✅ Bootstrap Icons library added
- ✅ Responsive HTML structure with hero + games grid
- ✅ Custom CSS for game cards (hover effects, responsive design)
- ✅ JavaScript basics: DOMContentLoaded, fetch API, async/await
- ✅ Successfully fetching games from backend API
- ✅ Dynamic game card rendering complete:
  - Template literals for clean HTML generation
  - forEach loops for array iteration
  - Efficient DOM manipulation (concatenate then set innerHTML once)
  - Fallback images using `||` operator
  - Game cards displaying with images, titles, and placeholder stats
- ✅ **Dark gamer theme implemented** (commit: 18fc83b)
  - Custom CSS variables for consistent theming
  - Sophisticated gradient backgrounds and animations
  - Professional dark color scheme with accent colors
  - Responsive design with mobile-first approach
- ✅ **Bootstrap tooltips integrated** (commit: 91fbafa)
  - Tooltips added to stat icons in game cards
  - Proper Bootstrap 5 tooltip initialization
  - Hover explanations for achievements, guides, and views stats
- ✅ **Enhanced HTML structure** (commit: 91fbafa)
  - Improved hero section with search functionality
  - Professional footer with social links
  - Loading states with Bootstrap spinners
  - Clean semantic HTML structure

**Testing Infrastructure:**
- ✅ Playwright testing framework installed and configured
- ✅ http-server installed for serving frontend during tests
- ✅ playwright.config.ts configured with:
  - baseURL set to `http://localhost:8080` (frontend)
  - webServer array to auto-start both backend (port 3000) and frontend (port 8080)
  - Tests configured for Chromium, Firefox, and WebKit browsers
  - Trace collection on test failures for debugging
- ✅ Root package.json scripts added:
  - `npm test` - Run all tests (auto-starts servers)
  - `npm run test:ui` - Run tests with interactive UI
  - `npm run test:headed` - Run tests with visible browser
  - `npm run backend` - Manually start backend API
  - `npm run frontend` - Manually start frontend server
- ✅ Homepage tests created and passing:
  - tests/homepage.spec.ts with 3 tests
  - Page loads successfully (title check)
  - Search bar is visible
  - Game cards render from API
  - All 9 tests passing (3 tests × 3 browsers)

**Steam API Integration & Achievements:**
- ✅ Steam Web API key secured in .env file
- ✅ Year Walk steamAppId corrected (269050)
- ✅ Achievement seeding script created (seed-year-walk-achievements.js):
  - Fetches achievements from Steam API
  - Populates database with all achievement data
  - Prevents duplicates on re-run
  - Includes name, description, Steam ID, and icon URLs
- ✅ 10 Year Walk achievements successfully populated
- ✅ New API endpoints implemented:
  - GET /api/games/:gameId/achievements - All achievements for a game
  - GET /api/achievements/:id - Single achievement with game data included
- ✅ Prisma concepts learned: findMany, findUnique, where, orderBy, include (relationships/JOINs)

### Next Steps 📋

**Frontend Development (Current Focus):**
1. **Display achievements on frontend**
   - Create game detail page
   - Show Year Walk achievements with icons
   - Achievement cards with descriptions
   - Link from homepage to game detail page

2. **Implement search functionality**
   - Filter games array as user types
   - Re-render grid with filtered results
   - Connect search input to filtering logic
   
3. **Error handling & empty states**
   - Show message if API is down
   - Show message if no games match search
   - Loading spinner while fetching (already implemented)
   - Handle network errors gracefully

**API Development:**
1. **Build more public endpoints**
   - GET /api/games/:gameId - Get single game with details
   - GET /api/games/:gameId/guides - Get all guides for a game
   - GET /api/guides/:guideId - Get guide with achievement tree

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
- `achiever-api/server.js` - Express server with Prisma integration and achievement endpoints
- `achiever-api/seed-year-walk-achievements.js` - Steam API seeding script for achievements
- `achiever-api/package.json` - Dependencies and scripts
- `achiever-api/.env` - Environment variables (DATABASE_URL, STEAM_API_KEY) - not in git
- `achiever-api/prisma/schema.prisma` - Complete database schema (6 models)
- `achiever-api/prisma/migrations/20251001104326_init/` - Initial migration SQL
- `achiever-frontend/index.html` - Main frontend HTML with Bootstrap
- `achiever-frontend/css/style.css` - Custom dark theme styling
- `achiever-frontend/js/app.js` - Frontend JavaScript with API integration
- `playwright.config.ts` - Playwright testing configuration
- `tests/homepage.spec.ts` - Homepage E2E tests (3 tests, all passing)
- `package.json` - Root package with Playwright dependencies and test scripts
- `.gitignore` - Comprehensive ignore rules for monorepo
- `CONTEXT.md` - Project documentation (this file)
- `CONCEPTS.md` - Learning notes and technical concepts

### Current Status 🎯
- **Database**: Live on Railway PostgreSQL
  - 1 Game (Year Walk) with correct Steam App ID
  - 10 Achievements populated from Steam API
- **API**: Three working endpoints
  - GET /api/games - List all games
  - GET /api/games/:gameId/achievements - All achievements for a game
  - GET /api/achievements/:id - Single achievement with game data
- **Frontend**: Professional dark-themed UI with dynamic game cards, tooltips, and responsive design
- **Testing**: Playwright E2E framework with 9 passing tests (3 tests × 3 browsers)
- **Steam Integration**: API key secured, seeding script ready for more games
- **Git**: All progress backed up on GitHub (9 commits)
- **Next**: Display achievements on frontend, implement search functionality