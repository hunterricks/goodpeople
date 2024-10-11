import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { colors } from '../styles/colors';
import { createUser } from '../api';  // Adjust the path if necessary
import axios from 'axios';
import { API_URL } from '../utils/constants';

console.log('Colors in RegistrationScreen:', colors);

const RegistrationScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const testServerConnection = async () => {
    try {
      const response = await axios.get(`${API_URL}/test`, { timeout: 5000 });
      console.log('Server test response:', response.data);
    } catch (error) {
      console.error('Server test failed:', error.message);
    }
  };

  const handleRegister = async () => {
    console.log('handleRegister called');
    try {
      console.log('Attempting to create user');
      const response = await axios.post(`${API_URL}/api/register`, { email, password });
      console.log('Server response:', response.data);
      if (response.data.message === 'User created successfully') {
        Alert.alert('Success', 'Account created successfully');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', response.data.message || 'Failed to create account');
      }
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error.message);
      Alert.alert('Error', 'Failed to create account. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Already have an account? Log In</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: colors.border,
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: colors.text,
    backgroundColor: colors.background,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: colors.primary,
    textAlign: 'center',
    marginTop: 15,
  },
});

export default RegistrationScreen;
