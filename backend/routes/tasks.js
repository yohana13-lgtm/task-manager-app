// backend/routes/tasks.js
const express = require('express');
const router = express.Router();
const { Task } = require('../models');
const { protect } = require('../middleware/auth');

// Semua routes di sini protected (butuh authentication)
router.use(protect);

// @route   GET /api/tasks
// @desc    Get all tasks untuk user yang login
// @access  Private
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.findAll({ 
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });
    
    res.json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
});

// @route   GET /api/tasks/:id
// @desc    Get single task
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({ 
        success: false, 
        message: 'Task not found' 
      });
    }

    // Check apakah task milik user yang login
    if (task.userId !== req.user.id) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to access this task' 
      });
    }

    res.json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
});

// @route   POST /api/tasks
// @desc    Create new task
// @access  Private
router.post('/', async (req, res) => {
  try {
    // Tambahkan user ID ke task
    const taskData = {
      ...req.body,
      userId: req.user.id
    };

    const task = await Task.create(taskData);

    res.status(201).json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: 'Invalid data', 
      error: error.message 
    });
  }
});

// @route   PUT /api/tasks/:id
// @desc    Update task
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({ 
        success: false, 
        message: 'Task not found' 
      });
    }

    // Check apakah task milik user yang login
    if (task.userId !== req.user.id) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to update this task' 
      });
    }

    await task.update(req.body);

    res.json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: 'Invalid data', 
      error: error.message 
    });
  }
});

// @route   DELETE /api/tasks/:id
// @desc    Delete task
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({ 
        success: false, 
        message: 'Task not found' 
      });
    }

    // Check apakah task milik user yang login
    if (task.userId !== req.user.id) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to delete this task' 
      });
    }

    await task.destroy();

    res.json({
      success: true,
      data: {},
      message: 'Task deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
});

module.exports = router;