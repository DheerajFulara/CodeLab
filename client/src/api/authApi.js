import axios from 'axios';

const BASE_URL = 'http://localhost:3000/user';

export async function registerUser(data) {
  // Call the route you defined for new user creation
  return await axios.post(`${BASE_URL}/signin`, data);
}

export async function loginUser(data) {
  // Call the route you defined for login
  return await axios.post(`${BASE_URL}/login`, data);
}
