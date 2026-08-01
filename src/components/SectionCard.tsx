import React from 'react';
import { Text, View } from 'react-native';

export function SectionCard({
  title,
  subtitle,
  right,
  children,
  style,
}: {
  title?: string;
  subtitle?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
  style?: any;
}) {
  return (
    <View className="mb-6 rounded-2xl bg-surface p-6 shadow-card border border-border" style={style}>
      {(title || right) && (
        <View className="mb-4 flex-row items-center">
          <View className="flex-1">
            {title ? <Text className="text-cardTitle font-semibold tracking-tight text-textPrimary">{title}</Text> : null}
            {subtitle ? <Text className="mt-1 text-label text-textSecondary">{subtitle}</Text> : null}
          </View>
          {right}
        </View>
      )}
      {children}
    </View>
  );
}
