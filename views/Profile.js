import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context'
import { QRCode } from 'react-native-custom-qr-codes-expo';


export default function Profile({ navigation }) {
    const [token, setToken] = React.useState("")
    const [username, setUsername] = React.useState('Ricardo Luna Guerrero')
    const { logOut } = React.useContext(AuthContext);

    React.useEffect(() => {
        setTimeout(async () => {

            try {
                let tokenT = await AsyncStorage.getItem('token');
                setToken(tokenT)
            } catch (e) {
                console.log(e);
            }
        }, 0)
    }, [])
    return (

        <View style={styles.container}>

            {/* <Text>{token}</Text> */}
            <Text style={styles.title}>{username}</Text>
            {token.length>0 &&
            <QRCode codeStyle='square' content={token} />}
            <View style={styles.buttonContainer}>
            <Button
                onPress={() => {  navigation.navigate("Register")}}
                title="Registrarse para pago digital"
                color="gray"
                accessibilityLabel="Cerrar sesión"
            />
            </View>
            <View style={styles.buttonContainer}>
            <Button
                onPress={() => {  logOut()}}
                title="Cerrar sesión"
                color="red"
                accessibilityLabel="Cerrar sesión"
            />
            </View>
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
    },
    buttonContainer:{
        marginTop:40 
    },
    title: {
        fontSize: 18,
        marginBottom: 2,
        fontWeight: "bold"
    }
});
