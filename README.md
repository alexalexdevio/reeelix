# 🎬 Reelix Bot

> Telegram bot for random movie discovery with the ability to save favorites and a watchlist

---

## 📋 Table of Contents

- [About](#about)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Environment Variables](#environment-variables)
- [Run Locally](#run-locally)
- [Run with Docker](#run-with-docker)
- [Bot Commands](#bot-commands)

---

## About

**Reelix** is a Telegram bot that helps you find a movie to watch. It fetches a random movie from the TMDB database and shows you the description, rating, and trailer. You can save movies to your favorites or watch later list — everything is stored in your profile.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| [TypeScript](https://www.typescriptlang.org/) | Programming language |
| [grammY](https://grammy.dev/) | Telegram Bot Framework |
| [MongoDB](https://www.mongodb.com/) | Database |
| [Mongoose](https://mongoosejs.com/) | ODM for MongoDB |
| [Axios](https://axios-http.com/) | HTTP client for TMDB API |
| [TMDB API](https://www.themoviedb.org/documentation/api) | Movie database |
| [Docker](https://www.docker.com/) | Containerization |
| [Nodemon](https://nodemon.io/) + [tsx](https://github.com/privatenumber/tsx) | Hot-reload for development |

---

## Project Structure

```
src/
├── app.ts                                      # Entry point
├── config.ts                                   # Environment variables
│
├── callbacks/                                  # Inline button handlers
│   ├── index.ts                                # Callbacks registration
│   ├── fav.callback.ts                         # Add to favorites
│   ├── favorites.callback.ts                   # Favorites list
│   ├── later.callback.ts                       # Add to watchlist
│   └── watchlist.callback.ts                   # Watchlist
│
├── handlers/                                   # Command handlers
│   ├── index.ts                                # Handlers registration
│   ├── start.handler.ts                        # /start
│   ├── help.handler.ts                         # /help
│   ├── profile.handler.ts                      # User profile
│   ├── random-movie.handler.ts                 # Random movie
│   ├── back.handler.ts                         # Back button
│   ├── delete-profile.handler.ts               # Profile deletion
│   └── unknown.handler.ts                      # Unknown commands
│
├── keyboards/                                  # Inline keyboards
│   ├── main.keyboard.ts                        # Main menu
│   ├── movie.keyboard.ts                       # Movie card buttons
│   ├── profile.keyboard.ts                     # Profile menu
│   ├── back.keyboard.ts                        # Back button
│   └── comfirm.keyboard.ts                     # Action confirmation
│
├── middlewares/
│   └── ensure-user.ts                          # Auto user creation
│
├── db/
│   ├── connection.ts                           # MongoDB connection
│   └── models/
│       ├── User.model.ts                       # User model
│       └── MovieInteraction.model.ts           # Movie interaction model
│
├── services/
│   ├── tmdb/
│   │   ├── tmdb.cleint.ts                      # Axios instance for TMDB
│   │   ├── tmdb.service.ts                     # TMDB API methods
│   │   └── tmdb.types.ts                       # TMDB response types
│   ├── movie-interaction/
│   │   ├── movie-interaction.service.ts        # Movie saving logic
│   │   └── movie-interaction.types.ts          # Interaction types
│   └── user/
│       └── user.service.ts                     # User logic
│
└── types/
    ├── global.types.ts                         # Global types
    └── User.types.ts                           # User types
```

---

## Features

### 🎲 Random Movie
The bot fetches a random movie from TMDB API and returns:
- title and release year
- rating and vote count
- description (in Ukrainian where available)
- poster
- trailer link

### ❤️ Favorites (up to 5 movies)
Save movies you liked. To add a new one — remove one from the list first.

### 🕐 Watch Later (up to 5 movies)
Save a movie to come back to it when you have time.

### 👤 Profile
- view saved movies
- remove individual movies from lists
- fully delete your profile and all data from the database

---

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
BOT_TOKEN=your_telegram_bot_token
TMDB_API_TOKEN=your_tmdb_read_access_token
MONGO_URI=mongodb://user:password@mongo:27017/movie-bot?authSource=admin
MONGO_USERNAME=your_mongo_username
MONGO_PASSWORD=your_mongo_password
```

| Variable | Description |
|---|---|
| `BOT_TOKEN` | Bot token from [@BotFather](https://t.me/BotFather) |
| `TMDB_API_TOKEN` | Read Access Token from [TMDB](https://www.themoviedb.org/settings/api) |
| `MONGO_URI` | MongoDB connection URI |
| `MONGO_USERNAME` | MongoDB username |
| `MONGO_PASSWORD` | MongoDB password |

---

## Run Locally

### Requirements
- Node.js 20+
- MongoDB

```bash
# 1. Clone the repository
git clone https://github.com/alexalexdevio/reeelix.git
cd reeelix

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env
# fill in the variables in .env

# 4. Start in development mode
npm run dev
```

---

## Run with Docker

### Development (with hot-reload)
```bash
docker compose -f docker-compose.dev.yml up --build
```

### Production
```bash
docker compose up --build -d
```

### Stop
```bash
docker compose down
```

### View logs
```bash
docker logs reelix-movie-assistant-bot -f
```

### Convenience scripts
```bash
npm run docker:dev    # development mode
npm run docker:prod   # production
npm run docker:down   # stop
```

---

## Bot Commands

| Command | Description |
|---|---|
| `/start` | Start the bot and create a profile |
| `/help` | Show help message |

---

## License

MIT
