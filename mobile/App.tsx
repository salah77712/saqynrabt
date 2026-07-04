import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import { ChatScreen } from './src/screens/ChatScreen';
import { AutomationScreen } from './src/screens/AutomationScreen';
import { DocumentsScreen } from './src/screens/DocumentsScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from './src/constants/theme';

const Tab = createBottomTabNavigator();
const CLERK_PUBLISHABLE_KEY = "pk_test_Z3VpZGluZy1jdWItMTcuY2xlcmsuYWNjb3VudHMuZGV2JA";

export default function App() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
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
          <View style={styles.authContainer}>
            <Text style={styles.title}>SAQYN RABT</Text>
            <Text style={styles.subtitle}>Enterprises AI Portal</Text>
            <Text style={styles.info}>Please log in to the web platform to complete authentication sync.</Text>
          </View>
        </SignedOut>
      </NavigationContainer>
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
  info: {
    textAlign: 'center',
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
