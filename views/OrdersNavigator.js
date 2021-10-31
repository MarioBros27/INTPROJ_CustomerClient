import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Orders from './Orders';
import OrderDetails from './OrderDetails';
import PaymentStripe from './PaymentStripe';
import Plate from './Plate';

export default function RestaurantsNavigator({ navigation, user }) {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName="Ordenes" >
            <Stack.Screen name="Ordenes" options={{ title: "Ordenes" }}  >
                {(props)=><Orders {...props} user={user}/>}
            </Stack.Screen>
            <Stack.Screen name="DetallesOrdenes" options={{ title: "Detalles Ordenes" }} >
              {(props)=><OrderDetails {...props} user={user}/>}
            </Stack.Screen>
            <Stack.Screen name="PagoOrden" options={{ title: "Pagar Orden" }} >
              {(props)=><PaymentStripe {...props} user={user}/>}
            </Stack.Screen>
            <Stack.Screen name="Agregar" options={{ title: "Agregar Platillos" }} >
              {(props)=><Plate {...props} user={user}/>}
            </Stack.Screen>
        </Stack.Navigator>
    );
}