import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SpotCheckListScreen } from '../screens/spotCheck/SpotCheckListScreen';
import { SpotCheckFormScreen } from '../screens/spotCheck/SpotCheckFormScreen';

const Stack = createNativeStackNavigator();

export function SpotCheckStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SpotCheckList" component={SpotCheckListScreen} />
      <Stack.Screen name="SpotCheckForm" component={SpotCheckFormScreen} />
    </Stack.Navigator>
  );
}
