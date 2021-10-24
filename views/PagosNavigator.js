import React from 'react';
import Pago from './Pago'
import Pagos from './Pagos'
import Payment from './Payment';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function ReservacionNavigator({ navigation }) {


    const Stack = createNativeStackNavigator();


    return (
        <Stack.Navigator initialRouteName="Pagos" >
            <Stack.Screen name="Pagos" options={{title:"Pagos"}} component={Pagos} />
            <Stack.Screen name="Pago" options={{title:"Detalle del pago"}} component={Pago} />
            <Stack.Screen name="Pagar" options={{title:"Realizar pago"}} component={Payment} />
            
        </Stack.Navigator>
    );
}



