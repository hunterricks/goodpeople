import axios from 'axios';

const API_URL = 'http://10.0.2.2:3000/api';  // Use this for Android emulator
// const API_URL = 'http://localhost:3000/api';  // Use this for iOS simulator

export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users`, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const createTestUser = async () => {
  try {
    const response = await axios.post(`${API_URL}/create-test-user`);
    console.log('Test user created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating test user:', error.message);
    throw error;
  }
};