import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './src/navigation/RootNavigator';
import { CartProvider } from './src/store/CartContext';
import { ThemeProvider } from './src/utils/theme';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <CartProvider>
          <NavigationContainer>
            <RootNavigator />
            <StatusBar style="auto" />
          </NavigationContainer>
        </CartProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}


