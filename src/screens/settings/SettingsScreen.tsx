import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Button, SegmentedButtons, Switch, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppHeader } from '../../components/AppHeader';
import { SectionCard } from '../../components/SectionCard';
import { BottomNavBar } from '../../components/BottomNavBar';
import { useAuthStore } from '../../auth/useAuthStore';
import { useAuth } from '../../auth/AuthProvider';
import { useLanguage } from '../../i18n/LanguageContext';
import { useNetworkStatus } from '../../features/network/useNetworkStatus';
import { statusColors } from '../../theme/paperTheme';

const NOTIF_PREF_KEY = 'lyy.notificationsEnabled';

export function SettingsScreen() {
  const user = useAuthStore((s) => s.user);
  const { signOut } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const online = useNetworkStatus();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(NOTIF_PREF_KEY).then((v) => {
      if (v !== null) setNotificationsEnabled(v === 'true');
    });
  }, []);

  const toggleNotifications = (value: boolean) => {
    setNotificationsEnabled(value);
    AsyncStorage.setItem(NOTIF_PREF_KEY, String(value)).catch(() => undefined);
  };

  return (
    <View style={{ flex: 1 }}>
      <AppHeader title={t('settings')} showBack />
      <ScrollView contentContainerStyle={styles.content}>
        <SectionCard>
          <View style={styles.profileRow}>
            <Avatar.Text size={56} label={(user?.name ?? 'IN').slice(0, 2).toUpperCase()} />
            <View style={{ marginLeft: 16, flex: 1 }}>
              <Text variant="titleMedium">{user?.name}</Text>
              <Text variant="bodySmall" style={styles.muted}>
                {user?.email}
              </Text>
              <Text variant="bodySmall" style={styles.muted}>
                {user?.employeeId} · {user?.role}
              </Text>
            </View>
          </View>
        </SectionCard>

        <SectionCard title={t('language')}>
          <SegmentedButtons
            value={language}
            onValueChange={(v) => setLanguage(v as 'en' | 'zh')}
            buttons={[
              { value: 'en', label: t('english') },
              { value: 'zh', label: t('chinese') },
            ]}
          />
        </SectionCard>

        <SectionCard title={t('notificationPrefs')}>
          <View style={styles.switchRow}>
            <Text variant="bodyMedium">{t('enablePushNotifications')}</Text>
            <Switch value={notificationsEnabled} onValueChange={toggleNotifications} />
          </View>
        </SectionCard>

        <SectionCard title={t('syncStatus')}>
          <View style={styles.syncRow}>
            <View style={[styles.dot, { backgroundColor: online ? statusColors.pass : statusColors.reject }]} />
            <Text variant="bodyMedium" style={{ fontWeight: '600' }}>
              {online ? t('online') : t('offline')}
            </Text>
          </View>
          <View style={styles.syncRow}>
            <MaterialCommunityIcons name="check-circle-outline" size={16} color="#8B93AC" />
            <Text variant="bodySmall" style={styles.muted}>
              {t('allChangesSaved')}
            </Text>
          </View>
        </SectionCard>

        <SectionCard title={t('about')}>
          <Text variant="bodySmall" style={styles.muted}>
            {t('appVersion')}: 1.0.0 (Fabric Inspection)
          </Text>
        </SectionCard>

        <Button mode="outlined" onPress={signOut} style={styles.logout} icon="logout">
          {t('logOut')}
        </Button>
      </ScrollView>
      <BottomNavBar active="settings" />
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: 24, paddingBottom: 120 },
  profileRow: { flexDirection: 'row', alignItems: 'center' },
  muted: { opacity: 0.6, marginTop: 2 },
  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  syncRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  logout: { marginTop: 4, marginBottom: 24, alignSelf: 'flex-start', borderRadius: 10 },
});
