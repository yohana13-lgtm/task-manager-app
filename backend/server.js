// backend/server.js
require('dotenv').config({ path: './backend/.env' }); // HARUS paling atas

const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://task-manager-app-frontend.vercel.app' // nanti diupdate setelah dapat URL Vercel
  ],
  credentials: true
}));
app.use(express.json());

// Database Connection & Sync
sequelize.authenticate()
  .then(() => {
    console.log('✅ SQLite Database Connected');
    return sequelize.sync();
  })
  .then(() => {
    console.log('✅ Database Tables Synced');
  })
  .catch(err => {
    console.error('❌ Database Error:', err);
  });

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

// Test Route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Task Manager API with SQLite!' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});