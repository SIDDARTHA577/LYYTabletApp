import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DailyCheckListScreen } from '../screens/dailyCheck/DailyCheckListScreen';
import { DailyCheckFormScreen } from '../screens/dailyCheck/DailyCheckFormScreen';

const Stack = createNativeStackNavigator();

export function DailyCheckStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DailyCheckList" component={DailyCheckListScreen} />
      <Stack.Screen name="DailyCheckForm" component={DailyCheckFormScreen} />
    </Stack.Navigator>
  );
}
