import React from 'react';
import LogIn from './views/LogIn'
import SignUp from './views/SignUp'
import Everything from './views/Everything';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Payments from './views/Payments'
import Restaurants from './views/Restaurants';
import Profile from './views/Profile'
import { Icon } from 'react-native-vector-icons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  loggedIn = true

  if (!loggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LogIn">
          <Stack.Screen name="LogIn" component={LogIn} options={{ title: 'Press2Eat' }} />
          <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'Crear cuenta' }} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  } else {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Restaurants" component={Restaurants} options={{
            title: "Restaurantes",
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="restaurant" color={"black"} size={size} />
            ),
          }} />
          <Tab.Screen name="Payments" component={Payments} options={{
            title: "Pagos",
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="money" color={"black"} size={size} />
            ),
          }} />
          <Tab.Screen name="Profile" component={Profile} options={{
            title: "Perfil",
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="person" color={"black"} size={size} />
            ),
          }} />
        </Tab.Navigator>
      </NavigationContainer>
    )
  }
}

