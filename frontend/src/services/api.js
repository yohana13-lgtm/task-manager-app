// frontend/src/services/api.js
const API_URL = 'http://localhost:5000/api';

// Helper function untuk request dengan authentication
const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

// ===== AUTH APIs =====

export const register = async (name, email, password) => {
  return authFetch(`${API_URL}/auth/register`, {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
};

export const login = async (email, password) => {
  return authFetch(`${API_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};

export const getCurrentUser = async () => {
  return authFetch(`${API_URL}/auth/me`);
};

// ===== TASK APIs =====

export const getTasks = async () => {
  return authFetch(`${API_URL}/tasks`);
};

export const getTask = async (id) => {
  return authFetch(`${API_URL}/tasks/${id}`);
};

export const createTask = async (taskData) => {
  return authFetch(`${API_URL}/tasks`, {
    method: 'POST',
    body: JSON.stringify(taskData),
  });
};

export const updateTask = async (id, taskData) => {
  return authFetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(taskData),
  });
};

export const deleteTask = async (id) => {
  return authFetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
  });
};