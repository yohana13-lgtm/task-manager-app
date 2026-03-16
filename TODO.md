# TaskFlow — Task Manager App

A full-stack task management web application built with React and Express.js, using SQLite as the database.

## Tech Stack

**Frontend**
- React 19
- Create React App
- CSS Variables (light/dark theme)

**Backend**
- Node.js + Express 5
- Sequelize ORM
- SQLite (via sqlite3)
- JWT Authentication
- bcryptjs (password hashing)

## Features

- User registration and login with JWT authentication
- Create, read, update, and delete tasks
- Task status: Pending, In Progress, Completed
- Task priority: Low, Medium, High
- Due date per task
- Overview dashboard with completion rate and stats
- Light/dark theme toggle
- Protected routes (login required)

## Project Structure

```
task-manager-app/
├── package.json          # Root package (concurrently)
├── node_modules/         # Shared dependencies
├── backend/
│   ├── server.js
│   ├── .env
│   ├── database.sqlite
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── index.js
│   │   ├── User.js
│   │   └── Task.js
│   └── routes/
│       ├── auth.js
│       └── tasks.js
└── frontend/
    ├── package.json
    ├── public/
    └── src/
        ├── pages/
        ├── components/
        └── services/
            └── api.js
```

## Getting Started

### Prerequisites
- Node.js v18 or higher
- npm v9 or higher

### Installation

1. Clone the repository
```bash
git clone https://github.com/username/task-manager-app.git
cd task-manager-app
```

2. Install all dependencies
```bash
npm install
```

3. Set up environment variables — buat file `backend/.env`:
```env
PORT=5000
JWT_SECRET=your_jwt_secret_key_change_this
```

4. Run the app (frontend + backend sekaligus)
```bash
npm run dev
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Jalankan frontend dan backend sekaligus |
| `npm start` | Jalankan backend saja (production) |
| `npm run build` | Build frontend untuk production |

## API Endpoints

**Auth**
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register user baru |
| POST | /api/auth/login | Login |
| GET | /api/auth/me | Get current user (protected) |

**Tasks**
| Method | Endpoint | Description |
|---|---|---|
| GET | /api/tasks | Get semua tasks milik user |
| POST | /api/tasks | Buat task baru |
| PUT | /api/tasks/:id | Update task |
| DELETE | /api/tasks/:id | Hapus task |

## Environment Variables

Buat file `backend/.env` dan isi dengan:

```env
PORT=5000
JWT_SECRET=ganti_dengan_secret_key_yang_kuat
```

> Jangan pernah commit file `.env` ke Git!