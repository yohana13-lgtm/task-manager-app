// backend/server.js
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection & Sync
sequelize.authenticate()
  .then(() => {
    console.log('✅ SQLite Database Connected');
    return sequelize.sync(); // Create tables if not exist
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