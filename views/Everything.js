import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Payments from './Payments'
import Restaurants from './Restaurants';
import Profile from './Profile'
const Tab = createBottomTabNavigator();

export default function Everything() {
    return (
        <Tab.Navigator>
        <Tab.Screen name="Restaurants" component={Restaurants} />
        <Tab.Screen name="Payments" component={Payments} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    );
  }