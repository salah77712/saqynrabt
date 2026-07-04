import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { colors, typography, spacing } from '../constants/theme';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
}

export function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'assistant', text: 'Hello! I am your RAG-powered Staff Assistant. How can I help you today?' },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Simulate RAG Streaming reply
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: 'This is a simulated RAG response. Under production, this streams verified knowledge base segments.',
      };
      setMessages((prev) => [...prev, reply]);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>RAG Assistant</Text>
        <Text style={styles.headerSubtitle}>Verified Knowledge Base</Text>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={[styles.bubble, item.sender === 'user' ? styles.userBubble : styles.assistantBubble]}>
            <Text style={[styles.messageText, item.sender === 'user' ? styles.userText : styles.assistantText]}>
              {item.text}
            </Text>
          </View>
        )}
      />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={input}
            onChangeText={setInput}
            placeholder="Type your question..."
            placeholderTextColor={colors.textSecondary}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold as any,
    color: colors.navy,
  },
  headerSubtitle: {
    fontSize: typography.sizes.xs,
    color: colors.success,
    fontWeight: typography.weights.semibold as any,
    marginTop: 2,
  },
  list: {
    padding: spacing.md,
  },
  bubble: {
    padding: spacing.md,
    borderRadius: 16,
    marginBottom: spacing.sm,
    maxWidth: '80%',
  },
  userBubble: {
    backgroundColor: colors.navy,
    alignSelf: 'flex-end',
    borderBottomRightRadius: 2,
  },
  assistantBubble: {
    backgroundColor: colors.white,
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  messageText: {
    fontSize: typography.sizes.base,
  },
  userText: {
    color: colors.white,
  },
  assistantText: {
    color: colors.textPrimary,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: spacing.md,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  textInput: {
    flex: 1,
    height: 44,
    backgroundColor: colors.lightGray,
    borderRadius: 22,
    paddingHorizontal: spacing.md,
    fontSize: typography.sizes.base,
    color: colors.textPrimary,
  },
  sendButton: {
    marginLeft: spacing.sm,
    backgroundColor: colors.royal,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    borderRadius: 22,
    height: 44,
  },
  sendButtonText: {
    color: colors.white,
    fontWeight: typography.weights.bold as any,
    fontSize: typography.sizes.sm,
  },
});
