import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import tokens from '../theme/tokens';

export function EmptyState({
  icon = 'clipboard-text-outline',
  title,
  description,
  actionLabel,
  onAction,
}: {
  icon?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <View className="flex-1 items-center justify-center p-8">
      <MaterialCommunityIcons name={icon as any} size={48} color={tokens.color.textMuted} />
      <Text variant="titleMedium" style={{ marginTop: 12, color: tokens.color.textPrimary }}>
        {title}
      </Text>
      {description ? (
        <Text variant="bodyMedium" style={{ marginTop: 4, color: tokens.color.textSecondary, textAlign: 'center' }}>
          {description}
        </Text>
      ) : null}
      {actionLabel && onAction ? (
        <Button mode="contained" onPress={onAction} style={{ marginTop: 16, borderRadius: tokens.radius.md }}>
          {actionLabel}
        </Button>
      ) : null}
    </View>
  );
}
