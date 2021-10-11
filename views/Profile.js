import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context'


export default function Profile({ navigation }) {
    const [token, setToken] = React.useState("")
    const { logOut } = React.useContext(AuthContext);

    React.useEffect(() => {
        setTimeout(async () => {

            try {
                let tokenT = await AsyncStorage.getItem('token');
                console.log(tokenT)
                setToken(tokenT)
            } catch (e) {
                console.log(e);
            }
            dispatch({ type: 'RETRIEVE_TOKEN', token: token });
        }, 0)
    }, [])
    return (

        <View style={styles.container}>

            <Text>{token}</Text>
            <Button
                onPress={() => {  logOut()}}
                title="Cerrar sesión"
                color="red"
                accessibilityLabel="Cerrar sesión"
            />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    }

});
