import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { RootNavigator } from './src/navigation/RootNavigator';
import { RiderProvider } from './src/store/RiderContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <RiderProvider>
        <NavigationContainer>
          <RootNavigator />
          <StatusBar style="light" />
        </NavigationContainer>
      </RiderProvider>
    </SafeAreaProvider>
  );
}

