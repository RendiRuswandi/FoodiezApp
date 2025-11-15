// src/navigation/AppNavigator.tsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { View, ActivityIndicator } from 'react-native';

// Impor Navigator ASLI
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';

const LoadingScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" />
  </View>
);

export default function AppNavigator() {
  const { isLoggedIn, isLoading } = useAuth(); 

  if (isLoading) {
    return <LoadingScreen />;
  }

  // Ini dia! Sekarang kita pakai Navigator yang sebenarnya.
  return isLoggedIn ? <MainNavigator /> : <AuthNavigator />;
}