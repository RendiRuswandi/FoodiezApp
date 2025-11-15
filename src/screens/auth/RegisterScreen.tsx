// src/screens/auth/RegisterScreen.tsx

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Halaman Registrasi</Text>
      <Text>Buat akun baru Anda di sini.</Text>
      
      {/* Tombol untuk kembali ke Login */}
      <Button 
        title="Sudah punya akun? Login" 
        onPress={() => navigation.goBack()} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});