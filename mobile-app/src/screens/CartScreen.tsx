import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/native-stack';
import { useCart } from '../store/CartContext';
import { RootStackParamList } from '../navigation/RootNavigator';
import { theme } from '../utils/theme';

type NavigationProp = StackNavigationProp<RootStackParamList, 'HomeTabs'>;

export const CartScreen = () => {
  const { state, total, removeFromCart, clearCart } = useCart();
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <FlatList
        data={state.items}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.empty}>Your cart is empty.</Text>}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemMeta}>
                {item.quantity} × ₹{item.price.toFixed(2)}
              </Text>
            </View>
            <TouchableOpacity onPress={() => removeFromCart(item.id)}>
              <Text style={styles.remove}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      {state.items.length > 0 && (
        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Total</Text>
            <Text style={styles.summaryAmount}>₹{total.toFixed(2)}</Text>
          </View>
          <TouchableOpacity style={styles.checkout} onPress={() => navigation.navigate('Checkout')}>
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={clearCart}>
            <Text style={styles.clearText}>Clear cart</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing(2)
  },
  empty: {
    textAlign: 'center',
    marginTop: theme.spacing(4),
    color: theme.colors.muted
  },
  item: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1.5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600'
  },
  itemMeta: {
    color: theme.colors.muted,
    marginTop: 4
  },
  remove: {
    color: '#f44336'
  },
  summary: {
    paddingTop: theme.spacing(2),
    borderTopWidth: 1,
    borderColor: '#e0e0e0'
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2)
  },
  summaryText: {
    fontSize: 18,
    fontWeight: '600'
  },
  summaryAmount: {
    fontSize: 18,
    fontWeight: '700'
  },
  checkout: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center'
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  clearText: {
    textAlign: 'center',
    marginTop: theme.spacing(2),
    color: theme.colors.muted
  }
});


