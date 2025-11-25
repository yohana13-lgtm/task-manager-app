// backend/models/index.js
const { Sequelize } = require('sequelize');
const path = require('path');

// Initialize SQLite Database
// Database akan tersimpan sebagai file 'database.sqlite' di folder backend
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'database.sqlite'),
  logging: false // Set true jika mau lihat SQL queries
});

// Import Models
const User = require('./User')(sequelize);
const Task = require('./Task')(sequelize);

// Define Associations
User.hasMany(Task, { foreignKey: 'userId', as: 'tasks' });
Task.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = {
  sequelize,
  User,
  Task
};