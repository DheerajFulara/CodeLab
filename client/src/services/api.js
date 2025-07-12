import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// Attach token if exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const createSession = () => API.post('/sessions/create');
export const getSession = (code) => API.get(`/sessions/${code}`);
