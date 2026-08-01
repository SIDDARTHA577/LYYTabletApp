import React from 'react';
import { Text, View } from 'react-native';
import { Appbar, Badge } from 'react-native-paper';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useActivityStore } from '../features/activity/useActivityStore';
import { useNetworkStatus } from '../features/network/useNetworkStatus';
import { statusColors } from '../theme/paperTheme';
import tokens from '../theme/tokens';

export function AppHeader({
  title,
  subtitle,
  showMenu,
  showBack = false,
  showBell = false,
  showSyncDot = false,
  showBrandLogo = false,
  onBack,
  right,
}: {
  title: string;
  subtitle?: string;
  // Defaults to the opposite of showBack — a nested screen shows a back
  // arrow *instead of* the hamburger (standard Material pattern), not both.
  // Pass showMenu explicitly to override (e.g. force both on a wide layout).
  showMenu?: boolean;
  showBack?: boolean;
  showBell?: boolean;
  showSyncDot?: boolean;
  showBrandLogo?: boolean;
  onBack?: () => void;
  right?: React.ReactNode;
}) {
  const navigation = useNavigation<any>();
  const resolvedShowMenu = showMenu ?? !showBack;
  const unreadCount = useActivityStore((s) => s.unreadCount());
  const online = useNetworkStatus();

  return (
    <Appbar.Header
      style={{
        backgroundColor: tokens.color.surface,
        borderBottomWidth: 1,
        borderBottomColor: tokens.color.border,
        elevation: 0,
      }}
    >
      {showBack && <Appbar.BackAction onPress={onBack ?? (() => navigation.goBack())} />}
      {showBrandLogo && (
        <View
          style={{ backgroundColor: tokens.color.primary, borderRadius: tokens.radius.sm, paddingHorizontal: 8, paddingVertical: 4, marginLeft: 16, marginRight: 8 }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>LYY</Text>
        </View>
      )}
      {!showBrandLogo && resolvedShowMenu && <Appbar.Action icon="menu" onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />}
      <Appbar.Content title={title} subtitle={subtitle} />
      {showSyncDot && (
        <View style={{ width: 8, height: 8, borderRadius: 4, marginRight: 12, backgroundColor: online ? statusColors.pass : statusColors.reject }} />
      )}
      {showBell && (
        <View>
          <Appbar.Action icon="bell-outline" onPress={() => navigation.navigate('Notifications')} />
          {unreadCount > 0 && <Badge style={{ position: 'absolute', top: 6, right: 6 }}>{unreadCount}</Badge>}
        </View>
      )}
      {right}
    </Appbar.Header>
  );
}
