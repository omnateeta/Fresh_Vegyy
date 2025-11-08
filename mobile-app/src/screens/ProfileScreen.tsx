import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../store/useAuth';
import { theme } from '../utils/theme';

export const ProfileScreen = () => {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.name}>{user?.name ?? 'Guest'}</Text>
        <Text style={styles.meta}>{user?.email ?? user?.phone}</Text>
        <Text style={styles.meta}>FreshVeggie Plus Member</Text>
      </View>
      <TouchableOpacity style={styles.logout} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
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
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: theme.spacing(3),
    alignItems: 'center'
  },
  name: {
    fontSize: 22,
    fontWeight: '700'
  },
  meta: {
    color: theme.colors.muted,
    marginTop: 6
  },
  logout: {
    marginTop: theme.spacing(4),
    backgroundColor: '#f44336',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center'
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600'
  }
});


