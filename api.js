import axios from 'axios';
import { API_URL } from './utils/constants';

console.log('API_URL in api.js:', API_URL);

export const createUser = async (userData) => {
  try {
    console.log('Attempting to create user with URL:', `${API_URL}/api/register`);
    console.log('User data:', userData);
    const response = await axios.post(`${API_URL}/api/register`, userData);
    console.log('Registration response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const createTestUser = async () => {
  try {
    const response = await axios.post(`${API_URL}/api/create-test-user`);
    console.log('Test user created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating test user:', error.message);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    console.log('Attempting login to:', `${API_URL}/api/login`); // Make sure this includes /api/
    const response = await axios.post(`${API_URL}/api/login`, { email, password });
    console.log('Login response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response ? error.response.data : error.message);
    console.error('Full error object:', JSON.stringify(error, null, 2));
    console.error('Error response:', error.response ? JSON.stringify(error.response, null, 2) : 'No response');
    throw error;
  }
};
