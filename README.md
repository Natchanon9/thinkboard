# ThinkBoard

A full-stack note-taking application with CRUD operations and API rate limiting.

## Tech Stack

**Backend:** Express, TypeScript, MongoDB, Upstash Redis
**Frontend:** React, TypeScript, Vite, Tailwind CSS, DaisyUI

## Project Structure

```
thinkboard/
├── backend/                 # Backend application
│   ├── src/                 # TypeScript source files
│   ├── dist/                # Compiled JavaScript (after build)
│   ├── node_modules/        # Backend dependencies (isolated)
│   ├── .yarnrc.yml          # Yarn config (isolated node_modules)
│   ├── package.json
│   └── tsconfig.json
├── frontend/                # Frontend application
│   ├── src/                 # React source files
│   ├── dist/                # Built static files (after build)
│   ├── node_modules/        # Frontend dependencies (isolated)
│   ├── .yarnrc.yml          # Yarn config (isolated node_modules)
│   ├── package.json
│   └── vite.config.ts
└── package.json             # Root scripts for convenience
```

**Note:** This monorepo uses **isolated node_modules** (each workspace has its own dependencies).

## Local Development Setup

### 1. Install dependencies
```bash
# Install for both frontend and backend
npm run install:all

# Or install individually
cd backend && yarn install
cd ../frontend && yarn install
```

### 2. Configure environment variables

**Backend** (`backend/.env`):
```env
NODE_ENV=development
PORT=5001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
UPSTASH_REDIS_REST_URL=https://your-redis-instance.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

**Frontend** (`frontend/.env`) - Optional:
```env
VITE_API_URL=http://localhost:5001/api
```

### 3. Run the application
```bash
# Backend (runs on port 5001)
npm run dev:backend

# Frontend (runs on port 5173)
npm run dev:frontend
```

## Test Production Build Locally

Before deploying, test the production build:

```bash
# 1. Build both frontend and backend
npm run build

# 2. Start in production mode (must set NODE_ENV=prod)
NODE_ENV=prod npm run start
```

Then open `http://localhost:5001` in your browser. The backend will serve both the API and frontend files.

**Important:** You must set `NODE_ENV=prod` for the server to serve frontend static files.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notes` | Get all notes |
| GET | `/api/notes/:id` | Get note by ID |
| POST | `/api/notes` | Create note |
| PUT | `/api/notes/:id` | Update note |
| DELETE | `/api/notes/:id` | Delete note |

## Deployment (Render.com)

### Environment Variables

Configure these in Render.com Dashboard:

```env
NODE_ENV=prod
PORT=5001
MONGODB_URI=<your_mongodb_connection_string>
UPSTASH_REDIS_REST_URL=<your_upstash_redis_url>
UPSTASH_REDIS_REST_TOKEN=<your_upstash_redis_token>
```

### Render.com Configuration

**Root Directory:** `.` (or leave empty)

**Build Command:**
```bash
cd backend && yarn install && cd ../frontend && yarn install && yarn build && cd ../backend && yarn build
```

**Start Command:**
```bash
cd backend && NODE_ENV=prod node dist/index.js
```

**Environment:** Node (v18+)

### How it works in production:
1. Frontend is built into static files (`frontend/dist/`)
2. Backend is compiled to JavaScript using CommonJS (`backend/dist/`)
3. Backend serves both API endpoints (`/api/*`) and frontend static files
4. Single server deployment - everything runs on one port
5. Frontend uses relative path `/api` for API calls (no CORS needed)

