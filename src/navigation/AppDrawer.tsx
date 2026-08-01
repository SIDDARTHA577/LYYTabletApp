import React from 'react';
import { Text, View, useWindowDimensions } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { Avatar, Badge, IconButton, TouchableRipple } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';
import { DashboardScreen } from '../screens/dashboard/DashboardScreen';
import { ReportsScreen } from '../screens/reports/ReportsScreen';
import { NotificationsScreen } from '../screens/notifications/NotificationsScreen';
import { SettingsScreen } from '../screens/settings/SettingsScreen';
import { FabricInspectionStack } from './FabricInspectionStack';
import { DailyCheckStack } from './DailyCheckStack';
import { SpotCheckStack } from './SpotCheckStack';
import { FinalInspectionStack } from './FinalInspectionStack';
import { InlineInspectionStack } from './InlineInspectionStack';
import { FieldAuditorStack } from './FieldAuditorStack';
import { PpMeetingStack } from './PpMeetingStack';
import { INSPECTION_MODULES } from '../constants/modules';
import { useAuthStore } from '../auth/useAuthStore';
import { useAuth } from '../auth/AuthProvider';
import { useActivityStore } from '../features/activity/useActivityStore';
import { useFabricFormNavStore } from '../features/fabricInspection/useFabricFormNavStore';
import { useLanguage } from '../i18n/LanguageContext';
import { useDrawerStore } from '../features/ui/useDrawerStore';
import { useThemeStore } from '../features/theme/useThemeStore';
import tokens from '../theme/tokens';

const Drawer = createDrawerNavigator();

function NavItem({
  icon,
  label,
  active,
  disabled,
  onPress,
  badge,
  isCollapsed,
  complete,
}: {
  icon?: string;
  label: string;
  active?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  badge?: string | number;
  isCollapsed?: boolean;
  complete?: boolean;
}) {
  return (
    <TouchableRipple
      onPress={disabled ? undefined : onPress}
      style={{ marginHorizontal: 12, marginBottom: 2, borderRadius: tokens.radius.md, overflow: 'hidden' }}
    >
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            minHeight: 48,
            paddingVertical: 10,
            paddingHorizontal: 12,
            gap: 12,
            borderRadius: tokens.radius.md,
          },
          isCollapsed && { paddingHorizontal: 0, justifyContent: 'center' },
          active && { backgroundColor: tokens.color.primaryLight, borderLeftWidth: 3, borderLeftColor: tokens.color.primary, paddingLeft: 9 },
        ]}
      >
        {icon ? (
          <MaterialCommunityIcons
            name={icon as any}
            size={20}
            color={disabled ? tokens.color.textMuted : active ? tokens.color.primary : tokens.color.textSecondary}
          />
        ) : null}
        {!isCollapsed && (
          <>
            <Text
              numberOfLines={2}
              style={{
                flex: 1,
                fontSize: 14,
                color: disabled ? tokens.color.textMuted : active ? tokens.color.primary : tokens.color.textSecondary,
                fontWeight: active ? '700' : '500',
              }}
            >
              {label}
            </Text>
            {complete ? (
              <MaterialCommunityIcons name="check-circle" size={18} color={tokens.color.success} />
            ) : badge ? (
              <Badge style={{ backgroundColor: tokens.status.overdue.bg, color: tokens.status.overdue.fg, fontWeight: '600' }}>{badge}</Badge>
            ) : null}
          </>
        )}
      </View>
    </TouchableRipple>
  );
}

function CircularProgress({ percent }: { percent: number }) {
  const size = 32;
  const strokeWidth = 3;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - percent * circumference;

  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center', marginLeft: 8 }}>
      <Svg width={size} height={size}>
        {/* Track */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          fill="transparent"
          stroke={tokens.color.border}
          strokeWidth={strokeWidth}
        />
        {/* Progress */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          fill="transparent"
          stroke={tokens.color.primary}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${center}, ${center}`}
        />
      </Svg>
      <Text style={{ position: 'absolute', fontSize: 9, fontWeight: '700', color: tokens.color.primary }}>
        {Math.round(percent * 100)}%
      </Text>
    </View>
  );
}

function CustomDrawerContent(props: any) {
  const user = useAuthStore((s) => s.user);
  const isAssigned = useAuthStore((s) => s.isAssigned);
  const { signOut } = useAuth();
  const { t } = useLanguage();
  const unreadCount = useActivityStore((s) => s.unreadCount());
  const activeRoute = props.state.routeNames[props.state.index];

  const formActive = useFabricFormNavStore((s) => s.active);
  const formSections = useFabricFormNavStore((s) => s.sections);
  const formActiveSection = useFabricFormNavStore((s) => s.activeSection);
  const setFormActiveSection = useFabricFormNavStore((s) => s.setActiveSection);
  const completedSections = useFabricFormNavStore((s) => s.completedSections);

  const { isCollapsed, toggleCollapse } = useDrawerStore();
  // Not read directly — this is the persistent drawer chrome (always
  // mounted, unlike screens which remount/refocus on navigation), so it
  // needs its own subscription to re-render when tokens.color.* is mutated
  // by App.tsx's theme effect (see src/theme/tokens.js).
  useThemeStore((s) => s.preference);

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, backgroundColor: tokens.color.background }}>
      {/* Brand Header */}
      <View
        style={[
          { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 10 },
          isCollapsed && { justifyContent: 'center' },
        ]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcons name="hexagon-multiple" size={28} color={tokens.color.primary} />
          {!isCollapsed && <Text style={{ color: tokens.color.textPrimary, fontSize: 18, fontWeight: '800', marginLeft: 12, letterSpacing: -0.5 }}>LYY</Text>}
          {formActive && !isCollapsed && (
            <CircularProgress percent={formSections.length > 0 ? completedSections.length / formSections.length : 0} />
          )}
        </View>
        {!isCollapsed && (
          <IconButton icon="menu" iconColor={tokens.color.textSecondary} size={24} onPress={toggleCollapse} style={{ margin: 0 }} />
        )}
      </View>

      {/* If collapsed, maybe show toggle button directly */}
      {isCollapsed && (
        <View style={{ alignItems: 'center', marginVertical: 12 }}>
          <IconButton icon="menu" iconColor={tokens.color.textSecondary} size={24} onPress={toggleCollapse} style={{ margin: 0 }} />
        </View>
      )}

      {/* User Profile */}
      <View style={[{ paddingHorizontal: 16, marginTop: 10 }, isCollapsed && { paddingHorizontal: 8 }]}>
        {!isCollapsed && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: tokens.color.surface,
              borderWidth: 1,
              borderColor: tokens.color.border,
              borderRadius: tokens.radius.md,
              paddingHorizontal: 12,
              paddingVertical: 10,
            }}
          >
            <MaterialCommunityIcons name="magnify" size={20} color={tokens.color.textSecondary} />
            <Text style={{ color: tokens.color.textSecondary, marginLeft: 8, fontSize: 14 }}>Search...</Text>
          </View>
        )}
      </View>

      <View style={{ height: 16 }} />

      {formActive ? (
        <>
          {formSections.map((s, i) => (
            <NavItem
              key={s.key}
              icon={s.icon}
              label={s.title}
              active={s.key === formActiveSection}
              onPress={() => setFormActiveSection(s.key)}
              isCollapsed={isCollapsed}
              complete={completedSections.includes(s.key)}
            />
          ))}
        </>
      ) : (
        <>
          <NavItem
            icon="view-dashboard-outline"
            label={t('dashboard')}
            active={activeRoute === 'Dashboard'}
            onPress={() => props.navigation.navigate('Dashboard')}
            isCollapsed={isCollapsed}
          />

          {!isCollapsed && (
            <Text
              style={{
                paddingHorizontal: 20,
                marginTop: 12,
                marginBottom: 8,
                letterSpacing: 0.5,
                color: tokens.color.textSecondary,
                fontSize: 11,
                fontWeight: '700',
                textTransform: 'uppercase',
              }}
            >
              {t('inspectionModules')}
            </Text>
          )}

          {INSPECTION_MODULES.filter((m) => isAssigned(m.key)).map((m) =>
            m.implemented ? (
              <NavItem
                key={m.key}
                icon={m.icon}
                label={m.name} // Fix to use m.name instead of t('fabricInspection')
                active={activeRoute === (m.key === 'fabric_inspection' ? 'FabricInspectionStack' : m.key === 'daily_check' ? 'DailyCheckStack' : m.key === 'spot_check' ? 'SpotCheckStack' : m.key === 'final_inspection' ? 'FinalInspectionStack' : m.key === 'inline_inspection' ? 'InlineInspectionStack' : m.key === 'factory_check' ? 'FieldAuditorStack' : m.key === 'pp_meeting' ? 'PpMeetingStack' : `${m.name.replace(/\s+/g, '')}Stack`)}
                onPress={() => props.navigation.navigate(m.key === 'fabric_inspection' ? 'FabricInspectionStack' : m.key === 'daily_check' ? 'DailyCheckStack' : m.key === 'spot_check' ? 'SpotCheckStack' : m.key === 'final_inspection' ? 'FinalInspectionStack' : m.key === 'inline_inspection' ? 'InlineInspectionStack' : m.key === 'factory_check' ? 'FieldAuditorStack' : m.key === 'pp_meeting' ? 'PpMeetingStack' : `${m.name.replace(/\s+/g, '')}Stack`)}
                isCollapsed={isCollapsed}
              />
            ) : (
              <NavItem key={m.key} icon={m.icon} label={m.name} disabled badge={t('comingSoon')} isCollapsed={isCollapsed} />
            )
          )}

          <View style={{ height: 16 }} />
          <NavItem icon="chart-box-outline" label={t('reports')} active={activeRoute === 'Reports'} onPress={() => props.navigation.navigate('Reports')} isCollapsed={isCollapsed} />
          <NavItem
            icon="bell-outline"
            label={t('notifications')}
            active={activeRoute === 'Notifications'}
            onPress={() => props.navigation.navigate('Notifications')}
            badge={unreadCount > 0 ? unreadCount : undefined}
            isCollapsed={isCollapsed}
          />
          <NavItem icon="cog-outline" label={t('settings')} active={activeRoute === 'Settings'} onPress={() => props.navigation.navigate('Settings')} isCollapsed={isCollapsed} />
        </>
      )}

      <View style={{ flex: 1 }} />

      {/* Bottom User Area */}
      <View
        style={[
          { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: tokens.color.background, borderTopWidth: 1, borderTopColor: tokens.color.border },
          isCollapsed && { flexDirection: 'column', paddingHorizontal: 8, paddingVertical: 16, gap: 16 },
        ]}
      >
        <Avatar.Text size={isCollapsed ? 36 : 40} label={(user?.name ?? 'IN').slice(0, 2).toUpperCase()} style={{ backgroundColor: tokens.color.primary }} color="#FFFFFF" />
        {!isCollapsed && (
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={{ color: tokens.color.textPrimary, fontSize: 14, fontWeight: '600' }} numberOfLines={1}>
              {user?.name ?? 'Inspector'}
            </Text>
            <Text style={{ color: tokens.color.textSecondary, fontSize: 12 }} numberOfLines={1}>
              {user?.employeeId ?? 'Web Designer'}
            </Text>
          </View>
        )}
        <IconButton icon="logout" iconColor={tokens.color.textPrimary} size={20} onPress={signOut} style={{ margin: 0 }} />
      </View>
    </DrawerContentScrollView>
  );
}

export function AppDrawer() {
  const { width } = useWindowDimensions();
  const isWide = width >= 768;
  const isCollapsed = useDrawerStore((s) => s.isCollapsed);
  const formActive = useFabricFormNavStore((s) => s.active);
  // Forces this component (and the drawerStyle/sceneContainerStyle values
  // below, which read tokens.color directly rather than a className) to
  // re-render when the theme toggles — see the matching note on
  // CustomDrawerContent above.
  useThemeStore((s) => s.preference);

  const drawerWidth = isWide ? (isCollapsed ? 80 : 260) : Math.min(300, width * 0.8);

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: isWide ? 'permanent' : 'front',
        // Every screen's container defaults to React Navigation's own
        // (light-only) theme background otherwise — this is what made
        // screens with sparser layouts (Reports, Notifications) show a
        // wrong-colored background behind their cards in dark mode.
        sceneContainerStyle: { backgroundColor: tokens.color.background },
        drawerStyle: {
          backgroundColor: tokens.color.background,
          borderRightWidth: 1,
          borderRightColor: tokens.color.border,
          width: formActive ? drawerWidth : 0,
          overflow: 'hidden',
        },
        swipeEnabled: formActive,
        overlayColor: isWide ? 'transparent' : 'rgba(15,23,42,0.4)',
      }}
    >
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="FabricInspectionStack" component={FabricInspectionStack} />
      <Drawer.Screen name="DailyCheckStack" component={DailyCheckStack} />
      <Drawer.Screen name="SpotCheckStack" component={SpotCheckStack} />
      <Drawer.Screen name="FinalInspectionStack" component={FinalInspectionStack} />
      <Drawer.Screen name="InlineInspectionStack" component={InlineInspectionStack} />
      <Drawer.Screen name="FieldAuditorStack" component={FieldAuditorStack} />
      <Drawer.Screen name="PpMeetingStack" component={PpMeetingStack} />
      <Drawer.Screen name="Reports" component={ReportsScreen} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}
