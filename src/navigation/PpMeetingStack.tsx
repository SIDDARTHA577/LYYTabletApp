import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PpMeetingListScreen } from '../screens/ppMeeting/PpMeetingListScreen';
import { PpMeetingFormScreen } from '../screens/ppMeeting/PpMeetingFormScreen';

const Stack = createNativeStackNavigator();

export function PpMeetingStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PpMeetingList" component={PpMeetingListScreen} />
      <Stack.Screen name="PpMeetingForm" component={PpMeetingFormScreen} />
    </Stack.Navigator>
  );
}
