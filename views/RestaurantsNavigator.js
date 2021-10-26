import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Restaurants from './Restaurants';
import Reservations from './Reservations';
import RestaurantDetails from './RestaurantDetails';

export default function RestaurantsNavigator({ navigation }) {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName="Restaurantes" >
            <Stack.Screen name="Restaurantes" options={{title:"Restaurantes"}} component={Restaurants} />
            <Stack.Screen name="Reservar" options={{title:"Reservar"}} component={Reservations} />
            <Stack.Screen name="Detalles" options={{title:"Detalles"}} component={RestaurantDetails} />
        </Stack.Navigator>
    );
}