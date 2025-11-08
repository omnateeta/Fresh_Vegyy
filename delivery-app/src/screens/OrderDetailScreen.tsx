import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { RootStackParamList } from '../navigation/RootNavigator';
import { DeliveryOrder } from '../types';
import { orderApi } from '../services/orderApi';

type Route = RouteProp<RootStackParamList, 'OrderDetail'>;

export const OrderDetailScreen = () => {
  const route = useRoute<Route>();
  const navigation = useNavigation();
  const [order, setOrder] = useState<DeliveryOrder | null>(null);

  useEffect(() => {
    const load = async () => {
      const orders = await orderApi.listForRider();
      setOrder(orders.find((item) => item.id === route.params.orderId) ?? null);
    };
    void load();
  }, [route.params.orderId]);

  const updateStatus = async (status: 'enroute' | 'delivered') => {
    try {
      await orderApi.updateStatus(route.params.orderId, status);
      Alert.alert('Success', `Order marked as ${status}`);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  if (!order) {
    return (
      <View style={styles.loading}>
        <Text>Loading order...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: order.lat ?? 28.6139,
          longitude: order.lng ?? 77.209,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05
        }}
      >
        {order.lat && order.lng && (
          <Marker coordinate={{ latitude: order.lat, longitude: order.lng }} title="Drop-off" />
        )}
      </MapView>
      <View style={styles.sheet}>
        <Text style={styles.title}>Order #{order.id.slice(-6)}</Text>
        <Text style={styles.address}>{order.address}</Text>
        <Text style={styles.status}>Status: {order.status}</Text>
        <TouchableOpacity style={styles.primary} onPress={() => updateStatus('enroute')}>
          <Text style={styles.primaryText}>Start Delivery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondary} onPress={() => updateStatus('delivered')}>
          <Text style={styles.secondaryText}>Mark Delivered</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  map: {
    flex: 1
  },
  sheet: {
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 20,
    fontWeight: '700'
  },
  address: {
    marginTop: 8,
    color: '#616161'
  },
  status: {
    marginTop: 12,
    fontWeight: '600'
  },
  primary: {
    backgroundColor: '#2e7d32',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20
  },
  primaryText: {
    color: '#fff',
    fontWeight: '600'
  },
  secondary: {
    borderColor: '#2e7d32',
    borderWidth: 2,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12
  },
  secondaryText: {
    color: '#2e7d32',
    fontWeight: '600'
  }
});


