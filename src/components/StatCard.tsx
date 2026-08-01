import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export function StatCard({
  icon,
  label,
  value,
  color,
  onPress,
}: {
  icon: string;
  label: string;
  value: number | string;
  color: { fg: string; bg: string };
  onPress?: () => void;
}) {
  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          { opacity: pressed ? 0.8 : 1, transform: [{ scale: pressed ? 0.97 : 1 }] },
        ]}
        className="flex-grow basis-40 min-w-[150px] rounded-2xl bg-surface p-4 shadow-sm border border-border"
      >
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-caption font-medium text-textSecondary" numberOfLines={1}>
            {label}
          </Text>
          <View className="h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: color.bg }}>
            <MaterialCommunityIcons name={icon as any} size={16} color={color.fg} />
          </View>
        </View>
        <Text className="text-[40px] font-extrabold tracking-tighter" style={{ color: color.fg, fontVariant: ['tabular-nums'], lineHeight: 48 }}>
          {value}
        </Text>
      </Pressable>
    );
  }

  return (
    <View className="flex-grow basis-40 min-w-[150px] rounded-2xl bg-surface p-4 shadow-sm border border-border">
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-caption font-medium text-textSecondary" numberOfLines={1}>
          {label}
        </Text>
        <View className="h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: color.bg }}>
          <MaterialCommunityIcons name={icon as any} size={16} color={color.fg} />
        </View>
      </View>
      <Text className="text-[40px] font-extrabold tracking-tighter" style={{ color: color.fg, fontVariant: ['tabular-nums'], lineHeight: 48 }}>
        {value}
      </Text>
    </View>
  );
}
