import * as SecureStore from 'expo-secure-store';

// Function to save the token
export async function saveToken(token) {
  try {
    await SecureStore.setItemAsync('userToken', token);
  } catch (error) {
    console.error('Error saving the token', error);
  }
}

// Function to retrieve the token
export async function getToken() {
  try {
    const token = await SecureStore.getItemAsync('userToken');
    return token;
  } catch (error) {
    console.error('Error getting the token', error);
    return null;
  }
}

// Function to remove the token
export async function removeToken() {
  try {
    await SecureStore.deleteItemAsync('userToken');
  } catch (error) {
    console.error('Error removing the token', error);
  }
}