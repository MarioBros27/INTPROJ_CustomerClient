import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Orders from './Orders';
import OrderDetails from './OrderDetails';
import PaymentStripe from './PaymentStripe';

export default function RestaurantsNavigator({ navigation, user }) {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName="Ordenes" >
            <Stack.Screen name="Ordenes" options={{ title: "Ordenes" }}  >
                {(props)=><Orders {...props} user={user}/>}
            </Stack.Screen>
            <Stack.Screen name="DetallesOrdenes" options={{ title: "DetallesOrdenes" }} >
              {(props)=><OrderDetails {...props} user={user}/>}
            </Stack.Screen>
            <Stack.Screen name="PagoOrden" options={{ title: "PagoOrden" }} >
              {(props)=><PaymentStripe {...props} user={user}/>}
            </Stack.Screen>
        </Stack.Navigator>
    );
}