import React from 'react';
import Profile from './Profile';
import Register from './Register';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function ProfileNavigator({ navigation,user }) {


    const Stack = createNativeStackNavigator();


    return (
        <Stack.Navigator initialRouteName="Profile" >
            <Stack.Screen name="Profile" options={{title:"Perfil"}}  >
            {(props)=><Profile {...props} user={user}/>}
            </Stack.Screen>
            <Stack.Screen name="Register" options={{title:"Registrarse"}} component={Register} />
            
        </Stack.Navigator>
    );
}



