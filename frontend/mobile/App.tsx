import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ClerkProvider, SignedIn, SignedOut, useOAuth, useAuth } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import { ChatScreen } from './src/screens/ChatScreen';
import { AutomationScreen } from './src/screens/AutomationScreen';
import { DocumentsScreen } from './src/screens/DocumentsScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from './src/constants/theme';
import { setToken } from './src/lib/api';

const Tab = createBottomTabNavigator();
const CLERK_PUBLISHABLE_KEY = "pk_test_Z3VpZGluZy1jdWItMTcuY2xlcmsuYWNjb3VudHMuZGV2JA";

const tokenCache = {
  getToken: async (key: string) => SecureStore.getItemAsync(key),
  saveToken: async (key: string, value: string) => SecureStore.setItemAsync(key, value),
  deleteToken: async (key: string) => SecureStore.deleteItemAsync(key),
};

function SignInScreen() {
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
  const { getToken } = useAuth();

  const handleSignIn = async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        const jwt = await getToken();
        if (jwt) await setToken(jwt);
      }
    } catch (err: any) {
      console.error('OAuth sign-in failed:', err);
    }
  };

  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>SAQYN RABT</Text>
      <Text style={styles.subtitle}>Enterprise AI Portal</Text>
      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text style={styles.signInButtonText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
}

function AppContent() {
  const { getToken } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const jwt = await getToken();
        if (jwt) await setToken(jwt);
      } catch {}
    })();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <SignedIn>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: colors.royal,
            tabBarInactiveTintColor: colors.textSecondary,
            headerShown: false,
            tabBarStyle: {
              backgroundColor: colors.white,
              borderTopWidth: 1,
              borderTopColor: colors.border,
              height: 60,
              paddingBottom: 8,
            },
          }}
        >
          <Tab.Screen name="Chat" component={ChatScreen} />
          <Tab.Screen name="Automation" component={AutomationScreen} />
          <Tab.Screen name="Documents" component={DocumentsScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </SignedIn>

      <SignedOut>
        <SignInScreen />
      </SignedOut>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
      <AppContent />
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  authContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.navy,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 8,
    marginBottom: 40,
  },
  signInButton: {
    backgroundColor: colors.navy,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  signInButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
