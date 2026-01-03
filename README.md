# ThinkBoard

A full-stack note-taking application with CRUD operations and API rate limiting.

## Tech Stack

**Backend:** Express, TypeScript, MongoDB, Upstash Redis
**Frontend:** React, TypeScript, Vite, Tailwind CSS, DaisyUI

## Setup

1. Install dependencies
```bash
cd backend && yarn install
cd ../frontend && yarn install
```

2. Configure environment variables in `backend/.env`
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
PORT=5001
UPSTASH_REDIS_REST_URL=https://your-redis-instance.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

3. Run the application
```bash
# Backend
cd backend && yarn dev

# Frontend
cd frontend && yarn dev
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notes` | Get all notes |
| GET | `/api/notes/:id` | Get note by ID |
| POST | `/api/notes` | Create note |
| PUT | `/api/notes/:id` | Update note |
| DELETE | `/api/notes/:id` | Delete note |

