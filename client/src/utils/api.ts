import axios from 'axios';

// Check if the app is running on localhost
const isDev = window.location.hostname === 'localhost';
const API_BASE_URL = isDev
  ? 'http://localhost:3001' // Development backend URL
  : '/'; // Production backend use the same path as frontend

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});
