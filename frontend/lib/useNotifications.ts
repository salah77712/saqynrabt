'use client';

import { useState, useCallback } from 'react';

export interface NotificationItem {
  id: string;
  title: string;
  read: boolean;
  time: string;
}

export function useNotifications(initialList: NotificationItem[] = []) {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialList);

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: true } : item))
    );
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const addNotification = useCallback((title: string) => {
    const newItem: NotificationItem = {
      id: Date.now().toString(),
      title,
      read: false,
      time: '1m ago',
    };
    setNotifications((prev) => [newItem, ...prev]);
  }, []);

  return { notifications, markAsRead, clearAll, addNotification };
}
