// src/api/axios.ts
import axios from 'axios';

const api = axios.create({
  // Use the environment variable if available, otherwise fallback to localhost
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => response,
  error => {
    // Only redirect to login if it's a true authentication error
    // and not a validation error (422) or other error
    if (error.response?.status === 401 && 
        error.response?.data?.message?.toLowerCase().includes('unauthenticated')) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;