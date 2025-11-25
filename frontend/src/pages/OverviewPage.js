// src/pages/OverviewPage.js
import React, { useState, useEffect } from 'react';
import { getTasks } from '../services/api';
import './OverviewPage.css';

function OverviewPage({ user }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    pending: 0,
    highPriority: 0,
    completionRate: 0,
    upcomingDeadlines: 0
  });

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await getTasks();
      if (response.success) {
        setTasks(response.data);
        calculateStats(response.data);
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (taskData) => {
    const total = taskData.length;
    const completed = taskData.filter(t => t.status === 'completed').length;
    const inProgress = taskData.filter(t => t.status === 'in-progress').length;
    const pending = taskData.filter(t => t.status === 'pending').length;
    const highPriority = taskData.filter(t => t.priority === 'high').length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    // Upcoming deadlines (within 7 days)
    const now = new Date();
    const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const upcomingDeadlines = taskData.filter(t => {
      if (!t.dueDate || t.status === 'completed') return false;
      const dueDate = new Date(t.dueDate);
      return dueDate >= now && dueDate <= weekFromNow;
    }).length;

    setStats({ total, completed, inProgress, pending, highPriority, completionRate, upcomingDeadlines });
  };

  const recentTasks = tasks.slice(0, 5);

  if (loading) {
    return <div className="loading-container"><div className="spinner"></div></div>;
  }

  return (
    <div className="overview-page">
      {/* Welcome Section */}
      <div className="welcome-section">
        <div>
          <h2 className="welcome-title">Welcome back, {user.name}! 👋</h2>
          <p className="welcome-subtitle">Here's what's happening with your tasks today.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Total Tasks</div>
          </div>
        </div>

        <div className="stat-card success">
          <div className="stat-icon">✓</div>
          <div className="stat-content">
            <div className="stat-value">{stats.completed}</div>
            <div className="stat-label">Completed</div>
          </div>
        </div>

        <div className="stat-card warning">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <div className="stat-value">{stats.inProgress}</div>
            <div className="stat-label">In Progress</div>
          </div>
        </div>

        <div className="stat-card info">
          <div className="stat-icon">⏰</div>
          <div className="stat-content">
            <div className="stat-value">{stats.pending}</div>
            <div className="stat-label">Pending</div>
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="additional-stats">
        <div className="card completion-card">
          <h3 className="card-title">Completion Rate</h3>
          <div className="progress-circle">
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="var(--border-color)" strokeWidth="8"/>
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                fill="none" 
                stroke="url(#gradient)" 
                strokeWidth="8"
                strokeDasharray={`${stats.completionRate * 2.827} 282.7`}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--primary-color)" />
                  <stop offset="100%" stopColor="var(--secondary-color)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="progress-value">{stats.completionRate}%</div>
          </div>
        </div>

        <div className="card quick-stats-card">
          <h3 className="card-title">Quick Stats</h3>
          <div className="quick-stats-list">
            <div className="quick-stat-item">
              <span className="quick-stat-icon">🔥</span>
              <span className="quick-stat-label">High Priority</span>
              <span className="quick-stat-value">{stats.highPriority}</span>
            </div>
            <div className="quick-stat-item">
              <span className="quick-stat-icon">📅</span>
              <span className="quick-stat-label">Due This Week</span>
              <span className="quick-stat-value">{stats.upcomingDeadlines}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="card recent-tasks-card">
        <div className="card-header">
          <h3 className="card-title">Recent Tasks</h3>
        </div>
        <div className="recent-tasks-list">
          {recentTasks.length === 0 ? (
            <div className="empty-state">
              <p>No tasks yet. Create your first task!</p>
            </div>
          ) : (
            recentTasks.map(task => (
              <div key={task.id} className="recent-task-item">
                <div className="task-status-dot" data-status={task.status}></div>
                <div className="task-info">
                  <div className="task-title">{task.title}</div>
                  <div className="task-meta">
                    <span className={`priority-badge priority-${task.priority}`}>
                      {task.priority}
                    </span>
                    <span className="task-date">
                      {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No deadline'}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default OverviewPage;