/* eslint-disable prettier/prettier */
import React from 'react';
import { AuthProvider } from './src/context/AuthContext'; // Updated path
import AppNavigator from './src/navigation/AppNavigator'; // Updated path

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
