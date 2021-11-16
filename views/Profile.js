import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context'
import { QRCode } from 'react-native-custom-qr-codes-expo';


export default function Profile({ navigation,user }) {
    const [postgresId, setPostgresId] = React.useState(user.postgresId)
    const { logOut } = React.useContext(AuthContext);

    // React.useEffect(() => {
    //     setTimeout(async () => {

    //         try {
    //             let tokenT = await AsyncStorage.getItem('token');
    //             setToken(tokenT)
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     }, 0)
    // }, [])
    return (

        <View style={styles.container}>

            <Text style={styles.title}>{user.username}</Text>
            
            <QRCode codeStyle='square' content={user.postgresId} />
            <View style={styles.buttonContainer}>
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
        // flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        // justifyContent: 'center',
        padding: 20
    },
    buttonContainer:{
        marginTop:40 
    },
    title: {
        fontSize: 34,
        marginBottom: 8,
        fontWeight: "bold"
    }
});
