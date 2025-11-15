// App.tsx (GANTIKAN SEMUA KODE LAMA ANDA DENGAN INI)

import 'react-native-gesture-handler'; // (Penting untuk Navigasi)
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/contexts/AuthContext'; // (File yang kita buat)
import AppNavigator from './src/navigation/AppNavigator'; // (File yang kita buat)
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
        <StatusBar style="auto" />
      </NavigationContainer>
    </AuthProvider>
  );
}