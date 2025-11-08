import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/LoginScreen';
import { OrdersScreen } from '../screens/OrdersScreen';
import { OrderDetailScreen } from '../screens/OrderDetailScreen';
import { useRider } from '../store/RiderContext';

export type RootStackParamList = {
  Login: undefined;
  Orders: undefined;
  OrderDetail: { orderId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const {
    state: { rider }
  } = useRider();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!rider ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <>
          <Stack.Screen name="Orders" component={OrdersScreen} />
          <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};


