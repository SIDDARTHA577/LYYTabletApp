import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FinalInspectionListScreen } from '../screens/finalInspection/FinalInspectionListScreen';
import { FinalInspectionFormScreen } from '../screens/finalInspection/FinalInspectionFormScreen';

const Stack = createNativeStackNavigator();

export function FinalInspectionStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FinalInspectionList" component={FinalInspectionListScreen} />
      <Stack.Screen name="FinalInspectionForm" component={FinalInspectionFormScreen} />
    </Stack.Navigator>
  );
}
