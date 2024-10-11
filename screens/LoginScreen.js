import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../styles/colors';
import { saveToken } from '../utils/authUtils';
import axios from 'axios';
import { API_URL } from '../utils/constants';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/login`, { email, password });
      if (response.data.success) {
        const token = response.data.token;
        await saveToken(token);
        navigation.replace('Main');
      } else {
        Alert.alert('Error', 'Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to GoodPeople</Text>
      <Text style={styles.subHeader}>Login to your account</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={colors.textLight}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!isLoading}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={colors.textLight}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!isLoading}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={isLoading}>
        <Icon name="log-in-outline" size={24} color={colors.background} />
        <Text style={styles.loginButtonText}>{isLoading ? 'Logging In...' : 'Log In'}</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.registerButton} 
        onPress={() => navigation.navigate('Registration')}
        disabled={isLoading}
      >
        <Icon name="person-add-outline" size={24} color={colors.background} />
        <Text style={styles.registerButtonText}>Create an Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: colors.background,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.secondary,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: colors.border,
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    color: colors.text,
    fontSize: 16,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  loginButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  registerButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
