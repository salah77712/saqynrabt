import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { colors, typography, spacing } from '../constants/theme';
import * as DocumentPicker from 'expo-document-picker';

interface Document {
  id: string;
  name: string;
  size: string;
  status: 'indexed' | 'pending';
}

export function DocumentsScreen() {
  const [docs, setDocs] = useState<Document[]>([
    { id: '1', name: 'hotel_sop_v2.pdf', size: '2.4 MB', status: 'indexed' },
    { id: '2', name: 'hr_policy_qatar.pdf', size: '1.8 MB', status: 'indexed' },
  ]);

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        const newDoc: Document = {
          id: Date.now().toString(),
          name: file.name,
          size: file.size ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : 'Unknown size',
          status: 'pending',
        };
        setDocs((prev) => [newDoc, ...prev]);
        Alert.alert('Upload Initiated', `${file.name} is now parsing.`);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Knowledge Base</Text>
      </View>
      <FlatList
        data={docs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.docInfo}>
              <Text style={styles.docName}>{item.name}</Text>
              <Text style={styles.docSize}>{item.size}</Text>
            </View>
            <View style={[styles.badge, item.status === 'indexed' ? styles.badgeIndexed : styles.badgePending]}>
              <Text style={styles.badgeText}>{item.status.toUpperCase()}</Text>
            </View>
          </View>
        )}
      />
      <TouchableOpacity style={styles.uploadButton} onPress={handlePickDocument}>
        <Text style={styles.uploadButtonText}>Upload PDF Document</Text>
      </TouchableOpacity>
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
  list: {
    padding: spacing.md,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  docInfo: {
    flex: 1,
    marginRight: spacing.md,
  },
  docName: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold as any,
    color: colors.navy,
  },
  docSize: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: typography.weights.bold as any,
    color: colors.white,
  },
  badgeIndexed: {
    backgroundColor: colors.success,
  },
  badgePending: {
    backgroundColor: colors.royal,
  },
  uploadButton: {
    margin: spacing.md,
    backgroundColor: colors.navy,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadButtonText: {
    color: colors.white,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold as any,
  },
});
