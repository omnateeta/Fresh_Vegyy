import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { orderApi } from '../services/orderApi';
import { useCart } from '../store/CartContext';
import { RootStackParamList } from '../navigation/RootNavigator';
import { theme } from '../utils/theme';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Checkout'>;

export const CheckoutScreen = () => {
  const { state, clearCart } = useCart();
  const navigation = useNavigation<NavigationProp>();
  const [address, setAddress] = useState('221B Baker Street, London');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOrder = async () => {
    if (!state.items.length) {
      Alert.alert('Cart Empty', 'Please add items before checkout.');
      return;
    }

    setIsSubmitting(true);
    try {
      const order = await orderApi.placeOrder({
        items: state.items.map((item) => ({ productId: item.id, quantity: item.quantity })),
        paymentMethod,
        deliveryAddress: address
      });
      clearCart();
      navigation.replace('OrderTracking', { orderId: order.id });
    } catch (error) {
      Alert.alert('Order Failed', (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Delivery Address</Text>
      <TextInput
        value={address}
        onChangeText={setAddress}
        style={styles.input}
        multiline
        numberOfLines={3}
      />

      <Text style={styles.heading}>Payment Method</Text>
      <View style={styles.paymentGroup}>
        {(['upi', 'card', 'cod'] as const).map((method) => (
          <TouchableOpacity
            key={method}
            style={[styles.paymentOption, paymentMethod === method && styles.paymentOptionSelected]}
            onPress={() => setPaymentMethod(method)}
          >
            <Text style={styles.paymentLabel}>{method.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.submit} disabled={isSubmitting} onPress={handleOrder}>
        <Text style={styles.submitText}>{isSubmitting ? 'Placing order...' : 'Confirm Order'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing(3)
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: theme.spacing(1)
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3)
  },
  paymentGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(4)
  },
  paymentOption: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center'
  },
  paymentOptionSelected: {
    borderWidth: 2,
    borderColor: theme.colors.primary
  },
  paymentLabel: {
    fontWeight: '600'
  },
  submit: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center'
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700'
  }
});

