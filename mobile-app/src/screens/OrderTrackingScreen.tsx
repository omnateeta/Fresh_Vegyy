import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import Constants from 'expo-constants';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useSocket } from '../hooks/useSocket';
import { Order } from '../types';
import { theme } from '../utils/theme';
import { orderApi } from '../services/orderApi';

// Import MapView - Metro resolver will handle web platform automatically
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

type Route = RouteProp<RootStackParamList, 'OrderTracking'>;

export const OrderTrackingScreen = () => {
  const route = useRoute<Route>();
  const socket = useSocket();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    orderApi.subscribeToOrder(route.params.orderId, socket, (update) => {
      setOrder((prev) => ({ ...prev, ...update } as Order));
    });

    return () => {
      socket.removeAllListeners('order:update');
      socket.removeAllListeners('order:location');
    };
  }, [route.params.orderId, socket]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Order Tracking</Text>
      <Text style={styles.status}>Status: {order?.status ?? 'Pending confirmation'}</Text>
      <Text style={styles.eta}>ETA: {order?.deliveryEta ?? 'Calculating...'}</Text>
      {Platform.OS === 'web' ? (
        <View style={styles.map}>
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapPlaceholderText}>🗺️ Map View</Text>
            <Text style={styles.mapPlaceholderNote}>
              {order?.liveLocation 
                ? `Location: ${order.liveLocation.lat.toFixed(4)}, ${order.liveLocation.lng.toFixed(4)}`
                : 'Map view available on native platforms'}
            </Text>
          </View>
        </View>
      ) : MapView ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 28.6139,
            longitude: 77.209,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05
          }}
        >
          {order?.liveLocation && Marker && (
            <Marker
              coordinate={{
                latitude: order.liveLocation.lat,
                longitude: order.liveLocation.lng
              }}
              title="Delivery Partner"
            />
          )}
        </MapView>
      ) : (
        <View style={styles.map}>
          <Text>Map loading...</Text>
        </View>
      )}
      <Text style={styles.support}>Need help? Chat coming soon.</Text>
      <Text style={styles.note}>Powered by FreshVeggie Express Logistics.</Text>
      <Text style={styles.envNote}>Environment: {Constants.executionEnvironment}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing(2)
  },
  heading: {
    fontSize: 22,
    fontWeight: '700'
  },
  status: {
    marginTop: theme.spacing(1),
    fontWeight: '600'
  },
  eta: {
    marginBottom: theme.spacing(2),
    color: theme.colors.muted
  },
  map: {
    flex: 1,
    borderRadius: 16,
    marginBottom: theme.spacing(2),
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPlaceholder: {
    alignItems: 'center',
    padding: 20,
  },
  mapPlaceholderText: {
    fontSize: 24,
    marginBottom: 8,
  },
  mapPlaceholderNote: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  support: {
    textAlign: 'center',
    fontWeight: '600'
  },
  note: {
    textAlign: 'center',
    marginTop: theme.spacing(1),
    color: theme.colors.muted
  },
  envNote: {
    textAlign: 'center',
    marginTop: theme.spacing(1),
    fontSize: 12,
    color: theme.colors.muted
  }
});

