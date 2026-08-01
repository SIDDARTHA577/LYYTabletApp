import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FieldAuditorListScreen } from '../screens/fieldAuditor/FieldAuditorListScreen';
import { FieldAuditorFormScreen } from '../screens/fieldAuditor/FieldAuditorFormScreen';

const Stack = createNativeStackNavigator();

export function FieldAuditorStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FieldAuditorList" component={FieldAuditorListScreen} />
      <Stack.Screen name="FieldAuditorForm" component={FieldAuditorFormScreen} />
    </Stack.Navigator>
  );
}
