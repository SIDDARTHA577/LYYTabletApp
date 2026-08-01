import React from 'react';
import { Pressable, ScrollView, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import tokens from '../theme/tokens';

export interface RailSection {
  key: string;
  title: string;
  icon?: string;
  complete?: boolean;
}

// Section jump rail for the form layout — one item per FormSchema section,
// matching the shape used across all inspection modules (see
// docs/IMPLEMENTATION_PLAN.md §18). Renders as a left-hand vertical rail on
// wide/tablet-landscape layouts and as a horizontal scrollable strip below
// that breakpoint (see FabricInspectionFormScreen's useWindowDimensions
// check) — a fixed 220dp sidebar next to two-column form fields doesn't
// leave enough room to be usable on a narrower viewport.
export function SectionProgressRail({
  sections,
  activeKey,
  onSelect,
  horizontal = false,
}: {
  sections: RailSection[];
  activeKey: string;
  onSelect: (key: string) => void;
  horizontal?: boolean;
}) {
  const theme = useTheme();

  return (
    <ScrollView
      horizontal={horizontal}
      showsHorizontalScrollIndicator={false}
      style={
        horizontal
          ? { flexGrow: 0, borderBottomWidth: 1, borderBottomColor: tokens.color.border, backgroundColor: tokens.color.background }
          : { width: 220, borderRightWidth: 1, borderRightColor: tokens.color.border }
      }
      contentContainerStyle={
        horizontal ? { flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 8, gap: 4 } : { paddingVertical: 8 }
      }
    >
      {sections.map((section) => {
        const active = section.key === activeKey;
        return (
          <Pressable
            key={section.key}
            onPress={() => onSelect(section.key)}
            style={[
              horizontal
                ? { flexDirection: 'row', alignItems: 'center', gap: 8, minHeight: 44, paddingVertical: 8, paddingHorizontal: 14, borderRadius: tokens.radius.pill }
                : { flexDirection: 'row', alignItems: 'center', gap: 10, minHeight: 48, paddingVertical: 10, paddingHorizontal: 14, borderRadius: tokens.radius.md, marginHorizontal: 6, marginVertical: 2 },
              active && { backgroundColor: tokens.color.primaryLight },
            ]}
          >
            {section.complete ? (
              <MaterialCommunityIcons name="check-circle" size={18} color={tokens.color.success} />
            ) : section.icon ? (
              <MaterialCommunityIcons name={section.icon as any} size={18} color={active ? tokens.color.primary : tokens.color.textSecondary} />
            ) : null}
            <Text
              numberOfLines={horizontal ? 1 : 2}
              style={[
                { flex: horizontal ? 0 : 1, fontSize: 13, color: tokens.color.textSecondary },
                active && { color: tokens.color.primary, fontWeight: '700' },
              ]}
            >
              {section.title}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
