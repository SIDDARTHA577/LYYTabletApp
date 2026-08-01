import React from 'react';
import { Pressable, Text, View, Animated } from 'react-native';
import { useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import tokens from '../theme/tokens';

export type BottomNavKey = 'home' | 'inspections' | 'reports' | 'settings';

const ITEMS: Array<{ key: BottomNavKey; label: string; activeIcon: string; inactiveIcon: string; route: string }> = [
  { key: 'home', label: 'Home', activeIcon: 'view-dashboard', inactiveIcon: 'view-dashboard-outline', route: 'Dashboard' },
  { key: 'inspections', label: 'Inspections', activeIcon: 'clipboard-text', inactiveIcon: 'clipboard-text-outline', route: 'FabricInspectionStack' },
  { key: 'reports', label: 'Reports', activeIcon: 'chart-box', inactiveIcon: 'chart-box-outline', route: 'Reports' },
  { key: 'settings', label: 'Settings', activeIcon: 'cog', inactiveIcon: 'cog-outline', route: 'Settings' },
];

// Quick-access footer bar, shown on the app's primary (drawer-root) screens
// alongside the side drawer — common in tablet enterprise apps as a
// thumb-reachable shortcut to the four most-used destinations. Not shown on
// deep/focused screens (e.g. the inspection form) where vertical space is
// precious and the header already carries the primary actions.
export function BottomNavBar({ active }: { active?: BottomNavKey }) {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const activeIndex = Math.max(0, ITEMS.findIndex(i => i.key === active));
  
  const [containerWidth, setContainerWidth] = React.useState(0);
  const slideAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (containerWidth > 0) {
      Animated.spring(slideAnim, {
        toValue: activeIndex * (containerWidth / ITEMS.length),
        useNativeDriver: true,
        bounciness: 4,
        speed: 12
      }).start();
    }
  }, [activeIndex, containerWidth]);

  return (
    <View className="absolute bottom-0 left-0 right-0 border-t border-border bg-surface pb-6 pt-2" style={{ pointerEvents: 'box-none' }}>
      <View 
        onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
        className="flex-row items-center w-full px-2"
      >
        {containerWidth > 0 && (
          <Animated.View
            style={{
              position: 'absolute',
              left: 8,
              top: 0,
              bottom: 0,
              width: (containerWidth - 16) / ITEMS.length,
              backgroundColor: tokens.color.primaryLight,
              borderRadius: 16,
              transform: [{ translateX: slideAnim }]
            }}
          />
        )}
        
        {ITEMS.map((item) => {
          const isActive = item.key === active;
          return (
            <Pressable 
              key={item.key} 
              onPress={() => navigation.navigate(item.route)} 
              className="flex-1 items-center justify-center py-2"
            >
              <MaterialCommunityIcons 
                name={(isActive ? item.activeIcon : item.inactiveIcon) as any} 
                size={26} 
                color={isActive ? theme.colors.primary : tokens.color.textSecondary} 
              />
              <Text className="text-[12px] mt-1 tracking-tight" style={isActive ? { color: theme.colors.primary, fontWeight: '800' } : { color: tokens.color.textSecondary, fontWeight: '500' }}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
