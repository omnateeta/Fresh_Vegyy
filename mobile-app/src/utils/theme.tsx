import React, { ReactNode, createContext, useContext } from 'react';
import { ThemeProvider as NavigationThemeProvider, DefaultTheme } from '@react-navigation/native';

export const theme = {
  colors: {
    primary: '#4CAF50',
    secondary: '#FF9800',
    background: '#F5F5F5',
    surface: '#FFFFFF',
    text: '#212121',
    muted: '#9E9E9E',
    success: '#66BB6A'
  },
  spacing: (value: number) => value * 8
};

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.colors.background,
    primary: theme.colors.primary,
    card: theme.colors.surface,
    text: theme.colors.text
  }
};

const ThemeContext = createContext(theme);

export const ThemeProvider = ({ children }: { children: ReactNode }) => (
  <ThemeContext.Provider value={theme}>
    <NavigationThemeProvider value={navigationTheme}>{children}</NavigationThemeProvider>
  </ThemeContext.Provider>
);

export const useTheme = () => useContext(ThemeContext);


