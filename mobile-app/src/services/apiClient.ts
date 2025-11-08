import Constants from 'expo-constants';
import axios from 'axios';
import { useAuth } from '../store/useAuth';

const baseURL = Constants.expoConfig?.extra?.apiBaseUrl || 'http://localhost:4000/api';

export const apiClient = axios.create({
  baseURL
});

apiClient.interceptors.request.use((config) => {
  const token = useAuth.getState().token;
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`
    };
  }
  return config;
});


