import axios from 'axios';
import { API_URL } from './utils/constants';

console.log('API_URL in api.js:', API_URL);
console.log('Full login URL:', `${API_URL}/api/login`);

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
    console.log('Attempting login to:', `${API_URL}/api/login`); // Note the /api/ prefix
    console.log('Login payload:', { email, password: '********' });
    
    const response = await axios.post(`${API_URL}/api/login`, { email, password }, {
      timeout: 10000 // 10 seconds timeout
    });
    
    console.log('Login response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    if (error.response) {
      console.error('Error response status:', error.response.status);
      console.error('Error response data:', error.response.data);
      console.error('Error response headers:', error.response.headers);
    } else if (error.request) {
      console.error('No response received. Request:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    console.error('Error config:', error.config);
    throw error;
  }
};