import { colors } from './styles/colors';
console.log('Colors in App.js:', colors);

import React from 'react';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './screens/HomeScreen';
import JobsScreen from './screens/JobsScreen';
import ProposalsScreen from './screens/ProposalsScreen';
import MessagesScreen from './screens/MessagesScreen';
import ProfileScreen from './screens/ProfileScreen';
import JobDetailsScreen from './screens/JobDetailsScreen';
import ChatScreen from './screens/ChatScreen';
import LoginScreen from './screens/LoginScreen';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import RegistrationScreen from './screens/RegistrationScreen';

import { createUser } from './api';  // Assuming api.js is in the temp directory

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Jobs') {
            iconName = focused ? 'briefcase' : 'briefcase-outline';
          } else if (route.name === 'Proposals') {
            iconName = focused ? 'document-text' : 'document-text-outline';
          } else if (route.name === 'Messages') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Jobs" component={JobsScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Proposals" component={ProposalsScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Messages" component={MessagesScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthLoading">
        <Stack.Screen 
          name="AuthLoading" 
          component={AuthLoadingScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
        />
        <Stack.Screen 
          name="Registration" 
          component={RegistrationScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Main" 
          component={MainTabs} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="JobDetails" 
          component={JobDetailsScreen} 
          options={{ title: 'Job Details' }}
        />
        <Stack.Screen 
          name="ChatScreen" 
          component={ChatScreen} 
          options={({ route }) => ({ title: route.params.sender })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}