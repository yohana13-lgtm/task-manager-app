// src/pages/Dashboard.js
import React, { useState, useContext } from 'react';
import { ThemeContext } from '../App';
import './Dashboard.css';
import OverviewPage from './OverviewPage';
import TasksPage from './TasksPage';

function Dashboard({ user, onLogout }) {
  const [activePage, setActivePage] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const navigation = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'tasks', name: 'My Tasks', icon: '✓' },
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-icon">✓</span>
            {sidebarOpen && <span className="logo-text">TaskFlow</span>}
          </div>
        </div>

        <nav className="sidebar-nav">
          {navigation.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activePage === item.id ? 'active' : ''}`}
              onClick={() => setActivePage(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              {sidebarOpen && <span className="nav-text">{item.name}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">{user.name.charAt(0).toUpperCase()}</div>
            {sidebarOpen && (
              <div className="user-info">
                <div className="user-name">{user.name}</div>
                <div className="user-email">{user.email}</div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <button className="btn-icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
              ☰
            </button>
            <h1 className="page-title">
              {navigation.find(n => n.id === activePage)?.name}
            </h1>
          </div>

          <div className="header-right">
            <button className="btn-icon theme-toggle" onClick={toggleTheme} title="Toggle Theme">
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <button className="btn-logout" onClick={onLogout}>
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="page-content">
          {activePage === 'overview' && <OverviewPage user={user} />}
          {activePage === 'tasks' && <TasksPage user={user} />}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;