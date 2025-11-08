import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/native-stack';
import * as Location from 'expo-location';
import { RootStackParamList } from '../navigation/RootNavigator';
import { DeliveryOrder } from '../types';
import { useRider } from '../store/RiderContext';
import { orderApi } from '../services/orderApi';
import { riderApi } from '../services/riderApi';
import { useSocket } from '../hooks/useSocket';

type Nav = StackNavigationProp<RootStackParamList, 'Orders'>;

export const OrdersScreen = () => {
  const {
    state: { rider },
    assignOrder
  } = useRider();
  const [orders, setOrders] = useState<DeliveryOrder[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [online, setOnline] = useState(false);
  const navigation = useNavigation<Nav>();
  const socket = useSocket();

  const loadOrders = async () => {
    setRefreshing(true);
    try {
      const data = await orderApi.listForRider();
      setOrders(data);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    void loadOrders();
  }, []);

  useEffect(() => {
    if (!rider) return;
    socket.emit('joinDelivery', rider.id);
    socket.on('delivery:assigned', (payload: { orderId: string }) => {
      assignOrder(payload.orderId);
      void loadOrders();
    });
    return () => {
      socket.off('delivery:assigned');
    };
  }, [assignOrder, rider, socket]);

  const toggleOnline = async (value: boolean) => {
    setOnline(value);
    await riderApi.toggleAvailability(value);
    if (value) {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
        await riderApi.updateLocation({ lat: loc.coords.latitude, lng: loc.coords.longitude });
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Assigned Orders</Text>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>{online ? 'Online' : 'Offline'}</Text>
          <Switch value={online} onValueChange={toggleOnline} />
        </View>
      </View>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadOrders} />}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('OrderDetail', { orderId: item.id })}>
            <Text style={styles.cardTitle}>Order #{item.id.slice(-6)}</Text>
            <Text style={styles.cardText}>{item.address}</Text>
            <Text style={styles.cardStatus}>Status: {item.status}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No orders assigned yet.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f8e9',
    padding: 16
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  heading: {
    fontSize: 22,
    fontWeight: '700'
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  switchLabel: {
    marginRight: 8,
    fontWeight: '600'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2
  },
  cardTitle: {
    fontWeight: '700'
  },
  cardText: {
    marginTop: 6,
    color: '#616161'
  },
  cardStatus: {
    marginTop: 10,
    color: '#2e7d32',
    fontWeight: '600'
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#9e9e9e'
  }
});


