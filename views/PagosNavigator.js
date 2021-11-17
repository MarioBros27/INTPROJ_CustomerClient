import React from 'react';
import Pagos from './Pagos';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function ReservacionNavigator({ user }) {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator initialRouteName="Pagos" >
            <Stack.Screen name="Pagos" options={{ title:"Pagos" }}>
                {(props)=><Pagos {...props} user={user}/>}
            </Stack.Screen>
        </Stack.Navigator>
    );
}
