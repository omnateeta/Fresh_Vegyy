import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../utils/theme';
import { DELIVERY_PROMISE_MINUTES } from '../constants';

export const SeasonalBanner = () => (
  <View style={styles.container}>
    <Text style={styles.title}>10-Minute Delivery Guaranteed</Text>
    <Text style={styles.subtitle}>Seasonal leafy greens picked this morning.</Text>
    <Text style={styles.badge}>{DELIVERY_PROMISE_MINUTES} MIN</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    borderRadius: 18,
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2)
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700'
  },
  subtitle: {
    color: '#fff',
    marginTop: 8
  },
  badge: {
    marginTop: theme.spacing(2),
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    color: theme.colors.primary,
    fontWeight: '700',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12
  }
});


