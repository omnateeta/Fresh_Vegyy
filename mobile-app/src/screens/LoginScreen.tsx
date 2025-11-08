import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../store/useAuth';
import { theme } from '../utils/theme';

export const LoginScreen = () => {
  const { login } = useAuth();
  const [emailOrPhone, setEmailOrPhone] = useState('demo@fresh.veggie');
  const [password, setPassword] = useState('password');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login({ emailOrPhone, password });
    } catch (error) {
      Alert.alert('Login failed', (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to FreshVeggie</Text>
      <TextInput
        style={styles.input}
        placeholder="Email or Phone"
        value={emailOrPhone}
        onChangeText={setEmailOrPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Login'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: theme.spacing(3),
    backgroundColor: theme.colors.background
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: theme.spacing(4)
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
});


