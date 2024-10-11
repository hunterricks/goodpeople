import Constants from 'expo-constants';

const getApiUrl = () => {
  if (__DEV__) {
    return Constants.expoConfig.extra.apiUrlDev;
  } else {
    return Constants.expoConfig.extra.apiUrlProd;
  }
};

export const API_URL = getApiUrl();

console.log('API_URL:', API_URL);
console.log('Is development:', __DEV__);
console.log('Is physical device:', Constants.isDevice);