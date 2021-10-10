import React from 'react';
import LogIn from './views/LogIn'
import SignUp from './views/SignUp'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LogIn">
        <Stack.Screen name="LogIn" component={LogIn} options={{ title: 'Press2Eat' }}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'Crear cuenta' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

