# 📋 Task Manager App - Codveda Project Internship (Level 3)

A professional, full-stack task management application built with **React**, **Express.js**, and **Sequelize**. This project features a robust authentication system and comprehensive task management capabilities, designed as part of the Codveda Project Internship Level 3.

## 🚀 Features

- **User Authentication**: Secure Login and Registration using JWT (JSON Web Tokens) and bcrypt password hashing.
- **Task Management (CRUD)**: Create, Read, Update, and Delete tasks with ease.
- **Rich Task Attributes**:
  - **Status Tracking**: Pending, In-Progress, and Completed.
  - **Priority Levels**: Low, Medium, and High.
  - **Due Dates**: Keep track of deadlines.
- **Responsive Dashboard**: An intuitive overview of your productivity and pending items.
- **Modern UI/UX**: Clean design built with CSS and React 19.

## 🛠️ Tech Stack

### Frontend
- **React 19**: Modern component-based architecture.
- **React Scripts**: For optimized development and building.
- **Vanilla CSS**: Custom-styled components for a unique aesthetic.

### Backend
- **Node.js & Express 5**: Fast and minimalist backend framework.
- **Sequelize ORM**: Promise-based Node.js ORM for SQLite.
- **SQLite**: Lightweight, file-based database for easy setup.
- **JWT & Bcrypt**: Industry-standard security for authentication.

## 📦 Project Structure

```text
task-manager-app/
├── backend/            # Express.js Server & Sequelize Models
│   ├── models/         # Task and User models
│   ├── routes/         # API Endpoints
│   ├── middleware/     # Auth & Security
│   └── server.js       # Entry point
├── frontend/           # React Application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Dashboard, Auth, and Tasks pages
│   │   └── services/   # API communication logic
└── package.json        # Project scripts and dependencies
```

## ⚙️ Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd task-manager-app
   ```

2. **Install Root Dependencies**:
   ```bash
   npm install
   ```

3. **Install Frontend Dependencies**:
   ```bash
   cd frontend && npm install && cd ..
   ```

4. **Environment Setup**:
   Create a `.env` file in the `backend/` directory and add your configurations (e.g., `JWT_SECRET`).

### Running the Application

You can run both the frontend and backend concurrently from the root directory:

```bash
npm run dev
```

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend**: [http://localhost:5000](http://localhost:5000)

## 📝 License

This project is part of the Codveda Project Internship. All rights reserved.

