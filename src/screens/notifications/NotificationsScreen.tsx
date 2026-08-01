import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { AppHeader } from '../../components/AppHeader';
import { ActivityListItem } from '../../components/ActivityListItem';
import { EmptyState } from '../../components/EmptyState';
import { BottomNavBar } from '../../components/BottomNavBar';
import { useActivityStore } from '../../features/activity/useActivityStore';
import { useLanguage } from '../../i18n/LanguageContext';

export function NotificationsScreen() {
  const { t } = useLanguage();
  const entries = useActivityStore((s) => s.entries);
  const markAllRead = useActivityStore((s) => s.markAllRead);
  const clearAll = useActivityStore((s) => s.clearAll);
  const hasUnread = entries.some((e) => !e.read);

  // Opening the screen is itself the "read" action, matching standard
  // notification-center behavior.
  useEffect(() => {
    if (hasUnread) markAllRead();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <AppHeader
        title={t('notifications')}
        showBack
        right={
          entries.length > 0 ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Button compact mode="text" onPress={markAllRead} style={{ marginRight: 8 }}>
                {t('markAllRead')}
              </Button>
              <Button compact mode="text" onPress={clearAll} style={{ marginRight: 8 }} textColor="#FF3B30">
                Clear All
              </Button>
            </View>
          ) : undefined
        }
      />
      <FlatList
        data={entries}
        keyExtractor={(e) => e.id}
        contentContainerStyle={entries.length === 0 ? { flex: 1 } : styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => <ActivityListItem entry={item} />}
        ListEmptyComponent={
          <EmptyState icon="bell-outline" title={t('noNotifications')} description={t('noNotificationsBody')} />
        }
      />
      <BottomNavBar active="home" />
    </View>
  );
}

const styles = StyleSheet.create({
  list: { padding: 20, paddingBottom: 96 },
  separator: { height: 1, backgroundColor: '#EEF1F8' },
});
