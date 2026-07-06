import * as SecureStore from 'expo-secure-store';

const API_URL = 'https://api.saqynrabt.com';

async function getToken(): Promise<string | null> {
  return SecureStore.getItemAsync('saqyn-auth-token');
}

export async function setToken(token: string | null): Promise<void> {
  if (token) {
    await SecureStore.setItemAsync('saqyn-auth-token', token);
  } else {
    await SecureStore.deleteItemAsync('saqyn-auth-token');
  }
}

export async function getStoredToken(): Promise<string | null> {
  return SecureStore.getItemAsync('saqyn-auth-token');
}

export async function request(path: string, options: RequestInit = {}) {
  const token = await getToken();
  const headers = new Headers(options.headers);
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.message || `API request failed with status ${response.status}`);
  }

  const contentType = response.headers.get('Content-Type') || '';
  if (contentType.includes('application/json')) {
    return response.json();
  }
  return response;
}
