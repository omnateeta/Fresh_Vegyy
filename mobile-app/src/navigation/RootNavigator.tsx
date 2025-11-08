import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { HomeTabs } from './homeTabs';
import { ProductDetailScreen } from '../screens/ProductDetailScreen';
import { CheckoutScreen } from '../screens/CheckoutScreen';
import { OrderTrackingScreen } from '../screens/OrderTrackingScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { useAuth } from '../store/useAuth';

export type RootStackParamList = {
  Login: undefined;
  HomeTabs: undefined;
  ProductDetail: { productId: string };
  Checkout: undefined;
  OrderTracking: { orderId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <>
          <Stack.Screen name="HomeTabs" component={HomeTabs} />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
          <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};


