import React from 'react';
import Pago from './Pago'
import Pagos from './Pagos'
import Payment from './Payment';
import PaymentStripe from './PaymentStripe';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function ReservacionNavigator({ navigation, user }) {


    const Stack = createNativeStackNavigator();


    return (
        <Stack.Navigator initialRouteName="Pagos" >
            <Stack.Screen name="Pagos" options={{ title:"Pagos" }}>
                {(props)=><Pagos {...props} user={user}/>}
            </Stack.Screen>
        </Stack.Navigator>
    );
}



