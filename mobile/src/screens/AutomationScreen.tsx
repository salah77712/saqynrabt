import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { colors, typography, spacing } from '../constants/theme';

interface Task {
  id: string;
  room: string;
  type: string;
  status: 'pending' | 'assigned' | 'completed';
  time: string;
}

export function AutomationScreen() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', room: 'Room 204', type: 'Late checkout request', status: 'pending', time: '10 mins ago' },
    { id: '2', room: 'Room 102', type: 'Fresh towels dispatch', status: 'assigned', time: '15 mins ago' },
    { id: '3', room: 'Room 305', type: 'Room service query', status: 'completed', time: '1 hour ago' },
  ]);

  const updateStatus = (id: string, newStatus: Task['status']) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  };

  const getStatusStyle = (status: Task['status']) => {
    switch (status) {
      case 'pending': return styles.statusPending;
      case 'assigned': return styles.statusAssigned;
      case 'completed': return styles.statusCompleted;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Live Guest Queue</Text>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.roomText}>{item.room}</Text>
              <Text style={styles.timeText}>{item.time}</Text>
            </View>
            <Text style={styles.typeText}>{item.type}</Text>

            <View style={styles.actionRow}>
              <View style={[styles.badge, getStatusStyle(item.status)]}>
                <Text style={styles.badgeText}>{item.status.toUpperCase()}</Text>
              </View>

              {item.status !== 'completed' && (
                <View style={styles.buttonGroup}>
                  {item.status === 'pending' && (
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => updateStatus(item.id, 'assigned')}
                    >
                      <Text style={styles.buttonText}>Assign</Text>
                    </TouchableOpacity>
                  )}
                  {item.status === 'assigned' && (
                    <TouchableOpacity
                      style={[styles.actionButton, styles.completeButton]}
                      onPress={() => updateStatus(item.id, 'completed')}
                    >
                      <Text style={styles.buttonText}>Complete</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          </View>
        )}
      />
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
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  roomText: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold as any,
    color: colors.navy,
  },
  timeText: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
  },
  typeText: {
    fontSize: typography.sizes.sm,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  statusPending: {
    backgroundColor: colors.error,
  },
  statusAssigned: {
    backgroundColor: colors.royal,
  },
  statusCompleted: {
    backgroundColor: colors.success,
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  actionButton: {
    backgroundColor: colors.navy,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    minHeight: 36,
    justifyContent: 'center',
  },
  completeButton: {
    backgroundColor: colors.success,
  },
  buttonText: {
    color: colors.white,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold as any,
  },
});
