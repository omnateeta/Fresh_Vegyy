import axios from 'axios';
import Constants from 'expo-constants';

const baseURL = Constants.expoConfig?.extra?.apiBaseUrl || 'http://localhost:4000/api';

let authToken: string | undefined;

export const setAuthToken = (token?: string) => {
  authToken = token;
};

export const apiClient = axios.create({ baseURL });

apiClient.interceptors.request.use((config) => {
  if (authToken) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${authToken}`
    };
  }
  return config;
});

