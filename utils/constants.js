import Constants from 'expo-constants';
import { Platform } from 'react-native';

const getApiUrl = () => {
  if (__DEV__) {
    if (Platform.OS === 'ios') {
      return Constants.isDevice
        ? 'http://192.168.8.223:3000'  // Use your computer's IP address
        : 'http://localhost:3000';     // Use localhost for iOS simulator
    } else {
      if (Platform.OS === 'android') {
        return Constants.isDevice
          ? 'http://192.168.8.223:3000'  // Use your computer's IP address when on a physical Android device
          : 'http://10.0.2.2:3000';  // Use 10.0.2.2 for Android emulators
      } else {
        return Constants.isDevice
          ? 'http://192.168.8.223:3000'  // Use your computer's IP address when on a physical iOS device
          : 'http://localhost:3000';  // Use localhost for iOS simulators
      }
    }
  } else {
    return Constants.expoConfig.extra.apiUrlProd;  // Use the production URL for non-dev builds
  }
};

export const API_URL = getApiUrl();

console.log('API_URL:', API_URL);
console.log('Is development:', __DEV__);
console.log('Is physical device:', Constants.isDevice);
console.log('Platform:', Platform.OS);

// Add these new constants
export const JOB_CATEGORIES = [
  'Web Development',
  'Mobile Development',
  'Design',
  'Writing',
  'Marketing',
  // Add more categories as needed
];

export const SKILLS = [
  'JavaScript',
  'React',
  'Node.js',
  'Python',
  'UI/UX Design',
  // Add more skills as needed
];
