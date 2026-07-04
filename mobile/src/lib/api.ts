import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://api.saqynrabt.com';

export async function request(path: string, options: RequestInit = {}) {
  const token = await AsyncStorage.getItem('saqyn-auth-token');
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API request failed with status ${response.status}`);
  }

  return response.json();
}
