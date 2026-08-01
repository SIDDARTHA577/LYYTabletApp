import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FabricInspectionListScreen } from '../screens/fabricInspection/FabricInspectionListScreen';
import { FabricInspectionFormScreen } from '../screens/fabricInspection/FabricInspectionFormScreen';

const Stack = createNativeStackNavigator();

// The one implemented ModuleStack in Phase 1 — see docs/IMPLEMENTATION_PLAN.md
// §8: each future module gets its own two-screen stack (List → Form) wired
// into AppDrawer the same way this one is.
export function FabricInspectionStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FabricInspectionList" component={FabricInspectionListScreen} />
      <Stack.Screen name="FabricInspectionForm" component={FabricInspectionFormScreen} />
    </Stack.Navigator>
  );
}
