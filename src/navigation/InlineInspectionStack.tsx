import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { InlineInspectionListScreen } from '../screens/inlineInspection/InlineInspectionListScreen';
import { InlineInspectionFormScreen } from '../screens/inlineInspection/InlineInspectionFormScreen';

const Stack = createNativeStackNavigator();

export function InlineInspectionStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="InlineInspectionList" component={InlineInspectionListScreen} />
      <Stack.Screen name="InlineInspectionForm" component={InlineInspectionFormScreen} />
    </Stack.Navigator>
  );
}
