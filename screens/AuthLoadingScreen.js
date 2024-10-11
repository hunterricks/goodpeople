import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { getToken } from '../utils/authUtils';
import { colors } from '../styles/colors';

const AuthLoadingScreen = ({ navigation }) => {
  useEffect(() => {
    const checkToken = async () => {
      const userToken = await getToken();
      navigation.replace(userToken ? 'Main' : 'Login');
    };

    checkToken();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator />
    </View>
  );
};

export default AuthLoadingScreen;