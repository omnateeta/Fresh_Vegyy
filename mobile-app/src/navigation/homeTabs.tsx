import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { HomeScreen } from '../screens/HomeScreen';
import { CartScreen } from '../screens/CartScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { theme } from '../utils/theme';

type HomeTabParamList = {
  Home: undefined;
  Cart: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<HomeTabParamList>();

export const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.muted,
        tabBarIcon: ({ color, size }) => {
          const icon = route.name === 'Home' ? 'home' : route.name === 'Cart' ? 'shopping-cart' : 'user';
          return <Feather name={icon as keyof typeof Feather.glyphMap} size={size} color={color} />;
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};


