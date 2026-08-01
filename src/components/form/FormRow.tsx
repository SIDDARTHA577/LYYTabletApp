import React from 'react';
import { View } from 'react-native';

// Wraps a set of FieldShell children in a responsive flex-wrap row so
// section components can lay fields out like the source templates' tables
// without hand-tuning columns per section.
export function FormRow({ children }: { children: React.ReactNode }) {
  return <View className="-mx-1.5 flex-row flex-wrap">{children}</View>;
}
