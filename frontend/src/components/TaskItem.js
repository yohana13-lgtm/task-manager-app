// frontend/src/components/TaskItem.js
import React from 'react';
import './TaskItem.css';

function TaskItem({ task, onEdit, onDelete }) {
  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#f59e0b';
      case 'in-progress': return '#3b82f6';
      case 'completed': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'high': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="task-item">
      <div className="task-main">
        <div className="task-content">
          <h3 className="task-title">{task.title}</h3>
          {task.description && (
            <p className="task-description">{task.description}</p>
          )}
          <div className="task-meta">
            <span 
              className="task-badge" 
              style={{ backgroundColor: getStatusColor(task.status) }}
            >
              {task.status.replace('-', ' ')}
            </span>
            <span 
              className="task-badge" 
              style={{ backgroundColor: getPriorityColor(task.priority) }}
            >
              {task.priority} priority
            </span>
            <span className="task-date">
              📅 {formatDate(task.dueDate)}
            </span>
          </div>
        </div>
        <div className="task-actions">
          <button 
            onClick={() => onEdit(task)} 
            className="btn-icon btn-edit"
            title="Edit task"
          >
            ✏️
          </button>
          <button 
            onClick={() => onDelete(task._id)} 
            className="btn-icon btn-delete"
            title="Delete task"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;