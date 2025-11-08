import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { riderApi } from '../services/riderApi';
import { useRider } from '../store/RiderContext';

export const LoginScreen = () => {
  const { setRider } = useRider();
  const [phone, setPhone] = useState('9999999999');
  const [otp, setOtp] = useState('password');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const { user, token } = await riderApi.login({ phone, otp });
      setRider({ rider: { id: user.id, name: user.name, phone: user.phone, isOnline: false }, token });
    } catch (error) {
      Alert.alert('Login failed', (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rider Login</Text>
      <TextInput style={styles.input} placeholder="Phone" value={phone} onChangeText={setPhone} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={otp} onChangeText={setOtp} />
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Authenticating...' : 'Login'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f1f8e9'
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 24
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#c5e1a5'
  },
  button: {
    backgroundColor: '#2e7d32',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600'
  }
});


