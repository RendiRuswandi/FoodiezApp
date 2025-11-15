// src/navigation/MainNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Calendar, BookOpen, User } from 'lucide-react-native';

import ScheduleTab from '../screens/main/schedule/ScheduleTab';
import NotesTab from '../screens/main/notes/NotesTab';
import ProfileTab from '../screens/main/profile/ProfileTab';

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#3A5A40', // Warna hijau tua Anda
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { height: 60, paddingBottom: 10, paddingTop: 5 },
      })}
    >
      <Tab.Screen 
        name="Schedule" 
        component={ScheduleTab} 
        options={{
          tabBarIcon: ({ color, size }) => <Calendar color={color} size={size} />
        }}
      />
      <Tab.Screen 
        name="Notes" 
        component={NotesTab} 
        options={{
          tabBarIcon: ({ color, size }) => <BookOpen color={color} size={size} />
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileTab} 
        options={{
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />
        }}
      />
    </Tab.Navigator>
  );
}